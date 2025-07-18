# Vault Discovery App

## Overview

This is a full-stack web application built with React and Express that displays and manages a vault discovery system. Users can browse through various vaults, filter them by different criteria, and view detailed information about each vault. The application features a modern UI with dark theme styling and interactive components.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Mobile Viewport Fixes (July 18, 2025)
- Fixed mobile viewport issues in chat-vault page preventing proper display on mobile devices
- Added proper viewport meta tag with viewport-fit=cover for notch support
- Implemented mobile-safe CSS classes for safe areas (mobile-safe-top, mobile-safe-bottom)
- Added dynamic viewport height (dvh) support for better mobile compatibility
- Fixed header being cut off by browser navigation bar on mobile
- Added mobile-specific CSS fixes for keyboard overlay and scrolling
- Prevented zoom on input focus by setting font-size to 16px
- Added overscroll-behavior controls for better mobile scrolling experience
- Applied chat-container and chat-history classes for improved mobile layout

### VaultSheet Implementation (July 16, 2025)
- Created comprehensive VaultSheet system with 6 modular components
- Implemented VaultSheetHeader, VaultUnlockForm, VaultPrizesList, VaultInteriorGrid, VaultSheetBackground, VaultSheet
- Added two-state vault system: locked (password entry) and unlocked (prize claiming)
- Integrated VaultSheet with VaultSectionChat for seamless opening
- VaultSheet opens as full-screen overlay with z-index above chat
- Components organized in logical folder structure for maintainability
- Added shake animations and mobile optimizations

### Account System Implementation (July 16, 2025)
- Created comprehensive account page with modular components
- Implemented reusable components: AccountHeader, ProfileHeader, PersonalInfo, BillingSection, SavedCards, Achievements, Preferences, ActionButtons, UserUpdateForm
- Added dynamic routing system for vault chat pages (/{vaultId})
- Integrated VaultSectionChat component into chat interface
- Components organized in logical folder structure for maintainability

### Project Migration (July 13, 2025)
- Successfully migrated project from Replit Agent to Replit environment
- Verified all packages are installed and working correctly
- Confirmed server is running on port 5000 with proper client/server separation
- Validated security practices are implemented
- Project is ready for further development

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Data Access**: Drizzle ORM for database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage implementation for local development

## Key Components

### Frontend Components
1. **VaultCard**: Interactive card component displaying vault information with hover effects and animations
2. **VaultModal**: Modal dialog for detailed vault information
3. **VaultHeader**: Application header with statistics and branding
4. **VaultFilters**: Filter controls for browsing vaults by different criteria
5. **UI Components**: Comprehensive set of reusable UI components from shadcn/ui

### Backend Components
1. **Storage Interface**: Abstract interface defining data operations
2. **Memory Storage**: In-memory implementation for development
3. **Route Handlers**: Express route handlers for vault CRUD operations
4. **Middleware**: Request logging and error handling middleware

### Shared Components
1. **Schema Definitions**: Drizzle schema definitions shared between client and server
2. **Type Definitions**: TypeScript types generated from database schema
3. **Validation**: Zod schemas for runtime validation

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Persistence**: Storage layer abstracts database operations through Drizzle ORM
4. **Response Handling**: API responses are cached and managed by React Query
5. **UI Updates**: Components reactively update based on query state changes

### Vault Management Flow
- List all vaults with filtering capabilities
- View individual vault details in modal
- Track vault statistics (attempts, winners, difficulty)
- Support for vault status updates

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **State Management**: TanStack Query for server state
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority
- **Animation**: Framer Motion
- **Utilities**: clsx, date-fns, cmdk

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon serverless PostgreSQL
- **Session Management**: express-session, connect-pg-simple
- **Development**: tsx for TypeScript execution, esbuild for bundling

### Development Tools
- **Build Tools**: Vite, esbuild
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint configuration implied by shadcn/ui setup
- **Database Tools**: Drizzle Kit for schema management

## Deployment Strategy

### Development Environment
- **Client**: Vite dev server with HMR and React refresh
- **Server**: tsx for TypeScript execution with nodemon-like functionality
- **Database**: Local PostgreSQL or Neon development database
- **Environment**: NODE_ENV=development with development-specific middleware

### Production Build
- **Client Build**: Vite builds optimized React application to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.js`
- **Database**: Production PostgreSQL via Neon serverless
- **Deployment**: Node.js server serving both API and static files

### Environment Configuration
- **Database URL**: Required via DATABASE_URL environment variable
- **Build Process**: Separate client and server build steps
- **Static Serving**: Express serves built client files in production
- **Error Handling**: Global error middleware for API routes

### Replit Integration
- **Development Banner**: Replit development banner for external access
- **Runtime Error Overlay**: Vite plugin for better error handling
- **Cartographer Plugin**: Replit-specific development tools integration