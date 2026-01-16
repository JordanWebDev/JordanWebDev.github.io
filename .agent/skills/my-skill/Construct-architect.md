---
name: Construct Architect
description: Structural and architectural guidelines for React/TypeScript projects
---

# Construct Architect - Project Structure & Architecture

## 🏗️ Core Principles
1.  **Feature-Based Organization**: Group files by feature rather than by type where applicable.
2.  **Strict TypeScript**: No `any`; use defined interfaces/types.
3.  **Functional Components**: Use `React.FC<Props>` or `function Name({}: Props): JSX.Element`.

## 📁 File Naming Conventions
- **Components**: PascalCase (e.g., `XboxBootAnimation.tsx`)
- **Hooks**: camelCase, prefixed with 'use' (e.g., `useBootSequence.ts`)
- **Utilities**: camelCase (e.g., `mathUtils.ts`)
- **Types**: PascalCase, often with suffix (e.g., `BootTypes.ts` or `api.types.ts`)

## 🧱 Component Pattern
```tsx
import type { ReactNode } from 'react';

interface MyComponentProps {
  label: string;
  children?: ReactNode;
}

export function MyComponent({ label, children }: MyComponentProps): JSX.Element {
  return (
    <div className="component-base">
      <h1>{label}</h1>
      {children}
    </div>
  );
}
```

## 🛠️ State Management
- Use **Context** for global/app-level state (e.g., Theme, Auth, BootSequence).
- Use **Local State** (`useState`, `useReducer`) for component-specific logic.
- Avoid prop drilling > 2 levels; refactor to Context or Composition.