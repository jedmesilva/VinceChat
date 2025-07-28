# Vault Discovery App

## Overview

This is a full-stack web application built with React and Express that displays and manages a vault discovery system. Users can browse through various vaults, filter them by different criteria, and view detailed information about each vault. The application features a modern UI with dark theme styling and interactive components.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### VaultActivity System Implementation (July 27, 2025)
- Criado sistema centralizado VaultActivityMain para componentes de atividade do chat
- Substituído importações múltiplas por um único componente coordenador
- Implementadas interfaces TypeScript para type safety completo
- Sistema suporta 4 tipos: vault_opened, vault_failed, item_looted, offensive_ended
- Integrado diretamente no histórico do chat (ChatVaultHistory)
- Criados utilitários VaultActivityFactory para criação fácil de atividades
- Histórico combina mensagens e atividades ordenadas por timestamp
- Documentação completa com exemplos de uso

### Masonry Grid Implementation (July 27, 2025)
- Implementado sistema Masonry para resolver problemas de espaçamento desigual entre cards
- Substituído CSS Grid tradicional por react-masonry-css para layout dinâmico
- Cards agora se ajustam perfeitamente sem espaços vazios grandes entre diferentes alturas
- Mantida responsividade completa: 4 colunas (xl), 3 colunas (lg), 2 colunas (md/sm), 1 coluna (mobile)
- Adicionados estilos CSS customizados para espaçamento otimizado em diferentes breakpoints
- Barra de rolagem da tela de cofres ocultada para melhor experiência visual
- Solução permite expansão/retração dinâmica dos cards mantendo layout organizado

### VaultMain Scroll Fix (July 26, 2025)
- Fixed VaultMain component scroll behavior to allow full page scrolling instead of just content area
- Removed fixed header positioning to allow the vault header to scroll with content
- Updated container layout to use overflow-y-auto when VaultMain is active
- Changed from flex-col with fixed header to natural document flow for better scroll experience
- Users can now scroll the entire vault page including the header, providing better mobile experience

### Navigation and Toggle System (July 19, 2025)
- Implemented responsive navigation system for ChatVault page
- Added toggle buttons in headers: chat icon in MyVaultHeader, vault icon in ChatVaultHeader  
- Mobile breakpoint shows only one view at a time (Chat OR MyVault)
- Desktop maintains dual-pane layout (Chat AND MyVault side by side)
- Toggle buttons only visible on mobile breakpoint (md:hidden class)
- ChatVault page: users can switch between views using header buttons
- Vault Discovery page: MyVault appears without chat toggle (different context)
- Added MyVault visibility toggle in Vault Discovery navbar
- Navbar button switches between PanelLeftOpen/PanelLeftClose icons
- Content area expands to full width when MyVault is hidden
- Smooth transition animations when toggling MyVault visibility

### Mobile Layout Fix (July 18, 2025)
- Fixed chat-vault page mobile viewport issues with simplified layout approach
- Timer at top with auto height (flex-shrink-0), MainChat expands to fill remaining height (flex-1)
- Removed complex mobile CSS classes and used straightforward flexbox layout
- Timer now properly adjusts to content, chat area uses all available space
- Fixed mobile browser navigation bar overlap issues with proper height calculations
- Simplified structure: h-screen container with flex-col, timer and chat sections properly sized

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

### Account Page Layout Update (July 26, 2025)
- Reorganized account page component order per user request
- Moved Saved Cards component above Billing component
- Configured default component visibility: only Achievements expanded on page load
- All other components (Personal Info, Saved Cards, Billing, Preferences) start collapsed
- Updated card selection button text from "Padrão" to "Selecionar" for better UX clarity
- Created CardDeleteConfirmation component for safe card deletion
- Replaced browser confirm() with custom modal showing card details and warnings
- Added special warning for default card deletion requiring new default selection
- Created AddCardModal component based on checkout PaymentForm for adding new cards
- Implemented card validation, formatting, and brand detection in add card flow
- Added option to set new card as default during creation process
- Integrated modal with SavedCard component for seamless card management
- Maintained all functionality while improving layout flow and user experience

### Vault Cards Sizing Optimization (July 28, 2025)
- Otimizado tamanho dos cards para melhor densidade visual (260px min-width, 320px max-width)
- Reduzida altura mínima dos cards de 480px para 420px para maior eficiência de espaço
- Ajustado padding interno e espaçamento entre cards para layout mais compacto
- Sistema de grid adaptativo: 4 colunas em tela cheia, 3 com MyVault visível, 2 em tablet, 1 em mobile
- Melhorado sistema Masonry com gutter reduzido (16px) para melhor aproveitamento de espaço
- Cards mantêm proporções adequadas sem ficarem grandes demais ou espremidos
- Layout mais equilibrado e profissional em todas as resoluções

### InsufficientTimeCard Integration (July 28, 2025)
- Implementada funcionalidade para exibir InsufficientTimeCard quando timer esgotar
- Card de tempo insuficiente substitui input de chat quando tempo acaba
- Botão "Adicionar Tempo" abre modal Checkout para comprar mais tempo
- Timer reinicia automaticamente quando tempo adicional é comprado
- Integração completa entre Timer, MainChatVault, InsufficientTimeCard e Checkout
- Sistema permite continuidade da conversa após compra de tempo adicional
- Estados de tempo gerenciados centralmente na página chat-vault
- Timer reativa e continua contagem com tempo adicionado

### VaultItemCard Consistency Implementation (July 28, 2025)
- Unificado sistema de cards entre VaultMain e MyVault para consistência visual completa
- VaultMain agora usa o mesmo VaultItemCard utilizado no MyVault em vez de cards customizados
- Estendido VaultItemCard com props opcionais para funcionalidade press-and-hold específica do VaultMain
- Adicionadas propriedades: onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd
- Implementado suporte a barra de progresso (showProgressBar) e indicadores de progresso (claimProgress, isBeingClaimed)
- Mantida funcionalidade original de saque por press-and-hold no VaultMain com visual consistente
- Cards de itens agora têm aparência idêntica em ambos contextos (MyVault e VaultMain)
- Overlay "SAQUEADO" vs "RESGATADO" diferenciado por contexto usando showProgressBar
- Removidos cards customizados duplicados, código mais limpo e manutenível

### Chat Abandon Functionality (July 28, 2025)
- Implementada funcionalidade de abandono do chat com modal de confirmação
- Adicionado redirecionamento automático para tela inicial (vault-discovery) após confirmação
- Modal AbandonConfirmationModal já existia, integrado com navegação wouter
- Usuário agora pode sair do chat clicando em "Abandonar" → confirmar no pop-up → volta à tela inicial
- Funcionalidade integrada tanto no MainChatVault quanto na página chat-vault
- Navegação usando useLocation() do wouter para setLocation('/')
- Texto da descrição do modal otimizado para ser mais conciso e direto

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