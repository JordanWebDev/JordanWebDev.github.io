import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating Discord API fetch
    // In production, replace with actual Discord API endpoint
    // Example: fetch('https://discord.com/api/guilds/{GUILD_ID}/announcements')
    
    const fetchPosts = async () => {
      try {
        // Simulated data - replace with actual Discord API call
        const mockPosts = [
          {
            id: 1,
            title: 'Welcome to the Portfolio Blog',
            content: 'This is where Discord server announcements will be displayed. Connect your Discord server to see live updates!',
            author: 'JordanWebDev',
            date: '2024-01-15',
            reactions: 42
          },
          {
            id: 2,
            title: 'New Project Launch: Spartan Protocol',
            content: 'Excited to announce the launch of our latest project. Built with cutting-edge technology and designed for maximum performance.',
            author: 'JordanWebDev',
            date: '2024-01-10',
            reactions: 37
          },
          {
            id: 3,
            title: 'Tech Stack Update',
            content: 'We\'ve upgraded our tech stack to include the latest versions of React, Node.js, and added new tools for better development experience.',
            author: 'JordanWebDev',
            date: '2024-01-05',
            reactions: 28
          },
          {
            id: 4,
            title: 'Community Spotlight',
            content: 'Thank you to everyone who has supported our projects! Your feedback and contributions have been invaluable.',
            author: 'JordanWebDev',
            date: '2024-01-01',
            reactions: 51
          }
        ];

        // Simulate API delay
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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
            BLOG
          </h1>
          <p className="text-gray-400 text-lg">
            Latest updates and announcements from our Discord community
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-halo-cyan border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-halo-gray border-2 border-halo-cyan/30 rounded-lg p-6 hover:border-halo-cyan transition-all duration-300"
                style={{ boxShadow: '0 4px 20px rgba(0, 230, 230, 0.1)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-halo-cyan font-halo">
                    {post.title}
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 bg-halo-cyan/20 px-3 py-1 rounded-full"
                  >
                    <span className="text-halo-cyan">👍</span>
                    <span className="text-halo-cyan font-bold">{post.reactions}</span>
                  </motion.div>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">
                      {post.author}
                    </span>
                    <span className="text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-halo-cyan hover:text-halo-blue font-semibold"
                  >
                    Read More →
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 bg-halo-gray/50 border-2 border-halo-cyan/20 rounded-lg"
        >
          <h3 className="text-xl font-bold text-halo-cyan font-halo mb-3">
            CONNECT YOUR DISCORD
          </h3>
          <p className="text-gray-400 mb-4">
            To display live announcements from your Discord server, configure the webhook URL 
            and channel ID in the environment variables.
          </p>
          <code className="block bg-halo-dark p-4 rounded text-sm text-halo-cyan">
            DISCORD_WEBHOOK_URL=your_webhook_url<br />
            DISCORD_CHANNEL_ID=your_channel_id
          </code>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
