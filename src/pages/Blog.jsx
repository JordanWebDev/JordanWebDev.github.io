import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const mockPosts = [
        { id: 1, title: 'Welcome to the Portfolio Blog', content: 'This is where announcements and updates will be displayed.', author: 'JordanWebDev', date: '2024-01-15', reactions: 42 },
        { id: 2, title: 'New Project Launch: Spartan Protocol', content: 'Excited to announce the launch of our latest project with cutting-edge technology.', author: 'JordanWebDev', date: '2024-01-10', reactions: 37 },
        { id: 3, title: 'Tech Stack Update', content: 'We\'ve upgraded our tech stack to include the latest versions of React and Node.js.', author: 'JordanWebDev', date: '2024-01-05', reactions: 28 },
        { id: 4, title: 'Community Spotlight', content: 'Thank you to everyone who has supported our projects!', author: 'JordanWebDev', date: '2024-01-01', reactions: 51 }
      ];

      setTimeout(() => {
        setPosts(mockPosts);
        setLoading(false);
      }, 800);
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

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
            BLOG
          </h1>
          <p className="text-xbox-dim text-sm">
            Latest updates and announcements
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-xbox-orb-glow border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 5 }}
                className="xbox-card p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-xbox-orb-glow font-halo">{post.title}</h2>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-1 bg-xbox-green/20 px-2 py-0.5 rounded-full"
                  >
                    <span className="text-xbox-orb-glow text-sm">👍</span>
                    <span className="text-xbox-orb-glow font-bold text-sm">{post.reactions}</span>
                  </motion.div>
                </div>

                <p className="text-xbox-light text-sm mb-3">{post.content}</p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xbox-light font-semibold">{post.author}</span>
                    <span className="text-xbox-dim">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xbox-orb-glow hover:text-xbox-accent font-semibold"
                  >
                    Read More →
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
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

export default Blog;
