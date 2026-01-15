import { motion } from 'framer-motion';
import { useState } from 'react';

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Project Spartan',
      description: 'A cutting-edge web application built with React and Node.js',
      image: 'https://via.placeholder.com/400x300/00E6E6/FFFFFF?text=Project+Spartan',
      tech: ['React', 'Node.js', 'MongoDB'],
      height: 'tall'
    },
    {
      id: 2,
      title: 'UNSC Database',
      description: 'Real-time data visualization dashboard',
      image: 'https://via.placeholder.com/400x200/00A8CC/FFFFFF?text=UNSC+Database',
      tech: ['Vue.js', 'D3.js', 'PostgreSQL'],
      height: 'medium'
    },
    {
      id: 3,
      title: 'Cortana AI Assistant',
      description: 'AI-powered chatbot with natural language processing',
      image: 'https://via.placeholder.com/400x350/2A2E35/00E6E6?text=Cortana+AI',
      tech: ['Python', 'TensorFlow', 'Flask'],
      height: 'tall'
    },
    {
      id: 4,
      title: 'Slipspace Engine',
      description: 'High-performance game engine prototype',
      image: 'https://via.placeholder.com/400x250/3D4451/FFFFFF?text=Slipspace',
      tech: ['C++', 'OpenGL', 'Vulkan'],
      height: 'medium'
    },
    {
      id: 5,
      title: 'Covenant Protocol',
      description: 'Secure communication protocol implementation',
      image: 'https://via.placeholder.com/400x300/1A1D23/00E6E6?text=Covenant',
      tech: ['Go', 'WebRTC', 'Redis'],
      height: 'tall'
    },
    {
      id: 6,
      title: 'Forerunner Archive',
      description: 'Distributed file storage system',
      image: 'https://via.placeholder.com/400x200/00E6E6/FFFFFF?text=Forerunner',
      tech: ['Rust', 'IPFS', 'Docker'],
      height: 'medium'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const getHeightClass = (height) => {
    switch(height) {
      case 'tall': return 'row-span-2';
      case 'medium': return 'row-span-1';
      default: return 'row-span-1';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-halo-cyan font-halo tracking-wider mb-4">
            WORKS
          </h1>
          <p className="text-gray-400 text-lg">
            A collection of projects showcasing innovation and technical excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedProject(project)}
              className={`${getHeightClass(project.height)} relative overflow-hidden rounded-lg cursor-pointer
                         bg-halo-gray border-2 border-halo-cyan/30 hover:border-halo-cyan transition-all duration-300`}
              style={{
                boxShadow: '0 4px 20px rgba(0, 230, 230, 0.1)'
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image})`,
                  filter: 'brightness(0.7)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-halo-dark via-halo-dark/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-halo-cyan font-halo mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-halo-cyan/20 text-halo-cyan border border-halo-cyan/50 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
            className="bg-halo-gray border-2 border-halo-cyan rounded-lg p-8 max-w-2xl w-full"
          >
            <h2 className="text-3xl font-bold text-halo-cyan font-halo mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-halo-cyan/20 text-halo-cyan border border-halo-cyan/50 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="px-6 py-3 bg-halo-cyan text-black font-bold rounded hover:bg-halo-blue transition-colors"
            >
              CLOSE
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Works;
