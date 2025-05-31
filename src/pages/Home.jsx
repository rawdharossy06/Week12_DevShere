import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: Import axios here
import axios from 'axios';

import moment from 'moment';
import { Users, Star, GitBranch, MapPin, Calendar, ExternalLink } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Fetch user data from GitHub API using axios and useEffect and set the user state, also handle the loading and error states
     //API: https://api.github.com/users/your-github-username
      useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.github.com/users/rawdharossy06');
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.'); 
      }
      finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);



  if (loading) {
    return <div className="loading">Loading profile data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      {user && (
        <>
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-container">
                <img 
                  src={user.avatar_url} 
                  alt={`${user.name}'s avatar`} 
                  className="avatar" 
                />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{user.name}</h1>
                <h2 className="profile-username">@{user.login}</h2>
                {user.location && (
                  <p className="profile-location">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </p>
                )}
                <p className="profile-joined">
                  <Calendar size={16} />
                  <span>Joined on {moment(user.created_at).format('MMMM D, YYYY')}</span>
                </p>
              </div>
            </div>
            
            <div className="profile-bio">
              <p>{user.bio || 'No bio available'}</p>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <GitBranch size={18} />
                <div className="stat-details">
                  <span className="stat-value">{user.public_repos}</span>
                  <span className="stat-label">Repositories</span>
                </div>
              </div>
              <div className="stat-item">
                <Users size={18} />
                <div className="stat-details">
                  <span className="stat-value">{user.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>
              <div className="stat-item">
                <Star size={18} />
                <div className="stat-details">
                  <span className="stat-value">{user.following}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </div>

            {(user.company || user.blog) && (
              <div className="profile-links">
                {user.company && (
                  <p className="profile-company">
                    <span>Company:</span> {user.company}
                  </p>
                )}
                {user.blog && (
                  <p className="profile-website">
                    <span>Website:</span> 
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                       target="_blank" 
                       rel="noopener noreferrer">
                      {user.blog} <ExternalLink size={14} />
                    </a>
                  </p>
                )}
              </div>
            )}

            <div className="profile-actions">
              <a 
                href={user.html_url} 
                className="btn btn-secondary"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Visit GitHub
              </a>
              <Link to="/projects" className="btn">
                View Projects
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;