# 🚀 Portfolio Website Builder

A modern, customizable portfolio builder powered by Next.js and PayloadCMS. Create stunning developer portfolios with ease! ✨

## 🌟 Features

- 🎨 Modern and Clean UI Design
- 🌓 Dark/Light Mode Support
- 📱 Fully Responsive Layout
- ⚡ Optimized Performance
- 🔍 SEO Friendly
- 🎭 Smooth Page Transitions & Animations
- 🔒 Type-Safe Development with TypeScript
- 📝 Headless CMS with PayloadCMS
- 🖼️ Advanced Image Optimization
- 🌐 REST API Integration
- 🔄 Real-time Content Updates
- 🎯 Custom Admin Dashboard

## 🛠️ Tech Stack

### Frontend

- ⚛️ Next.js 14 (App Router)
- 💅 Tailwind CSS for Styling
- 🎭 Framer Motion for Animations
- 📝 TypeScript for Type Safety
- 🎨 Responsive Design with Mobile-First Approach
- 🔄 SWR for Data Fetching
- 📱 Progressive Web App (PWA) Support

### Backend

- 🎯 PayloadCMS (Headless CMS)
- 📦 PostgreSQL Database
- 🔑 JWT Authentication & Role-based Authorization
- 📤 Media Upload with Image Optimization
- 🔄 RESTful APIs
- 🔒 Secure Password Hashing
- 📧 Email Integration

### Development Tools

- 📋 ESLint for Code Linting
- 💄 Prettier for Code Formatting
- 🐶 Husky for Git Hooks
- 🚀 Docker for Containerization
- 🧪 Jest & React Testing Library
- 📊 TypeScript for Static Type Checking
- 📦 npm for Package Management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 📦
- PostgreSQL 14+ 📊
- Docker (optional) 🐳
- npm or yarn 📦

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/akshay0077/portfolio-builder-website.git
   cd portfolio-builder-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Configure your PostgreSQL database and update the .env file:
   \`\`\`env
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"
   \`\`\`

5. Run database migrations:
   \`\`\`bash
   npm run migrate

# or

yarn migrate
\`\`\`

6. Start the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

The application will be available at \`http://localhost:3000\`

### Docker Setup 🐳

1. Build and run with Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. Access the application:

- Frontend: \`http://localhost:3000\`
- Admin Panel: \`http://localhost:3000/admin\`
- API Documentation: \`http://localhost:3000/api/docs\`

## 📁 Project Structure

\`\`\`
portfolio-builder/
├── src/
│ ├── app/
│ │ ├── (frontend)/ # Frontend components and pages
│ │ │ ├── components/ # Reusable UI components
│ │ │ ├── hooks/ # Custom React hooks
│ │ │ ├── utils/ # Utility functions
│ │ │ ├── context/ # React context providers
│ │ │ ├── styles/ # Global styles and themes
│ │ │ └── types/ # TypeScript type definitions
│ │ └── (payload)/ # PayloadCMS configuration
│ ├── collections/ # PayloadCMS collections
│ ├── blocks/ # PayloadCMS block components
│ ├── globals/ # PayloadCMS global configurations
│ └── migrations/ # Database migrations
├── public/ # Static assets
├── media/ # Uploaded media files
├── tests/ # Test files
├── docker/ # Docker configuration files
└── scripts/ # Utility scripts
\`\`\`

## 🎨 Components

### Shared Components

- 🔘 Button - Customizable button with variants
- 📦 Card - Versatile card with hover effects
- 📑 Section - Layout section with animations
- 📱 Responsive Navigation
- 🎯 Modal & Dialog
- 🔄 Loading Spinners
- 📝 Form Elements
- 🎨 Theme Switcher

### Custom Hooks

- 🔍 useIntersectionObserver - For scroll animations
- 🌓 useTheme - Theme management
- 🔄 useAPI - API integration
- 📱 useMediaQuery - Responsive design
- 🔒 useAuth - Authentication
- 💾 useLocalStorage - Storage management
- 🎭 useAnimation - Animation controls

## 🛡️ Environment Variables

\`\`\`env

# Database

DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"

# PayloadCMS

PAYLOAD_SECRET=your_payload_secret
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Authentication

JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret

# Email (Optional)

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
\`\`\`

## 🔥 Features in Detail

### Content Management

- 📝 Rich Text Editor with Markdown Support
- 🖼️ Media Library with Image Optimization
- 📱 Mobile-Friendly Admin Dashboard
- 🔒 Role-Based Access Control
- 🔄 Real-time Content Preview
- 📊 SEO Management
- 🎨 Theme Customization

### Portfolio Sections

- 🏠 Dynamic Home Page
- 👤 About Me with Timeline
- 💼 Projects Showcase
- 📚 Blog with Categories
- 📞 Contact Form with Validation
- 🎯 Skills & Experience
- 📊 Analytics Dashboard

### Performance Optimizations

- 🖼️ Next.js Image Optimization
- 🚀 Code Splitting & Lazy Loading
- 📦 Bundle Size Optimization
- 🔄 Server-Side Rendering (SSR)
- 📱 Progressive Web App
- 🗃️ API Route Optimization
- 💾 Response Caching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow the existing code style
- Use conventional commits

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions and support:

- 📧 Email: akshay007.kher@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/akshay0077/portfolio-builder-website/issues)

---

Made with ❤️ by [Akshay Kher]
