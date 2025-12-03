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

### **Prerequisites**
- Node.js 18+
- Cloudflare account
- Wrangler CLI

### **Installation**

```bash
# Clone repository
git clone https://github.com/fel482217/nist-csf-assessment.git
cd nist-csf-assessment

# Install dependencies
npm install

# Setup database (local development)
npm run db:migrate:local
npm run db:seed

# Build project
npm run build

# Start development server
pm2 start ecosystem.config.cjs
```

### **Deployment to Cloudflare Pages**

```bash
# Setup Cloudflare authentication
# Use the 'Deploy' tab in the interface to configure your API token

# Deploy to production
npm run deploy
```

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
webapp/
├── src/
│   ├── index.tsx              # Main Hono backend
│   ├── types.ts               # TypeScript types
│   ├── auth.ts                # Authentication logic
│   └── auth-routes.ts         # Auth API routes
├── public/
│   └── static/
│       ├── app.js             # Frontend JavaScript
│       ├── auth-ui.js         # Authentication UI
│       ├── i18n.js            # Internationalization
│       ├── i18n/
│       │   ├── en.json        # English translations
│       │   └── es.json        # Spanish translations
│       └── styles.css         # Custom styles
├── migrations/
│   ├── 0001_initial_schema.sql
│   ├── 0003_multi_framework_support_fixed.sql
│   ├── 0004_content_i18n_support.sql
│   ├── 0005_user_authentication.sql
│   └── 0006_fix_maturity_levels.sql
├── seed.sql                   # Test data
├── seed_nist_csf_translations_spanish.sql
├── ecosystem.config.cjs       # PM2 configuration
├── wrangler.jsonc             # Cloudflare config
├── vite.config.ts             # Vite config
└── package.json               # Dependencies
```

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
- **Hono** - Ultra-fast web framework for Cloudflare Workers
- **Cloudflare D1** - Distributed SQLite database
- **TypeScript** - Static typing
- **JWT** - Session management

### **Frontend**
- **Vanilla JavaScript** - No framework dependencies
- **TailwindCSS** - Modern CSS framework
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Font Awesome** - Icons

### **Infrastructure**
- **Cloudflare Pages** - Edge deployment
- **Cloudflare Workers** - Serverless functions
- **Vite** - Build tool
- **PM2** - Process manager (development)

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
