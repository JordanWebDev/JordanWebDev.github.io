import { useCallback, useRef, useEffect } from 'react';
import { audioManager, playHoverSound, playSelectSound, playBackSound } from './audioManager';

/**
 * XBOX UI SOUNDS HOOK
 * 
 * React hook for adding Xbox Dashboard-style sounds to UI elements.
 * Returns event handlers to attach to components.
 */

/**
 * Hook for adding hover and click sounds to menu items
 * 
 * @param {Object} options
 * @param {boolean} options.hoverSound - Play sound on hover (default: true)
 * @param {boolean} options.clickSound - Play sound on click (default: true)
 * @param {Function} options.onClick - Additional click handler
 * @returns {Object} Event handlers to spread onto elements
 * 
 * @example
 * const soundHandlers = useMenuSound();
 * <button {...soundHandlers} onClick={() => navigate('/works')}>WORKS</button>
 */
export function useMenuSound(options = {}) {
    const {
        hoverSound = true,
        clickSound = true,
        onClick,
    } = options;

    const lastHoverTime = useRef(0);
    const hoverCooldown = 50; // Prevent rapid hover sound spam

    // Initialize audio on first user interaction
    const initAudio = useCallback(async () => {
        if (!audioManager.initialized) {
            await audioManager.init();
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        const now = Date.now();
        if (hoverSound && now - lastHoverTime.current > hoverCooldown) {
            lastHoverTime.current = now;
            playHoverSound();
        }
    }, [hoverSound]);

    const handleClick = useCallback((e) => {
        initAudio();
        if (clickSound) {
            playSelectSound();
        }
        onClick?.(e);
    }, [clickSound, onClick, initAudio]);

    const handleFocus = useCallback(() => {
        // Play hover sound on keyboard focus too
        const now = Date.now();
        if (hoverSound && now - lastHoverTime.current > hoverCooldown) {
            lastHoverTime.current = now;
            playHoverSound();
        }
    }, [hoverSound]);

    return {
        onMouseEnter: handleMouseEnter,
        onClick: handleClick,
        onFocus: handleFocus,
    };
}

/**
 * Hook for back/cancel button sounds
 */
export function useBackSound(onClick) {
    return useCallback((e) => {
        playBackSound();
        onClick?.(e);
    }, [onClick]);
}

/**
 * Hook to initialize audio system on first user interaction
 * Place this at the app root level
 */
export function useAudioInit() {
    useEffect(() => {
        const handleFirstInteraction = async () => {
            await audioManager.init();
            // Remove listeners after init
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('keydown', handleFirstInteraction, { once: true });
        document.addEventListener('touchstart', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);
}

/**
 * Higher-order component to add Xbox sounds to any component
 */
export function withMenuSound(WrappedComponent) {
    return function WithMenuSound(props) {
        const soundHandlers = useMenuSound({
            onClick: props.onClick,
        });

        return <WrappedComponent {...props} {...soundHandlers} />;
    };
}

export default useMenuSound;
