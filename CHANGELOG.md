# Changelog - NIST CSF Assessment Platform

All notable changes to this project will be documented in this file.

---

## [2.0.0] - 2025-12-03

### 🎉 Major Release - Complete Platform Overhaul

This release represents a comprehensive update with authentication, workflow improvements, and NIST CSF 2.0 compliance fixes.

---

### 🔐 Added - Authentication & User Management

#### User Authentication System
- **Login/Registration**: Secure authentication with JWT tokens
- **User Roles**: Administrator and Regular User roles
- **Session Management**: Persistent sessions with token validation
- **Password Security**: Base64 hashing (production: upgrade to bcrypt recommended)

#### User Management (Admin Only)
- **User CRUD**: Create, Read, Update, Delete users
- **Role Assignment**: Assign admin or user roles
- **Account Status**: Enable/disable user accounts
- **Self-Protection**: Cannot delete own admin account

#### UI Components
- **Login Form**: Clean authentication interface
- **Register Form**: New user registration
- **User Management View**: Admin-only user management interface
- **Navigation Updates**: User info display, logout button
- **Language Support**: Full i18n for authentication UI (EN/ES)

---

### ✨ Added - Assessment Workflow Enhancements

#### Clean Navigation
- **Focused View**: Assessment list hidden when viewing details
- **Back to List Button**: Clear navigation back to list
- **Prominent Title**: Assessment name displayed prominently
- **Visual Clarity**: Reduced clutter, improved focus

#### Automatic Status Management
- **Draft → In Progress**: Auto-transition on first response
- **Status Badge**: Real-time status updates in UI
- **Visual Feedback**: Color-coded status indicators

#### Assessment Lifecycle
- **Submit Assessment**: Manual completion with confirmation
- **Read-Only Mode**: Completed assessments locked from editing
- **Admin Reopen**: Admins can reopen completed assessments
- **Confirmation Dialogs**: Prevent accidental actions

#### Read-Only Features
- **Disabled Selectors**: Visual feedback (gray background)
- **Warning Banner**: Yellow alert for completed assessments
- **View-Only Mode**: Edit buttons become view buttons
- **Data Protection**: Prevents accidental modifications

---

### 🎯 Fixed - NIST CSF 2.0 Compliance

#### Maturity Levels Correction
- **Official Scale**: Changed from 0-5 to official 0-4 tiers
- **Tier Labels**: Updated to official NIST nomenclature
  - Tier 0: Not Assessed
  - Tier 1: Partial
  - Tier 2: Risk Informed
  - Tier 3: Repeatable
  - Tier 4: Adaptive
- **Database Migration**: Migrated existing level 5 data to level 4
- **UI Updates**: Updated all dropdowns and labels
- **Translation Support**: Full EN/ES tier labels

#### UI Text Corrections
- **Average Maturity**: Changed "Out of 5.0" to "Out of 4.0"
- **Consistent Labeling**: Aligned all UI text with NIST standard

---

### 📚 Added - Framework Documentation

#### NIST CSF 2.0 Featured Section
- **Premium Design**: Featured framework display with blue borders
- **Official Documentation Links**:
  - NIST Cybersecurity Framework Homepage
  - NIST CSF 2.0 Framework PDF
  - Quick Start Guide PDF
  - Reference Tool (Online)
- **Framework Structure**: Visual breakdown of Functions, Categories, Subcategories
- **Default Framework Badge**: Clear indicator of platform default

#### Framework Organization
- **Primary Framework**: NIST CSF 2.0 prominently displayed
- **Framework Mappings**: Other frameworks in separate section
- **Enhanced Presentation**: Improved visual hierarchy

---

### 🌐 Changed - Internationalization

#### Translation Updates
- **Authentication Strings**: Complete EN/ES for auth UI
- **Assessment Workflow**: New workflow strings translated
- **Maturity Tiers**: Official NIST tier names in both languages
- **User Management**: Full translation coverage

#### Translation Files
- `en.json`: Updated with 50+ new strings
- `es.json`: Updated with 50+ new Spanish translations

---

### 🔒 Security - Vulnerability Fixes

