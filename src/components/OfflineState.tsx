/**
 * OfflineState Component
 * Halo-themed "Connection Lost" error UI
 * 
 * Used when API calls fail to provide a graceful degradation experience
 */

import { motion } from 'framer-motion';

// ============================================
// TYPES
// ============================================

export interface OfflineStateProps {
    /** Error message to display */
    readonly message?: string;
    /** Callback for retry button */
    readonly onRetry?: () => void;
    /** Whether to show retry button */
    readonly showRetry?: boolean;
    /** Additional CSS classes */
    readonly className?: string;
    /** Whether this is a network error (shows different messaging) */
    readonly isNetworkError?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export default function OfflineState({
    message = 'Unable to establish connection',
    onRetry,
    showRetry = true,
    className = '',
    isNetworkError = true,
}: OfflineStateProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`
                relative
                bg-halo-gray/80
                backdrop-blur-md
                border-2
                border-red-500/50
                rounded-sm
                p-8
                text-center
                overflow-hidden
                ${className}
            `}
        >
            {/* Scanline overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 0, 0, 0.1) 2px,
                        rgba(255, 0, 0, 0.1) 4px
                    )`,
                }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" />

            {/* Warning icon */}
            <motion.div
                animate={{
                    opacity: [1, 0.5, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="mb-4"
            >
                <svg
                    className="w-16 h-16 mx-auto text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </motion.div>

            {/* Glitching title */}
            <motion.h3
                animate={{
                    x: [0, -2, 2, -1, 1, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                className="text-2xl font-halo font-bold text-red-500 mb-2 tracking-wider"
            >
                {isNetworkError ? 'CONNECTION LOST' : 'ERROR'}
            </motion.h3>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full bg-red-500"
                />
                <span className="text-sm text-gray-400 font-mono uppercase tracking-widest">
                    OFFLINE MODE
                </span>
            </div>

            {/* Error message */}
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                {message}
            </p>

            {/* Retry button */}
            {showRetry && onRetry && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRetry}
                    className="
                        relative
                        px-8 py-3
                        font-halo font-bold
                        text-halo-cyan
                        uppercase
                        tracking-wider
                        border-2 border-halo-cyan/50
                        bg-halo-cyan/10
                        hover:bg-halo-cyan/20
                        hover:border-halo-cyan
                        transition-all duration-300
                    "
                    style={{
                        clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                    }}
                >
                    <span className="relative z-10">RETRY CONNECTION</span>
                </motion.button>
            )}

            {/* Fallback notice */}
            <p className="text-xs text-gray-500 mt-6 font-mono">
                Displaying cached intel...
            </p>
        </motion.div>
    );
}
