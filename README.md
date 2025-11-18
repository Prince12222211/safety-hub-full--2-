# 🛡️ Safety Hub – Full Stack Disaster Management Platform

Safety Hub is a **comprehensive disaster management and safety training platform** that combines a modern React/Vite dashboard with a powerful Express/MongoDB API. It enables organizations to manage safety alerts, submit incident reports, monitor readiness metrics, and conduct safety training from a single, beautiful, and intuitive interface.

![Status](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![React](https://img.shields.io/badge/React-v18%2B-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔐 Authentication & Security

- **JWT-based authentication** with secure token storage
- **User registration and login** with form validation
- **Protected routes** for authorized users only
- **Password encryption** with bcrypt hashing

### 📊 Dashboard & Analytics

- **Interactive dashboard** with real-time statistics
- **Statistics cards** showing active alerts, reports, incidents, and progress
- **Collapsible sidebar navigation** with smooth transitions
- **User profile display** with role-based information
- **Recent activity feed** for quick updates

### 🚨 Alert Management

- **Create and manage safety alerts**
- **Filter and categorize alerts** by type and severity
- **Real-time alert notifications**
- **Alert history tracking**

### 📝 Incident Reporting

- **Submit incident reports** with detailed information
- **Form validation** for data integrity
- **Priority classification** (Low, Medium, High, Critical)
- **Location and type selection**
- **Timestamp tracking**

### 📚 Training & Modules

- **Safety training modules** for staff
- **Progress tracking** for individual users
- **Assessment management** system
- **Certificate tracking**

### 🏢 Facility Management

- **Manage facilities** and locations
- **Facility-specific safety protocols**
- **Equipment tracking**
- **Capacity monitoring**

### 🎯 Drills & Exercises

- **Schedule safety drills**
- **Track drill participation**
- **Performance metrics**
- **Post-drill reports**

### 👥 User Management

- **Create and manage user accounts**
- **Role-based access control**
- **Activity logging**
- **User performance tracking**

### 🌍 Multilingual Support

- **English, Hindi, and Punjabi** language support
- **Dynamic language switching**
- **Localized content delivery**

## 🎨 Modern UI/UX

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Glassmorphism UI** - Modern, aesthetic design patterns
- **Smooth Animations** - Micro-interactions and transitions
- **Gradient Backgrounds** - Professional color schemes
- **Icon Integration** - Lucide React icons throughout
- **Shadow Effects** - Depth and hierarchy
- **Theme Support** - Light/Dark mode ready

## 🔧 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **TanStack Query** - Data fetching & caching
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animation library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## 📁 Project Structure

```
safety-hub-full/
├── safety-hub-main/
│   └── safety-hub-main/                 # Frontend (Vite + React)
│       ├── src/
│       │   ├── pages/                   # Page components
│       │   │   ├── Login.jsx            # Login page (improved UI)
│       │   │   ├── Dashboard.jsx        # Dashboard with sidebar
│       │   │   ├── Alerts.jsx
│       │   │   ├── ReportForm.jsx
│       │   │   ├── Modules.tsx
│       │   │   ├── Facilities.tsx
│       │   │   ├── Drills.tsx
│       │   │   ├── Assessments.tsx
│       │   │   ├── Users.tsx
│       │   │   ├── Progress.tsx
│       │   │   └── NotFound.tsx
│       │   ├── components/              # Reusable components
│       │   ├── contexts/                # React contexts
│       │   ├── services/                # API services
│       │   ├── hooks/                   # Custom hooks
│       │   ├── lib/                     # Utilities
│       │   ├── App.tsx                  # Main app component
│       │   └── main.tsx                 # Entry point
│       ├── index.html
│       ├── vite.config.ts
│       ├── tailwind.config.ts
│       └── package.json
│
└── safety-hub-backend/                  # Backend (Express + MongoDB)
    ├── src/
    │   ├── server.js                    # Express server entry
    │   ├── config/                      # Configuration files
    │   ├── controllers/                 # Route handlers
    │   ├── models/                      # Mongoose schemas
    │   ├── routes/                      # API routes
    │   └── middleware/                  # Express middleware
    ├── .env                             # Environment variables
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **MongoDB** (local or MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd "safety-hub-full (2)"
```

2. **Install backend dependencies**

```bash
cd safety-hub-backend
npm install
```

3. **Install frontend dependencies**

```bash
cd "../safety-hub-main/safety-hub-main"
npm install
```

### Environment Setup

Create `safety-hub-backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/safety-hub
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d
```

### Running the Application

1. **Start MongoDB** (if running locally)

```bash
mongod
```

2. **Start the backend server** (in a new terminal)

```bash
cd safety-hub-backend
npm run dev
```

Backend will run on: **http://localhost:5000**

3. **Start the frontend server** (in another terminal)

```bash
cd safety-hub-main/safety-hub-main
npm run dev
```

Frontend will run on: **http://localhost:8080**

4. **Access the application**
   Open your browser and navigate to: **http://localhost:8080**

### Demo Credentials

```
Email:    demo@example.com
Password: demo123
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Alerts

- `GET /api/alerts` - List all alerts
- `POST /api/alerts` - Create new alert (protected)
- `GET /api/alerts/:id` - Get alert by ID
- `PUT /api/alerts/:id` - Update alert (protected)
- `DELETE /api/alerts/:id` - Delete alert (protected)

### Reports

- `GET /api/reports` - List all reports
- `POST /api/reports` - Submit new report (protected)
- `GET /api/reports/:id` - Get report by ID
- `PUT /api/reports/:id` - Update report (protected)

### Users

- `GET /api/users` - List all users
- `POST /api/users` - Create user (protected)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (protected)

## 📖 Usage Examples

### Login Example

```javascript
// Login with credentials
const response = await loginUser({
  email: "user@example.com",
  password: "password123",
});

// Token is automatically stored in localStorage
// and attached to all API requests
```

### Submit a Report

```javascript
// Submit incident report
const report = await submitReport({
  title: "Fire Alarm Triggered",
  location: "Building A",
  description: "Smoke detected in server room",
  type: "incident",
  priority: "high",
});
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Environment variable management
- ✅ Error handling middleware
- ✅ Input validation

## 📱 Responsive Design

The application is fully responsive:

- ✅ Desktop (1920px+)
- ✅ Laptop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (Below 768px)

## 🎯 Available Scripts

### Frontend

```bash
npm run dev          # Start dev server (port 8080)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm run dev          # Start dev server with nodemon (port 5000)
npm start            # Start production server
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment

### Frontend (Vite)

```bash
npm run build
# Deploy 'dist' folder to hosting service (Vercel, Netlify, etc.)
```

### Backend (Express)

```bash
# Deploy to cloud platforms:
# - Heroku
# - AWS EC2
# - DigitalOcean
# - Railway
# - Render
```

## 📊 Performance

- ⚡ Vite with instant module replacement (HMR)
- ⚡ Code splitting and lazy loading
- ⚡ Tailwind CSS tree-shaking
- ⚡ Efficient MongoDB queries with indexing
- ⚡ JWT caching for API security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Prince Verma**

- GitHub: [@Prince12222211](https://github.com/Prince12222211)
- Repository: [safety-hub-full--2-](https://github.com/Prince12222211/safety-hub-full--2-)

## 📞 Support

For issues, questions, or suggestions, please:

- Open an issue on GitHub
- Contact: support@safetyhub.com

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS documentation
- shadcn/ui component library
- MongoDB documentation
- Express.js framework

---

**Built with ❤️ for safety and disaster management**

Last Updated: November 18, 2025
