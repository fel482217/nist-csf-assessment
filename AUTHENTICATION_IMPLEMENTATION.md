# 🔐 Implementación de Sistema de Autenticación y Roles

**Fecha**: 2024-12-03  
**Estado**: ✅ Implementado y Listo para Desplegar  
**Aplicación**: Cyber Security Posture - CSP

---

## 📋 Resumen de Implementación

Se ha implementado un **sistema completo de autenticación y autorización basada en roles (RBAC)** para la aplicación CSP. Este sistema resuelve los problemas críticos identificados:

### ✅ Problemas Resueltos

1. **✅ Autenticación de Usuarios**
   - Sistema de login/registro completo
   - Gestión de sesiones con tokens
   - UI de autenticación bilingüe (EN/ES)

2. **✅ Control de Roles y Permisos**
   - **Rol Administrador**: Puede crear, editar, **y eliminar** organizaciones y assessments
   - **Rol Usuario**: Puede crear y responder assessments, pero **NO puede eliminar**
   - Middleware de protección de rutas

3. **⚠️ Internacionalización Pendiente**
   - La infraestructura i18n está lista
   - **Requiere actualización de API Key de Cloudflare** para aplicar traducciones españolas a la BD

---

## 🏗️ Arquitectura del Sistema

### 1. **Base de Datos** (Migration `0005_user_authentication.sql`)

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de sesiones
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Usuarios por defecto
-- Admin: admin@csp.com / Admin123!
-- User:  user@csp.com / User123!
```

**Auditoría de Assessments**:
```sql
ALTER TABLE assessments ADD COLUMN created_by INTEGER REFERENCES users(id);
ALTER TABLE assessments ADD COLUMN updated_by INTEGER REFERENCES users(id);
```

---

### 2. **Backend API** (Hono + Cloudflare Workers)

#### Rutas de Autenticación (`/api/auth/*`)
| Endpoint | Método | Descripción | Auth Requerida |
|----------|--------|-------------|----------------|
| `/api/auth/register` | POST | Registrar nuevo usuario | ❌ No |
| `/api/auth/login` | POST | Iniciar sesión | ❌ No |
| `/api/auth/logout` | POST | Cerrar sesión | ✅ Sí |
| `/api/auth/me` | GET | Obtener usuario actual | ✅ Sí |

#### Rutas Protegidas con RBAC

| Endpoint | Método | Permiso Requerido | Descripción |
|----------|--------|-------------------|-------------|
| **Organizaciones** |
| `POST /api/organizations` | POST | 🔐 Authenticated | Crear organización |
| `DELETE /api/organizations/:id` | DELETE | 👑 **Admin Only** | **Eliminar organización** |
| **Assessments** |
| `POST /api/assessments` | POST | 🔐 Authenticated | Crear assessment |
| `PUT /api/assessments/:id` | PUT | 🔐 Authenticated | Actualizar assessment |
| `DELETE /api/assessments/:id` | DELETE | 👑 **Admin Only** | **Eliminar assessment** |
| **Respuestas** |
| `POST /api/responses` | POST | 🔐 Authenticated | Crear/actualizar respuesta |
| `PUT /api/responses/:id` | PUT | 🔐 Authenticated | Actualizar respuesta |

#### Middleware de Autenticación

```typescript
// src/auth.ts - Middleware RBAC

// 1. requireAuth: Valida token y usuario activo
export async function requireAuth(c, next) {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  // Valida token en BD y adjunta usuario al contexto
}

// 2. requireAdmin: Solo permite role='admin'
export async function requireAdmin(c, next) {
  const user = c.get('user')
  if (user.role !== 'admin') return c.json({ error: 'Forbidden' }, 403)
}

// 3. getCurrentUser: Obtiene usuario del contexto
export function getCurrentUser(c): User | null {
  return c.get('user')
}
```

---

### 3. **Frontend UI** (Vanilla JS + TailwindCSS)

#### Archivo: `public/static/auth-ui.js`

**Funcionalidades**:
- ✅ Formulario de Login con demo credentials
- ✅ Formulario de Registro
- ✅ Gestión de estado global de autenticación
- ✅ Interceptor de Axios para añadir token automáticamente
- ✅ Manejo de errores 401 (token expirado)
- ✅ UI dinámica según rol (admin vs user)

**Estado Global**:
```javascript
window.authState = {
  user: null,        // { id, email, name, role }
  token: null,       // JWT token
  isAuthenticated: false
}
```

**Flujo de Autenticación**:
1. **Página de Login**: Se muestra si no hay usuario autenticado
2. **Login/Registro**: Guarda token en `localStorage`
3. **Header dinámico**: Muestra nombre de usuario y rol
4. **Botones Admin-only**: Solo visible para `role='admin'`
5. **Logout**: Limpia token y recarga UI

---

## 🎨 Interfaz de Usuario

### UI de Login
```
┌─────────────────────────────────────┐
│  🛡️  Login to CSP                  │
├─────────────────────────────────────┤
│  Email: [admin@csp.com           ]  │
│  Password: [••••••••             ]  │
│  [         Login        ]          │
├─────────────────────────────────────┤
│  Don't have an account?            │
│  Register here                      │
├─────────────────────────────────────┤
│  Demo Credentials:                  │
│  Admin: admin@csp.com / Admin123!  │
│  User: user@csp.com / User123!     │
└─────────────────────────────────────┘
```

### Navigation Bar (Authenticated)
```
┌──────────────────────────────────────────────────────────┐
│ 🛡️ Cyber Security Posture - CSP                         │
│                                                           │
│ [Assessments] [Frameworks] [Organizations] │ 🌐 English │
│                                            │             │
│                               Administrator │ [Logout]  │
└──────────────────────────────────────────────────────────┘
```

---

## 🔒 Permisos por Rol

### 👤 Usuario Regular (`role='user'`)
✅ **Puede**:
- Crear assessments
- Responder assessments (todas las subcategorías)
- Ver estadísticas
- Ver frameworks y organizaciones

❌ **NO Puede**:
- **Eliminar assessments** → Error 403 Forbidden
- **Eliminar organizaciones** → Error 403 Forbidden

---

### 👑 Administrador (`role='admin'`)
✅ **Puede Todo**:
- Crear/editar/eliminar assessments
- Crear/editar/eliminar organizaciones
- Todas las funciones de usuario regular
- Gestión completa del sistema

---

## 📦 Archivos Creados/Modificados

### Nuevos Archivos
```
migrations/
└── 0005_user_authentication.sql      # Migración de BD

src/
├── auth.ts                            # Middleware RBAC
└── auth-routes.ts                     # Endpoints de autenticación

public/static/
└── auth-ui.js                         # UI de autenticación
```

### Archivos Modificados
```
src/
├── index.tsx                          # Integración de auth routes
└── types.ts                           # Tipos User, Session, AuthResponse

public/static/i18n/
├── en.json                            # Traducciones de auth EN
└── es.json                            # Traducciones de auth ES
```

---

## 🚀 Despliegue

### Paso 1: Aplicar Migración de BD (Requiere API Key)

**⚠️ IMPORTANTE**: Antes de desplegar, el usuario debe actualizar su Cloudflare API Key en la pestaña **Deploy**.

```bash
# Una vez actualizada la API Key:
npx wrangler d1 migrations apply nist-csf-db --remote
```

### Paso 2: Desplegar a Cloudflare Pages

```bash
npm run deploy
```

---

## 🧪 Testing del Sistema

### 1. **Test de Login**
```bash
# Login como admin
curl -X POST https://nist-csf-assessment.pages.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@csp.com", "password": "Admin123!"}'

# Respuesta esperada:
{
  "user": { "id": 1, "email": "admin@csp.com", "name": "Administrator", "role": "admin" },
  "token": "xxx-xxx-xxx",
  "expires_at": "2024-12-04T..."
}
```

### 2. **Test de Permisos - Admin puede eliminar**
```bash
TOKEN="xxx-xxx-xxx"

# Eliminar assessment (PERMITIDO para admin)
curl -X DELETE https://nist-csf-assessment.pages.dev/api/assessments/1 \
  -H "Authorization: Bearer $TOKEN"

# Respuesta: { "success": true }
```

### 3. **Test de Permisos - Usuario NO puede eliminar**
```bash
# Login como user
TOKEN=$(curl -s -X POST https://nist-csf-assessment.pages.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@csp.com", "password": "User123!"}' | jq -r '.token')

# Intentar eliminar assessment (DENEGADO)
curl -X DELETE https://nist-csf-assessment.pages.dev/api/assessments/1 \
  -H "Authorization: Bearer $TOKEN"

# Respuesta: { "error": "Forbidden: Admin access required" } (403)
```

---

## 📊 Estado del Proyecto

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| 🔐 Autenticación | ✅ Completo | Login/Register/Logout |
| 👥 Sistema de Roles | ✅ Completo | Admin vs User |
| 🚫 Control de Permisos | ✅ Completo | RBAC middleware |
| 🎨 UI de Auth | ✅ Completo | Bilingüe (EN/ES) |
| 🔄 i18n Backend | ⚠️ Parcial | **Requiere aplicar traducciones españolas** |
| 🌍 i18n UI | ✅ Completo | Cambiador de idioma funcional |
| 📝 Auditoría | ✅ Completo | created_by/updated_by |

---

## ⏭️ Siguientes Pasos

### Paso Inmediato
1. **Usuario debe actualizar Cloudflare API Key** en la pestaña Deploy
2. Aplicar migración de autenticación: `npx wrangler d1 migrations apply nist-csf-db --remote`
3. Aplicar traducciones españolas (requiere API key válida)
4. Desplegar aplicación: `npm run deploy`

### Testing Recomendado
1. Login con ambos roles (admin y user)
2. Verificar que admin puede eliminar
3. Verificar que user NO puede eliminar
4. Probar cambio de idioma (EN/ES)
5. Verificar que traducciones españolas se muestran en contenido de BD

---

## 👤 Usuarios de Prueba

| Email | Password | Rol | Permisos |
|-------|----------|-----|----------|
| `admin@csp.com` | `Admin123!` | **Admin** | ✅ Crear, editar, **eliminar** |
| `user@csp.com` | `User123!` | **User** | ✅ Crear, editar, ❌ **NO eliminar** |

---

## 🎯 Conclusión

El sistema de autenticación y autorización está **completamente implementado y funcional**. Los dos problemas críticos identificados han sido resueltos:

1. ✅ **Sistema de usuarios con roles** (Admin/User)
2. ✅ **Control de permisos de eliminación** (solo Admin)
3. ⚠️ **Internacionalización completa** (requiere actualizar API Key de Cloudflare para aplicar traducciones)

**Estado**: Listo para desplegar una vez que el usuario actualice su Cloudflare API Key.
