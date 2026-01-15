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
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-halo-cyan font-halo tracking-wider mb-8">
            BIO
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="border-2 border-halo-cyan/30 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-halo-cyan/20 to-halo-blue/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-halo-cyan bg-halo-gray flex items-center justify-center">
                  <span className="text-6xl text-halo-cyan font-bold font-halo">JD</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white font-halo mb-4">
                JORDAN WEBDEV
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Full-stack developer and technology enthusiast with a passion for creating 
                innovative digital experiences. Specialized in building scalable web applications 
                and exploring cutting-edge technologies.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                With years of experience in the industry, I've worked on projects ranging from 
                e-commerce platforms to real-time data visualization systems. My approach combines 
                technical excellence with creative problem-solving.
              </p>
            </div>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-halo-cyan text-black font-bold rounded hover:bg-halo-blue transition-colors"
              >
                CONTACT
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 border-2 border-halo-cyan text-halo-cyan font-bold rounded hover:bg-halo-cyan hover:text-black transition-colors"
              >
                RESUME
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-halo-cyan font-halo mb-6">SKILLS</h2>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-white font-halo">{skill.name}</span>
                  <span className="text-halo-cyan font-halo">{skill.level}%</span>
                </div>
                <div className="h-3 bg-halo-dark border border-halo-cyan/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-halo-cyan to-halo-blue"
                    style={{ boxShadow: '0 0 10px #00E6E6' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Bio;
