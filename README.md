# Next.js Full-Stack IT Management Template

A minimal, production-ready Next.js template with NextAuth authentication and Zustand state management, designed specifically for IT project management applications.

## 🏗️ Architecture Overview

This template follows clean architecture principles with clear separation of concerns and a scalable folder structure.

### Core Technologies

- **Next.js 15** - React framework with App Router
- **NextAuth.js** - Authentication with credentials provider
- **Zustand** - Lightweight state management
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling

### Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Route groups for auth pages
│   │   ├── login/               # Login page (planned)
│   │   └── register/            # Register page (planned)
│   ├── api/                     # API routes
│   │   ├── auth/[...nextauth]/  # NextAuth configuration
│   │   └── projects/            # Project API endpoints
│   ├── projects/                # Projects listing page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── auth/                    # Authentication components
│   ├── layout/                  # Layout components
│   └── ui/                      # Generic UI components
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities and configurations
│   ├── handlers/                # API request handlers
│   │   ├── base.handler.ts     # Base handler with common logic
│   │   └── project.handler.ts  # Project-specific handler
│   ├── postgrest/              # PostgREST utilities (future)
│   ├── storage/                # Storage utilities (future)
│   └── utils.ts                # General utilities
├── services/                    # Business logic layer
│   ├── index.ts                # Barrel export
│   └── project.service.ts      # Project service with static data
├── store/                       # Zustand stores
│   ├── index.ts                # Barrel export
│   └── project.store.ts        # Project state management
└── types/                       # TypeScript type definitions
    ├── index.ts                # Barrel export
    └── project.ts              # Project-related types
```

## 🎯 Architecture Principles

### 1. Handler Inheritance Pattern

The template demonstrates a clean inheritance pattern for API handlers:

```typescript
// Base handler with common functionality
export abstract class BaseHandler {
  protected async handleRequest<T>() { /* error handling, validation */ }
  protected handleError() { /* standardized error responses */ }
  protected validateAuth() { /* authentication validation */ }
}

// Specialized handlers inherit common functionality
export class ProjectHandler extends BaseHandler {
  async getProjects() { /* project-specific logic */ }
}
```

**Benefits:**
- **DRY Principle**: Common logic (error handling, auth) written once
- **Consistency**: All API endpoints follow same patterns
- **Maintainability**: Changes to common logic update all handlers
- **Extensibility**: Easy to add new handlers for other entities

### 2. Service Layer Architecture

Services contain pure business logic, separated from HTTP concerns:

```typescript
export class ProjectService {
  async getProjects(status?: string): Promise<Project[]> {
    // Pure business logic - no HTTP, no frameworks
    return this.projects.filter(/* filtering logic */);
  }
}
```

**Benefits:**
- **Testability**: Services can be unit tested independently
- **Reusability**: Same service can be used in different contexts
- **Separation of Concerns**: Business logic separate from API layer

### 3. Zustand State Management

Clean, lightweight state management with proper separation:

```typescript
// State interface
interface ProjectState {
  projects: Project[]
  loading: boolean
  error: string | null
}

// Actions interface  
interface ProjectActions {
  fetchProjects: (status?: string) => Promise<void>
}

// Selector hooks for performance
export const useProjects = () => useProjectStore(state => state.projects)
```

**Benefits:**
- **Performance**: Selector hooks prevent unnecessary re-renders
- **Type Safety**: Full TypeScript support
- **Simplicity**: No boilerplate compared to Redux
- **DevTools**: Built-in debugging support

### 4. Naming Conventions

The template uses consistent dot notation for file naming:

- **Handlers**: `base.handler.ts`, `project.handler.ts`
- **Services**: `project.service.ts`, `user.service.ts`
- **Stores**: `project.store.ts`, `auth.store.ts`
- **Types**: Grouped by domain with barrel exports

**Benefits:**
- **Predictability**: Easy to find and name files
- **Organization**: Related files group together
- **Scalability**: Pattern scales as project grows
- **IDE Support**: Better autocomplete and navigation

### 5. Barrel Exports

Index files provide clean import paths:

```typescript
// Instead of
import { Project } from '@/types/project'
import { ProjectService } from '@/services/project.service'

// Use clean imports
import { Project } from '@/types'
import { ProjectService } from '@/services'
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local .env.local.example
   # Edit .env.local with your values
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Visit the application:**
   - Home: http://localhost:3000
   - Projects: http://localhost:3000/projects
   - API: http://localhost:3000/api/projects

## 🔐 Authentication

The template includes NextAuth.js with a basic credentials provider:

- **Demo credentials**: `admin@example.com` / `password`
- **Configuration**: `src/app/api/auth/[...nextauth]/route.ts`
- **Protected routes**: Use `validateAuth()` in handlers

## 📊 Sample Data

The project service includes realistic IT project data:

- Employee Management System
- IT Asset Tracking
- Help Desk Portal
- Network Monitoring Dashboard

Each project includes:
- Status tracking (planning, in-progress, completed, on-hold)
- Technology stack
- Priority levels
- Start/end dates

## 🔧 Extending the Template

### Adding a New Entity

1. **Create types**: `src/types/user.ts`
2. **Create service**: `src/services/user.service.ts`
3. **Create handler**: `src/lib/handlers/user.handler.ts`
4. **Create store**: `src/store/user.store.ts`
5. **Create API routes**: `src/app/api/users/route.ts`
6. **Update barrel exports**: Add to respective `index.ts` files

### Adding Database Integration

1. **Install ORM** (Prisma, Drizzle, etc.)
2. **Update services** to use database instead of static data
3. **Add migrations** and schema files
4. **Update environment variables**

### Adding Authentication Providers

1. **Install provider** (Google, GitHub, etc.)
2. **Update NextAuth config** in `route.ts`
3. **Add environment variables** for provider credentials

## 🎨 UI Components

The template is ready for your preferred UI library:

- **Tailwind CSS** - Pre-configured for styling
- **Component structure** - Organized folders for different component types
- **Responsive design** - Mobile-first approach

Popular additions:
- Shadcn/ui
- Headless UI
- Radix UI
- Mantine

## 📝 Development Guidelines

### File Naming
- Use dot notation: `entity.type.ts`
- Use kebab-case for multi-word entities: `user-profile.component.ts`

### Import Organization
- External libraries first
- Internal imports second
- Relative imports last
- Use barrel exports for cleaner paths

### Error Handling
- All API routes use standardized error responses
- Client-side errors handled in Zustand stores
- Consistent error types throughout application

### Type Safety
- Strict TypeScript configuration
- All API responses typed
- Zustand stores fully typed
- No `any` types in production code

## 🧪 Testing Strategy

Recommended testing approach:

1. **Unit Tests**: Services and utilities
2. **Integration Tests**: API handlers
3. **Component Tests**: React components
4. **E2E Tests**: Critical user flows

## 📚 Next Steps

This template provides a solid foundation. Consider adding:

- Database integration (Prisma/Drizzle)
- Comprehensive authentication
- Form validation (Zod)
- UI component library
- Testing setup
- CI/CD pipeline
- Docker configuration
