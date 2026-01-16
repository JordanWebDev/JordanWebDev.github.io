/**
 * MasonryGrid Component
 * Container for the masonry-style project grid layout
 */
import { motion } from 'framer-motion';
import type { MasonryGridProps, ProjectData } from '../../types/works.types';
import { ProjectCard } from './ProjectCard';

/**
 * Animation variants for staggered grid appearance
 */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

/**
 * Get Tailwind row-span class based on project height
 */
function getHeightClass(height: ProjectData['height']): string {
    switch (height) {
        case 'tall':
            return 'row-span-2';
        case 'medium':
            return 'row-span-1';
        case 'short':
            return 'row-span-1';
        default:
            return 'row-span-1';
    }
}

export function MasonryGrid({
    projects,
    onProjectSelect,
    className = '',
}: MasonryGridProps): JSX.Element {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] ${className}`}
        >
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className={getHeightClass(project.height)}
                >
                    <ProjectCard
                        project={project}
                        onClick={() => onProjectSelect(project)}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
