/**
 * API Type Definitions
 * Types for GitHub API responses
 */

// ============================================
// GITHUB TYPES
// ============================================

/**
 * GitHub repository owner
 */
export interface GitHubOwner {
    readonly login: string;
    readonly avatar_url: string;
    readonly html_url: string;
}

/**
 * GitHub repository from REST API
 */
export interface GitHubRepository {
    readonly id: number;
    readonly name: string;
    readonly full_name: string;
    readonly description: string | null;
    readonly html_url: string;
    readonly homepage: string | null;
    readonly stargazers_count: number;
    readonly forks_count: number;
    readonly language: string | null;
    readonly topics: readonly string[];
    readonly owner: GitHubOwner;
    readonly created_at: string;
    readonly updated_at: string;
    readonly pushed_at: string;
}

/**
 * GitHub pinned repository from GraphQL
 */
export interface GitHubPinnedRepo {
    readonly id: string;
    readonly name: string;
    readonly description: string | null;
    readonly url: string;
    readonly homepageUrl: string | null;
    readonly stargazerCount: number;
    readonly forkCount: number;
    readonly primaryLanguage: {
        readonly name: string;
        readonly color: string;
    } | null;
    readonly repositoryTopics: {
        readonly nodes: readonly {
            readonly topic: {
                readonly name: string;
            };
        }[];
    };
    readonly openGraphImageUrl: string;
}

/**
 * Transformed project from GitHub repository
 */
export interface GitHubProject {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly technologies: readonly string[];
    readonly liveUrl?: string;
    readonly repoUrl: string;
    readonly stars: number;
    readonly forks: number;
    readonly imageUrl: string;
    readonly primaryLanguage?: string;
}
