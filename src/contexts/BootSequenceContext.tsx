/**
 * Boot Sequence Context
 * Manages state transitions from boot animation to main application
 */
import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    type ReactNode,
    type Dispatch,
} from 'react';
import { BootPhase, type BootSequenceState, type BootSequenceAction } from '../types/boot.types';

// ============================================
// CONTEXT VALUE TYPE
// ============================================

export interface BootSequenceContextValue {
    readonly state: BootSequenceState;
    readonly dispatch: Dispatch<BootSequenceAction>;
    readonly startBootAnimation: () => void;
    readonly showPressStart: () => void;
    readonly onUserStart: () => void;
    readonly completeBoot: () => void;
    readonly skipBoot: () => void;
}

// ============================================
// INITIAL STATE & REDUCER
// ============================================

const initialState: BootSequenceState = {
    phase: BootPhase.INITIALIZING,
    isComplete: false,
    animationProgress: 0,
    hasInteracted: false,
};

function bootSequenceReducer(
    state: BootSequenceState,
    action: BootSequenceAction
): BootSequenceState {
    switch (action.type) {
        case 'START_BOOT_ANIMATION':
            return {
                ...state,
                phase: BootPhase.BOOT_ANIMATION,
                animationProgress: 0,
            };

        case 'SHOW_PRESS_START':
            return {
                ...state,
                phase: BootPhase.PRESS_START,
                animationProgress: 100,
            };

        case 'USER_PRESSED_START':
            return {
                ...state,
                phase: BootPhase.TRANSITIONING,
                hasInteracted: true,
            };

        case 'BEGIN_TRANSITION':
            return {
                ...state,
                phase: BootPhase.TRANSITIONING,
            };

        case 'COMPLETE_BOOT':
            return {
                ...state,
                phase: BootPhase.MAIN_MENU,
                isComplete: true,
            };

        case 'UPDATE_PROGRESS':
            return {
                ...state,
                animationProgress: Math.min(100, Math.max(0, action.payload)),
            };

        case 'SKIP_BOOT':
            return {
                ...state,
                phase: BootPhase.MAIN_MENU,
                isComplete: true,
                hasInteracted: true,
                animationProgress: 100,
            };

        default:
            return state;
    }
}

// ============================================
// CONTEXT & PROVIDER
// ============================================

const BootSequenceContext = createContext<BootSequenceContextValue | null>(null);

export interface BootSequenceProviderProps {
    readonly children: ReactNode;
    readonly skipBootOnRevisit?: boolean;
}

export function BootSequenceProvider({
    children,
    skipBootOnRevisit = false,
}: BootSequenceProviderProps): JSX.Element {
    // Check if user has already seen boot this session
    const shouldSkip =
        skipBootOnRevisit &&
        typeof window !== 'undefined' &&
        sessionStorage.getItem('halo-boot-seen') === 'true';

    const [state, dispatch] = useReducer(
        bootSequenceReducer,
        shouldSkip
            ? { ...initialState, phase: BootPhase.MAIN_MENU, isComplete: true }
            : initialState
    );

    // Convenience action dispatchers
    const startBootAnimation = useCallback(() => {
        dispatch({ type: 'START_BOOT_ANIMATION' });
    }, []);

    const showPressStart = useCallback(() => {
        dispatch({ type: 'SHOW_PRESS_START' });
    }, []);

    const onUserStart = useCallback(() => {
        dispatch({ type: 'USER_PRESSED_START' });
    }, []);

    const completeBoot = useCallback(() => {
        dispatch({ type: 'COMPLETE_BOOT' });
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('halo-boot-seen', 'true');
        }
    }, []);

    const skipBoot = useCallback(() => {
        dispatch({ type: 'SKIP_BOOT' });
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('halo-boot-seen', 'true');
        }
    }, []);

    const value: BootSequenceContextValue = useMemo(() => ({
        state,
        dispatch,
        startBootAnimation,
        showPressStart,
        onUserStart,
        completeBoot,
        skipBoot,
    }), [state, startBootAnimation, showPressStart, onUserStart, completeBoot, skipBoot]);

    return (
        <BootSequenceContext.Provider value={value}>
            {children}
        </BootSequenceContext.Provider>
    );
}

// ============================================
// CUSTOM HOOKS
// ============================================

/**
 * Hook to access boot sequence state and actions
 * @throws Error if used outside BootSequenceProvider
 */
export function useBootSequence(): BootSequenceContextValue {
    const context = useContext(BootSequenceContext);

    if (!context) {
        throw new Error(
            'useBootSequence must be used within a BootSequenceProvider. ' +
            'Wrap your app in <BootSequenceProvider>.'
        );
    }

    return context;
}

/**
 * Selector hook for just the current phase
 */
export function useBootPhase(): BootPhase {
    const { state } = useBootSequence();
    return state.phase;
}

/**
 * Selector hook to check if boot is complete
 */
export function useIsBootComplete(): boolean {
    const { state } = useBootSequence();
    return state.isComplete;
}
