/**
 * Works/Projects Type Definitions
 * For the masonry grid portfolio display
 */

/**
 * Height variants for masonry layout
 */
export type ProjectHeight = 'tall' | 'medium' | 'short';

/**
 * Project category tags
 */
export type ProjectCategory =
    | 'web'
    | 'mobile'
    | 'game'
    | 'ai'
    | 'backend'
    | 'fullstack';

/**
 * Core project data structure
 */
export interface ProjectData {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly longDescription?: string;
    readonly imageUrl: string;
    readonly technologies: readonly string[];
    readonly height: ProjectHeight;
    readonly category?: ProjectCategory;
    readonly liveUrl?: string;
    readonly repoUrl?: string;
    readonly featured?: boolean;
}

/**
 * Props for the masonry grid container
 */
export interface MasonryGridProps {
    readonly projects: readonly ProjectData[];
    readonly onProjectSelect: (project: ProjectData) => void;
    readonly className?: string;
}

/**
 * Props for individual project card
 */
export interface ProjectCardProps {
    readonly project: ProjectData;
    readonly onClick: () => void;
}

/**
 * Props for project detail modal
 */
export interface ProjectModalProps {
    readonly project: ProjectData | null;
    readonly isOpen: boolean;
    readonly onClose: () => void;
}
