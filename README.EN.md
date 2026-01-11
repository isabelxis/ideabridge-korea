## English

# IdeaBridge Korea

IdeaBridge Korea is a digital platform that connects non-technical users with IT professionals to transform real-world problems into verified digital solutions. It provides a structured, secure, and culturally appropriate environment for the Korean market.

## 🚀 Features

### Problem Owners
- Submit and manage problems
- View solution proposals from IT professionals
- Approve solutions and collaborate

### IT Professionals
- Explore and search for problems
- Submit solution proposals
- Manage solutions through dashboard
- Profile management

### Key Features

- ✅ User authentication system (Problem Owners/IT Professionals)
- ✅ Submit problems and view problem lists
- ✅ View problem details and submit solutions
- ✅ IT Professional dashboard
- ✅ Profile management
- ✅ Korean and Enghish language UI support
- ✅ Responsive design

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Storage**: LocalStorage (MVP)

## 📦 Installation and Setup

### Requirements
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

```

- Open http://localhost:3000 in your browser to view it.

### Build

```bash
# Build for production
npm run build

# Run production server
npm start
```

## 📁 Project Structure
```bash
ideabridge-korea/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # IT Professional dashboard
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   ├── problems/        # Problem-related pages
│   │   │   ├── [id]/        # Problem detail page
│   │   │   └── new/         # New problem submission page
│   │   ├── profile/         # Profile page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Footer.tsx       # Footer
│   ├── lib/                 # Utility functions
│   │   └── auth.ts          # Authentication and data management
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── public/                  # Static files
└── package.json
```

## 🔐 Authentication (MVP)
```bash
The current MVP version uses a simple authentication system with LocalStorage.

Demo Accounts
Problem Owner: owner@example.com / Password: password (minimum 6 characters)
IT Professional: pro@example.com / Password: password (minimum 6 characters)
Or you can register a new account.
```
## 🎯 Main Pages
```bash
Home Page (/)
Platform introduction
Feature overview
Sign up/Login links
Problems List (/problems)
View all published problems
Search and filtering capabilities
Submit problem button (for problem owners)
Submit Problem (/problems/new)
Enter detailed problem information
Set category, urgency level, budget, etc.
Problem Detail (/problems/[id])
View detailed problem information
Submit solution proposal form (for IT professionals)
View list of proposed solutions
IT Professional Dashboard (/dashboard)
Statistics information
Recent problems list
Manage my solutions
Profile (/profile)
Edit user information
Manage tech stack (for IT professionals)
Update bio
```
## 🌐 Language Support
The platform offers complete support in Korean (한국어) and English (English), with language switching available through the language selector in the navigation bar. All UI text and design follow Korean cultural and business practices.

Supported Languages
- 🇰🇷 Korean (한국어) - Fully implemented
- 🇬🇧 English (English) - Fully implemented
  
Automatic language detection based on browser preferences is also available.

## 🔄 Future Development Plans

 - Real database integration (currently using LocalStorage)
 - Real authentication system (JWT, OAuth, etc.)
 - File upload functionality
 - Real-time notification system
 - Chat/messaging feature
 - Payment system integration
 - Review and rating system
 - Admin dashboard

## 📝 License
This project is an MVP version.

## 🤝 Contributing
If you want to contribute to this project, please open an issue or submit a pull request.

## 📧 Contact
If you have any questions about the project, please open an issue.

IdeaBridge Korea - Connecting problems and solutions 
