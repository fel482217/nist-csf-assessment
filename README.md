# NIST CSF 2.0 Assessment Platform - CSP

## Project Overview

**Cyber Security Posture (CSP)** is a comprehensive web application for managing cybersecurity assessments based on the **NIST Cybersecurity Framework 2.0**. The platform enables organizations to conduct structured assessments, track cybersecurity maturity, and manage the complete assessment lifecycle with role-based access control.

---

## 🌐 Production URLs

- **Production Application**: https://nist-csf-assessment.pages.dev
- **Latest Deployment**: https://9f845a1c.nist-csf-assessment.pages.dev
- **GitHub Repository**: https://github.com/fel482217/nist-csf-assessment

---

## 🎯 Key Features (December 2025)

### ✅ **Fully Implemented**

#### 1. **Authentication & User Management**
- 🔐 Secure login/registration system
- 👥 User roles: Administrator and Regular User
- 🛡️ Role-Based Access Control (RBAC)
- 👤 Admin-only user management (create, edit, delete users)
- 🔒 Session management with JWT tokens

#### 2. **Assessment Workflow**
- 📝 Create and manage cybersecurity assessments
- 🔄 Automatic status transitions (Draft → In Progress → Completed)
- 🔒 Read-only mode for completed assessments
- 🎯 Clean, focused assessment view (list hidden during assessment)
- ✅ Submit assessment to lock editing
- 🔓 Admin can reopen completed assessments

#### 3. **NIST CSF 2.0 Compliance**
- ✅ **6 Functions**: Govern, Identify, Protect, Detect, Respond, Recover
- ✅ **23 Categories**: Fully mapped
- ✅ **110+ Subcategories**: Complete structure
- ✅ **Official Maturity Tiers (0-4)**:
  - Tier 0: Not Assessed
  - Tier 1: Partial
  - Tier 2: Risk Informed
  - Tier 3: Repeatable
  - Tier 4: Adaptive

#### 4. **Assessment Evaluation**
- 📊 Maturity level scoring (0-4) per subcategory
- 🎯 Implementation status tracking
- 📝 Evidence, notes, gaps, and recommendations fields
- 📈 Real-time statistics and progress tracking
- 📊 Visual charts (Chart.js) for maturity by function

#### 5. **Multi-Language Support (i18n)**
- 🌍 **English** and **Español** fully supported
- 🔄 Language switcher in navigation bar
- 💾 Language preference persists across sessions
- 📖 Translated UI and framework content
- 🗂️ Database content translations (Functions, Categories, partial Subcategories)

#### 6. **Framework Documentation**
- 📚 NIST CSF 2.0 featured section with official documentation links
- 🔗 Quick access to NIST Framework PDF, Quick Start Guide, Reference Tool
- 📋 Framework structure overview (Functions, Categories, Subcategories)
- 🗺️ Framework mappings support (ISO 27001, CIS Controls, etc.)

#### 7. **Organization Management**
- 🏢 Create and manage multiple organizations
- 📊 Detailed information: industry, size, description
- 🔍 Consolidated view of all organizations
- 🗑️ Admin-only delete capability

#### 8. **Modern UI/UX**
- 🎨 Responsive design with TailwindCSS
- 🖼️ Font Awesome icons
- 📱 Mobile-friendly interface
- 🔔 Real-time notifications
- ✨ Smooth transitions and animations

---

## 🔐 User Roles & Permissions

### **Administrator**
- ✅ Full access to all features
- ✅ User management (create, edit, delete users)
- ✅ Delete assessments and organizations
- ✅ Reopen completed assessments
- ✅ All regular user capabilities

### **Regular User**
- ✅ Create and manage assessments
- ✅ Create organizations
- ✅ Respond to assessment subcategories
- ✅ Submit assessments for completion
- ✅ View all content
- ❌ Cannot delete assessments/organizations
- ❌ Cannot manage other users
- ❌ Cannot reopen completed assessments

---

## 📊 Assessment Lifecycle

```
┌─────────┐    First Response     ┌──────────────┐    Submit      ┌───────────┐
│  DRAFT  │ ──────────────────▶   │ IN PROGRESS  │ ────────────▶  │ COMPLETED │
└─────────┘     (automatic)       └──────────────┘    (manual)    └───────────┘
                                          ▲                              │
                                          │       Reopen (Admin Only)    │
                                          └──────────────────────────────┘
```

**Status Descriptions:**
- **Draft**: Initial state, can edit
- **In Progress**: Automatically set when first response added, can edit
- **Completed**: User submitted, read-only, locked (only admin can reopen)

---

## 🗄️ Data Architecture

### **Cloudflare D1 Database (SQLite)**

#### Core Tables:
- `users` - User accounts with roles
- `sessions` - Active user sessions
- `organizations` - Organizations under assessment
- `assessments` - Cybersecurity assessments
- `assessment_responses` - Responses per subcategory

