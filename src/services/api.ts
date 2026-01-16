/**
 * API Utilities
 * Base fetch wrapper with error handling, timeout, and retry logic
 */

// ============================================
// TYPES
// ============================================

export interface ApiError {
    readonly message: string;
    readonly status?: number;
    readonly isNetworkError: boolean;
}

export interface ApiResponse<T> {
    readonly data: T | null;
    readonly error: ApiError | null;
    readonly isLoading: boolean;
}

export interface FetchOptions extends RequestInit {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
}

// ============================================
// ERROR CLASSES
// ============================================

export class NetworkError extends Error {
    readonly isNetworkError = true;

    constructor(message: string = 'Network connection failed') {
        super(message);
        this.name = 'NetworkError';
    }
}

export class ApiRequestError extends Error {
    readonly status: number;
    readonly isNetworkError = false;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiRequestError';
        this.status = status;
    }
}

// ============================================
// FETCH WRAPPER
// ============================================

/**
 * Enhanced fetch with timeout, retry, and error handling
 */
export async function apiFetch<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    const {
        timeout = 10000,
        retries = 2,
        retryDelay = 1000,
        ...fetchOptions
    } = options;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new ApiRequestError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            return await response.json() as T;
        } catch (error) {
            lastError = error as Error;

            // Don't retry on certain errors
            if (error instanceof ApiRequestError && error.status >= 400 && error.status < 500) {
                throw error;
            }

            // Convert abort/network errors
            if (error instanceof TypeError || (error as Error).name === 'AbortError') {
                lastError = new NetworkError('Unable to reach server');
            }

            // Wait before retry (except on last attempt)
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
            }
        }
    }

    throw lastError || new NetworkError('Unknown error occurred');
}

// ============================================
// RESPONSE HELPERS
// ============================================

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T): ApiResponse<T> {
    return {
        data,
        error: null,
        isLoading: false,
    };
}

/**
 * Create an error API response
 */
export function errorResponse<T>(error: Error): ApiResponse<T> {
    const isNetwork = error instanceof NetworkError ||
        error instanceof TypeError ||
        (error as Error).name === 'AbortError';

    return {
        data: null,
        error: {
            message: error.message,
            status: error instanceof ApiRequestError ? error.status : undefined,
            isNetworkError: isNetwork,
        },
        isLoading: false,
    };
}

/**
 * Create a loading API response
 */
export function loadingResponse<T>(): ApiResponse<T> {
    return {
        data: null,
        error: null,
        isLoading: true,
    };
}
