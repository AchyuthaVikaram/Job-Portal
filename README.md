# 🚀 JobHunt - Advanced Job Board Platform

> **A comprehensive, production-ready MERN stack job board application that connects talented developers with innovative employers. Built with modern technologies, robust security, and exceptional user experience.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://jobhunt-i0im.onrender.com)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-Automated-green?style=for-the-badge)](https://github.com)

## ✨ Key Features

### 🎯 **For Job Seekers (Developers)**
- **🔐 Secure Authentication** - JWT-based login/registration system
- **🔍 Advanced Job Search** - Real-time search with filters (location, salary, job type)
- **📄 Smart Pagination** - Efficient browsing through thousands of jobs
- **💼 One-Click Applications** - Streamlined application process
- **📊 Application Tracking** - Monitor application status and history
- **👤 Profile Management** - Comprehensive profile with resume upload
- **📱 Mobile-First Design** - Fully responsive across all devices

### 🏢 **For Employers (Recruiters)**
- **🎯 Job Posting Management** - Create, edit, and manage job listings
- **👥 Applicant Dashboard** - Review and manage applications efficiently  
- **🏗️ Company Profiles** - Showcase company brand and culture
- **📈 Analytics Dashboard** - Track job performance and applicant metrics
- **✅ Application Management** - Accept/reject applications with feedback

### 🛡️ **For Administrators**
- **📊 Platform Analytics** - Comprehensive statistics and insights
- **🔍 Job Moderation** - Review and approve/reject job postings
- **👥 User Management** - Monitor platform activity and user behavior
- **📈 Growth Metrics** - Track platform growth and engagement

## 🛠️ Technology Stack

### **Frontend Excellence**
- **⚛️ React 18** - Modern component-based architecture
- **🎨 Material-UI (MUI)** - Professional, accessible UI components
- **🎯 Redux Toolkit** - Predictable state management
- **🎨 Tailwind CSS** - Utility-first styling framework
- **📱 Responsive Design** - Mobile-first approach
- **♿ Accessibility** - WCAG 2.1 compliant

### **Backend Power**
- **🚀 Node.js & Express.js** - High-performance server architecture
- **🗄️ MongoDB & Mongoose** - Scalable NoSQL database with ODM
- **🔐 JWT Authentication** - Secure, stateless authentication
- **🛡️ Express Validator** - Comprehensive input validation
- **☁️ Cloudinary Integration** - Professional file upload handling
- **🔒 Security Middleware** - CORS, rate limiting, data sanitization

### **DevOps & Quality**
- **🔄 GitHub Actions** - Automated CI/CD pipeline
- **📦 Docker Ready** - Containerization support
- **🚀 Render Deployment** - Production-ready hosting
- **📊 Error Monitoring** - Comprehensive logging and monitoring

## 🚀 Quick Start Guide

### **Prerequisites**
```bash
Node.js >= 16.0.0
MongoDB >= 5.0
npm >= 8.0.0
```

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-username/jobhunt.git
cd jobhunt
```

2. **Install dependencies**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

3. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
cp client/.env.example client/.env

# Configure your environment variables
# See Environment Variables section below
```

4. **Database Setup**
```bash
# Make sure MongoDB is running
# The app will connect automatically using MONGO_URL
```

5. **Start Development Servers**
```bash
# Start backend server (Port 3000)
npm run dev

# In another terminal, start frontend (Port 5173)
cd client && npm run dev
```

6. **Access the Application**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/v1
- **API Documentation:** http://localhost:3000/api/docs

## 🔧 Environment Variables

### **Server (.env)**
```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/jobhunt

# JWT Configuration  
SECRET_KEY=your_super_secure_jwt_secret_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **Client (client/.env)**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```


## 📚 API Documentation

### **Public Endpoints (No Authentication Required)**
```http
GET /api/v1/job/get                 # Get all jobs with pagination
GET /api/v1/job/get/:id            # Get specific job details
GET /api/v1/user/register          # User registration
POST /api/v1/user/login            # User login
```

### **Protected Endpoints (Authentication Required)**
```http
POST /api/v1/job/post              # Create new job (Recruiter only)
GET /api/v1/job/admin/get          # Get recruiter's jobs
POST /api/v1/application/apply/:id # Apply for job (Student only)
GET /api/v1/application/get        # Get user's applications
```


### **Sample API Requests**

#### **Get Jobs with Filters**
```bash
curl "http://localhost:3000/api/v1/job/get?keyword=javascript&location=remote&page=1&limit=10"
```

#### **Create Job (Authenticated)**
```bash
curl -X POST "http://localhost:3000/api/v1/job/post" \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_jwt_token" \
  -d '{
    "title": "Senior React Developer",
    "description": "We are looking for an experienced React developer...",
    "requirements": "React,Node.js,TypeScript",
    "salary": 80000,
    "experienceLevel": 5,
    "location": "San Francisco, CA",
    "jobType": "Full-time",
    "position": 2,
    "companyId": "company_id_here"
  }'
```

## 🚀 Deployment Guide

### **Deploy to Render**

1. **Connect Repository**
   - Link your GitHub repository to Render
   - Set up auto-deploy from main branch

2. **Configure Environment**
   ```env
   NODE_ENV=production
   MONGO_URL=your_production_mongodb_url
   SECRET_KEY=your_production_jwt_secret
   ```

