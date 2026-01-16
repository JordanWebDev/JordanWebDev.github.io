/**
 * ProjectCard Component
 * Individual project card for the masonry grid
 */
import { motion } from 'framer-motion';
import type { ProjectCardProps } from '../../types/works.types';

export function ProjectCard({ project, onClick }: ProjectCardProps): JSX.Element {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={onClick}
            className="h-full relative overflow-hidden rounded-lg cursor-pointer
                 bg-halo-gray border-2 border-halo-cyan/30 hover:border-halo-cyan 
                 transition-all duration-300"
            style={{
                boxShadow: '0 4px 20px rgba(0, 230, 230, 0.1)',
            }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${project.imageUrl})`,
                    filter: 'brightness(0.7)',
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-halo-dark via-halo-dark/70 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-halo-cyan font-halo mb-2">
                    {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs bg-halo-cyan/20 text-halo-cyan 
                         border border-halo-cyan/50 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
