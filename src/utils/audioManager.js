/**
 * XBOX AUDIO SYSTEM
 * 
 * Audio manager for Halo 3/Xbox-style sounds.
 * Handles boot animation audio, menu navigation sounds, and UI feedback.
 * 
 * AUDIO FILES REQUIRED (place in /public/audio/):
 * - boot-ambient.mp3      : Halo 3 loading screen ambient (atmospheric drone)
 * - boot-whoosh.mp3       : Boot animation transition whoosh
 * - menu-hover.mp3        : Menu item hover blip
 * - menu-select.mp3       : Menu item selection confirm
 * - menu-back.mp3         : Back/cancel sound
 * - ui-blip.mp3           : General UI interaction blip
 */

class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.enabled = true;
        this.masterVolume = 0.7;
        this.initialized = false;
        this.audioContext = null;

        // Sound definitions with default volumes
        this.soundDefs = {
            // Boot animation sounds
            'boot-ambient': { src: '/audio/boot-ambient.mp3', volume: 0.5, loop: true },
            'boot-whoosh': { src: '/audio/boot-whoosh.mp3', volume: 0.8, loop: false },

            // Menu navigation sounds (Xbox Dashboard style)
            'menu-hover': { src: '/audio/menu-hover.mp3', volume: 0.4, loop: false },
            'menu-select': { src: '/audio/menu-select.mp3', volume: 0.6, loop: false },
            'menu-back': { src: '/audio/menu-back.mp3', volume: 0.5, loop: false },

            // General UI sounds
            'ui-blip': { src: '/audio/ui-blip.mp3', volume: 0.3, loop: false },
            'ui-error': { src: '/audio/ui-error.mp3', volume: 0.5, loop: false },
            'ui-success': { src: '/audio/ui-success.mp3', volume: 0.5, loop: false },
        };
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    async init() {
        if (this.initialized) return;

        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Preload priority sounds
            await Promise.all([
                this.preload('menu-hover'),
                this.preload('menu-select'),
                this.preload('boot-ambient'),
            ]);

            this.initialized = true;
            console.log('[AudioManager] Initialized successfully');
        } catch (error) {
            console.warn('[AudioManager] Failed to initialize:', error);
        }
    }

    /**
     * Preload a sound for instant playback
     */
    async preload(soundName) {
        const def = this.soundDefs[soundName];
        if (!def) {
            console.warn(`[AudioManager] Unknown sound: ${soundName}`);
            return null;
        }

        try {
            // Check if already loaded
            if (this.sounds.has(soundName)) {
                return this.sounds.get(soundName);
            }

            const audio = new Audio();
            audio.src = def.src;
            audio.volume = def.volume * this.masterVolume;
            audio.loop = def.loop;
            audio.preload = 'auto';

            // Wait for audio to be ready
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', resolve, { once: true });
                audio.addEventListener('error', reject, { once: true });
                audio.load();
            });

            this.sounds.set(soundName, audio);
            return audio;
        } catch (error) {
            console.warn(`[AudioManager] Failed to preload ${soundName}:`, error);
            return null;
        }
    }

    /**
     * Play a sound by name
     */
    async play(soundName, options = {}) {
        if (!this.enabled) return null;

        const def = this.soundDefs[soundName];
        if (!def) {
            console.warn(`[AudioManager] Unknown sound: ${soundName}`);
            return null;
        }

        try {
            // Ensure audio context is running
            if (this.audioContext?.state === 'suspended') {
                await this.audioContext.resume();
            }

            let audio = this.sounds.get(soundName);

            // Preload if not cached
            if (!audio) {
                audio = await this.preload(soundName);
                if (!audio) return null;
            }

            // For non-looping sounds, create a new instance to allow overlapping
            if (!def.loop) {
                const instance = audio.cloneNode();
                instance.volume = (options.volume ?? def.volume) * this.masterVolume;
                instance.playbackRate = options.playbackRate ?? 1;

                // Add slight randomization for more organic feel
                if (options.randomize) {
                    instance.playbackRate *= 0.95 + Math.random() * 0.1;
                    instance.volume *= 0.9 + Math.random() * 0.2;
                }

                await instance.play();
                return instance;
            } else {
                // Looping sounds reuse the same instance
                audio.currentTime = 0;
                audio.volume = (options.volume ?? def.volume) * this.masterVolume;
                await audio.play();
                return audio;
            }
        } catch (error) {
            // Silently fail - audio might not be allowed yet
            console.debug(`[AudioManager] Could not play ${soundName}:`, error.message);
            return null;
        }
    }

    /**
     * Stop a looping sound
     */
    stop(soundName) {
        const audio = this.sounds.get(soundName);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    /**
     * Fade out a sound
     */
    fadeOut(soundName, duration = 500) {
        const audio = this.sounds.get(soundName);
        if (!audio) return;

        const startVolume = audio.volume;
        const startTime = Date.now();

        const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            audio.volume = startVolume * (1 - progress);

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = startVolume;
            }
        };

        fade();
    }

    /**
     * Set master volume (0-1)
     */
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));

        // Update all active sounds
        this.sounds.forEach((audio, name) => {
            const def = this.soundDefs[name];
            if (def) {
                audio.volume = def.volume * this.masterVolume;
            }
        });
    }

    /**
     * Enable/disable all audio
     */
    setEnabled(enabled) {
        this.enabled = enabled;

        if (!enabled) {
            // Stop all sounds
            this.sounds.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }

    /**
     * Check if audio is available
     */
    isAvailable() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }
}

// Singleton instance
export const audioManager = new AudioManager();

// Convenience functions for common sounds
export const playHoverSound = () => audioManager.play('menu-hover', { randomize: true });
export const playSelectSound = () => audioManager.play('menu-select');
export const playBackSound = () => audioManager.play('menu-back');
export const playBlipSound = () => audioManager.play('ui-blip', { randomize: true });

// Boot animation audio
export const playBootAmbient = () => audioManager.play('boot-ambient');
export const stopBootAmbient = () => audioManager.fadeOut('boot-ambient', 800);
export const playBootWhoosh = () => audioManager.play('boot-whoosh');

export default audioManager;
