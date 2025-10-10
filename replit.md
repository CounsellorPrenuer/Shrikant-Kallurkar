# Level Up Pune - Dr. Shrikant Kallurkar

## Overview

Level Up Pune is a professional website for Dr. Shrikant Kallurkar, showcasing his 45 years of academic and professional expertise. The site serves as a platform for career guidance, academic mentorship, and institutional consulting services. Built as a modern, single-page application with a polished UI inspired by leadcrestconsulting.com, the website emphasizes authority, academic prestige, and executive credibility.

The application features a booking and payment system integrated with Razorpay, lead management capabilities, and an administrative dashboard for tracking inquiries and conversions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Single-page application (SPA) architecture with smooth scrolling between sections
- Wouter for lightweight client-side routing (Home page and Admin dashboard)

**UI Components & Styling:**
- shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette emphasizing authority: Charcoal Gray (#212529), Maroon/Burgundy (#800000), White (#FFFFFF), and Off-White (#F8F9FA)
- Typography: "Lora" serif font for headings (academic authority), "Inter" sans-serif for body text (readability)
- Framer Motion for professional animations (fade-ins, hover effects, scroll-based reveals)

**Design Philosophy:**
- Glassmorphism effects on navigation elements
- Generous whitespace and clean grid layouts for premium feel
- Soft shadows and smooth hover transitions on interactive elements
- Mobile-responsive with breakpoint-aware components

**Key Sections:**
- Sticky navbar with blur effect and scroll progress indicator
- Hero section with animated stat boxes highlighting credentials
- Credibility section showcasing institutional affiliations (World Bank, Google, etc.)
- About section with profile image and achievements
- Services cards with gradient backgrounds
- Tab-based pricing/packages section for different student categories
- Testimonials carousel
- Contact form with lead capture
- Footer with navigation and social links

### Backend Architecture

**Server Framework:**
- Express.js REST API server
- TypeScript for type-safe server code
- Session-based architecture for potential future authentication

**API Design:**
- RESTful endpoints for leads, payments, bookings, and downloads
- Razorpay payment gateway integration for order creation and verification
- Admin endpoints for statistics and data export (Excel format using xlsx library)
- Validation using Zod schemas with Drizzle-Zod integration

**Key Endpoints:**
- `POST /api/leads` - Create lead from contact form or package inquiry
- `GET /api/leads` - Retrieve all leads (admin)
- `PATCH /api/leads/:id/status` - Update lead status
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `POST /api/bookings` - Create booking after successful payment
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/export/:type` - Export data as Excel

**Data Storage:**
- In-memory storage implementation (`MemStorage`) currently active
- Database-ready schema defined with Drizzle ORM for PostgreSQL migration
- Tables defined: users, leads, payments, bookings, downloads
- UUID-based primary keys with timestamp tracking

**Payment Flow:**
1. User selects package and enters details
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout modal
4. User completes payment
5. Razorpay webhook/callback triggers verification
6. Backend validates signature and updates payment status
7. Booking record created upon successful payment

### External Dependencies

**Payment Processing:**
- **Razorpay** - Payment gateway for Indian market transactions
  - Requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables
  - Handles order creation, payment capture, and signature verification
  - Used for all package purchases and consultation bookings

**Database (Configured but Optional):**
- **Neon Database** (@neondatabase/serverless) - Serverless PostgreSQL provider
  - Configured via `DATABASE_URL` environment variable
  - Drizzle ORM configured for PostgreSQL dialect
  - Migration files would be generated in `/migrations` directory
  - Currently using in-memory storage; database integration ready for production

**State Management & Data Fetching:**
- **TanStack Query (React Query)** - Server state management, caching, and data fetching
  - Configured with custom query client
  - Handles API requests with built-in error handling
  - Optimistic updates and cache invalidation strategies

**Form Management:**
- **React Hook Form** with @hookform/resolvers for validation
- Zod schemas for runtime type validation

**UI Component Libraries:**
- **Radix UI** - Headless, accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Embla Carousel** - Carousel functionality for testimonials
- **Lucide React** - Icon library for consistent iconography
- **date-fns** - Date formatting and manipulation

**Development Tools:**
- **Vite Plugins**: Runtime error modal, cartographer (Replit-specific), dev banner
- **PostCSS** with Autoprefixer for CSS processing
- **ESBuild** for production server bundling

**Session Management (Configured):**
- **connect-pg-simple** - PostgreSQL session store for Express (when database is connected)

**Type Safety:**
- Shared schema definitions between client and server via `/shared/schema.ts`
- Drizzle-Zod for automatic Zod schema generation from database schema
- TypeScript path aliases for clean imports (@/, @shared/)