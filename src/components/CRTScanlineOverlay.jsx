import { motion } from 'framer-motion';

/**
 * RAMPANCY CRT SCANLINE OVERLAY
 * A standalone CRT effect component that sits on top of the entire app.
 * Includes scanlines, moving scan beam, vignette, and chromatic aberration.
 */

const CRTScanlineOverlay = ({
    intensity = 0.15,
    animate = true,
    scanSpeed = 8,
    showVignette = true,
    showAberration = true,
    color = { r: 0, g: 230, b: 230 }, // Halo cyan by default
}) => {
    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none"
            aria-hidden="true"
        >
            {/* Horizontal scanlines - static effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${intensity}) 2px,
            rgba(0, 0, 0, ${intensity}) 4px
          )`,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Vertical scanlines - subtle */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, ${intensity * 0.3}) 1px,
            rgba(0, 0, 0, ${intensity * 0.3}) 2px
          )`,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Moving horizontal scan beam */}
            {animate && (
                <motion.div
                    className="absolute left-0 right-0 h-[4px]"
                    style={{
                        background: `linear-gradient(
              90deg,
              transparent,
              rgba(${color.r}, ${color.g}, ${color.b}, 0.08) 10%,
              rgba(${color.r}, ${color.g}, ${color.b}, 0.15) 50%,
              rgba(${color.r}, ${color.g}, ${color.b}, 0.08) 90%,
              transparent
            )`,
                        boxShadow: `0 0 20px rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`,
                    }}
                    animate={{
                        top: ['-2%', '102%'],
                    }}
                    transition={{
                        duration: scanSpeed,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            )}

            {/* Secondary faster scan line */}
            {animate && (
                <motion.div
                    className="absolute left-0 right-0 h-[1px] opacity-50"
                    style={{
                        background: `linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1) 20%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.1) 80%,
              transparent
            )`,
                    }}
                    animate={{
                        top: ['100%', '0%'],
                    }}
                    transition={{
                        duration: scanSpeed * 0.7,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            )}

            {/* Vignette effect - darkens edges */}
            {showVignette && (
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.3) 80%,
              rgba(0, 0, 0, 0.6) 100%
            )`,
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* RGB chromatic aberration flicker */}
            {showAberration && animate && (
                <>
                    {/* Red channel offset */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, rgba(255,0,0,0.03) 0%, transparent 5%, transparent 95%, rgba(255,0,0,0.03) 100%)',
                            mixBlendMode: 'screen',
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
                            x: [0, 1, 0, -1, 0],
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatType: 'mirror',
                        }}
                    />

                    {/* Blue channel offset */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, rgba(0,0,255,0.03) 0%, transparent 5%, transparent 95%, rgba(0,0,255,0.03) 100%)',
                            mixBlendMode: 'screen',
                        }}
                        animate={{
                            opacity: [0.3, 0.5, 0.3, 0.6, 0.3],
                            x: [0, -1, 0, 1, 0],
                        }}
                        transition={{
                            duration: 0.25,
                            repeat: Infinity,
                            repeatType: 'mirror',
                        }}
                    />
                </>
            )}

            {/* Subtle screen flicker */}
            {animate && (
                <motion.div
                    className="absolute inset-0 bg-white"
                    style={{ mixBlendMode: 'overlay' }}
                    animate={{
                        opacity: [0, 0, 0.01, 0, 0, 0.02, 0, 0, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                    }}
                />
            )}

            {/* Corner glow accents */}
            <div
                className="absolute top-0 left-0 w-32 h-32"
                style={{
                    background: `radial-gradient(
            ellipse at top left,
            rgba(${color.r}, ${color.g}, ${color.b}, 0.05) 0%,
            transparent 70%
          )`,
                }}
            />
            <div
                className="absolute top-0 right-0 w-32 h-32"
                style={{
                    background: `radial-gradient(
            ellipse at top right,
            rgba(${color.r}, ${color.g}, ${color.b}, 0.05) 0%,
            transparent 70%
          )`,
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-32 h-32"
                style={{
                    background: `radial-gradient(
            ellipse at bottom left,
            rgba(${color.r}, ${color.g}, ${color.b}, 0.05) 0%,
            transparent 70%
          )`,
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-32 h-32"
                style={{
                    background: `radial-gradient(
            ellipse at bottom right,
            rgba(${color.r}, ${color.g}, ${color.b}, 0.05) 0%,
            transparent 70%
          )`,
                }}
            />
        </div>
    );
};

export default CRTScanlineOverlay;
