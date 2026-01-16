import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, playBootAmbient, stopBootAmbient, playBootWhoosh } from '../utils/audioManager';

/**
 * XBOX BOOT ANIMATION - "Nuclear Blob" (2001 Original)
 * 
 * Technical Implementation:
 * - Metaball particle system with threshold rendering
 * - Simplex noise for organic morphing
 * - Multi-pass gradient coloring (white core → cyan → green edge)
 * - Three-phase animation: pulsate → condense → flash
 */

// ============================================================================
// SIMPLEX NOISE IMPLEMENTATION
// ============================================================================
class SimplexNoise {
  constructor(seed = Math.random()) {
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);

    // Initialize permutation table
    for (let i = 0; i < 256; i++) {
      this.p[i] = i;
    }

    // Shuffle using seed
    let n = seed * 256;
    for (let i = 255; i > 0; i--) {
      n = (n * 16807) % 2147483647;
      const j = n % (i + 1);
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }

    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

    // Gradient vectors for 3D
    this.grad3 = new Float32Array([
      1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
      1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
      0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1
    ]);
  }

  noise3D(x, y, z) {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;

    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);

    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = x - X0;
    const y0 = y - Y0;
    const z0 = z - Z0;

    let i1, j1, k1, i2, j2, k2;

    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    const gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]] * 3;
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] * 3;
    const gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] * 3;
    const gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] * 3;

    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * (this.grad3[gi0] * x0 + this.grad3[gi0 + 1] * y0 + this.grad3[gi0 + 2] * z0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * (this.grad3[gi1] * x1 + this.grad3[gi1 + 1] * y1 + this.grad3[gi1 + 2] * z1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * (this.grad3[gi2] * x2 + this.grad3[gi2 + 1] * y2 + this.grad3[gi2 + 2] * z2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) {
      t3 *= t3;
      n3 = t3 * t3 * (this.grad3[gi3] * x3 + this.grad3[gi3 + 1] * y3 + this.grad3[gi3 + 2] * z3);
    }

    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

// ============================================================================
// METABALL PARTICLE CLASS
// ============================================================================
class MetaballParticle {
  constructor(centerX, centerY, baseRadius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.baseRadius = baseRadius;

    // Random orbital properties
    this.orbitRadius = 20 + Math.random() * 60;
    this.orbitSpeed = (0.5 + Math.random() * 1.5) * (Math.random() > 0.5 ? 1 : -1);
    this.orbitPhase = Math.random() * Math.PI * 2;
    this.size = 25 + Math.random() * 40;
    this.pulseSpeed = 1 + Math.random() * 2;
    this.pulsePhase = Math.random() * Math.PI * 2;

    // Vertical oscillation
    this.yOscillation = Math.random() * 30;
    this.ySpeed = 0.5 + Math.random();

    this.x = centerX;
    this.y = centerY;
    this.radius = this.size;
  }

  update(time, phase, progress, noise) {
    const t = time * 0.001;

    if (phase === 'pulsate') {
      // Violent pulsation phase (0-3s)
      const violenceScale = 1 + Math.sin(t * 4) * 0.5 + Math.sin(t * 7) * 0.3;
      const noiseVal = noise.noise3D(
        Math.cos(this.orbitPhase + t * this.orbitSpeed) * 0.5,
        Math.sin(this.orbitPhase + t * this.orbitSpeed) * 0.5,
        t * 0.5
      );

      const dynamicOrbit = this.orbitRadius * violenceScale * (1 + noiseVal * 0.5);

      this.x = this.centerX + Math.cos(this.orbitPhase + t * this.orbitSpeed) * dynamicOrbit;
      this.y = this.centerY + Math.sin(this.orbitPhase + t * this.orbitSpeed * 0.7) * dynamicOrbit * 0.8;
      this.y += Math.sin(t * this.ySpeed + this.pulsePhase) * this.yOscillation * violenceScale;

      // Growing size with violent pulses
      const growFactor = 0.5 + progress * 0.5;
      this.radius = this.size * growFactor * (1 + Math.sin(t * this.pulseSpeed + this.pulsePhase) * 0.4);

    } else if (phase === 'waiting') {
      // Gentle floating/pulsing during wait screen
      const noiseVal = noise.noise3D(
        this.centerX * 0.01,
        this.centerY * 0.01,
        t * 0.2
      );

      this.x = this.centerX + Math.cos(this.orbitPhase + t * 0.2) * 5;
      this.y = this.centerY + Math.sin(this.orbitPhase + t * 0.3) * 5;
      this.radius = this.size * 0.2 + Math.sin(t + this.pulsePhase) * 2; // Small background particles

      // Rapid condensing phase (3-4s)
      const condenseProgress = progress; // 0 to 1 during condense
      const easeCondense = condenseProgress * condenseProgress * condenseProgress; // Cubic ease

      // Pull towards center with increasing force
      const targetX = this.centerX;
      const targetY = this.centerY;

      this.x = this.x + (targetX - this.x) * (0.05 + easeCondense * 0.3);
      this.y = this.y + (targetY - this.y) * (0.05 + easeCondense * 0.3);

      // Shrink rapidly
      this.radius = this.size * (1 - easeCondense * 0.9);

      // Add slight spin as it condenses
      const spinAngle = condenseProgress * Math.PI * 4;
      const spinRadius = (1 - easeCondense) * 10;
      this.x += Math.cos(spinAngle + this.orbitPhase) * spinRadius;
      this.y += Math.sin(spinAngle + this.orbitPhase) * spinRadius;
    }
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const XboxBootAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null);
  const animationRef = useRef(null);
  const noiseRef = useRef(null);
  const particlesRef = useRef([]);
  const audioStartedRef = useRef(false);
  const [animPhase, setAnimPhase] = useState('boot'); // 'boot' | 'waiting' | 'flash' | 'complete'
  const [showPressStart, setShowPressStart] = useState(false);

  // Start boot ambient audio
  useEffect(() => {
    if (animPhase === 'boot' && !audioStartedRef.current) {
      audioStartedRef.current = true;
      // Initialize audio and play ambient
      audioManager.init().then(() => {
        playBootAmbient();
      });
    }
  }, [animPhase]);

  // Initialize noise and particles
  const initializeParticles = useCallback((centerX, centerY) => {
    noiseRef.current = new SimplexNoise(12345);

    const particles = [];
    const particleCount = 25; // Number of metaballs

    for (let i = 0; i < particleCount; i++) {
      particles.push(new MetaballParticle(centerX, centerY, 50));
    }

    particlesRef.current = particles;
  }, []);

  // Render metaballs with threshold effect
  const renderMetaballs = useCallback((ctx, offCtx, width, height, centerX, centerY, time, phase, phaseProgress) => {
    const particles = particlesRef.current;
    const noise = noiseRef.current;

    // Update all particles
    particles.forEach(p => p.update(time, phase, phaseProgress, noise));

    // Clear offscreen canvas
    offCtx.fillStyle = '#000000';
    offCtx.fillRect(0, 0, width, height);

    // Draw metaballs to offscreen canvas with additive blending
    offCtx.globalCompositeOperation = 'lighter';

    particles.forEach(p => {
      if (p.radius <= 0) return;

      // Create radial gradient for each metaball
      const gradient = offCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      offCtx.beginPath();
      offCtx.fillStyle = gradient;
      offCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      offCtx.fill();
    });


    // Skip central orb if waiting (clearing data for text)
    if (phase !== 'waiting') {
      // Add a large central metaball
      const centralPulse = 1 + Math.sin(time * 0.003) * 0.3 + Math.sin(time * 0.005) * 0.2;
      let centralSize = 60 * centralPulse;

      if (phase === 'condense') {
        centralSize = 60 * (1 + phaseProgress * 2); // Grow as others condense
      }

      const centralGradient = offCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centralSize);
      centralGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      centralGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
      centralGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)');
      centralGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      offCtx.beginPath();
      offCtx.fillStyle = centralGradient;
      offCtx.arc(centerX, centerY, centralSize, 0, Math.PI * 2);
      offCtx.fill();
    }

    offCtx.globalCompositeOperation = 'source-over';

    // Get image data for threshold processing
    const imageData = offCtx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Apply threshold and color mapping
    const threshold = 80; // Metaball merge threshold

    for (let i = 0; i < data.length; i += 4) {
      const value = data[i]; // Use red channel (grayscale)

      if (value > threshold) {
        // Normalize value above threshold (0 to 1)
        const normalizedValue = (value - threshold) / (255 - threshold);

        // Color gradient: Green edge -> Cyan mid -> White core
        let r, g, b;

        if (normalizedValue < 0.3) {
          // Edge: UNSC Green (#00FF00)
          const t = normalizedValue / 0.3;
          r = Math.floor(0 * (1 - t) + 0 * t);
          g = Math.floor(255);
          b = Math.floor(0 * (1 - t) + 50 * t);
        } else if (normalizedValue < 0.6) {
          // Mid: Halo Cyan (#00E6E6)
          const t = (normalizedValue - 0.3) / 0.3;
          r = 0;
          g = Math.floor(255 * (1 - t) + 230 * t);
          b = Math.floor(50 * (1 - t) + 230 * t);
        } else if (normalizedValue < 0.85) {
          // Approaching core: Bright cyan to white
          const t = (normalizedValue - 0.6) / 0.25;
          r = Math.floor(0 + 200 * t);
          g = Math.floor(230 + 25 * t);
          b = Math.floor(230 + 25 * t);
        } else {
          // Core: White (#FFFFFF)
          const t = (normalizedValue - 0.85) / 0.15;
          r = Math.floor(200 + 55 * t);
          g = 255;
          b = 255;
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      } else {
        // Below threshold - black
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }
    }

    // Put processed image data back
    offCtx.putImageData(imageData, 0, 0);

    // Clear main canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Apply blur for glow effect
    ctx.filter = 'blur(3px)';
    ctx.drawImage(offscreenRef.current, 0, 0);
    ctx.filter = 'none';

    // Draw sharp version on top
    ctx.globalAlpha = 0.8;
    ctx.drawImage(offscreenRef.current, 0, 0);
    ctx.globalAlpha = 1;

    // Add outer glow
    const glowRadius = phase === 'condense' ? 200 * (1 - phaseProgress) : 150 + Math.sin(time * 0.002) * 30;
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
    glowGradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)');
    glowGradient.addColorStop(0.5, 'rgba(0, 230, 230, 0.05)');
    glowGradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    // DEBUG: Force visible output
    ctx.fillStyle = 'red';
    ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);

  }, []);

  // Keep a ref to the current phase for the animation loop to access without dependencies
  const animPhaseRef = useRef(animPhase);

  useEffect(() => {
    animPhaseRef.current = animPhase;
  }, [animPhase]);

  // Main animation loop
  const startTimeRef = useRef(performance.now());
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;
    const offscreen = document.createElement('canvas');
    offscreenRef.current = offscreen;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      offscreen.width = width;
      offscreen.height = height;

      // Only initialize particles if they don't exist
      if (particlesRef.current.length === 0) {
        initializeParticles(width / 2, height / 2);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Durations
    const pulsateDuration = 3000;
    const condenseDuration = 1000;
    const startTime = startTimeRef.current;

    const animate = (currentTime) => {
      try {
        // Stop if we shouldn't be animating
        const currentPhase = animPhaseRef.current;
        if (currentPhase !== 'boot' && currentPhase !== 'waiting') {
          requestRef.current = requestAnimationFrame(animate);
          return;
        }

        const elapsed = currentTime - startTime;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

        let phase = 'pulsate';
        let phaseProgress = 0;

        if (elapsed < pulsateDuration) {
          phase = 'pulsate';
          phaseProgress = elapsed / pulsateDuration;
        } else if (elapsed < pulsateDuration + condenseDuration) {
          phase = 'condense';
          phaseProgress = (elapsed - pulsateDuration) / condenseDuration;
        } else {
          // Check ref instead of state to avoid stale closures
          if (animPhaseRef.current !== 'waiting' && animPhaseRef.current !== 'flash' && animPhaseRef.current !== 'complete') {
            console.log('XboxBootAnimation: Transitioning to WAITING phase');
            setAnimPhase('waiting');
            setTimeout(() => setShowPressStart(true), 500);
          }
          phase = 'waiting';
          phaseProgress = 0;
        }

        renderMetaballs(ctx, offCtx, width, height, centerX, centerY, elapsed, phase, phaseProgress);

        // DEBUG TEST
        if (phase === 'waiting') {
          ctx.fillStyle = 'red';
          ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
        }

      } catch (e) {
        console.error('Animation Error:', e);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [initializeParticles, renderMetaballs]); // Removed animPhase from dependency

  // Handle flash phase completion
  useEffect(() => {
    if (animPhase === 'flash') {
      const timer = setTimeout(() => {
        setAnimPhase('complete');
      }, 1000); // 1 second flash

      return () => clearTimeout(timer);
    }

    if (animPhase === 'complete' && onComplete) {
      onComplete();
    }
  }, [animPhase, onComplete]);

  console.log('XboxBootAnimation: Mounting component');
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* Canvas for boot animation - Always Rendered */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0"
        initial={{ opacity: 1 }}
      />

      {/* WHITE FLASH - Massive flash fills the screen */}
      <AnimatePresence>
        {animPhase === 'flash' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.8, 0],
              scale: [1, 1.05, 1, 1, 1]
            }}
            transition={{
              duration: 1,
              times: [0, 0.1, 0.3, 0.6, 1],
              ease: 'easeOut'
            }}
            style={{
              boxShadow: 'inset 0 0 200px 100px rgba(0, 255, 0, 0.3)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Optional: Add subtle scanlines during boot */}
      {animPhase === 'boot' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
          }}
        />
      )}

      {/* PRESS START OVERLAY */}
      <AnimatePresence>
        {animPhase === 'waiting' && showPressStart && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              stopBootAmbient();
              playBootWhoosh();
              setAnimPhase('flash');
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white font-orbitron text-center"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ textShadow: '0 0 20px rgba(0, 247, 255, 0.8)' }}
            >
              PRESS START
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default XboxBootAnimation;
