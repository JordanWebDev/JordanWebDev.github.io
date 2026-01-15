import { motion } from 'framer-motion';

const Interests = () => {
  const interests = [
    {
      id: 1,
      title: 'Game Development',
      description: 'Creating immersive gaming experiences with modern engines and technologies',
      icon: '🎮',
      color: '#00E6E6'
    },
    {
      id: 2,
      title: 'Artificial Intelligence',
      description: 'Exploring machine learning, neural networks, and AI applications',
      icon: '🤖',
      color: '#00A8CC'
    },
    {
      id: 3,
      title: 'Cybersecurity',
      description: 'Understanding security protocols, encryption, and ethical hacking',
      icon: '🔒',
      color: '#00E6E6'
    },
    {
      id: 4,
      title: 'Space & Astronomy',
      description: 'Fascinated by space exploration, astrophysics, and the cosmos',
      icon: '🌌',
      color: '#00A8CC'
    },
    {
      id: 5,
      title: 'Open Source',
      description: 'Contributing to and maintaining open-source projects',
      icon: '💻',
      color: '#00E6E6'
    },
    {
      id: 6,
      title: 'Music Production',
      description: 'Composing electronic music and sound design',
      icon: '🎵',
      color: '#00A8CC'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-halo-cyan font-halo tracking-wider mb-4">
            INTERESTS
          </h1>
          <p className="text-gray-400 text-lg">
            Passions and hobbies that drive creativity and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {interests.map((interest) => (
            <motion.div
              key={interest.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: `0 20px 40px rgba(0, 230, 230, 0.3)`
              }}
              className="bg-halo-gray border-2 border-halo-cyan/30 rounded-lg p-6 hover:border-halo-cyan transition-all duration-300"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {interest.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-halo-cyan font-halo mb-3">
                {interest.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {interest.description}
              </p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 h-1 bg-gradient-to-r from-halo-cyan to-transparent"
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            Always eager to explore new technologies and collaborate on exciting projects
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-halo-cyan text-black font-bold rounded hover:bg-halo-blue transition-colors font-halo text-lg"
          >
            LET'S COLLABORATE
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Interests;
