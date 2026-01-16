import { motion } from 'framer-motion';

const Bio = () => {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Docker/Kubernetes', level: 75 },
    { name: 'AWS/Cloud', level: 80 },
  ];

  return (
    <div className="xbox-grid-bg min-h-screen pt-32 pb-12 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '160px' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-xbox-orb-glow font-halo tracking-wider mb-6 xbox-text-glow">
            BIO
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 flex justify-center"
          >
            <div className="xbox-orb w-40 h-40 flex items-center justify-center">
              <span className="text-4xl text-xbox-dark font-bold font-halo">JD</span>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-4"
          >
            <h2 className="text-2xl font-bold text-xbox-light font-halo">
              JORDAN WEBDEV
            </h2>
            <p className="text-xbox-light text-sm leading-relaxed">
              Full-stack developer and technology enthusiast with a passion for creating
              innovative digital experiences. Specialized in building scalable web applications
              and exploring cutting-edge technologies.
            </p>
            <p className="text-xbox-dim text-sm leading-relaxed">
              With years of experience in the industry, I've worked on projects ranging from
              e-commerce platforms to real-time data visualization systems.
            </p>

            <div className="flex gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="btn-xbox text-sm"
              >
                CONTACT
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="btn-xbox-outline text-sm"
              >
                RESUME
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="xbox-card p-6"
        >
          <h2 className="text-xl font-bold text-xbox-orb-glow font-halo mb-4">SKILLS</h2>
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-xbox-light font-halo text-sm">{skill.name}</span>
                  <span className="text-xbox-orb-glow font-halo text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-xbox-dark border border-xbox-green/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-xbox-green to-xbox-orb-glow"
                    style={{ boxShadow: '0 0 10px #8bc34a' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
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

export default Bio;