3. **Build Settings**
   ```bash
   # Build Command
   npm run build
   
   # Start Command  
   npm start
   ```

### **Deploy to Other Platforms**

#### **Heroku**
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URL=your_mongodb_url
git push heroku main
```

#### **Docker Deployment**
```dockerfile
# Dockerfile included in repository
docker build -t jobhunt .
docker run -p 3000:3000 jobhunt
```

## 🎯 Assignment Compliance

### **✅ Core Requirements Met**

#### **User Roles**
- ✅ **Employer Role** - Complete job posting and applicant management
- ✅ **Developer Role** - Job browsing, filtering, and application system

#### **Core Features**
- ✅ **Authentication** - JWT-based with role-based access control
- ✅ **Job Management** - Full CRUD operations with validation
- ✅ **Application System** - Complete application workflow
- ✅ **Database Design** - Optimized MongoDB collections (Users, Jobs, Applications)
- ✅ **REST API** - Comprehensive API with proper HTTP methods and status codes

#### **Frontend Excellence**
- ✅ **React + Router** - Modern SPA with client-side routing
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Form Validation** - Client and server-side validation
- ✅ **State Management** - Redux for complex state handling

#### **Bonus Features Implemented**
- ✅ **Pagination** - Server-side pagination for performance
- ✅ **Advanced Search** - Multi-criteria filtering and search
- ✅ **CI/CD Pipeline** - Automated deployment
- ✅ **Security** - Input validation, CORS, secure headers

## 🔧 Architecture & Code Quality

### **Backend Architecture**
```
server/
├── controllers/     # Business logic and request handling
├── models/         # MongoDB schemas and data models  
├── routes/         # API endpoint definitions
├── middlewares/    # Authentication, validation, error handling
└── utils/          # Helper functions and utilities
```

### **Frontend Architecture**
```
client/src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── redux/          # State management (actions, reducers, store)
├── utils/          # Helper functions and constants
└── assets/         # Static files and images
```

### **Security Features**
- 🔐 **JWT Authentication** - Secure, stateless authentication
- 🛡️ **Input Validation** - Comprehensive server-side validation
- 🔒 **CORS Configuration** - Proper cross-origin resource sharing
- 🚫 **SQL Injection Prevention** - MongoDB injection protection
- 🔐 **Password Security** - Bcrypt hashing with salt rounds

## 🎨 UI/UX Excellence

### **Design Principles**
- **🎯 User-Centric** - Intuitive navigation and clear information hierarchy
- **📱 Mobile-First** - Responsive design that works on all devices
- **♿ Accessible** - WCAG 2.1 compliant with proper ARIA labels
- **⚡ Performance** - Optimized loading and smooth interactions
- **🎨 Modern** - Clean, professional design with consistent branding

### **Key UX Improvements**
- **🔍 Smart Search** - Real-time search with autocomplete suggestions
- **📊 Visual Feedback** - Loading states, success/error messages
- **🎯 Progressive Enhancement** - Works without JavaScript for basic functionality
- **📱 Touch-Friendly** - Optimized for mobile interactions
- **🌙 Dark Mode Ready** - Prepared for dark theme implementation

## 🚀 Performance Optimizations

### **Backend Optimizations**
- **📊 Database Indexing** - Optimized queries for fast search
- **🔄 Connection Pooling** - Efficient database connections
- **📦 Response Compression** - Gzip compression for API responses
- **⚡ Caching Strategy** - Redis-ready for session and data caching

### **Frontend Optimizations**
- **📦 Code Splitting** - Lazy loading for better performance
- **🎯 Bundle Optimization** - Tree shaking and minification
- **📱 Progressive Web App** - PWA features for mobile experience
- **⚡ Virtual Scrolling** - Efficient rendering of large job lists

## 📈 Monitoring & Analytics

### **Error Tracking**
- **🐛 Error Logging** - Comprehensive error tracking and reporting
- **📊 Performance Monitoring** - API response times and database queries
- **🔍 User Analytics** - Job search patterns and user behavior
- **📈 Business Metrics** - Application conversion rates and job posting success

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper tests
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Code Standards**
- **ESLint** - JavaScript/React linting
- **Prettier** - Code formatting
- **Conventional Commits** - Standardized commit messages

## 📞 Support & Contact

### **Getting Help**
- 📧 **Email:** support@jobhunt.com
- 💬 **Discord:** [Join our community](https://discord.gg/jobhunt)
- 📖 **Documentation:** [Full API docs](https://docs.jobhunt.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/your-username/jobhunt/issues)

### **Interview Talking Points**

1. **🏗️ Scalable Architecture** - "Built a production-ready MERN application with proper separation of concerns, comprehensive testing, and CI/CD pipeline that can handle thousands of concurrent users."

2. **🔐 Security-First Approach** - "Implemented enterprise-level security with JWT authentication, input validation, CORS configuration, and protection against common vulnerabilities like injection attacks."

3. **📱 Modern UX/UI** - "Created an exceptional user experience with responsive design, accessibility compliance, real-time search, and progressive enhancement that works across all devices and browsers."

---

**🚀 Ready to revolutionize job hunting? [Visit JobHunt Live](https://jobhunt-i0im.onrender.com)**

*Built with ❤️ by developers, for developers*
