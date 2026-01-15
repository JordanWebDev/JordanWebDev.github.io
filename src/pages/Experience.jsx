import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  const experiences = [
    {
      id: 1,
      year: '2024',
      title: 'Senior Full-Stack Developer',
      company: 'UNSC Tech Division',
      description: 'Leading development of mission-critical applications using React, Node.js, and cloud infrastructure. Architecting scalable solutions for high-traffic platforms.',
      achievements: [
        'Increased system performance by 300%',
        'Led team of 8 developers',
        'Implemented CI/CD pipeline'
      ]
    },
    {
      id: 2,
      year: '2022',
      title: 'Full-Stack Developer',
      company: 'Spartan Solutions',
      description: 'Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver quality software.',
      achievements: [
        'Built 15+ web applications',
        'Reduced bug reports by 40%',
        'Mentored junior developers'
      ]
    },
    {
      id: 3,
      year: '2020',
      title: 'Frontend Developer',
      company: 'Covenant Digital',
      description: 'Created responsive user interfaces and implemented modern design patterns. Focused on user experience and performance optimization.',
      achievements: [
        'Improved page load time by 50%',
        'Implemented design system',
        'Achieved 98% test coverage'
      ]
    },
    {
      id: 4,
      year: '2018',
      title: 'Junior Developer',
      company: 'Forerunner Labs',
      description: 'Started career in web development, learning best practices and modern technologies. Contributed to various client projects.',
      achievements: [
        'Completed 25+ projects',
        'Learned React and Node.js',
        'Received "Rising Star" award'
      ]
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
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-halo-cyan font-halo tracking-wider mb-4">
            EXPERIENCE
          </h1>
          <p className="text-gray-400 text-lg">
            Professional journey through technology and innovation
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-halo-cyan/30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                data-id={exp.id}
                className="timeline-item relative pl-24"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  visibleItems.includes(exp.id)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Year badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={
                    visibleItems.includes(exp.id)
                      ? { scale: 1 }
                      : { scale: 0 }
                  }
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                  className="absolute left-0 top-0 w-16 h-16 rounded-full border-4 border-halo-cyan bg-halo-dark flex items-center justify-center z-10"
                  style={{ boxShadow: '0 0 20px rgba(0, 230, 230, 0.5)' }}
                >
                  <span className="text-halo-cyan font-bold font-halo text-sm">
                    {exp.year}
                  </span>
                </motion.div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-halo-gray border-2 border-halo-cyan/30 rounded-lg p-6 hover:border-halo-cyan transition-all duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(0, 230, 230, 0.1)' }}
                >
                  <h3 className="text-2xl font-bold text-halo-cyan font-halo mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-white font-semibold mb-4">{exp.company}</p>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-halo-cyan font-semibold font-halo text-sm">
                      KEY ACHIEVEMENTS:
                    </p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            visibleItems.includes(exp.id)
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ duration: 0.4, delay: index * 0.2 + 0.4 + idx * 0.1 }}
                          className="text-gray-400 flex items-start"
                        >
                          <span className="text-halo-cyan mr-2">▸</span>
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
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-halo-cyan text-black font-bold rounded hover:bg-halo-blue transition-colors font-halo text-lg"
          >
            DOWNLOAD FULL RESUME
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
