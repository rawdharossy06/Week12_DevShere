import React, { useState, useEffect } from 'react';

// TODO: Import axios here
import axios from 'axios';
import { Link } from 'react-router-dom';


import ProjectCard from '../components/ProjectCard';
import '../styles/Projects.css';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 // TODO: Fetch repositories from GitHub API using axios and useEffect and set the repos state, also handle the loading and error states
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.github.com/users/rawdharossy06/repos?per_page=10&sort=updated');
        setRepos(response.data);
      } catch (err) {
        setError('Failed to fetch repositories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

 // API: https://api.github.com/github.com/users/rawdharossy06/repos?per_page=10&sort=updated


  if (loading) {
    return <div className="loading">Loading repositories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">GitHub Projects</h1>
        <p className="projects-subtitle">
          My latest GitHub repositories.
        </p>
      </div>

      <div className="projects-grid">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              html_url={repo.html_url}
              stargazers_count={repo.stargazers_count}
              forks_count={repo.forks_count}
              updated_at={repo.updated_at}
              topics={repo.topics}
              watchers_count={repo.watchers_count}
            />
          ))
        ) : (
          <div className="no-repos">
            <p>No repositories found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;