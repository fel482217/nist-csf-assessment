# Guía de Educación Técnica - NIST CSF Assessment Platform

## 🚀 Inicio Rápido (5 Minutos)

**Si quieres empezar YA, sigue estos pasos:**

```bash
# 1. Verificar prerequisitos (30 segundos)
node --version   # Debe ser v18+
git --version    # Debe existir

# 2. Clonar proyecto (30 segundos)
git clone https://github.com/fel482217/nist-csf-assessment.git
cd nist-csf-assessment

# 3. Instalar dependencias (2 minutos)
npm install

# 4. Build proyecto (30 segundos)
npm run build

# 5. Crear database local (30 segundos)
npx wrangler d1 migrations apply nist-csf-db --local

# 6. Seed data de prueba (30 segundos)
npx wrangler d1 execute nist-csf-db --local --file=./seed-development.sql

# 7. Iniciar servidor (10 segundos)
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000

# 8. Abrir browser
# http://localhost:3000
# Login: admin@dev.local / Admin123!
```

**✅ Si llegaste hasta aquí y funciona, ya tienes tu ambiente de desarrollo listo.**

**Para entender qué acabas de hacer, continúa leyendo esta guía →**

---

## 📋 Resumen Ejecutivo

### **¿Qué es este proyecto?**

Una plataforma web para realizar evaluaciones de seguridad cibernética basadas en NIST CSF 2.0 (Cybersecurity Framework).

### **Stack Tecnológico (en 30 segundos):**

```
Frontend:  HTML + Tailwind CSS + Vanilla JavaScript
Backend:   Hono (TypeScript) en Cloudflare Workers
Database:  Cloudflare D1 (SQLite distribuido globalmente)
Hosting:   Cloudflare Pages (Edge computing)
Deploy:    Wrangler CLI + Git
```

### **¿Por qué esta arquitectura?**

| Ventaja | Beneficio |
|---------|-----------|
| **Edge Computing** | Respuesta <50ms desde cualquier ubicación mundial |
| **$0 costo** | Plan gratuito de Cloudflare muy generoso |
| **Deploy en 15s** | `npm run deploy` y listo |
| **Escalabilidad infinita** | Auto-escala sin configuración |
| **HTTPS gratis** | SSL/TLS incluido automáticamente |
| **Zero cold starts** | Siempre "caliente", sin delays |

### **¿Qué necesitas para desarrollar?**

**Software OBLIGATORIO:**
- ✅ Node.js v18+ (runtime)
- ✅ Git (version control)
- ✅ Editor de código (VS Code recomendado)
- ✅ Cuenta Cloudflare (100% gratis)
- ✅ Terminal/Command Line

**Tiempo setup:** ~15 minutos primera vez

### **Ambientes de Desarrollo:**

| Ambiente | Ubicación | Database | Propósito |
|----------|-----------|----------|-----------|
| **Development** | Tu laptop (localhost:3000) | SQLite local | Desarrollo diario |
| **Staging** | Cloudflare Pages | D1 staging | Testing pre-producción |
| **Production** | Cloudflare Pages | D1 production | Usuarios reales |

### **Flujo de Trabajo Básico:**

```
1. Modificar código en editor
2. npm run build
3. Test en localhost:3000
4. git commit -m "descripción"
5. npm run deploy
6. Verificar en URL de producción
```

### **URLs del Proyecto:**

- **Producción**: https://nist-csf-assessment.pages.dev
- **GitHub**: https://github.com/fel482217/nist-csf-assessment
- **Documentación Cloudflare**: https://developers.cloudflare.com

---

## 📚 Índice

