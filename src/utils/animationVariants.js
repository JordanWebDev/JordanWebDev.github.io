/**
 * RAMPANCY ANIMATION LIBRARY
 * Framer Motion variants and utilities for Halo Infinite-style animations.
 * Includes high-velocity easing, overshoot effects, and jitter animations.
 */

// ============================================================================
// EASING CURVES - Custom cubic-bezier for Halo Infinite feel
// ============================================================================
export const easings = {
    // High velocity entry with slight overshoot
    spartanEntry: [0.16, 1.3, 0.3, 1],

    // Smooth but snappy exit
    spartanExit: [0.4, 0, 0.2, 1],

    // Elastic bounce for emphasis
    elasticOut: [0.34, 1.56, 0.64, 1],

    // Sharp mechanical feel
    mechanical: [0.77, 0, 0.175, 1],

    // Anticipation before action
    anticipate: [0.68, -0.55, 0.265, 1.55],
};

// ============================================================================
// MENU ITEM VARIANTS - High-velocity slide with overshoot/jitter
// ============================================================================
export const menuItemVariants = {
    hidden: {
        opacity: 0,
        x: -120,
        y: 0,
        scale: 0.9,
        filter: 'blur(4px)',
        skewX: -3,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        skewX: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 12,
            mass: 0.8,
            velocity: 50,
            delay: delay * 0.08,
            restDelta: 0.001,
        },
    }),
    exit: {
        opacity: 0,
        x: 60,
        scale: 0.95,
        filter: 'blur(3px)',
        transition: {
            duration: 0.2,
            ease: easings.spartanExit,
        },
    },
    hover: {
        x: [0, -2, 4, -2, 3, 0],
        transition: {
            duration: 0.35,
            ease: 'linear',
        },
    },
    tap: {
        scale: 0.97,
        x: 0,
    },
};

// Alternative: Right-side entry variant
export const menuItemRightVariants = {
    hidden: {
        opacity: 0,
        x: 120,
        scale: 0.9,
        filter: 'blur(4px)',
        skewX: 3,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        skewX: 0,
        transition: {
            type: 'spring',
            stiffness: 380,
            damping: 14,
            mass: 0.9,
            delay: delay * 0.08,
        },
    }),
    exit: {
        opacity: 0,
        x: -60,
        scale: 0.95,
        filter: 'blur(3px)',
        transition: {
            duration: 0.2,
            ease: easings.spartanExit,
        },
    },
};

// Vertical variant (bottom-up entry)
export const menuItemUpVariants = {
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.9,
        filter: 'blur(4px)',
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 350,
            damping: 15,
            delay: delay * 0.1,
        },
    }),
    exit: {
        opacity: 0,
        y: -40,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: easings.spartanExit,
        },
    },
};

// ============================================================================
// CONTAINER VARIANTS - Staggered children animation
// ============================================================================
export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
            when: 'beforeChildren',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: 'afterChildren',
        },
    },
};

// Fast stagger for lists
export const fastStaggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

// ============================================================================
// PAGE TRANSITION VARIANTS - Full page animations
// ============================================================================
export const pageVariants = {
    initial: {
        opacity: 0,
        x: -30,
        filter: 'blur(8px)',
    },
    enter: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: easings.spartanEntry,
        },
    },
    exit: {
        opacity: 0,
        x: 30,
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
            ease: easings.spartanExit,
        },
    },
};

// Fade with scale - good for modals/overlays
export const fadeScaleVariants = {
    initial: {
        opacity: 0,
        scale: 0.95,
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: easings.elasticOut,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

// ============================================================================
// GLITCH / JITTER VARIANTS - Digital corruption effects
// ============================================================================
export const glitchVariants = {
    idle: {
        x: 0,
        skewX: 0,
        filter: 'none',
    },
    glitch: {
        x: [0, -3, 5, -2, 3, 0],
        skewX: [0, 2, -2, 1, -1, 0],
        filter: [
            'none',
            'hue-rotate(90deg)',
            'none',
            'hue-rotate(-45deg)',
            'none',
        ],
        transition: {
            duration: 0.3,
            ease: 'linear',
        },
    },
};

// Subtle text jitter (for hover states)
export const textJitterVariants = {
    idle: { x: 0 },
    jitter: {
        x: [0, -1, 2, -1, 1, 0],
        transition: {
            duration: 0.25,
            ease: 'linear',
        },
    },
};

// Heavy corruption effect
export const corruptionVariants = {
    normal: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'none',
    },
    corrupt: {
        opacity: [1, 0.5, 1, 0.7, 1],
        x: [0, -5, 8, -3, 0],
        y: [0, 2, -2, 1, 0],
        scale: [1, 1.02, 0.98, 1.01, 1],
        filter: [
            'none',
            'brightness(2) contrast(1.5)',
            'invert(0.2)',
            'hue-rotate(20deg)',
            'none',
        ],
        transition: {
            duration: 0.4,
            ease: 'linear',
        },
    },
};

// ============================================================================
// UI ELEMENT VARIANTS - Buttons, cards, etc.
// ============================================================================
export const buttonVariants = {
    idle: {
        scale: 1,
        boxShadow: '0 0 0 0 rgba(0, 230, 230, 0)',
    },
    hover: {
        scale: 1.03,
        boxShadow: '0 0 20px 0 rgba(0, 230, 230, 0.4)',
        transition: {
            duration: 0.2,
            ease: easings.elasticOut,
        },
    },
    tap: {
        scale: 0.97,
        boxShadow: '0 0 10px 0 rgba(0, 230, 230, 0.6)',
        transition: {
            duration: 0.1,
        },
    },
};

export const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: delay * 0.1,
        },
    }),
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
        },
    },
};

// ============================================================================
// REVEAL VARIANTS - For scroll-triggered animations
// ============================================================================
export const revealVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
        },
    },
};

export const revealLeftVariants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
        },
    },
};

export const revealRightVariants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
        },
    },
};

// ============================================================================
// CYBER TYPING EFFECT - Character-by-character reveal
// ============================================================================
export const typingContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
        },
    },
};

export const typingCharacterVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
        },
    },
};

// ============================================================================
// LOADING / SPINNER VARIANTS
// ============================================================================
export const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

export const spinVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

export const hexagonLoadingVariants = {
    animate: {
        rotate: [0, 60, 120, 180, 240, 300, 360],
        scale: [1, 1.1, 1, 1.1, 1, 1.1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom delay function for staggered children
 * @param {number} index - Child index
 * @param {number} baseDelay - Base delay in seconds
 * @returns {number} Calculated delay
 */
export const staggerDelay = (index, baseDelay = 0.08) => index * baseDelay;

/**
 * Generate random jitter values for glitch effects
 * @param {number} intensity - Jitter intensity multiplier
 * @returns {number[]} Array of jitter values
 */
export const generateJitter = (intensity = 3) => {
    const values = [0];
    for (let i = 0; i < 5; i++) {
        values.push((Math.random() - 0.5) * intensity * 2);
    }
    values.push(0);
    return values;
};

// Default export for convenient importing
export default {
    easings,
    menuItemVariants,
    menuItemRightVariants,
    menuItemUpVariants,
    staggerContainerVariants,
    fastStaggerContainerVariants,
    pageVariants,
    fadeScaleVariants,
    glitchVariants,
    textJitterVariants,
    corruptionVariants,
    buttonVariants,
    cardVariants,
    revealVariants,
    revealLeftVariants,
    revealRightVariants,
    typingContainerVariants,
    typingCharacterVariants,
    pulseVariants,
    spinVariants,
    hexagonLoadingVariants,
    staggerDelay,
    generateJitter,
};