#### NIST CSF Structure:
- `csf_functions` - 6 NIST CSF 2.0 functions
- `csf_categories` - 23 categories
- `csf_subcategories` - 110+ subcategories
- `csf_function_translations` - Multilingual function names
- `csf_category_translations` - Multilingual category names
- `csf_subcategory_translations` - Multilingual subcategory names (partial)

#### Framework Support:
- `frameworks` - Security frameworks (NIST CSF, ISO 27001, etc.)
- `framework_controls` - Controls per framework
- `csf_framework_mappings` - Cross-framework mappings

---

## 🚀 Getting Started

### **📚 Documentation**

**NEW: Comprehensive development guides now available!**

- **[Quick Start Guide](./QUICK_START_GUIDE.md)** - Get running in 15 minutes
- **[Technical Education Guide](./TECHNICAL_EDUCATION_GUIDE.md)** - Complete technical deep-dive (2000+ lines)
- **[User Approval Testing Guide](./USER_APPROVAL_TESTING_GUIDE.md)** - Testing user approval workflows
- **[Reports User Guide](./REPORTS_USER_GUIDE.md)** - PDF reports and analytics

### **Prerequisites**
- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- Cloudflare account (free) ([Sign up](https://dash.cloudflare.com/sign-up))
- Code editor (VS Code recommended)

### **Quick Setup (15 minutes)**

```bash
# 1. Clone repository
git clone https://github.com/fel482217/nist-csf-assessment.git
cd nist-csf-assessment

# 2. Install dependencies
npm install

# 3. Build project
npm run build

# 4. Setup local database
npx wrangler d1 migrations apply nist-csf-db --local

# 5. Load test data
npx wrangler d1 execute nist-csf-db --local --file=./seed-development.sql

# 6. Start development server
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000

# 7. Open browser: http://localhost:3000
# Login: admin@dev.local / Admin123!
```

**✅ See [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) for detailed setup instructions**

### **Deployment to Cloudflare Pages**

```bash
# Setup Cloudflare authentication (one-time)
npx wrangler login

# Deploy to production
npm run deploy
```

**✅ See [TECHNICAL_EDUCATION_GUIDE.md](./TECHNICAL_EDUCATION_GUIDE.md) for full deployment guide**

---

## 🛠️ Development Commands

```bash
# Development
npm run build                    # Build project
npm run dev                      # Local development server
npm run clean-port               # Kill process on port 3000

# Database (Local)
npm run db:migrate:local         # Apply migrations locally
npm run db:seed                  # Load test data
npm run db:reset                 # Reset DB completely
npm run db:console:local         # SQLite console

# Database (Production)
npm run db:migrate:prod          # Apply migrations to production
npm run db:console:prod          # Production DB console

# Deployment
npm run deploy                   # Deploy to Cloudflare Pages
npm run deploy:prod              # Deploy with project name

# Git
npm run git:status               # Git status
npm run git:commit               # Git commit with message
```

---

## 📁 Project Structure

```
nist-csf-assessment/
├── src/                       # Backend (TypeScript)
│   ├── index.tsx              # Main Hono backend + API routes
│   ├── types.ts               # TypeScript types & interfaces
│   ├── auth.ts                # Authentication middleware
│   └── auth-routes.ts         # Auth API endpoints
│
├── public/static/             # Frontend (JavaScript)
│   ├── app.js                 # Main app logic (~2000 lines)
│   ├── auth-ui.js             # Login/Register UI
│   ├── reports.js             # PDF reports & radar charts
│   ├── i18n.js                # Internationalization engine
│   ├── i18n/
│   │   ├── en.json            # English translations (200+ keys)
│   │   └── es.json            # Spanish translations (200+ keys)
│   └── styles.css             # Custom styles
│
├── migrations/                # Database migrations (SQL)
│   ├── 0001_initial_schema.sql
│   ├── 0003_multi_framework_support_fixed.sql
│   ├── 0004_content_i18n_support.sql
│   ├── 0005_user_authentication.sql
│   ├── 0006_fix_maturity_levels.sql
│   ├── 0007_user_organization_and_approval.sql
│   └── 0008_enhanced_response_fields.sql
│
├── docs/                      # Documentation (NEW)
│   ├── QUICK_START_GUIDE.md          # 15-min setup guide
│   ├── TECHNICAL_EDUCATION_GUIDE.md  # Complete technical guide (2000+ lines)
│   ├── USER_APPROVAL_TESTING_GUIDE.md
│   ├── USER_APPROVAL_IMPLEMENTATION.md
│   └── REPORTS_USER_GUIDE.md
│
├── seed-development.sql       # Comprehensive test data (NEW)
├── seed.sql                   # Legacy seed data
├── seed_nist_csf_translations_spanish.sql
├── ecosystem.config.cjs       # PM2 configuration
├── wrangler.jsonc             # Cloudflare config
├── vite.config.ts             # Vite build config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

**Key Directories:**
- **src/** - Backend TypeScript code (Hono + API)
- **public/static/** - Frontend JavaScript + translations
- **migrations/** - Database schema evolution
- **docs/** - Developer documentation
- **dist/** - Build output (generated, not in git)

---

## 🔧 API Endpoints

### **Authentication** (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### **Users** (Admin Only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### **Organizations** (Authenticated)
- `GET /api/organizations` - List organizations
- `POST /api/organizations` - Create organization (auth required)
- `GET /api/organizations/:id` - Get organization
- `DELETE /api/organizations/:id` - Delete organization (admin only)

### **Assessments** (Authenticated)
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment (auth required)
- `GET /api/assessments/:id` - Get assessment details
- `PUT /api/assessments/:id` - Update assessment (auth required)
- `DELETE /api/assessments/:id` - Delete assessment (admin only)
- `GET /api/assessments/:id/statistics` - Get statistics

### **NIST CSF Structure** (Public)
- `GET /api/csf/functions?lang=en` - Get functions
- `GET /api/csf/categories?function_id=GV&lang=en` - Get categories
- `GET /api/csf/subcategories?category_id=GV.OC&lang=en` - Get subcategories

### **Assessment Responses** (Authenticated)
- `GET /api/assessments/:id/responses` - Get responses
- `POST /api/responses` - Create/update response
- `PUT /api/responses/:id` - Update response

### **Frameworks** (Public)
- `GET /api/frameworks` - List frameworks
- `GET /api/frameworks/:id/controls` - Get controls
- `GET /api/mappings` - Get framework mappings

---

## 💻 Technology Stack

### **Backend**
- **Hono** (v4.0+) - Ultra-fast web framework for Cloudflare Workers (13KB)
- **Cloudflare D1** - Globally distributed SQLite database
- **TypeScript** (v5.0+) - Static typing and type safety
- **JWT/Sessions** - Secure authentication & session management

### **Frontend**
- **Vanilla JavaScript** - No framework dependencies (fast load, small bundle)
- **TailwindCSS** (CDN) - Utility-first CSS framework
- **Axios** (v1.6+) - HTTP client for API calls
- **Chart.js** (v4.4+) - Interactive radar charts for analytics
- **jsPDF** (v2.5+) - Client-side PDF generation
- **Font Awesome** (v6.4+) - Icon library

### **Infrastructure**
- **Cloudflare Pages** - Edge deployment with global CDN
- **Cloudflare Workers** - Serverless functions (edge computing)
- **Vite** (v5.0+) - Modern build tool
- **Wrangler** (v3.78+) - Cloudflare CLI for deployment
- **PM2** - Process manager for development

### **Development Tools**
- **Node.js** (v18+) - Runtime environment
- **Git** - Version control
- **VS Code** - Recommended editor

**Why this stack?**
- **$0 cost** - Cloudflare free tier is very generous
- **<50ms latency** - Edge computing from 300+ global locations
- **Zero cold starts** - Always "warm" workers
- **Deploy in 15s** - `npm run deploy` and done
- **Infinite scale** - Auto-scales without configuration

**See [TECHNICAL_EDUCATION_GUIDE.md](./TECHNICAL_EDUCATION_GUIDE.md) for detailed architecture explanation**

---

## 📋 Recent Updates (December 3, 2025)

### ✅ **Security Improvements**
- Removed demo credentials from login window (security vulnerability)
- Enhanced credential management

### ✅ **NIST CSF 2.0 Compliance**
- Fixed maturity levels from 0-5 to official 0-4 scale
- Updated UI labels with official tier names
- Database migration for existing data

### ✅ **Assessment Workflow**
- Simplified "New Assessment" form (removed framework selector)
- NIST CSF 2.0 is now the default framework
- Enhanced assessment view (clean navigation)
- Automatic status management
- Submit/Complete assessment functionality
- Read-only mode for completed assessments
- Admin reopen capability

### ✅ **Framework Documentation**
- Added NIST CSF 2.0 featured section
- Integrated official documentation links
- Framework structure overview

### ✅ **Backup & Documentation**
- Complete project backup created
- Updated all documentation
- Changelog maintained

---

## 📦 Backup Information

**Latest Backup**: 2025-12-03
**Backup URL**: https://www.genspark.ai/api/files/s/52WEK9ET
**Size**: 5.79 MB
**Description**: Complete platform backup including all features, migrations, and documentation

---

## 🔜 Future Enhancements

### Potential Improvements:
1. **Complete Spanish Translations** (105 subcategories remaining)
2. **Advanced Reporting** (PDF export, radar charts)
3. **Assessment Comparison** (timeline, trends)
4. **Evidence Attachments** (document upload)
5. **Email Notifications** (assessment reminders)
6. **Benchmarking** (industry comparisons)
7. **Action Plans** (automated remediation plans)

---

## 📝 License & Credits

Developed for enterprise cybersecurity management based on NIST standards.

**Framework**: NIST Cybersecurity Framework 2.0
**Platform**: Cloudflare Pages + D1
**Last Updated**: December 3, 2025
**Status**: ✅ Production Ready
