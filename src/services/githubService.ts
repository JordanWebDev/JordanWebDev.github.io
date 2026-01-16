/**
 * GitHub Service
 * Fetches and transforms GitHub pinned repositories into project cards
 * 
 * Uses GitHub's REST API to fetch user's public repositories.
 * For pinned repos specifically, we use the GraphQL API.
 */

import { apiFetch, NetworkError } from './api';
import type { GitHubRepository, GitHubProject, GitHubPinnedRepo } from '../types/api.types';

// ============================================
// CONFIGURATION
// ============================================

const GITHUB_CONFIG = {
    username: import.meta.env.VITE_GITHUB_USERNAME || 'JordanWebDev',
    apiBaseUrl: 'https://api.github.com',
    graphqlUrl: 'https://api.github.com/graphql',
} as const;

// ============================================
// LANGUAGE COLOR MAP
// ============================================

const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Rust: '#dea584',
    Go: '#00ADD8',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Vue: '#41b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
};

// ============================================
// TRANSFORMERS
// ============================================

/**
 * Transform GitHub REST API repository to project
 */
function transformRepoToProject(repo: GitHubRepository): GitHubProject {
    // Combine language and topics for technologies
    const technologies: string[] = [];

    if (repo.language) {
        technologies.push(repo.language);
    }

    // Add topics as tech tags
    repo.topics?.forEach(topic => {
        const formattedTopic = topic
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        if (!technologies.includes(formattedTopic)) {
            technologies.push(formattedTopic);
        }
    });

    // Generate a placeholder image based on language color
    const langColor = LANGUAGE_COLORS[repo.language || ''] || '#00E6E6';
    const encodedColor = encodeURIComponent(langColor);
    const imageUrl = `https://via.placeholder.com/400x250/${encodedColor.slice(1)}/FFFFFF?text=${encodeURIComponent(repo.name)}`;

    return {
        id: String(repo.id),
        title: formatRepoName(repo.name),
        description: repo.description || 'No description available',
        technologies: technologies.slice(0, 5), // Max 5 tech tags
        liveUrl: repo.homepage || undefined,
        repoUrl: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        imageUrl,
        primaryLanguage: repo.language || undefined,
    };
}

/**
 * Transform GitHub GraphQL pinned repo to project
 */
function transformPinnedRepoToProject(repo: GitHubPinnedRepo): GitHubProject {
    const technologies: string[] = [];

    if (repo.primaryLanguage?.name) {
        technologies.push(repo.primaryLanguage.name);
    }

    repo.repositoryTopics?.nodes?.forEach(node => {
        const formattedTopic = node.topic.name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        if (!technologies.includes(formattedTopic)) {
            technologies.push(formattedTopic);
        }
    });

    return {
        id: repo.id,
        title: formatRepoName(repo.name),
        description: repo.description || 'No description available',
        technologies: technologies.slice(0, 5),
        liveUrl: repo.homepageUrl || undefined,
        repoUrl: repo.url,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        imageUrl: repo.openGraphImageUrl || `https://opengraph.githubassets.com/1/${GITHUB_CONFIG.username}/${repo.name}`,
        primaryLanguage: repo.primaryLanguage?.name,
    };
}

/**
 * Format repository name to readable title
 * e.g., "my-awesome-project" -> "My Awesome Project"
 */
function formatRepoName(name: string): string {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

// ============================================
// PUBLIC API
// ============================================

export interface FetchProjectsOptions {
    limit?: number;
    includeForks?: boolean;
}

export interface ProjectsResult {
    projects: readonly GitHubProject[];
    error: string | null;
    isOffline: boolean;
}

/**
 * Fetch pinned repositories using GraphQL API
 * Falls back to REST API if GraphQL fails
 */
export async function fetchPinnedProjects(): Promise<ProjectsResult> {
    const query = `
        query {
            user(login: "${GITHUB_CONFIG.username}") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            id
                            name
                            description
                            url
                            homepageUrl
                            stargazerCount
                            forkCount
                            primaryLanguage {
                                name
                                color
                            }
                            repositoryTopics(first: 5) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                            openGraphImageUrl
                        }
                    }
                }
            }
        }
    `;

    try {
        // GraphQL API requires authentication for some queries
        // If no token, fall back to REST API
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        if (token) {
            const response = await apiFetch<{
                data: {
                    user: {
                        pinnedItems: {
                            nodes: GitHubPinnedRepo[];
                        };
                    };
                };
            }>(GITHUB_CONFIG.graphqlUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            });

            const pinnedRepos = response.data.user.pinnedItems.nodes;
            const projects = pinnedRepos.map(transformPinnedRepoToProject);

            return {
                projects,
                error: null,
                isOffline: false,
            };
        }

        // Fall back to REST API (gets all public repos, sorted by stars)
        return fetchPublicProjects({ limit: 6 });
    } catch (error) {
        console.warn('GraphQL API failed, falling back to REST API:', error);
        return fetchPublicProjects({ limit: 6 });
    }
}

/**
 * Fetch public repositories using REST API
 * Sorted by most recently updated
 */
export async function fetchPublicProjects(
    options: FetchProjectsOptions = {}
): Promise<ProjectsResult> {
    const { limit = 6, includeForks = false } = options;

    try {
        const url = `${GITHUB_CONFIG.apiBaseUrl}/users/${GITHUB_CONFIG.username}/repos?sort=updated&per_page=30`;

        const repos = await apiFetch<GitHubRepository[]>(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        // Filter and sort
        let filteredRepos = repos
            .filter(repo => includeForks || !repo.fork)
            .filter(repo => !repo.name.includes('.github.io')) // Exclude profile repo
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Limit results
        filteredRepos = filteredRepos.slice(0, limit);

        const projects = filteredRepos.map(transformRepoToProject);

        return {
            projects,
            error: null,
            isOffline: false,
        };
    } catch (error) {
        const isNetworkError = error instanceof NetworkError;

        console.error('Failed to fetch GitHub projects:', error);

        return {
            projects: getFallbackProjects(),
            error: error instanceof Error ? error.message : 'Unknown error',
            isOffline: isNetworkError,
        };
    }
}

// ============================================
// FALLBACK DATA
// ============================================

function getFallbackProjects(): readonly GitHubProject[] {
    return [
        {
            id: 'fallback-1',
            title: 'Project Spartan',
            description: 'A cutting-edge web application built with React and Node.js',
            technologies: ['React', 'Node.js', 'MongoDB'],
            repoUrl: 'https://github.com/JordanWebDev',
            stars: 42,
            forks: 12,
            imageUrl: 'https://via.placeholder.com/400x300/00E6E6/FFFFFF?text=Project+Spartan',
        },
        {
            id: 'fallback-2',
            title: 'UNSC Dashboard',
            description: 'Real-time data visualization dashboard with modern UI',
            technologies: ['Vue.js', 'D3.js', 'PostgreSQL'],
            repoUrl: 'https://github.com/JordanWebDev',
            stars: 28,
            forks: 8,
            imageUrl: 'https://via.placeholder.com/400x250/00A8CC/FFFFFF?text=UNSC+Dashboard',
        },
        {
            id: 'fallback-3',
            title: 'Cortana AI Assistant',
            description: 'AI-powered chatbot with natural language processing',
            technologies: ['Python', 'TensorFlow', 'Flask'],
            repoUrl: 'https://github.com/JordanWebDev',
            stars: 56,
            forks: 15,
            imageUrl: 'https://via.placeholder.com/400x350/2A2E35/00E6E6?text=Cortana+AI',
        },
    ];
}
