/**
 * Experience Timeline Type Definitions
 * For the vertical timeline component showing professional history
 */

/**
 * Single achievement/accomplishment entry
 */
export interface Achievement {
    readonly id: string;
    readonly description: string;
}

/**
 * Experience/job entry in the timeline
 */
export interface ExperienceItem {
    readonly id: number;
    readonly year: string;
    readonly title: string;
    readonly company: string;
    readonly description: string;
    readonly achievements: readonly string[];
}

/**
 * Props for the timeline container
 */
export interface TimelineProps {
    readonly experiences: readonly ExperienceItem[];
    readonly className?: string;
}

/**
 * Props for individual timeline entry
 */
export interface TimelineEntryProps {
    readonly experience: ExperienceItem;
    readonly index: number;
    readonly isVisible: boolean;
}

/**
 * Visibility state for intersection observer
 */
export interface TimelineVisibilityState {
    readonly visibleIds: Set<number>;
}
