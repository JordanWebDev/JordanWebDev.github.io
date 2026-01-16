/**
 * Boot Sequence Type Definitions
 * Handles state transitions from boot animation to main application
 */

/**
 * Enumeration of all possible boot phases
 */
export enum BootPhase {
    /** Initial app load */
    INITIALIZING = 'INITIALIZING',
    /** Xbox-style boot animation playing */
    BOOT_ANIMATION = 'BOOT_ANIMATION',
    /** "Press Start" prompt displayed */
    PRESS_START = 'PRESS_START',
    /** Transition animation to main menu */
    TRANSITIONING = 'TRANSITIONING',
    /** Main application is visible */
    MAIN_MENU = 'MAIN_MENU',
}

/**
 * Boot sequence state shape
 */
export interface BootSequenceState {
    readonly phase: BootPhase;
    readonly isComplete: boolean;
    readonly animationProgress: number;
    readonly hasInteracted: boolean;
}

/**
 * Action types for boot state transitions
 */
export type BootSequenceAction =
    | { type: 'START_BOOT_ANIMATION' }
    | { type: 'SHOW_PRESS_START' }
    | { type: 'USER_PRESSED_START' }
    | { type: 'BEGIN_TRANSITION' }
    | { type: 'COMPLETE_BOOT' }
    | { type: 'UPDATE_PROGRESS'; payload: number }
    | { type: 'SKIP_BOOT' };
