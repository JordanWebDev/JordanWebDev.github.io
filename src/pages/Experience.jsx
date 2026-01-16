import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  const experiences = [
    {
      id: 1, year: '2024', title: 'Senior Full-Stack Developer', company: 'UNSC Tech Division',
      description: 'Leading development of mission-critical applications using React, Node.js, and cloud infrastructure.',
      achievements: ['Increased system performance by 300%', 'Led team of 8 developers', 'Implemented CI/CD pipeline']
    },
    {
      id: 2, year: '2022', title: 'Full-Stack Developer', company: 'Spartan Solutions',
      description: 'Developed and maintained web applications using modern JavaScript frameworks.',
      achievements: ['Built 15+ web applications', 'Reduced bug reports by 40%', 'Mentored junior developers']
    },
    {
      id: 3, year: '2020', title: 'Frontend Developer', company: 'Covenant Digital',
      description: 'Created responsive user interfaces and implemented modern design patterns.',
      achievements: ['Improved page load time by 50%', 'Implemented design system', 'Achieved 98% test coverage']
    },
    {
      id: 4, year: '2018', title: 'Junior Developer', company: 'Forerunner Labs',
      description: 'Started career in web development, learning best practices and modern technologies.',
      achievements: ['Completed 25+ projects', 'Learned React and Node.js', 'Received "Rising Star" award']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="xbox-grid-bg min-h-screen pt-32 pb-12 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
          style={{ marginTop: '160px' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-xbox-orb-glow font-halo tracking-wider mb-2 xbox-text-glow">
            EXPERIENCE
          </h1>
          <p className="text-xbox-dim text-sm">
            Professional journey through technology
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-xbox-green/30" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                data-id={exp.id}
                className="timeline-item relative pl-16"
                initial={{ opacity: 0, x: -30 }}
                animate={visibleItems.includes(exp.id) ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Year badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={visibleItems.includes(exp.id) ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
                  className="absolute left-0 top-0 w-12 h-12 rounded-full border-2 border-xbox-green bg-xbox-dark flex items-center justify-center z-10"
                  style={{ boxShadow: '0 0 15px rgba(139, 195, 74, 0.4)' }}
                >
                  <span className="text-xbox-orb-glow font-bold font-halo text-xs">{exp.year}</span>
                </motion.div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="xbox-card p-4"
                >
                  <h3 className="text-lg font-bold text-xbox-orb-glow font-halo mb-1">{exp.title}</h3>
                  <p className="text-xbox-light font-semibold text-sm mb-2">{exp.company}</p>
                  <p className="text-xbox-dim text-sm mb-3">{exp.description}</p>

                  <div className="space-y-1">
                    <p className="text-xbox-orb-glow font-semibold font-halo text-xs">KEY ACHIEVEMENTS:</p>
                    <ul className="space-y-0.5">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={visibleItems.includes(exp.id) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: index * 0.15 + 0.2 + idx * 0.05 }}
                          className="text-xbox-light text-sm flex items-start"
                        >
                          <span className="text-xbox-orb-glow mr-2">▸</span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-xbox inline-block"
          >
            DOWNLOAD RESUME
          </motion.a>
        </motion.div>
      </div>

      {/* Controller Prompts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
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

export default Experience;