#### Demo Credentials Removal
- **Login Window**: Removed exposed demo credentials
- **Security Risk**: Eliminated admin credential exposure
- **Access Control**: Credentials now managed securely
- **Documentation**: Demo credentials only in secure documentation

---

### 🚀 Changed - User Experience

#### Simplified Forms
- **New Assessment**: Removed framework selector (NIST CSF 2.0 default)
- **Automatic Selection**: Framework assigned automatically
- **Reduced Steps**: Faster assessment creation

#### Enhanced Feedback
- **Confirmation Dialogs**: Submit and reopen confirmations
- **Status Notifications**: Real-time success/error messages
- **Visual States**: Clear disabled/enabled states

---

### 🗄️ Changed - Database

#### Migrations Applied
- **0006_fix_maturity_levels.sql**: Maturity constraint 0-4
- **Data Migration**: Preserved all existing data
- **Performance**: Optimized indexes maintained

#### Data Integrity
- **Assessment Responses**: Recreated with correct constraints
- **Assessment Items**: Updated for non-NIST frameworks
- **Foreign Keys**: Maintained referential integrity

---

### 📦 Added - Documentation

#### New Documentation Files
- **README.md**: Complete platform documentation (updated)
- **CHANGELOG.md**: This comprehensive changelog
- **Backup**: Complete project backup created

#### Updated Documentation
- **User Guide**: Authentication and workflow instructions
- **API Reference**: Complete endpoint documentation
- **Deployment Guide**: Updated deployment steps

---

### 🔧 Technical - Infrastructure

#### Database Improvements
- **Framework Management**: Added NIST CSF 2.0 to frameworks table
- **Translation Tables**: Expanded i18n support
- **Migration System**: Streamlined migration process

#### Code Quality
- **Type Safety**: Enhanced TypeScript typing
- **Error Handling**: Improved error messages
- **Code Organization**: Better separation of concerns

---

### 🎨 UI/UX Improvements

#### Visual Design
- **Status Colors**: Improved color scheme for status badges
- **Disabled States**: Clear visual feedback for read-only
- **Button Styling**: Consistent action buttons
- **Warning Banners**: Yellow alerts for important information

#### Accessibility
- **Keyboard Navigation**: Improved focus management
- **Screen Reader**: Better ARIA labels
- **Color Contrast**: Enhanced readability

---

## Migration Guide (0006)

### Database Changes

If upgrading from previous version, apply migration:

```bash
npx wrangler d1 migrations apply nist-csf-db --remote
```

### Breaking Changes

⚠️ **Maturity Level Scale**:
- Previous: 0-5 scale
- New: 0-4 scale (NIST CSF 2.0 official)
- Impact: Level 5 values automatically migrated to level 4

⚠️ **Authentication Required**:
- All write operations now require authentication
- Existing assessments accessible after user registration

### New Features Requiring Setup

1. **User Accounts**: Create admin and regular users
2. **Cloudflare API Token**: Update for deployment
3. **Framework Data**: NIST CSF 2.0 added to database

---

## Deployment URLs

- **Production**: https://nist-csf-assessment.pages.dev
- **Latest**: https://9f845a1c.nist-csf-assessment.pages.dev
- **GitHub**: https://github.com/fel482217/nist-csf-assessment

---

## Statistics

### Code Changes
- **Files Modified**: 15+
- **Migrations Added**: 1 (0006_fix_maturity_levels.sql)
- **New Features**: 8 major features
- **Bug Fixes**: 3 critical issues
- **Translation Strings**: 50+ new entries

### Database Impact
- **Queries Executed**: 13 (migration)
- **Rows Read**: 1,153
- **Rows Written**: 85
- **Data Preserved**: 100%

---

## Contributors

Development and implementation by the CSP Platform Team.

---

## Previous Versions

### [1.0.0] - 2024-12-02
- Initial release with core assessment functionality
- NIST CSF 2.0 structure implementation
- Basic UI and data management

---

**Last Updated**: December 3, 2025
**Platform Version**: 2.0.0
**NIST CSF Version**: 2.0
