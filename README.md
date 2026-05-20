# 🏫 Drumvale Secondary School | Web Portal

> **Preparing Global Leaders for Tomorrow.**  
> A premier international secondary school dedicated to academic excellence, character development, and global citizenship.

---

## 🌟 Project Overview

This is the official web portal for **Drumvale Secondary School**, designed to provide an immersive, high-performance experience for students, parents, and prospective families. The site features a modern, responsive design reflecting the school's commitment to innovation and excellence.

### ✨ Key Features
- **Dynamic Curriculum Overview**: Comprehensive guides for IB, Cambridge, and National programs.
- **Interactive News & Events**: Stay updated with the latest campus happenings.
- **SMS Notifications**: Automated parent notifications via Vonage SMS API throughout the admission process.
- **Parent Portal**: Complete admission application system with document uploads and fee payment.
- **Student Portal**: Assessment and interview management for prospective students.
- **Staff Portal**: Application review, student management, and SMS log monitoring.
- **Modern UI/UX**: Built with a focus on accessibility and premium aesthetics.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop devices.

---

## 🛠️ Technology Stack

The project leverages a modern web development stack to ensure speed, type safety, and maintainability:

- **Frontend**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **SMS Integration**: [Vonage SMS API](https://www.vonage.com/communications-apis/sms/) for parent notifications

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure SMS Integration (Optional)**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Add your Vonage API credentials to `.env`:
   ```env
   VITE_VONAGE_API_KEY=your_api_key_here
   VITE_VONAGE_API_SECRET=C1cC9Rg3vYUGQLjW
   VITE_VONAGE_FROM_NUMBER=DRUMVALE
   ```
   
   See [VONAGE_QUICK_START.md](./VONAGE_QUICK_START.md) for detailed SMS setup instructions.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

The application will be available at `http://localhost:8080`.

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/       # Images, fonts, and static assets
│   ├── components/   # Reusable UI components and page sections
│   ├── context/      # React context providers (Portal, Auth)
│   ├── db/           # Database schema and localStorage management
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions (shadcn-ui/utils)
│   ├── pages/        # Main route views/pages
│   ├── services/     # External service integrations (SMS)
│   └── main.tsx      # Application entry point
├── public/           # Static files (favicon, logo)
├── .env              # Environment variables (not committed)
├── .env.example      # Environment variables template
├── index.html        # Main HTML entry
├── tailwind.config.ts # Styling configuration
├── tsconfig.json     # TypeScript configuration
├── SMS_INTEGRATION_GUIDE.md  # Complete SMS setup guide
└── VONAGE_QUICK_START.md     # Quick SMS setup reference
```

---

## 📱 SMS Integration

The portal includes automated SMS notifications for parents using the Vonage SMS API. Messages are sent at key points in the admission workflow:

- Application submission confirmation
- Application approval/rejection notifications
- Fee payment confirmations
- Enrollment completion

**Quick Setup:**
1. Get your Vonage API key from [dashboard.nexmo.com](https://dashboard.nexmo.com)
2. Add credentials to `.env` file
3. See [VONAGE_QUICK_START.md](./VONAGE_QUICK_START.md) for details

**Demo Mode:** The system works without API credentials in demo mode (logs to console only).

---

## 📝 License

&copy; 2026 Drumvale Secondary School. All rights reserved.
