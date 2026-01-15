import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: 'WORKS', path: '/works' },
    { name: 'BIO', path: '/bio' },
    { name: 'INTERESTS', path: '/interests' },
    { name: 'EXPERIENCE', path: '/experience' },
    { name: 'BLOG', path: '/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-halo-dark/90 backdrop-blur-sm border-b border-halo-cyan/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-halo-cyan font-halo tracking-wider"
            >
              JORDAN<span className="text-white">_DEV</span>
            </motion.h1>
          </Link>
          
          <div className="flex gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`font-halo text-sm tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-halo-cyan' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    {hoveredItem === item.name && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 text-halo-cyan"
                        style={{ textShadow: '0 0 10px #00E6E6' }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-halo-cyan"
                        style={{ boxShadow: '0 0 10px #00E6E6' }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
