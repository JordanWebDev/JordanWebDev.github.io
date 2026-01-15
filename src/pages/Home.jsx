import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { title: 'WORKS', desc: 'View Projects', icon: '⚡', path: '/works' },
    { title: 'BIO', desc: 'About Me', icon: '👤', path: '/bio' },
    { title: 'INTERESTS', desc: 'My Passions', icon: '🎯', path: '/interests' },
    { title: 'EXPERIENCE', desc: 'Career Path', icon: '📊', path: '/experience' },
    { title: 'BLOG', desc: 'Latest Updates', icon: '📝', path: '/blog' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-halo-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-halo-blue/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-halo-cyan bg-halo-gray flex items-center justify-center"
                 style={{ boxShadow: '0 0 40px rgba(0, 230, 230, 0.5)' }}>
              <span className="text-5xl text-halo-cyan font-bold font-halo">JD</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold text-white font-halo tracking-wider mb-6"
          >
            JORDAN<span className="text-halo-cyan">_DEV</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Full-Stack Developer | Technology Enthusiast | Creator
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 230, 230, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-halo-cyan text-black font-bold rounded font-halo text-lg cursor-pointer"
            >
              HIRE ME
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: '#00E6E6', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-halo-cyan text-halo-cyan font-bold rounded font-halo text-lg cursor-pointer transition-colors"
            >
              VIEW RESUME
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 230, 230, 0.3)'
                }}
                className="bg-halo-gray border-2 border-halo-cyan/30 rounded-lg p-6 hover:border-halo-cyan transition-all duration-300 text-center cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-halo-cyan font-halo mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Animated Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-20 p-6 bg-halo-gray/50 border-2 border-halo-cyan/20 rounded-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-halo-cyan font-halo font-bold">SYSTEM STATUS</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-unsc-green font-halo font-bold"
            >
              ONLINE
            </motion.span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Projects Completed</span>
              <span className="text-white font-bold">150+</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Years Experience</span>
              <span className="text-white font-bold">6+</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Technologies Mastered</span>
              <span className="text-white font-bold">25+</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
