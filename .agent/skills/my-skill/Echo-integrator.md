---
name: Echo Integrator
description: Integration guidelines for APIs, Services, and Data Fetching
---

# Echo Integrator - Integration Patterns

## 📡 Service Layer Pattern
- **Centralized Fetching**: All external API calls MUST go through `src/services/`.
- **API Wrapper**: Use `api.ts` (or equivalent) for consistent error handling, timeouts, and headers.
- **No Direct Fetch**: Do not use `fetch()` directly in components.

## 🔒 Security & Config
- **Environment Variables**: Store sensitive keys/URLs in `.env` (prefixed with `VITE_` for client-side).
- **Secrets**: NEVER commit secrets to git.

## 🛡️ Error Handling
- **Typed Errors**: Use custom error classes (e.g., `NetworkError`, `ApiError`).
- **UI Feedback**: Components should handle loading/error states gracefully (skeletons, alerts).

## 🔄 Data Transformation
- **Transform at Edge**: Transform API responses into robust application domain objects *inside* the service function.
- **Frontend-First Types**: Design types based on UI needs, then map API data to them.

## 🧩 Example Service
```typescript
import { apiFetch } from './api';
import type { UserProfile } from '../types/user.types';

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const data = await apiFetch<ApiUserResponse>(`/users/${userId}`);
  return {
    id: data.id,
    displayName: data.username.toUpperCase(),
    // ... transformation logic
  };
}
```