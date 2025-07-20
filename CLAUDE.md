# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Express fullstack sample application demonstrating Design-First API development with OpenAPI, Prisma ORM, and SQLite database.

## Essential Commands

### Development
```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Start both servers concurrently (frontend: 5173, backend: 3001)
npm run dev

# Database operations
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
```

### API Design Changes Workflow
When modifying the API:
1. Edit `src/backend/openapi.yaml`
2. Run `cd src/backend && npm run prisma:generate` to update Prisma schema
3. Run `npm run db:generate` to regenerate client

## Architecture Overview

### Frontend (`/src/frontend/`)
- **Framework**: Vue 3 with Composition API
- **State**: Pinia store at `src/stores/api.js` handles all API calls
- **Routing**: Vue Router with views for Dashboard, Users, and Microposts
- **Styling**: Tailwind CSS based on templates in `/templates/admin/`
- **Build**: Vite dev server on port 5173

### Backend (`/src/backend/`)
- **Design-First**: OpenAPI specification (`openapi.yaml`) drives implementation
- **Server**: Express with openapi-backend middleware (`server.js`)
- **Database**: SQLite with Prisma ORM
- **Schema Generation**: `generate-prisma.js` creates Prisma schema from OpenAPI

### Data Models
- **User**: id, name, createdAt, updatedAt
- **Micropost**: id, title, userId (FK to User), createdAt, updatedAt
- One User can have many Microposts

## Key Development Patterns

### API Client Pattern
All API calls go through the centralized Pinia store:
```javascript
// src/frontend/src/stores/api.js
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
})
```

### OpenAPI Handler Pattern
Backend endpoints are defined in OpenAPI and implemented as handlers:
```javascript
// src/backend/server.js
api.register({
  getUsers: async () => { /* implementation */ },
  createMicropost: async (c) => { /* implementation */ }
})
```

## Important Constraints
- JavaScript only (no TypeScript)
- No authentication system implemented
- Only Create and Read operations (no Update/Delete)
- No testing framework configured
- Uses ES modules throughout

## Common Tasks

### Adding a New API Endpoint
1. Define in `src/backend/openapi.yaml`
2. Regenerate Prisma schema if data model changes
3. Implement handler in `server.js`
4. Add API method in `src/frontend/src/stores/api.js`
5. Use in Vue components via the store

### Modifying Database Schema
1. Update models in `openapi.yaml`
2. Run schema generation and migrations
3. Update seed data if needed in `src/backend/prisma/seed.js`