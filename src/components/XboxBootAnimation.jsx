import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const XboxBootAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [showPressStart, setShowPressStart] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame;
    let startTime = Date.now();
    let phase = 0; // 0: forming, 1: pulsing, 2: fade out

    const drawOrb = (time) => {
      const elapsed = time - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (phase === 0) {
        // Forming phase (0-2s)
        const progress = Math.min(elapsed / 2000, 1);
        const radius = Math.max(100 * progress, 1);
        const opacity = progress;

        // Draw green orb with glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(radius * 2, 1));
        gradient.addColorStop(0, `rgba(0, 255, 0, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(0, 200, 0, ${opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(radius * 0.5, 1), 0, Math.PI * 2);
        ctx.fill();

        if (progress >= 1) {
          phase = 1;
          startTime = time;
        }
      } else if (phase === 1) {
        // Pulsing phase (2-4s)
        const progress = (time - startTime) / 2000;
        const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
        const radius = 100 * pulseScale;

        // Draw pulsing orb
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(radius * 2, 1));
        gradient.addColorStop(0, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 200, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = 'rgba(0, 255, 0, 1)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(radius * 0.5, 1), 0, Math.PI * 2);
        ctx.fill();

        if (progress >= 1) {
          phase = 2;
          startTime = time;
        }
      } else if (phase === 2) {
        // Fade out phase (4-5s)
        const progress = (time - startTime) / 1000;
        const opacity = Math.max(1 - progress, 0);
        const radius = 100;

        if (opacity > 0) {
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(radius * 2, 1));
          gradient.addColorStop(0, `rgba(0, 255, 0, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(0, 200, 0, ${opacity * 0.7})`);
          gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(radius * 0.5, 1), 0, Math.PI * 2);
          ctx.fill();
        }

        if (progress >= 1) {
          setShowPressStart(true);
          cancelAnimationFrame(animationFrame);
          return;
        }
      }

      animationFrame = requestAnimationFrame(drawOrb);
    };

    animationFrame = requestAnimationFrame(drawOrb);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: showPressStart ? 0 : 1, transition: 'opacity 1s' }}
      />
      {showPressStart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.h1
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-6xl font-bold text-halo-cyan font-halo tracking-wider mb-8"
          >
            PRESS START
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-8 py-4 border-2 border-halo-cyan text-halo-cyan font-halo text-xl tracking-wider
                       hover:bg-halo-cyan hover:text-black transition-colors duration-300"
          >
            START
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default XboxBootAnimation;
