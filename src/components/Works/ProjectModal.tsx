/**
 * ProjectModal Component
 * Detail modal for viewing project information
 */
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectModalProps } from '../../types/works.types';

export function ProjectModal({
    project,
    isOpen,
    onClose,
}: ProjectModalProps): JSX.Element | null {
    if (!isOpen || !project) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-halo-gray border-2 border-halo-cyan rounded-lg p-8 max-w-2xl w-full"
                >
                    {/* Header */}
                    <h2 className="text-3xl font-bold text-halo-cyan font-halo mb-4">
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 mb-6">
                        {project.longDescription || project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-2 bg-halo-cyan/20 text-halo-cyan 
                           border border-halo-cyan/50 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-halo-cyan text-black font-bold rounded 
                           hover:bg-halo-blue transition-colors"
                            >
                                VIEW LIVE
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border-2 border-halo-cyan text-halo-cyan 
                           font-bold rounded hover:bg-halo-cyan/10 transition-colors"
                            >
                                SOURCE CODE
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-gray-500 text-gray-400 
                         font-bold rounded hover:bg-gray-500/10 transition-colors ml-auto"
                        >
                            CLOSE
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
