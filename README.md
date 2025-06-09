# NEAR ABAC 🏫

A comprehensive location-based listing platform for discovering places around Assumption University (ABAC). Built with Next.js 14, this application helps students and visitors find apartments, restaurants, cafes, and other services near the university campus.

## 🌟 Features

### Core Functionality

- **🔍 Smart Search**: Advanced search functionality with real-time filtering
- **📱 Responsive Design**: Optimized for mobile and desktop experiences
- **🗺️ Interactive Maps**: Google Maps integration for location visualization
- **📊 Category Browsing**: Organized listings by categories (apartments, restaurants, cafes, etc.)
- **⭐ User Reviews**: Rating and review system for listings
- **❤️ Favorites**: Save and manage favorite places

### User Management

- **🔐 Authentication**: Secure user authentication with Clerk
- **👤 User Profiles**: Personal dashboards for managing listings
- **📝 Listing Management**: Create, edit, and delete your own listings
- **🎯 Personalized Experience**: Tailored content based on user preferences

### Admin Features

- **🛠️ Admin Dashboard**: Comprehensive admin panel for platform management
- **✅ Content Moderation**: Approve/reject user-submitted listings
- **📈 Analytics**: Monitor platform usage and statistics
- **👥 User Management**: Manage user accounts and permissions

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & Database

- **Supabase** - PostgreSQL database and authentication
- **TanStack Query** - Server state management
- **Clerk** - User authentication and management

### Additional Tools

- **ImageKit** - Image optimization and delivery
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Cypress** - End-to-end testing
- **Google Maps API** - Map integration

## 📁 Project Structure

```
near_abac/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Main application routes
│   ├── admin/             # Admin dashboard
│   └── api/               # API endpoints
├── components/            # Reusable UI components
│   ├── Landing/           # Landing page components
│   ├── Dashboard/         # Admin dashboard components
│   ├── Navbar/            # Navigation components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
├── utils/                 # Helper utilities
├── database/              # Database schemas
└── cypress/               # E2E tests
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase account
- Clerk account
- Google Maps API key
- ImageKit account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd near_abac
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ImageKit
NEXT_PUBLIC_IMAGEKIT_ENDPOINT=your_imagekit_endpoint
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
```

4. **Database Setup**
   Run the SQL schema in your Supabase dashboard:

```bash
# The schema is available in database/schema.sql
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User profile information
- **listings** - Place listings with details, location, and media
- **categories** - Categorization of listings
- **reviews** - User reviews and ratings
- **favorites** - User saved listings

## 🧪 Testing

### End-to-End Testing with Cypress

```bash
# Open Cypress test runner
npm run cypress

# Run tests headlessly
npm run cypress:run
```

Test coverage includes:

- Homepage functionality
- Category browsing
- Search functionality
- Listing details
- User authentication flows

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run cypress` - Open Cypress test runner

## 🎯 Key Features Breakdown

### Landing Page

- Hero section with university branding
- Featured listings showcase
- Category navigation
- Interactive map view

### Search & Discovery

- Real-time search with filtering
- Category-based browsing
- Location-based results
- Advanced filtering options

### User Experience

- Responsive design for all devices
- Fast page loads with Next.js optimizations
- Smooth animations and transitions
- Intuitive navigation

### Content Management

- User-friendly listing creation
- Image upload with ImageKit optimization
- Rich text descriptions
- Contact information management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: contact@nearabac.com
- **Location**: Assumption University, Bang Na, Bangkok, Thailand

## 🙏 Acknowledgments

- Assumption University for inspiration
- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- All contributors and testers

---

**Built with ❤️ for the ABAC community**