1. [Stack Tecnológico Completo](#stack-tecnológico-completo)
2. [¿Por Qué Esta Tecnología?](#por-qué-esta-tecnología)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Componentes Detallados](#componentes-detallados)
5. [Configurar Ambiente de Desarrollo Local](#configurar-ambiente-de-desarrollo-local)
6. [Workflow de Desarrollo](#workflow-de-desarrollo)
7. [Ambientes: Desarrollo, Pruebas, Producción](#ambientes-desarrollo-pruebas-producción)
8. [Cómo Hacer Cambios](#cómo-hacer-cambios)
9. [Troubleshooting Común](#troubleshooting-común)
10. [Recursos y Documentación](#recursos-y-documentación)

---

## 1. Stack Tecnológico Completo

### **Frontend (Interfaz de Usuario)**
```
┌─────────────────────────────────────────┐
│ HTML5 + Tailwind CSS + JavaScript      │
│ - Vanilla JavaScript (No framework)     │
│ - Tailwind CSS (Utility-first CSS)      │
│ - Font Awesome (Icons)                  │
│ - Axios (HTTP client)                   │
│ - Chart.js (Radar charts)               │
│ - jsPDF (PDF generation)                │
└─────────────────────────────────────────┘
```

### **Backend (Servidor)**
```
┌─────────────────────────────────────────┐
│ Hono Framework (TypeScript)             │
│ - Edge-first web framework              │
│ - Runs on Cloudflare Workers            │
│ - TypeScript for type safety            │
│ - Middleware: CORS, Auth, Admin         │
└─────────────────────────────────────────┘
```

### **Base de Datos**
```
┌─────────────────────────────────────────┐
│ Cloudflare D1 (SQLite)                  │
│ - Globally distributed SQLite           │
│ - SQL migrations                         │
│ - 18 tables, 6 migrations               │
└─────────────────────────────────────────┘
```

### **Infraestructura**
```
┌─────────────────────────────────────────┐
│ Cloudflare Pages + Workers              │
│ - Edge computing (300+ locations)       │
│ - Automatic HTTPS                        │
│ - Global CDN                             │
│ - Zero cold starts                       │
└─────────────────────────────────────────┘
```

### **Herramientas de Desarrollo**
```
┌─────────────────────────────────────────┐
│ - Node.js (Runtime)                     │
│ - npm (Package manager)                 │
│ - Vite (Build tool)                     │
│ - Wrangler (Cloudflare CLI)            │
│ - Git (Version control)                 │
│ - TypeScript (Type checking)            │
└─────────────────────────────────────────┘
```

---

## 2. ¿Por Qué Esta Tecnología?

### **¿Por Qué Cloudflare Workers/Pages?**

#### **Ventajas:**
1. **Edge Computing**: Código se ejecuta cerca del usuario (300+ ubicaciones globales)
2. **Escalabilidad Infinita**: Escala automáticamente sin configuración
3. **Costo $0**: Plan gratuito muy generoso (100k requests/día)
4. **Velocidad**: Respuesta en <50ms desde cualquier parte del mundo
5. **Zero Cold Starts**: Siempre está "caliente", no hay delays de inicio
6. **Deploy en Segundos**: `wrangler pages deploy` y listo
7. **HTTPS Automático**: SSL/TLS incluido sin configuración
8. **Git Integration**: Deploy automático desde GitHub

#### **Comparado con Alternativas:**

| Característica | Cloudflare Workers | AWS Lambda | Heroku | VPS Tradicional |
|----------------|-------------------|------------|--------|-----------------|
| **Cold Starts** | ❌ Nunca | ⚠️ 1-5s | ⚠️ 30s | ❌ N/A |
| **Costo Gratis** | ✅ 100k req/día | ⚠️ 1M req/mes | ❌ $7/mes | ❌ $5-10/mes |
| **Deploy Time** | ✅ 10-15s | ⚠️ 2-5 min | ⚠️ 5-10 min | ❌ Manual |
| **Escalabilidad** | ✅ Infinita | ✅ Infinita | ⚠️ Limitada | ❌ Manual |
| **Edge Locations** | ✅ 300+ | ⚠️ ~30 | ❌ 1-2 | ❌ 1 |
| **HTTPS Setup** | ✅ Auto | ⚠️ Manual | ✅ Auto | ❌ Manual |
| **Mantenimiento** | ✅ Cero | ⚠️ Bajo | ⚠️ Medio | ❌ Alto |

### **¿Por Qué Hono Framework?**

#### **Ventajas:**
1. **Ultra Ligero**: 13KB (vs Express 200KB)
2. **Diseñado para Edge**: Funciona perfecto en Workers
3. **TypeScript First**: Type safety nativo
4. **Rápido**: 3x más rápido que Express
5. **Middleware Moderno**: Similar a Express pero mejor
6. **Multi-Runtime**: Funciona en Workers, Node, Deno, Bun

#### **Comparado con Alternativas:**

| Framework | Tamaño | Edge-Ready | TypeScript | Velocidad | Learning Curve |
|-----------|--------|------------|------------|-----------|----------------|
| **Hono** | 13KB | ✅ Sí | ✅ Nativo | ⚡ Rápido | 📘 Fácil |
| Express | 200KB | ❌ No | ⚠️ Tipos externos | ⚠️ Medio | 📘 Fácil |
| Fastify | 150KB | ❌ No | ✅ Bueno | ⚡ Rápido | 📙 Medio |
| Next.js | 500KB+ | ⚠️ Parcial | ✅ Bueno | ⚠️ Medio | 📕 Difícil |

**Ejemplo de Código Hono:**
```typescript
import { Hono } from 'hono'

const app = new Hono()

// Simple route
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello World' })
})

// With middleware
app.use('/api/*', cors())

// With types
type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/users', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM users').all()
  return c.json(results)
})

export default app
```

### **¿Por Qué Cloudflare D1 (SQLite)?**

#### **Ventajas:**
1. **SQL Completo**: SQLite real, no NoSQL limitado
2. **Globally Distributed**: Réplicas automáticas en todo el mundo
3. **Migrations**: Sistema de migraciones SQL estándar
4. **Gratis**: 5 GB de almacenamiento incluido
5. **Familiar**: Si sabes SQL, ya sabes D1
6. **Read Performance**: Lecturas desde la réplica más cercana
7. **ACID Compliant**: Transacciones garantizadas

#### **Comparado con Alternativas:**

| Base de Datos | Tipo | Costo/Mes | Latencia | SQL Completo | Escalabilidad |
|---------------|------|-----------|----------|--------------|---------------|
| **Cloudflare D1** | SQL | $0 (5GB) | ~10ms | ✅ Sí | ✅ Global |
| PostgreSQL (Supabase) | SQL | $25 | ~50ms | ✅ Sí | ⚠️ Regional |
| MySQL (PlanetScale) | SQL | $29 | ~80ms | ✅ Sí | ⚠️ Regional |
| MongoDB Atlas | NoSQL | $9 | ~100ms | ❌ No | ✅ Global |
| Firebase | NoSQL | $0.18/GB | ~60ms | ❌ No | ✅ Global |

**Ejemplo de Queries D1:**
```typescript
// Simple query
const { results } = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
  .bind(userId)
  .all()

// Transaction
await c.env.DB.batch([
  c.env.DB.prepare('INSERT INTO users (name, email) VALUES (?, ?)').bind('John', 'john@example.com'),
  c.env.DB.prepare('INSERT INTO sessions (user_id, token) VALUES (?, ?)').bind(1, 'abc123')
])

// Join query
const { results } = await c.env.DB.prepare(`
  SELECT u.name, o.name as org_name 
  FROM users u 
  LEFT JOIN organizations o ON u.organization_id = o.id
  WHERE u.is_active = 1
`).all()
```

### **¿Por Qué Vanilla JavaScript (No React/Vue)?**

#### **Ventajas:**
1. **Cero Build Time**: No compilación para desarrollo
2. **Bundle Pequeño**: Sin framework overhead
3. **Performance**: Carga instantánea
4. **Control Total**: Sin abstracciones innecesarias
5. **Fácil Debug**: Código JavaScript directo
6. **CDN Directo**: Librerías desde CDN

#### **Cuando Usar Framework:**
- ❌ **No usar** para apps simples/medianas
- ✅ **Sí usar** si tienes 100+ componentes
- ✅ **Sí usar** si necesitas estado complejo global
- ✅ **Sí usar** si tienes equipo grande

**Nuestro caso:** 
- ✅ App mediana (15 vistas)
- ✅ Estado simple (localStorage + axios)
- ✅ Desarrollo rápido requerido
- ✅ Bundle size crítico (edge computing)

### **¿Por Qué Tailwind CSS?**

#### **Ventajas:**
1. **No CSS Custom**: Todo utility classes
2. **Consistency**: Design system built-in
3. **Responsive**: Mobile-first por defecto
4. **Small Bundle**: Solo lo que usas (con purge)
5. **Rápido**: No pensar nombres de clases
6. **CDN Available**: Sin build necesario

**Ejemplo:**
```html
<!-- Antes (CSS tradicional) -->
<style>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>
<div class="card">Content</div>

<!-- Ahora (Tailwind) -->
<div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
  Content
</div>
```

---

## 3. Arquitectura del Sistema

### **Diagrama de Arquitectura Completo**

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                           │
│                    (Browser: Chrome/Firefox)                    │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE GLOBAL NETWORK                     │
│                    (300+ Edge Locations)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Cloudflare Pages (Frontend)                  │  │
│  │  - HTML, CSS, JavaScript                                  │  │
│  │  - Static files from /public/                             │  │
│  │  - Auto HTTPS, CDN, DDoS protection                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                   │
│                             │ API Calls (/api/*)                │
│                             ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Cloudflare Workers (Backend)                    │  │
│  │  - Hono Framework (TypeScript)                            │  │
│  │  - Authentication middleware                               │  │
│  │  - API routes                                              │  │
│  │  - Business logic                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                   │
│                             │ SQL Queries                       │
│                             ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             Cloudflare D1 (SQLite)                        │  │
│  │  - Primary DB (write)                                      │  │
│  │  - Read replicas (global)                                  │  │
│  │  - Automatic replication                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      DEVELOPER TOOLS                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │    Git     │  │  Wrangler  │  │    Vite    │                │
│  │  (GitHub)  │  │    CLI     │  │   (Build)  │                │
│  └────────────┘  └────────────┘  └────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

### **Flujo de Datos Completo**

#### **Ejemplo: Usuario Crea un Assessment**

```
1. FRONTEND (Browser)
   ↓
   Usuario llena formulario "New Assessment"
   - Organization: Acme Corporation
   - Assessment Name: Q4 2025 Security Review
   - Date: 2025-12-03
   ↓
   JavaScript captura el submit:
   
   const data = {
     organization_id: 1,
     name: "Q4 2025 Security Review",
     assessment_date: "2025-12-03",
     framework_id: 7,  // NIST CSF 2.0
     status: "draft"
   }
   
   axios.post('/api/assessments', data)

2. CLOUDFLARE WORKER (Edge)
   ↓
   Request llega al Worker más cercano
   ↓
   Hono routing: app.post('/api/assessments', ...)
   ↓
   Middleware requireAuth() verifica JWT token
   ↓
   Handler function:
   
   const result = await c.env.DB.prepare(`
     INSERT INTO assessments (organization_id, name, assessment_date, framework_id, status)
     VALUES (?, ?, ?, ?, ?)
   `).bind(1, "Q4 2025...", "2025-12-03", 7, "draft").run()

3. CLOUDFLARE D1 (Database)
   ↓
   Query ejecutado en primary database
   ↓
   INSERT INTO assessments...
   ↓
   Row creado con id = 42
   ↓
   Replicación automática a todas las edge locations
   ↓
   Return: { id: 42, last_row_id: 42, changes: 1 }

4. WORKER → FRONTEND
   ↓
   return c.json({ id: 42, ...data }, 201)
   ↓
   Response JSON enviado al browser

5. FRONTEND
   ↓
   axios.post(...).then(response => {
     showNotification('Assessment created!', 'success')
     loadAssessments()  // Refresh list
   })
   ↓
   UI actualizado, usuario ve nuevo assessment en la lista
```

#### **Tiempo Total:** ~50-100ms (dependiendo de ubicación del usuario)

---

## 4. Componentes Detallados

### **4.1 Frontend Files**

#### **src/index.tsx** (Main Entry Point)
```typescript
// Este archivo genera el HTML completo que se sirve
// Incluye:
// - <head> con meta tags
// - Navigation bar
// - Todas las vistas (assessments, frameworks, reports, etc.)
// - Script tags para librerías
// - Inline scripts de inicialización

// Es procesado por Vite y genera dist/_worker.js
```

**Responsabilidades:**
- Definir estructura HTML base
- Importar Hono app
- Configurar rutas API
- Servir archivos estáticos

#### **public/static/app.js** (Main Application Logic)
```javascript
// ~2000 líneas de JavaScript vanilla
// Responsabilidades:
// 1. View management (showView, loadAssessments, etc.)
// 2. CRUD operations (create, read, update, delete)
// 3. UI rendering (dynamic HTML generation)
// 4. Event handlers (clicks, forms, etc.)
// 5. API calls (via axios)
// 6. State management (currentAssessment, currentView, etc.)

// Key functions:
// - init(): Initialize app
// - showView(viewName): Switch between views
// - loadAssessments(): Fetch and display assessments
// - viewAssessmentDetail(id): Open assessment detail
// - updateResponse(): Save assessment responses
// - showResponseDetail(): Open modal for detailed fields
```

#### **public/static/auth-ui.js** (Authentication)
```javascript
// Responsabilidades:
// 1. Login/Register forms
// 2. JWT token management (localStorage)
// 3. Authentication state (window.authState)
// 4. UI updates based on auth status
// 5. Logout functionality

// Global state:
window.authState = {
  isAuthenticated: false,
  user: null,
  token: null
}
```

#### **public/static/reports.js** (Reports Module)
```javascript
// Responsabilidades:
// 1. PDF generation (jsPDF)
// 2. Radar chart visualization (Chart.js)
// 3. Assessment comparisons
// 4. Multi-org comparisons (admin)
// 5. Export functionality
```

#### **public/static/i18n.js** (Internationalization)
```javascript
// Responsabilidades:
// 1. Load translation files (en.json, es.json)
// 2. Translate page elements (data-i18n attribute)
// 3. Language switching
// 4. Fallback to English if translation missing

// Usage:
// <span data-i18n="nav.assessments">Assessments</span>
// → Translations applied automatically
```

#### **public/static/i18n/en.json** & **es.json**
```json
{
  "nav": {
    "assessments": "Assessments",  // "Evaluaciones"
    "frameworks": "Frameworks",    // "Marcos"
    "reports": "Reports"           // "Reportes"
  },
  "assessments": { ... },
  "evaluation": { ... },
  // ... 200+ translation keys
}
```

### **4.2 Backend Files**

#### **src/index.tsx** (Backend API)
```typescript
// ~900 líneas de TypeScript
// Hono app con todas las rutas API

// Structure:
// 1. Imports
// 2. Type definitions (Bindings)
// 3. App initialization: const app = new Hono<{ Bindings: Bindings }>()
// 4. Middleware: CORS, Auth
// 5. Authentication routes (auth-routes.ts)
// 6. API routes organized by resource:
//    - Users (Admin only)
//    - Organizations
//    - Assessments
//    - Responses
//    - CSF (Functions, Categories, Subcategories)
//    - Frameworks
//    - Statistics
// 7. Export: export default app

// Key patterns:
// - requireAuth middleware for protected routes
// - requireAdmin for admin-only routes
// - Binding: c.env.DB for database access
// - Type safety: TypeScript interfaces for requests
```

#### **src/auth-routes.ts** (Authentication Routes)
```typescript
// Authentication endpoints:
// POST /api/auth/register - Create new user (pending approval)
// POST /api/auth/login - Authenticate user
// POST /api/auth/logout - Invalidate session
// GET /api/auth/me - Get current user info

// Key logic:
// 1. Password hashing (btoa - should be bcrypt in production)
// 2. JWT token generation (jose library)
// 3. Session management (sessions table)
// 4. Approval workflow (is_approved check)
```

#### **src/auth.ts** (Auth Middleware)
```typescript
// Middleware functions:
// - requireAuth: Verify JWT token, attach user to context
// - requireAdmin: Check if user.role === 'admin'
// - getCurrentUser: Extract user from context

// Usage:
app.get('/api/users', requireAuth, requireAdmin, async (c) => {
  // Only admins can access this
})
```

#### **src/types.ts** (TypeScript Types)
```typescript
// Type definitions for:
// - Bindings (D1Database, KV, R2)
// - Request types (CreateAssessmentRequest, UpdateResponseRequest, etc.)
// - Response types
// - Database models (User, Assessment, Response, etc.)

// Example:
export type Bindings = {
  DB: D1Database
  KV?: KVNamespace
  R2?: R2Bucket
}

export interface CreateAssessmentRequest {
  organization_id: number
  name: string
  assessment_date: string
  framework_id: number
  status?: string
}
```

### **4.3 Database**

#### **migrations/** (SQL Migrations)
```
0001_initial_schema.sql           - Initial tables
0003_multi_framework_support.sql  - Framework support
0004_content_i18n_support.sql     - Internationalization
0005_user_authentication.sql      - Users & sessions
0006_fix_maturity_levels.sql      - 0-4 constraint
0007_user_organization_and_approval.sql - Organization + approval
0008_enhanced_response_fields.sql - Control owner + action plan
```

**Aplicar migraciones:**
```bash
# Local development
npx wrangler d1 migrations apply nist-csf-db --local

# Production
npx wrangler d1 migrations apply nist-csf-db --remote
```

#### **Database Schema (18 tables)**

**Core Tables:**
```sql
-- Organizations
organizations (id, name, industry, size, description, created_at)

-- Users & Auth
users (id, email, name, password_hash, role, is_active, is_approved, organization_id)
sessions (id, user_id, token, expires_at, created_at)

-- Assessments
assessments (id, organization_id, framework_id, name, assessment_date, status, created_at)
assessment_responses (id, assessment_id, csf_subcategory_id, maturity_level, 
                      implementation_status, evidence, notes, gaps, action_plan,
                      recommendations, control_owner_id, created_at, updated_at)

-- NIST CSF Structure
csf_functions (id, identifier, name, description, sequence)
csf_categories (id, function_id, identifier, name, description, sequence)
csf_subcategories (id, category_id, identifier, name, description, sequence)

-- Translations
csf_function_translations (id, function_id, language, name, description)
csf_category_translations (id, category_id, language, name, description)
csf_subcategory_translations (id, subcategory_id, language, name, description)

-- Other Frameworks
frameworks (id, code, name, version, description, url)
framework_controls (id, framework_id, identifier, name, description)
framework_translations (id, framework_id, language, name, description)
csf_framework_mappings (id, csf_subcategory_id, framework_control_id)
```

**Key Relationships:**
```
organizations 1─────┤ assessments
              └─────┤ users

users 1─────┤ sessions
      └─────┤ assessment_responses (control_owner_id)

assessments 1─────┤ assessment_responses

csf_functions 1─────┤ csf_categories 1─────┤ csf_subcategories

csf_subcategories 1─────┤ assessment_responses
                  └─────┤ csf_framework_mappings

frameworks 1─────┤ framework_controls 1─────┤ csf_framework_mappings
```

### **4.4 Configuration Files**

#### **wrangler.jsonc** (Cloudflare Config)
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "nist-csf-assessment",
  "main": "src/index.tsx",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist",
  
  // Database binding
  "d1_databases": [
    {
      "binding": "DB",                    // Accessed via c.env.DB
      "database_name": "nist-csf-db",
      "database_id": "d90a14c0-..."       // From wrangler d1 create
    }
  ]
}
```

#### **package.json** (Dependencies)
```json
{
  "name": "nist-csf-assessment",
  "version": "2.3.0",
  "scripts": {
    "dev": "vite",                          // Local dev server
    "build": "vite build",                  // Build for production
    "preview": "wrangler pages dev dist",   // Preview build locally
    "deploy": "npm run build && wrangler pages deploy dist"
  },
  "dependencies": {
    "hono": "^4.0.0"                        // Backend framework
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.0.0",  // Types for Workers
    "@hono/vite-cloudflare-pages": "^0.4.2", // Vite plugin
    "vite": "^5.0.0",                       // Build tool
    "wrangler": "^3.78.0",                  // Cloudflare CLI
    "typescript": "^5.0.0"                  // TypeScript compiler
  }
}
```

#### **vite.config.ts** (Build Configuration)
```typescript
import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig({
  plugins: [pages()],    // Cloudflare Pages plugin
  build: {
    outDir: 'dist'       // Output directory
  }
})
```

#### **tsconfig.json** (TypeScript Config)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx",
    "moduleResolution": "bundler",
    "types": ["@cloudflare/workers-types"]
  }
}
```

---

## 5. Configurar Ambiente de Desarrollo Local

### **5.1 Software Requerido**

#### **Node.js y npm (CRÍTICO - Obligatorio)**

Node.js es el runtime de JavaScript que ejecuta todo el tooling del proyecto.

**Versión requerida:** Node.js v18 o superior

**Instalación por Sistema Operativo:**

**Windows:**
1. Descargar desde: https://nodejs.org/
2. Elegir versión LTS (Long Term Support) - recomendado v20.x
3. Ejecutar instalador `.msi`
4. Durante instalación:
   - ✅ Marcar "Add to PATH"
   - ✅ Instalar tools adicionales (Python, Chocolatey)
5. Reiniciar computadora
6. Abrir PowerShell o CMD y verificar:
   ```powershell
   node --version   # Debe mostrar v18.x o superior
   npm --version    # Debe mostrar 9.x o superior
   ```

**macOS:**
```bash
# Opción 1: Homebrew (recomendado)
brew install node

# Opción 2: NVM (Node Version Manager) - mejor para múltiples proyectos
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Verificar
node --version   # v20.x.x
npm --version    # 10.x.x
```

**Linux (Ubuntu/Debian):**
```bash
# Opción 1: NodeSource repository (recomendado)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Opción 2: NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Verificar
node --version
npm --version
```

**Troubleshooting Node.js:**
- Si `node --version` no funciona, reiniciar terminal o computadora
- Si muestra versión antigua (<v18), desinstalar y reinstalar
- Windows: Buscar "Environment Variables" y verificar PATH incluye Node.js

---

#### **Git (CRÍTICO - Obligatorio)**

Git es el sistema de control de versiones usado para el código.

**Instalación por Sistema Operativo:**

**Windows:**
1. Descargar: https://git-scm.com/download/win
2. Ejecutar instalador
3. Durante instalación:
   - ✅ Use Git from command line and 3rd party software
   - ✅ Use bundled OpenSSH
   - ✅ Use native Windows Secure Channel library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use MinTTY terminal
4. Verificar:
   ```powershell
   git --version   # git version 2.x.x
   ```

**macOS:**
```bash
# Opción 1: Xcode Command Line Tools (pre-instalado en macOS moderno)
xcode-select --install

# Opción 2: Homebrew
brew install git

# Verificar
git --version
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install git

# Verificar
git --version
```

**Configurar Git (Primera vez):**
```bash
# Configurar nombre y email (obligatorio para commits)
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"

# Verificar configuración
git config --list
```

---

#### **Editor de Código (RECOMENDADO)**

**Visual Studio Code (VS Code)** - Editor más popular para desarrollo web

**Descargar e Instalar:**
- Windows/Mac/Linux: https://code.visualstudio.com/

**Extensiones Recomendadas para este Proyecto:**

```bash
# Instalar extensiones desde command line
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension humao.rest-client
```

**O instalar manualmente:**
1. Abrir VS Code
2. Click en icono Extensions (Ctrl+Shift+X)
3. Buscar e instalar:
   - **ESLint** - Linting JavaScript/TypeScript
   - **Prettier** - Code formatter
   - **TypeScript** - TypeScript support
   - **Tailwind CSS IntelliSense** - Autocomplete Tailwind classes
   - **Auto Rename Tag** - HTML tag auto-rename
   - **Path Intellisense** - Autocomplete file paths
   - **REST Client** - Test API endpoints desde VS Code

**Configuración VS Code Recomendada:**

Crear archivo `.vscode/settings.json` en el proyecto:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.experimental.classRegex": [
    ["class:\\s*['\"]([^'\"]*)['\"]"]
  ]
}
```

---

#### **Cloudflare Account (OBLIGATORIO para Deploy)**

**Crear cuenta Cloudflare (100% gratis):**

1. **Ir a:** https://dash.cloudflare.com/sign-up
2. **Ingresar:**
   - Email válido
   - Contraseña fuerte
3. **Verificar email** - Click en link de confirmación
4. **Login:** https://dash.cloudflare.com/

**No requiere tarjeta de crédito. Plan gratuito incluye:**
- ✅ Cloudflare Pages (Hosting)
- ✅ Cloudflare Workers (Backend)
- ✅ Cloudflare D1 (Database)
- ✅ 100,000 requests/día
- ✅ 500 MB storage
- ✅ SSL/HTTPS automático
- ✅ Global CDN

---

#### **Terminal (Ya incluido en tu SO)**

**Windows:**
- **PowerShell** (recomendado) - Viene con Windows 10/11
- **Command Prompt (CMD)** - Alternativa
- **Git Bash** - Instalado con Git, emula Linux terminal
- **Windows Terminal** (recomendado moderno) - Descargar de Microsoft Store

**macOS:**
- **Terminal** - Pre-instalado (Command+Space → "Terminal")
- **iTerm2** (alternativa mejorada) - https://iterm2.com/

**Linux:**
- Terminal por defecto de tu distribución (Ctrl+Alt+T)

---

### **5.2 Software Opcional pero Útil**

#### **Database Browser (Para ver DB SQLite localmente)**
- **DB Browser for SQLite**: https://sqlitebrowser.org/
- Permite visualizar y editar `.wrangler/state/v3/d1/*.sqlite`

#### **API Testing Tools**
- **Postman**: https://www.postman.com/ (GUI)
- **Insomnia**: https://insomnia.rest/ (GUI)
- **cURL**: Pre-instalado en Mac/Linux, incluido en Git Bash (CLI)

#### **Browser Developer Tools (Pre-instalado)**
- **Chrome DevTools** - F12 en Chrome
- **Firefox Developer Tools** - F12 en Firefox

---

### **5.3 Prerequisitos - Resumen Checklist**

Antes de continuar, verifica que tienes todo:

```
□ Node.js v18+ instalado y funcionando (node --version)
□ npm v9+ instalado y funcionando (npm --version)
□ Git instalado y configurado (git --version, git config --list)
□ Editor de código (VS Code recomendado) con extensiones
□ Cuenta Cloudflare creada y email verificado
□ Terminal/Command line funcional
□ Conexión a Internet estable
```

**Si todo está ✅, continúa con el setup del proyecto →**

### **Paso 1: Clonar el Repositorio**

```bash
# Opción A: HTTPS (más fácil)
git clone https://github.com/fel482217/nist-csf-assessment.git
cd nist-csf-assessment

# Opción B: SSH (requiere configurar SSH keys)
git clone git@github.com:fel482217/nist-csf-assessment.git
cd nist-csf-assessment
```

### **Paso 2: Instalar Dependencias**

```bash
# Instalar todas las dependencias de package.json
npm install

# Esto instala:
# - hono
# - vite
# - wrangler
# - typescript
# - @cloudflare/workers-types
# - etc.
```

**Tiempo estimado:** 1-2 minutos

### **Paso 3: Configurar Cloudflare (Una sola vez)**

#### **3.1 Crear cuenta Cloudflare (gratis)**
1. Ir a https://dash.cloudflare.com/sign-up
2. Crear cuenta con tu email
3. Verificar email

#### **3.2 Obtener API Token**
1. Login a https://dash.cloudflare.com/
2. Click en perfil (esquina superior derecha)
3. **My Profile** → **API Tokens**
4. **Create Token** → **Edit Cloudflare Workers**
5. Copiar el token generado

#### **3.3 Autenticar Wrangler**

```bash
# Opción A: Login interactivo (más fácil)
npx wrangler login
# Se abre browser, autorizar acceso

# Opción B: Con API token
npx wrangler login --api-token YOUR_TOKEN_HERE
```

Verificar autenticación:
```bash
npx wrangler whoami
# Debe mostrar tu email y account ID
```

### **Paso 4: Crear Base de Datos Local**

```bash
# Crear database D1 local
npx wrangler d1 create nist-csf-db-local

# Copiar el database_id que te muestra
# Ejemplo: database_id = "abc123..."

# Aplicar migraciones a DB local
npx wrangler d1 migrations apply nist-csf-db --local
```

**Nota:** La base de datos local se guarda en `.wrangler/state/v3/d1/`

### **Paso 5: Configurar Variables de Entorno (Opcional)**

Crear archivo `.dev.vars` en la raíz del proyecto:
```bash
# .dev.vars (para desarrollo local)
JWT_SECRET=your-local-jwt-secret-key-here
```

**IMPORTANTE:** Este archivo está en `.gitignore`, no se sube a Git.

### **Paso 6: Iniciar Servidor de Desarrollo**

```bash
# Build el proyecto primero
npm run build

# Iniciar Wrangler dev server
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000
```

**Flags importantes:**
- `--local`: Usa DB local (no producción)
- `--ip 0.0.0.0`: Permite acceso desde cualquier IP
- `--port 3000`: Puerto donde corre el servidor

**Abrir en browser:**
```
http://localhost:3000
```

### **Paso 7: Seed Data (MUY RECOMENDADO para Development)**

Para tener datos de prueba completos en tu ambiente local:

```bash
# Crear archivo seed-development.sql con datos completos
cat > seed-development.sql << 'EOF'
-- ============================================
-- SEED DATA FOR LOCAL DEVELOPMENT
-- ============================================

-- 1. Test Organizations
INSERT INTO organizations (id, name, industry, size, description)
VALUES 
  (1, 'DevCorp Tech Solutions', 'Technology', 'Large (500+)', 'Primary development organization'),
  (2, 'SecureBank Financial', 'Finance', 'Medium (100-500)', 'Banking sector organization'),
  (3, 'HealthCare Systems Inc', 'Healthcare', 'Medium (100-500)', 'Healthcare provider');

-- 2. Test Users (passwords encoded with btoa)
-- Admin User (password: Admin123!)
INSERT INTO users (id, email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES (1, 'admin@dev.local', 'Dev Admin', 'QWRtaW4xMjMh', 'admin', 1, 1, 1, CURRENT_TIMESTAMP);

-- Regular Users Organization 1
INSERT INTO users (email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES 
  ('john.doe@devcorp.local', 'John Doe', 'VGVzdDEyMyE=', 'user', 1, 1, 1, CURRENT_TIMESTAMP),
  ('jane.smith@devcorp.local', 'Jane Smith', 'VGVzdDEyMyE=', 'user', 1, 1, 1, CURRENT_TIMESTAMP);

-- Regular Users Organization 2
INSERT INTO users (email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES 
  ('bob.jones@securebank.local', 'Bob Jones', 'VGVzdDEyMyE=', 'user', 1, 1, 2, CURRENT_TIMESTAMP),
  ('alice.williams@securebank.local', 'Alice Williams', 'VGVzdDEyMyE=', 'user', 1, 1, 2, CURRENT_TIMESTAMP);

-- Pending Approval User (to test approval workflow)
INSERT INTO users (email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES ('pending@dev.local', 'Pending User', 'VGVzdDEyMyE=', 'user', 0, 1, 1, CURRENT_TIMESTAMP);

-- 3. Test Assessments (framework_id = 7 is NIST CSF 2.0)
INSERT INTO assessments (id, organization_id, framework_id, name, assessment_date, status, created_by, created_at)
VALUES 
  (1, 1, 7, 'Q4 2025 Security Assessment', '2025-12-03', 'draft', 1, CURRENT_TIMESTAMP),
  (2, 1, 7, 'Annual Compliance Review 2025', '2025-11-15', 'in_progress', 2, CURRENT_TIMESTAMP),
  (3, 1, 7, 'Completed Assessment Example', '2025-10-01', 'completed', 2, CURRENT_TIMESTAMP),
  (4, 2, 7, 'Banking Security Audit', '2025-12-01', 'draft', 4, CURRENT_TIMESTAMP),
  (5, 3, 7, 'Healthcare Compliance Check', '2025-11-20', 'in_progress', 1, CURRENT_TIMESTAMP);

-- 4. Sample Assessment Responses
-- Get some CSF subcategory IDs (we'll use first 10)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, gaps, action_plan, recommendations, control_owner_id)
SELECT 
  1 as assessment_id,
  id as csf_subcategory_id,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 0 THEN 3
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 1 THEN 2
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 2 THEN 1
    ELSE 0
  END as maturity_level,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 3 = 0 THEN 'implemented'
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 3 = 1 THEN 'partial'
    ELSE 'not_implemented'
  END as implementation_status,
  'Sample evidence documentation for testing' as evidence,
  'Development testing notes' as notes,
  'Sample gap identified during testing' as gaps,
  'Action plan to address the gap' as action_plan,
  'Recommendation for improvement' as recommendations,
  2 as control_owner_id
FROM csf_subcategories
LIMIT 10;

-- Add more comprehensive responses for assessment 3 (completed)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, control_owner_id)
SELECT 
  3 as assessment_id,
  id as csf_subcategory_id,
  3 as maturity_level,
  'implemented' as implementation_status,
  'Fully documented and implemented control' as evidence,
  'Completed assessment sample data' as notes,
  2 as control_owner_id
FROM csf_subcategories
LIMIT 20;

-- 5. Create sessions for quick login testing
INSERT INTO sessions (user_id, token, expires_at)
VALUES 
  (1, 'dev-admin-token-12345', datetime('now', '+7 days')),
  (2, 'dev-user-token-67890', datetime('now', '+7 days'));

EOF

# Ejecutar seed en database local
npx wrangler d1 execute nist-csf-db --local --file=./seed-development.sql
```

**Credenciales de prueba creadas:**

| Email | Password | Role | Organization | Status |
|-------|----------|------|--------------|--------|
| `admin@dev.local` | `Admin123!` | Admin | DevCorp Tech | Active |
| `john.doe@devcorp.local` | `Test123!` | User | DevCorp Tech | Active |
| `jane.smith@devcorp.local` | `Test123!` | User | DevCorp Tech | Active |
| `bob.jones@securebank.local` | `Test123!` | User | SecureBank | Active |
| `alice.williams@securebank.local` | `Test123!` | User | SecureBank | Active |
| `pending@dev.local` | `Test123!` | User | DevCorp Tech | Pending Approval |

**Datos de prueba incluidos:**
- ✅ 3 organizaciones
- ✅ 6 usuarios (1 admin, 4 activos, 1 pendiente aprobación)
- ✅ 5 assessments (draft, in_progress, completed)
- ✅ 30+ assessment responses con datos completos
- ✅ Diferentes maturity levels y implementation statuses
- ✅ Control owners asignados

**Testing Scenarios Disponibles:**
1. Login como admin → Aprobar usuario pendiente
2. Login como user → Ver solo assessments de su organización
3. Crear nuevo assessment
4. Completar assessment responses con todos los campos
5. Generar PDF reports de assessments existentes
6. Comparar múltiples assessments
7. Multi-org comparison (solo admin)

---

## 6. Workflow de Desarrollo

### **Estructura de Archivos Recomendada**

```
nist-csf-assessment/
├── .git/                           # Git repository
├── .wrangler/                      # Wrangler cache (no subir a Git)
│   └── state/v3/d1/               # Local SQLite databases
├── migrations/                     # Database migrations
│   ├── 0001_initial_schema.sql
│   ├── 0002_...sql
│   └── 0008_enhanced_response_fields.sql
├── public/                         # Static files
│   └── static/
│       ├── app.js                 # Main app logic
│       ├── auth-ui.js             # Authentication
│       ├── reports.js             # Reports module
│       ├── i18n.js                # Internationalization
│       └── i18n/
│           ├── en.json            # English translations
│           └── es.json            # Spanish translations
├── src/                            # Backend source
│   ├── index.tsx                  # Main entry + API routes
│   ├── auth-routes.ts             # Auth endpoints
│   ├── auth.ts                    # Auth middleware
│   └── types.ts                   # TypeScript types
├── dist/                           # Build output (generated)
│   ├── _worker.js                 # Compiled worker
│   └── _routes.json               # Routes config
├── node_modules/                   # Dependencies (no subir)
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite build config
├── wrangler.jsonc                  # Cloudflare config
└── README.md                       # Documentation
```

### **Flujo de Trabajo Típico**

#### **Escenario 1: Agregar un Nuevo Campo a Assessment**

**Paso 1: Crear migración de base de datos**
```bash
# Crear nuevo archivo de migración
cat > migrations/0009_add_assessment_priority.sql << 'EOF'
-- Add priority field to assessments
ALTER TABLE assessments ADD COLUMN priority TEXT DEFAULT 'medium';
-- Options: 'low', 'medium', 'high', 'critical'

-- Add index for filtering
CREATE INDEX IF NOT EXISTS idx_assessments_priority ON assessments(priority);
EOF

# Aplicar migración localmente
npx wrangler d1 migrations apply nist-csf-db --local
```

**Paso 2: Actualizar TypeScript types**
```typescript
// src/types.ts
export interface CreateAssessmentRequest {
  organization_id: number
  name: string
  assessment_date: string
  framework_id: number
  status?: string
  priority?: string  // ← NUEVO
}
```

**Paso 3: Actualizar backend API**
```typescript
// src/index.tsx
app.post('/api/assessments', requireAuth, async (c) => {
  const body = await c.req.json()
  const { organization_id, name, assessment_date, framework_id, status, priority } = body
  
  const result = await c.env.DB.prepare(
    `INSERT INTO assessments 
     (organization_id, name, assessment_date, framework_id, status, priority) 
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(organization_id, name, assessment_date, framework_id, status || 'draft', priority || 'medium').run()
  
  return c.json({ id: result.meta.last_row_id, ...body }, 201)
})
```

**Paso 4: Actualizar frontend UI**
```javascript
// public/static/app.js
function showNewAssessmentForm() {
  // ... existing code ...
  
  modal.innerHTML = `
    <form id="new-assessment-form">
      <!-- ... existing fields ... -->
      
      <!-- NUEVO: Priority selector -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          <span data-i18n="assessments.priority">Priority</span>
        </label>
        <select id="assessment-priority" class="w-full border border-gray-300 rounded px-3 py-2">
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      
      <!-- ... rest of form ... -->
    </form>
  `
}

// Update submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = {
    // ... existing fields ...
    priority: document.getElementById('assessment-priority').value
  }
  await axios.post('/api/assessments', data)
})
```

**Paso 5: Agregar traducciones**
```json
// public/static/i18n/en.json
{
  "assessments": {
    "priority": "Priority",
    "priority_low": "Low",
    "priority_medium": "Medium",
    "priority_high": "High",
    "priority_critical": "Critical"
  }
}

// public/static/i18n/es.json
{
  "assessments": {
    "priority": "Prioridad",
    "priority_low": "Baja",
    "priority_medium": "Media",
    "priority_high": "Alta",
    "priority_critical": "Crítica"
  }
}
```

**Paso 6: Probar localmente**
```bash
# Build
npm run build

# Start dev server
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000

# Abrir http://localhost:3000
# Crear nuevo assessment
# Verificar que priority aparece y se guarda
```

**Paso 7: Commit cambios**
```bash
git add -A
git commit -m "feat: Add priority field to assessments

- Created migration 0009_add_assessment_priority.sql
- Updated CreateAssessmentRequest type
- Added priority to POST /api/assessments
- Added priority selector in new assessment form
- Added translations (EN/ES)
- Tested locally with sample data"

git push origin main
```

**Paso 8: Deploy a producción**
```bash
# Aplicar migración a producción
npx wrangler d1 migrations apply nist-csf-db --remote

# Deploy app
npm run deploy
```

---

#### **Escenario 2: Modificar un Estilo (CSS)**

**Paso 1: Identificar elemento**
```html
<!-- Quiero cambiar el color del botón "Save" -->
<button class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
```

**Paso 2: Modificar clases Tailwind**
```html
<!-- Cambiar a verde -->
<button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
```

**Paso 3: No rebuild necesario (en desarrollo)**
```bash
# Si estás corriendo dev server, recarga browser
# Los cambios en HTML/CSS son inmediatos
```

**Paso 4: Build y deploy**
```bash
npm run build
npm run deploy
```

---

#### **Escenario 3: Agregar Nueva Ruta API**

**Paso 1: Agregar ruta en backend**
```typescript
// src/index.tsx

// Nueva ruta: GET /api/dashboard/stats
app.get('/api/dashboard/stats', requireAuth, async (c) => {
  const user = getCurrentUser(c)
  
  // Get counts
  const totalAssessments = await c.env.DB.prepare(
    'SELECT COUNT(*) as count FROM assessments WHERE organization_id = ?'
  ).bind(user.organization_id).first()
  
  const completedAssessments = await c.env.DB.prepare(
    'SELECT COUNT(*) as count FROM assessments WHERE organization_id = ? AND status = ?'
  ).bind(user.organization_id, 'completed').first()
  
  return c.json({
    total_assessments: (totalAssessments as any).count,
    completed_assessments: (completedAssessments as any).count,
    completion_rate: ((completedAssessments as any).count / (totalAssessments as any).count * 100).toFixed(1)
  })
})
```

**Paso 2: Consumir en frontend**
```javascript
// public/static/app.js

async function loadDashboardStats() {
  try {
    const response = await axios.get('/api/dashboard/stats')
    const stats = response.data
    
    document.getElementById('total-count').textContent = stats.total_assessments
    document.getElementById('completed-count').textContent = stats.completed_assessments
    document.getElementById('completion-rate').textContent = `${stats.completion_rate}%`
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
  }
}
```

**Paso 3: Test y deploy**
```bash
npm run build
npx wrangler pages dev dist --local --port 3000
# Test en browser
npm run deploy
```

---

## 7. Ambientes: Desarrollo, Pruebas, Producción

### **Concepto de Ambientes**

```
┌─────────────────────┐
│    DEVELOPMENT      │  ← Tu computadora
│  localhost:3000     │  ← Database local
│  Changes frecuentes │  ← Git branch: feature/*
└─────────────────────┘
          ↓ git push
┌─────────────────────┐
│      STAGING        │  ← Cloudflare Pages (preview)
│  preview-xxx.pages  │  ← Database staging
│  Pre-production     │  ← Git branch: develop
└─────────────────────┘
          ↓ git merge to main
┌─────────────────────┐
│    PRODUCTION       │  ← Cloudflare Pages (main)
│  your-app.pages.dev │  ← Database production
│  Usuarios reales    │  ← Git branch: main
└─────────────────────┘
```

### **7.1 Ambiente de Desarrollo (Local)**

**Características:**
- Corre en tu computadora
- Database SQLite local
- Cambios instantáneos
- Sin afectar usuarios
- Debug completo

**Configuración:**

```bash
# Terminal 1: Start dev server
npx wrangler pages dev dist --local --port 3000

# Terminal 2: Watch for changes (opcional)
npm run dev  # Vite watch mode
```

**Database local:**
```bash
# Ver ubicación
ls -la .wrangler/state/v3/d1/

# Ejecutar queries
npx wrangler d1 execute nist-csf-db --local --command="SELECT * FROM users"

# Reset database
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply nist-csf-db --local
```

**Variables de entorno:**
```bash
# .dev.vars (solo para desarrollo)
JWT_SECRET=local-dev-secret
DEBUG=true
```

---

### **7.2 Ambiente de Staging (Preview/Testing)**

**Características:**
- Corre en Cloudflare Pages
- Database staging separada
- URL preview única por deploy
- Replica producción
- Testing antes de producción
- Datos de prueba (no datos reales)

**Setup Completo - Ambiente de Testing:**

#### **Opción 1: Environment Específico (Recomendado para proyectos grandes)**

**Paso 1: Crear Database Staging**
```bash
# Crear database staging en Cloudflare
npx wrangler d1 create nist-csf-db-staging

# Output:
# [[d1_databases]]
# binding = "DB"
# database_name = "nist-csf-db-staging"
# database_id = "abc123-staging-id"  ← Copiar este ID
```

**Paso 2: Actualizar wrangler.jsonc con Environments**
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "nist-csf-assessment",
  "main": "src/index.tsx",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist",
  
  // Production database (default)
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "nist-csf-db",
      "database_id": "d90a14c0-8ab0-476f-b8d7-7daea4682442"
    }
  ],
  
  // Staging environment
  "env": {
    "staging": {
      "d1_databases": [
        {
          "binding": "DB",
          "database_name": "nist-csf-db-staging",
          "database_id": "abc123-staging-id"  // ID from Step 1
        }
      ],
      "vars": {
        "ENVIRONMENT": "staging"
      }
    }
  }
}
```

**Paso 3: Aplicar Migraciones a Staging**
```bash
# Aplicar todas las migraciones a staging database
npx wrangler d1 migrations apply nist-csf-db-staging --remote

# Verificar tablas creadas
npx wrangler d1 execute nist-csf-db-staging --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table'"
```

**Paso 4: Seed Data para Testing**
```bash
# Crear archivo seed-staging.sql con datos de prueba
cat > seed-staging.sql << 'EOF'
-- Test Organizations
INSERT INTO organizations (id, name, industry, size, description)
VALUES 
  (1, 'Testing Corp', 'Technology', 'Large (500+)', 'Main testing organization'),
  (2, 'Demo Inc', 'Finance', 'Medium (100-500)', 'Secondary testing organization');

-- Test Admin User (password: Admin123!)
INSERT INTO users (email, name, password_hash, role, is_approved, is_active, organization_id)
VALUES ('admin@testing.com', 'Test Admin', 'QWRtaW4xMjMh', 'admin', 1, 1, 1);

-- Test Regular Users
INSERT INTO users (email, name, password_hash, role, is_approved, is_active, organization_id)
VALUES 
  ('user1@testing.com', 'Test User 1', 'VGVzdDEyMyE=', 'user', 1, 1, 1),
  ('user2@testing.com', 'Test User 2', 'VGVzdDEyMyE=', 'user', 1, 1, 2);

-- Test Assessments
INSERT INTO assessments (organization_id, framework_id, name, assessment_date, status, created_by)
VALUES 
  (1, 7, 'Staging Test Assessment 1', '2025-12-01', 'draft', 1),
  (1, 7, 'Staging Test Assessment 2', '2025-12-02', 'completed', 1),
  (2, 7, 'Demo Organization Assessment', '2025-12-03', 'draft', 3);
EOF

# Aplicar seed data
npx wrangler d1 execute nist-csf-db-staging --remote --file=seed-staging.sql
```

**Paso 5: Deploy a Staging**
```bash
# Deploy con environment específico
npm run build
npx wrangler pages deploy dist --project-name nist-csf-assessment --env staging

# Cloudflare genera URL única:
# https://staging.nist-csf-assessment.pages.dev
# o
# https://abc123.nist-csf-assessment.pages.dev
```

**Paso 6: Agregar npm scripts para staging**
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "dev:local": "wrangler pages dev dist --local --ip 0.0.0.0 --port 3000",
    "build": "vite build",
    "deploy": "npm run build && wrangler pages deploy dist",
    "deploy:staging": "npm run build && wrangler pages deploy dist --env staging",
    "db:migrate:staging": "wrangler d1 migrations apply nist-csf-db-staging --remote",
    "db:seed:staging": "wrangler d1 execute nist-csf-db-staging --remote --file=seed-staging.sql"
  }
}
```

#### **Opción 2: Branch-Based Testing (Automático con GitHub)**

**Setup GitHub Actions para Auto-Deploy:**

```yaml
# .github/workflows/staging-deploy.yml
name: Deploy Staging
on:
  push:
    branches:
      - develop      # Staging branch
      - feature/**   # Feature branches

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Staging
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name nist-csf-assessment --env staging
```

**Git Workflow con Staging:**
```bash
# 1. Crear branch de feature
git checkout -b feature/new-reports

# 2. Hacer cambios y commits
git add -A
git commit -m "feat: Add new reports module"

# 3. Push a GitHub
git push origin feature/new-reports

# 4. GitHub Actions automáticamente:
#    - Builds the code
#    - Deploys to staging environment
#    - Genera preview URL: https://feature-new-reports.pages.dev

# 5. Test en preview URL
# 6. Si todo OK, crear Pull Request a main
# 7. Merge PR → Auto-deploy a producción
```

**Testing en Staging:**
```bash
# 1. Acceder a staging URL
open https://staging.nist-csf-assessment.pages.dev

# 2. Login con credenciales de testing
# Email: admin@testing.com
# Password: Admin123!

# 3. Ejecutar test checklist:
□ Login funciona
□ Crear nueva organización
□ Crear nuevo assessment
□ Completar assessment responses
□ Generar PDF report
□ Comparar assessments
□ Multi-org comparison (admin only)
□ User approval workflow
□ Cambiar idioma (EN/ES)
□ Logout

# 4. Verificar logs
npx wrangler tail --env staging

# 5. Si encuentra bugs, arreglar y re-deploy
git add -A
git commit -m "fix: Correct staging issues"
git push origin feature/new-reports
# Auto-redeploys to staging
```

**Git Workflow con Staging:**
```bash
# Crear branch de feature
git checkout -b feature/new-reports

# Hacer cambios
# ... code ...

# Commit
git add -A
git commit -m "feat: Add new reports module"

# Push a GitHub
git push origin feature/new-reports

# Crear Pull Request en GitHub
# Cloudflare automáticamente crea preview deployment

# URL preview:
# https://def456.nist-csf-assessment.pages.dev

# Testing en preview
# Si todo bien, merge PR to main
```

---

### **7.3 Ambiente de Producción**

**Características:**
- Corre en Cloudflare Pages
- Database producción
- URL permanente
- Usuarios reales
- Alta disponibilidad

**Database Producción:**
```bash
# Ya existe: nist-csf-db
# ID: d90a14c0-8ab0-476f-b8d7-7daea4682442

# Aplicar migraciones con cuidado
npx wrangler d1 migrations apply nist-csf-db --remote

# Backup antes de cambios importantes
npx wrangler d1 backup create nist-csf-db
```

**Deploy a Producción:**
```bash
# Método 1: Manual
git checkout main
git pull origin main
npm run deploy

# Método 2: GitHub Actions (automático)
# Cada push a main auto-deploys
git push origin main
```

**Monitoring:**
```bash
# Ver logs
npx wrangler tail

# Ver analytics
# https://dash.cloudflare.com/pages → nist-csf-assessment → Analytics
```

---

### **Tabla Comparativa de Ambientes**

| Aspecto | Development | Staging/Testing | Production |
|---------|------------|-----------------|------------|
| **Ubicación** | localhost | Cloudflare Pages | Cloudflare Pages |
| **Database** | .wrangler/state/ | D1 staging (remote) | D1 production (remote) |
| **DB ID** | Auto (local) | abc123-staging-id | d90a14c0-8ab0... |
| **URL** | localhost:3000 | staging.*.pages.dev | nist-csf-assessment.pages.dev |
| **Deploy** | `npm run dev` | `npm run deploy:staging` | `npm run deploy` |
| **Data** | Local test data | Staging seed data | Real user data |
| **Usuarios** | Solo tú (dev) | Team testing | Real users |
| **Cambios** | Experimentales | Pre-production testing | Estables, probados |
| **Rollback** | N/A (instant) | Fácil (git revert) | Critical (versioned) |
| **Secrets** | .dev.vars | Staging secrets | Production secrets |
| **Logs** | Console | `wrangler tail --env staging` | `wrangler tail` |
| **Uptime** | Manual | 99.9% | 99.99% |
| **Cost** | $0 | $0 (free tier) | $0-5/month |

---

## 8. Cómo Hacer Cambios

### **Checklist Antes de Cambiar**

```
□ ¿Qué quiero cambiar exactamente?
□ ¿Afecta backend, frontend, o ambos?
□ ¿Necesito cambiar la base de datos?
□ ¿Necesito agregar traducciones?
□ ¿Cómo voy a probar el cambio?
□ ¿Es un cambio breaking (rompe funcionalidad existente)?
```

### **8.1 Cambios Solo Frontend**

**Ejemplos:**
- Cambiar colores/estilos
- Modificar texto
- Agregar validación de formulario
- Cambiar layout

**Archivos a modificar:**
- `public/static/app.js`
- `public/static/auth-ui.js`
- `public/static/reports.js`
- `public/static/i18n/en.json`
- `public/static/i18n/es.json`

**Workflow:**
```bash
# 1. Modificar archivo
code public/static/app.js

# 2. Build
npm run build

# 3. Test local
npx wrangler pages dev dist --local --port 3000

# 4. Si funciona, commit
git add public/static/app.js
git commit -m "feat: Add validation to assessment form"

# 5. Deploy
git push origin main
npm run deploy
```

### **8.2 Cambios Solo Backend**

**Ejemplos:**
- Agregar nuevo endpoint
- Modificar lógica de API
- Cambiar autenticación

**Archivos a modificar:**
- `src/index.tsx`
- `src/auth-routes.ts`
- `src/auth.ts`
- `src/types.ts`

**Workflow:**
```bash
# 1. Modificar archivo
code src/index.tsx

# 2. Build (compila TypeScript)
npm run build

# 3. Test local
npx wrangler pages dev dist --local --port 3000

# 4. Test con curl o Postman
curl http://localhost:3000/api/your-new-endpoint

# 5. Si funciona, commit y deploy
git add src/index.tsx
git commit -m "feat: Add new dashboard endpoint"
git push origin main
npm run deploy
```

### **8.3 Cambios de Base de Datos**

**Ejemplos:**
- Agregar nueva tabla
- Agregar columna
- Crear índice
- Modificar constraint

**⚠️ IMPORTANTE: Siempre crear migración**

**Workflow:**
```bash
# 1. Crear archivo de migración
cat > migrations/0009_add_tags.sql << 'EOF'
-- Add tags table
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3B82F6',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add many-to-many relationship
CREATE TABLE IF NOT EXISTS assessment_tags (
  assessment_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (assessment_id, tag_id),
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_assessment_tags_assessment ON assessment_tags(assessment_id);
CREATE INDEX idx_assessment_tags_tag ON assessment_tags(tag_id);
EOF

# 2. Test migración localmente
npx wrangler d1 migrations apply nist-csf-db --local

# 3. Verificar que funcionó
npx wrangler d1 execute nist-csf-db --local --command="SELECT name FROM sqlite_master WHERE type='table'"

# 4. Si OK, aplicar a producción
npx wrangler d1 migrations apply nist-csf-db --remote

# 5. Commit migración
git add migrations/0009_add_tags.sql
git commit -m "feat: Add tags system to assessments"
git push origin main
```

### **8.4 Cambios Fullstack (Frontend + Backend + DB)**

**Ejemplo: Agregar sistema de comentarios**

**Paso 1: Database**
```sql
-- migrations/0010_add_comments.sql
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_comments_assessment ON comments(assessment_id);
```

**Paso 2: Backend Types**
```typescript
// src/types.ts
export interface CreateCommentRequest {
  assessment_id: number
  content: string
}
```

**Paso 3: Backend API**
```typescript
// src/index.tsx

// Get comments for assessment
app.get('/api/assessments/:id/comments', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare(`
    SELECT c.*, u.name as user_name
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.assessment_id = ?
    ORDER BY c.created_at DESC
  `).bind(id).all()
  return c.json(results)
})

// Create comment
app.post('/api/comments', requireAuth, async (c) => {
  const user = getCurrentUser(c)
  const { assessment_id, content } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO comments (assessment_id, user_id, content)
    VALUES (?, ?, ?)
  `).bind(assessment_id, user.id, content).run()
  
  return c.json({ id: result.meta.last_row_id, assessment_id, content }, 201)
})
```

**Paso 4: Frontend UI**
```javascript
// public/static/app.js

async function loadComments(assessmentId) {
  const response = await axios.get(`/api/assessments/${assessmentId}/comments`)
  const comments = response.data
  
  const container = document.getElementById('comments-section')
  container.innerHTML = `
    <h3>Comments</h3>
    <div id="comments-list">
      ${comments.map(comment => `
        <div class="border p-3 rounded mb-2">
          <p class="font-semibold">${comment.user_name}</p>
          <p class="text-sm text-gray-600">${comment.content}</p>
          <p class="text-xs text-gray-400">${new Date(comment.created_at).toLocaleString()}</p>
        </div>
      `).join('')}
    </div>
    
    <form onsubmit="addComment(event, ${assessmentId})">
      <textarea id="comment-input" placeholder="Add comment..." rows="3"></textarea>
      <button type="submit">Post Comment</button>
    </form>
  `
}

async function addComment(event, assessmentId) {
  event.preventDefault()
  const content = document.getElementById('comment-input').value
  
  await axios.post('/api/comments', {
    assessment_id: assessmentId,
    content: content
  })
  
  loadComments(assessmentId)
}
```

**Paso 5: Translations**
```json
// public/static/i18n/en.json
{
  "comments": {
    "title": "Comments",
    "add": "Add Comment",
    "placeholder": "Write your comment here..."
  }
}

// public/static/i18n/es.json
{
  "comments": {
    "title": "Comentarios",
    "add": "Agregar Comentario",
    "placeholder": "Escribe tu comentario aquí..."
  }
}
```

**Paso 6: Test completo**
```bash
# Apply migration
npx wrangler d1 migrations apply nist-csf-db --local

# Build
npm run build

# Start dev server
npx wrangler pages dev dist --local --port 3000

# Test in browser:
# 1. Open assessment
# 2. Write comment
# 3. Post comment
# 4. Verify comment appears
# 5. Refresh page
# 6. Verify comment persists
```

**Paso 7: Deploy**
```bash
# Apply migration to production
npx wrangler d1 migrations apply nist-csf-db --remote

# Commit all changes
git add -A
git commit -m "feat: Add comments system

- Created comments table (migration 0010)
- Added GET /api/assessments/:id/comments
- Added POST /api/comments
- Added comments UI in assessment detail
- Added translations (EN/ES)"

# Push and deploy
git push origin main
npm run deploy
```

---

## 9. Troubleshooting Común

### **Problema 1: npm install falla**

**Síntoma:**
```
npm ERR! code EACCES
npm ERR! permission denied
```

**Solución:**
```bash
# Opción 1: Usar sudo (no recomendado)
sudo npm install

# Opción 2: Cambiar npm prefix (recomendado)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install
```

### **Problema 2: Wrangler no encuentra database**

**Síntoma:**
```
Error: Database 'nist-csf-db' not found
```

**Solución:**
```bash
# Listar databases disponibles
npx wrangler d1 list

# Verificar wrangler.jsonc tiene el database_id correcto
cat wrangler.jsonc

# Si no existe, crear
npx wrangler d1 create nist-csf-db
```

### **Problema 3: Port 3000 ya está en uso**

**Síntoma:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**
```bash
# Opción 1: Usar otro puerto
npx wrangler pages dev dist --local --port 3001

# Opción 2: Matar proceso en puerto 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### **Problema 4: Changes no se reflejan**

**Síntoma:**
Modifico código pero no veo cambios en browser

**Solución:**
```bash
# 1. Hard refresh en browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# 2. Clear cache
# Browser → Settings → Clear browsing data

# 3. Rebuild
npm run build

# 4. Restart dev server
# Ctrl+C para matar
npx wrangler pages dev dist --local --port 3000
```

### **Problema 5: TypeScript errors**

**Síntoma:**
```
error TS2304: Cannot find name 'D1Database'
```

**Solución:**
```bash
# Install types
npm install --save-dev @cloudflare/workers-types

# Verificar tsconfig.json tiene:
{
  "compilerOptions": {
    "types": ["@cloudflare/workers-types"]
  }
}
```

### **Problema 6: Authentication no funciona**

**Síntoma:**
```
401 Unauthorized al llamar API
```

**Solución:**
```bash
# 1. Verificar token en localStorage
# Browser console:
localStorage.getItem('auth_token')

# 2. Verificar token es válido
# Decode JWT en https://jwt.io

# 3. Verificar backend verifica token
# src/auth.ts → requireAuth middleware

# 4. Re-login
# Logout → Login de nuevo
```

### **Problema 7: CORS errors**

**Síntoma:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solución:**
```typescript
// Verificar src/index.tsx tiene:
import { cors } from 'hono/cors'

app.use('/api/*', cors())

// Si no funciona, configurar manualmente:
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://your-app.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}))
```

### **Problema 8: Database migration falla**

**Síntoma:**
```
Migration failed: duplicate column name
```

**Solución:**
```bash
# 1. Verificar qué migraciones ya se aplicaron
npx wrangler d1 migrations list nist-csf-db --local

# 2. Si es local, puedes reset
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply nist-csf-db --local

# 3. Si es producción, crear migración rollback
cat > migrations/0011_rollback.sql << 'EOF'
-- Rollback problematic column
ALTER TABLE table_name DROP COLUMN column_name;
EOF

npx wrangler d1 execute nist-csf-db --remote --file=migrations/0011_rollback.sql
```

---

## 10. Recursos y Documentación

### **Documentación Oficial**

**Cloudflare:**
- Workers: https://developers.cloudflare.com/workers/
- Pages: https://developers.cloudflare.com/pages/
- D1: https://developers.cloudflare.com/d1/
- Wrangler: https://developers.cloudflare.com/workers/wrangler/

**Hono:**
- Getting Started: https://hono.dev/getting-started/cloudflare-pages
- API Reference: https://hono.dev/api/
- Middleware: https://hono.dev/middleware/builtin/cors

**Frontend:**
- Tailwind CSS: https://tailwindcss.com/docs
- Chart.js: https://www.chartjs.org/docs/
- Axios: https://axios-http.com/docs/intro
- jsPDF: https://github.com/parallax/jsPDF

### **Tutoriales y Guías**

**Video Tutorials:**
- Cloudflare Workers: https://www.youtube.com/c/Cloudflare
- Hono Framework: https://www.youtube.com/results?search_query=hono+framework
- Tailwind CSS: https://www.youtube.com/c/TailwindLabs

**Blog Posts:**
- Cloudflare Blog: https://blog.cloudflare.com/tag/workers
- Hono Blog: https://hono.dev/blog

### **Comunidad y Soporte**

**Discord:**
- Cloudflare Developers: https://discord.gg/cloudflaredev
- Hono Discord: https://hono.dev/discord

**Stack Overflow:**
- Cloudflare Workers: https://stackoverflow.com/questions/tagged/cloudflare-workers
- Hono: https://stackoverflow.com/questions/tagged/hono

**GitHub:**
- Cloudflare Workers: https://github.com/cloudflare/workers-sdk
- Hono: https://github.com/honojs/hono
- Tu Proyecto: https://github.com/fel482217/nist-csf-assessment

### **Herramientas Útiles**

**Testing APIs:**
- Postman: https://www.postman.com/
- Insomnia: https://insomnia.rest/
- Thunder Client (VS Code extension)

**Database Tools:**
- SQLite Browser: https://sqlitebrowser.org/
- DB Browser for SQLite

**Code Quality:**
- ESLint: https://eslint.org/
- Prettier: https://prettier.io/
- TypeScript ESLint: https://typescript-eslint.io/

### **Libros y Cursos**

**Gratuitos:**
- MDN Web Docs: https://developer.mozilla.org/
- freeCodeCamp: https://www.freecodecamp.org/
- The Odin Project: https://www.theodinproject.com/

**Pagos:**
- Frontend Masters: https://frontendmasters.com/
- Udemy Cloudflare Courses
- Pluralsight Web Development

---

## 📊 Resumen Rápido

### **Stack Completo en 1 Minuto**

```
Frontend:  HTML5 + Tailwind CSS + Vanilla JS
Backend:   Hono (TypeScript) on Cloudflare Workers
Database:  Cloudflare D1 (SQLite)
Hosting:   Cloudflare Pages
Build:     Vite
CLI:       Wrangler
VCS:       Git + GitHub
```

### **Comandos Más Usados**

```bash
# Development
npm install                          # Install dependencies
npm run build                        # Build project
npx wrangler pages dev dist --local  # Start dev server

# Database
npx wrangler d1 migrations apply nist-csf-db --local   # Apply migrations (local)
npx wrangler d1 migrations apply nist-csf-db --remote  # Apply migrations (prod)
npx wrangler d1 execute nist-csf-db --local --command="..." # Run query

# Deployment
npm run deploy                       # Build + deploy to production
npx wrangler pages deploy dist       # Deploy only

# Git
git add -A                           # Stage all changes
git commit -m "message"              # Commit changes
git push origin main                 # Push to GitHub

# Monitoring
npx wrangler tail                    # View logs
npx wrangler whoami                  # Check authentication
```

### **Checklist Rápido de Setup**

```
□ Node.js instalado (v18+)
□ Git instalado
□ Repositorio clonado
□ npm install ejecutado
□ Cloudflare account creada
□ Wrangler autenticado (npx wrangler login)
□ Database local creada
□ Migraciones aplicadas
□ Dev server corriendo (localhost:3000)
□ Test de funcionalidad básica
```

---

## 🎓 Conclusión

Has aprendido:

1. ✅ **Stack Tecnológico**: Por qué usamos cada tecnología
2. ✅ **Arquitectura**: Cómo fluyen los datos en el sistema
3. ✅ **Componentes**: Qué hace cada archivo
4. ✅ **Setup Local**: Cómo configurar tu ambiente de desarrollo
5. ✅ **Workflow**: Cómo hacer cambios correctamente
6. ✅ **Ambientes**: Diferencias entre dev, staging, producción
7. ✅ **Troubleshooting**: Soluciones a problemas comunes
8. ✅ **Recursos**: Dónde aprender más

**Próximos Pasos Recomendados:**

1. **Setup local** en tu computadora
2. **Hacer un cambio pequeño** (ej: cambiar un texto)
3. **Ver el cambio** localmente
4. **Deploy** tu primer cambio
5. **Experimentar** con cambios más complejos

**¿Preguntas?**
- Revisa sección de Troubleshooting
- Consulta documentación oficial
- Busca en Stack Overflow
- Pregunta en Discord communities

---

**Versión**: 1.0  
**Fecha**: Diciembre 2025  
**Autor**: Claude (Anthropic)  
**Proyecto**: NIST CSF Assessment Platform
