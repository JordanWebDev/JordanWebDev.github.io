/**
 * Works Page
 * Displays projects from GitHub pinned repositories in a masonry grid
 * Integrates with GitHub API with offline fallback
 * Updated: OG Xbox theme
 */

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { fetchPinnedProjects } from '../services/githubService';
import OfflineState from '../components/OfflineState';

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchPinnedProjects();

    const projectsWithHeight = result.projects.map((project, index) => ({
      ...project,
      height: index % 3 === 0 ? 'tall' : 'medium',
      image: project.imageUrl,
      tech: project.technologies,
    }));

    setProjects(projectsWithHeight);
    setError(result.error);
    setIsOffline(result.isOffline);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="xbox-grid-bg min-h-screen pt-32 pb-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
          style={{ marginTop: '160px' }}
        >
          <h1 className="text-5xl font-bold text-xbox-orb-glow font-halo tracking-wider mb-4 xbox-text-glow">
            WORKS
          </h1>
          <p className="text-xbox-dim text-sm md:text-base">
            A collection of projects showcasing innovation and technical excellence
          </p>
        </motion.div>

        {/* Error State */}
        {error && isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <OfflineState
              message="Unable to reach GitHub servers. Displaying cached projects."
              onRetry={loadProjects}
              isNetworkError={isOffline}
            />
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-xbox-orb-glow border-t-transparent rounded-full mb-4"
            />
            <p className="text-xbox-dim font-halo text-sm">LOADING PROJECTS...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedProject(project)}
                className="xbox-card p-4 cursor-pointer group"
              >
                {/* Stats Badge */}
                {(project.stars > 0 || project.forks > 0) && (
                  <div className="flex gap-2 mb-3">
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded text-xs">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-xbox-light">{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded text-xs">
                        <span className="text-xbox-dim">🍴</span>
                        <span className="text-xbox-light">{project.forks}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-xbox-orb-glow font-halo mb-2 group-hover:xbox-text-glow">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xbox-light text-sm mb-3 line-clamp-2">
                  {project.description || 'No description available'}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs bg-xbox-green/20 text-xbox-orb-glow border border-xbox-green/40 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-xbox-dim">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="xbox-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-xbox-orb-glow font-halo">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xbox-dim hover:text-xbox-light text-xl"
              >
                ✕
              </button>
            </div>

            {/* Stats */}
            {(selectedProject.stars > 0 || selectedProject.forks > 0) && (
              <div className="flex gap-4 mb-4">
                {selectedProject.stars > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-xbox-light">{selectedProject.stars}</span>
                  </div>
                )}
                {selectedProject.forks > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-xbox-dim">🍴</span>
                    <span className="text-xbox-light">{selectedProject.forks}</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-xbox-light text-sm mb-4">{selectedProject.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-xbox-green/20 text-xbox-orb-glow border border-xbox-green/40 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-xbox-outline text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  SOURCE
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-xbox text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  LIVE DEMO
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Controller Prompts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-4 right-4 flex gap-4"
      >
        <div className="xbox-btn-prompt">
          <span className="btn-icon">A</span>
          <span>SELECT</span>
        </div>
        <div className="xbox-btn-prompt">
          <span className="btn-icon">B</span>
          <span>BACK</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Works;
