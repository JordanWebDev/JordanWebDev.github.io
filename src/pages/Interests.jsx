import { motion } from 'framer-motion';

const Interests = () => {
  const interests = [
    { id: 1, title: 'Game Development', description: 'Creating immersive gaming experiences', icon: '🎮' },
    { id: 2, title: 'Artificial Intelligence', description: 'Exploring machine learning and AI', icon: '🤖' },
    { id: 3, title: 'Cybersecurity', description: 'Security protocols and ethical hacking', icon: '🔒' },
    { id: 4, title: 'Space & Astronomy', description: 'Space exploration and astrophysics', icon: '🌌' },
    { id: 5, title: 'Open Source', description: 'Contributing to open-source projects', icon: '💻' },
    { id: 6, title: 'Music Production', description: 'Electronic music and sound design', icon: '🎵' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="xbox-grid-bg min-h-screen pt-32 pb-12 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
          style={{ marginTop: '160px' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-xbox-orb-glow font-halo tracking-wider mb-2 xbox-text-glow">
            INTERESTS
          </h1>
          <p className="text-xbox-dim text-sm">
            Passions and hobbies that drive creativity
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {interests.map((interest) => (
            <motion.div
              key={interest.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="xbox-card p-4 cursor-pointer group"
            >
              <div className="text-4xl mb-3">{interest.icon}</div>
              <h3 className="text-lg font-bold text-xbox-orb-glow font-halo mb-2">
                {interest.title}
              </h3>
              <p className="text-xbox-light text-sm">{interest.description}</p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-3 h-0.5 bg-gradient-to-r from-xbox-green to-transparent"
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-xbox-dim text-sm mb-4">
            Always eager to explore new technologies
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-xbox"
          >
            LET'S COLLABORATE
          </motion.button>
        </motion.div>
      </div>

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

export default Interests;
