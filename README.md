# RAYVEN - University App Frontend

**The Future is Now** - A comprehensive university student engagement platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dashboard**: Personalized student dashboard with course cards and announcements
- **AR Campus Navigation**: Augmented reality directions to campus locations
- **Course Management**: View schedules, materials, and communicate with lecturers
- **Wellness Hub**: Mental health resources and counseling booking
- **Book Hub**: Peer-to-peer textbook marketplace
- **Specialists**: Connect with mental health professionals
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: Zustand (planned)
- **API Client**: Axios + React Query (planned)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components (Atomic Design)
│   ├── atoms/           # Basic building blocks (Button, Avatar, Badge)
│   ├── molecules/       # Component combinations (CourseCard, SpecialistsList)
│   ├── organisms/       # Complex sections (Sidebar, Header)
│   └── templates/       # Page layouts (DashboardLayout)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API calls and external services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # Global styles and themes
```

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

## 🎨 Design System

The project follows Atomic Design principles:

- **Atoms**: Button, Avatar, Badge, Input
- **Molecules**: CourseCard, AnnouncementCard, SpecialistsList
- **Organisms**: Sidebar, Header, CourseGrid
- **Templates**: DashboardLayout, AuthLayout
- **Pages**: Dashboard, Schedule, Analytics

## 🔧 Development Guidelines

- Use TypeScript for all components
- Follow the established folder structure
- Create proper type definitions for all props
- Use Tailwind CSS for styling
- Write tests for critical components
- Follow the component naming conventions

## 📱 Responsive Design

The app is designed to work on:
- Desktop (1440px+)
- Tablet (768px - 1439px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Follow the established code style
2. Create feature branches from `main`
3. Write tests for new components
4. Update documentation as needed

## 📄 License

This project is part of the RAYVEN university platform.
