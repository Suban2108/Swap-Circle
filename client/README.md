# Swap-Circle Client

Frontend application for Swap-Circle, a community exchange platform where users can list items, request swaps, join groups, chat, and manage profiles/events.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Axios + Fetch API
- React Hot Toast
- Leaflet (map view on Contact page)

## Core Features

- Authentication with role-based login/signup
  - Email/password login
  - Google login
  - Forgot/reset password flows
- Marketplace
  - Browse items in grid/list mode
  - Search, category/type/status filters
  - Like, edit, and delete owned items
  - Create and update item listings with image uploads
  - Send swap requests
- Chat and Groups
  - Group and direct conversations
  - Create/join groups
  - Real-time style message interface with file upload support
- Profile and Dashboard
  - User profile with editable details and social links
  - Profile image upload and crop
  - Dashboard sections for overview, users, items, events, and analytics
- Events
  - Browse and filter events
  - Event details and event management actions
- Informational pages
  - Home, About, and Contact pages
  - Contact form submission and community map

## Routes

- `/` - Home
- `/login` - Auth (signin/signup/forgot/reset)
- `/about` - About Swap-Circle
- `/contact` - Contact page
- `/profile` - User profile
- `/dashboard` - Admin/community dashboard
- `/groups` - Group and direct chat
- `/items` - Marketplace
- `/events` - Events

## Getting Started

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Preview production build locally:
   - `npm run preview`

## Project Structure (High Level)

- `src/Pages` - page-level modules
- `src/Components` - shared UI and reusable components
- `src/routes` - route definitions
- `src/hooks` - data and state hooks
- `src/lib/api` - API layer utilities
- `src/context` - auth and app context providers

## Screenshot / Demo Image

Add your image hyperlink here: `[Project Screenshot](PASTE_IMAGE_URL_HERE)`
