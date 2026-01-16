import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: 'WORKS', desc: 'View Projects', path: '/works' },
    { name: 'BIO', desc: 'About Me', path: '/bio' },
    { name: 'INTERESTS', desc: 'My Passions', path: '/interests' },
    { name: 'EXPERIENCE', desc: 'Career Path', path: '/experience' },
    { name: 'BLOG', desc: 'Latest Updates', path: '/blog' },
  ];

  return (
    <div className="xbox-grid-bg min-h-screen pt-20 pb-8 px-4 flex flex-col">
      {/* Main Dashboard Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-5xl w-full">

          {/* Left Side - Glowing Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col items-center"
          >
            <div className="xbox-orb flex items-center justify-center">
              <span className="text-5xl font-bold font-halo text-xbox-dark drop-shadow-lg">JD</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-3xl lg:text-4xl font-bold font-halo text-center"
            >
              <span className="text-xbox-orb-glow">JORDAN</span>
              <span className="text-xbox-light">_DEV</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-2 text-sm text-xbox-orb-glow/70 font-halo tracking-wider"
            >
              FULL-STACK DEVELOPER
            </motion.p>
          </motion.div>

          {/* Center - Connectors (hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-4 items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <div className="xbox-connector-line w-16" />
                <div className={`xbox-connector ${hoveredItem === item.name ? 'active' : ''}`} />
                <div className="xbox-connector-line w-8" />
              </motion.div>
            ))}
          </div>

          {/* Right Side - Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="xbox-dashboard-menu"
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ x: 10 }}
                  className={`xbox-bar-btn ${location.pathname === item.path ? 'selected' : ''}`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom - Controller Button Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center lg:justify-end gap-6 mt-8 px-4"
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

      {/* System Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-4 flex justify-between items-center text-xs font-halo text-xbox-orb-glow/50 px-4"
      >
        <div className="flex items-center gap-4">
          <span>SYSTEM STATUS: <span className="text-xbox-orb-glow">ONLINE</span></span>
          <span>•</span>
          <span>150+ PROJECTS</span>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <span>6+ YEARS EXPERIENCE</span>
          <span>•</span>
          <span>25+ TECHNOLOGIES</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
