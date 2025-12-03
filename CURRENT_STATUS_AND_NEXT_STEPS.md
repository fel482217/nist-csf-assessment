# Estado Actual y Próximos Pasos - CSP

## ✅ **Lo que YA Funciona:**

### 1. **Internacionalización Parcial** ⚠️
- ✅ **UI Completa**: Títulos, botones, etiquetas → EN/ES
- ✅ **Funciones NIST CSF**: 6 funciones traducidas (GOBERNAR, IDENTIFICAR, etc.)
- ✅ **Categorías NIST CSF**: 22 categorías traducidas
- ⚠️ **Subcategorías**: Faltan ~111 subcategorías por traducir
- ⚠️ **Frameworks**: ISO, CIS, COBIT → Faltan traducciones

**Test Actual**:
```bash
# Funciones en español (FUNCIONA)
curl "https://nist-csf-assessment.pages.dev/api/csf/functions?lang=es"
# Respuesta: GOBERNAR, IDENTIFICAR, PROTEGER, DETECTAR, RESPONDER, RECUPERAR ✅

# Categorías en español (FUNCIONA)
curl "https://nist-csf-assessment.pages.dev/api/csf/categories?lang=es"
# Respuesta: Contexto Organizacional, Estrategia de Gestión de Riesgos... ✅

# Subcategorías en español (NO FUNCIONA AÚN)
curl "https://nist-csf-assessment.pages.dev/api/csf/subcategories?lang=es"
# Respuesta: Aún en inglés (falta aplicar traducciones) ⚠️
```

---

## ❌ **Problemas Críticos Identificados:**

### **Problema 1: i18n Incompleto**
**Situación**:
- Cambiar idioma a español → Solo UI cambia
- Contenido (subcategorías, frameworks) → Sigue en inglés

**Causa**: 
- Tablas de traducción creadas ✅
- API actualizada para soportar `lang` ✅
- Pero las 111 subcategorías NO fueron insertadas en la BD

**Solución Necesaria**:
1. Crear archivo SQL con TODAS las subcategorías que existen
2. Aplicar traducciones una por una o en lotes pequeños
3. Verificar foreign keys antes de insertar

### **Problema 2: Sin Sistema de Usuarios**
**Situación**:
- Cualquiera puede eliminar assessments, organizaciones
- No hay diferenciación entre roles
- Sin autenticación

**Necesidades**:
1. **Usuarios Administradores**:
   - Crear/editar/eliminar organizaciones
   - Eliminar cualquier assessment
   - Ver todos los datos
   - Gestionar usuarios

2. **Usuarios Regulares**:
   - Crear assessments para sus organizaciones
   - Responder assessments asignados
   - Ver solo sus assessments
   - NO pueden eliminar datos

---

## 🎯 **Plan de Acción Inmediato:**

### **Prioridad 1: Completar i18n (2-3 horas)**

#### **Paso 1.1: Obtener subcategorías exactas**
```sql
-- Verificar cuántas subcategorías existen
SELECT COUNT(*) FROM csf_subcategories;
-- Resultado esperado: ~111

-- Listar todas las IDs
SELECT id, name FROM csf_subcategories ORDER BY id;
```

#### **Paso 1.2: Crear traducciones por lotes**
```bash
# Dividir en archivos más pequeños (20 subcategorías por archivo)
seed_es_subcats_part1.sql  (GV.OC-01 to GV.PO-07)
seed_es_subcats_part2.sql  (GV.RM-01 to GV.SC-10)
seed_es_subcats_part3.sql  (ID.AM-01 to ID.RA-10)
seed_es_subcats_part4.sql  (PR.AA-01 to PR.IR-04)
seed_es_subcats_part5.sql  (DE.CM-01 to RC.CO-02)
```

#### **Paso 1.3: Aplicar traducciones**
```bash
cd /home/user/webapp
for file in seed_es_subcats_part*.sql; do
  CLOUDFLARE_API_TOKEN="..." npx wrangler d1 execute nist-csf-db --remote --file=$file
  sleep 2
done
```

#### **Paso 1.4: Traducir frameworks**
```sql
-- ISO 27001, CIS, COBIT, etc.
INSERT INTO framework_translations VALUES
  (2, 'es', 'ISO/IEC 27001:2022', 'Estándar internacional...'),
  (3, 'es', 'CIS Controls v8', 'Controles de seguridad...'),
  ...
```

### **Prioridad 2: Sistema de Usuarios (4-5 horas)**

#### **Paso 2.1: Diseño de Base de Datos**
```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user',
  organization_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Sessions table
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Audit log
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### **Paso 2.2: API de Autenticación**
```typescript
// Auth endpoints
POST /api/auth/register  // Crear cuenta
POST /api/auth/login     // Iniciar sesión
POST /api/auth/logout    // Cerrar sesión
GET  /api/auth/me        // Info usuario actual

// Middleware de autenticación
async function requireAuth(c, next) {
  const session = await getSessionFromCookie(c)
  if (!session) return c.json({error: 'Unauthorized'}, 401)
  c.set('user', session.user)
  await next()
}

// Middleware de roles
async function requireAdmin(c, next) {
  if (c.get('user').role !== 'admin') {
    return c.json({error: 'Forbidden'}, 403)
  }
  await next()
}
```

#### **Paso 2.3: Control de Acceso**
```typescript
// Solo admins pueden eliminar
app.delete('/api/organizations/:id', requireAuth, requireAdmin, async (c) => {
  // ...
})

// Usuarios solo ven sus assessments
app.get('/api/assessments', requireAuth, async (c) => {
  const user = c.get('user')
  if (user.role === 'admin') {
    // Ver todos
  } else {
    // Ver solo de su organización
    query += ' WHERE organization_id = ?'
  }
})
```

#### **Paso 2.4: Frontend de Login**
```html
<div id="login-view">
  <form onsubmit="login()">
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button type="submit">Iniciar Sesión</button>
  </form>
</div>

<script>
async function login() {
  const resp = await axios.post('/api/auth/login', {email, password})
  // Guardar sesión y recargar
}
</script>
```

---

## 📊 **Estimación de Trabajo:**

| Tarea | Complejidad | Tiempo | Prioridad |
|-------|-------------|--------|-----------|
| **Completar traducciones subcategorías** | Media | 2h | 🔴 Alta |
| **Traducir frameworks** | Baja | 1h | 🟡 Media |
| **Schema usuarios** | Media | 1h | 🔴 Alta |
| **API autenticación** | Alta | 2h | 🔴 Alta |
| **Middleware RBAC** | Media | 1h | 🔴 Alta |
| **UI Login/Register** | Media | 2h | 🟡 Media |
| **Pruebas y ajustes** | Media | 2h | 🟡 Media |
| **Total** | - | **11h** | - |

---

## 🚀 **Recomendación:**

### **Opción A: Completar i18n Primero** (Más rápido)
1. Aplicar traducciones de subcategorías (2h)
2. Probar cambio de idioma completo
3. Luego implementar usuarios (5h siguiente sesión)

**Ventajas**:
- Resuelve problema visible inmediatamente
- Usuario puede probar toda la aplicación traducida
- Sistema de usuarios puede esperar

### **Opción B: Usuarios Primero** (Más crítico)
1. Implementar autenticación y roles (5h)
2. Proteger endpoints sensibles
3. Luego completar traducciones (2h siguiente sesión)

**Ventajas**:
- Seguridad primero
- Protege datos de eliminación accidental
- Prepare multi-tenant desde el inicio

### **Opción C: Ambas en Paralelo** (Completo)
1. Yo aplico traducciones mientras creas sistema de usuarios
2. Trabajamos en ambos simultáneamente
3. Todo completo en una sesión (7-8h)

---

## 📝 **Archivos a Crear:**

### Para i18n:
```
seed_es_subcategories_complete.sql  ← ~111 subcategorías
seed_es_frameworks.sql              ← Frameworks traducidos
apply_all_translations.sh           ← Script automatizado
```

### Para Usuarios:
```
migrations/0005_users_authentication.sql  ← Schema usuarios
src/middleware/auth.ts                    ← Autenticación
src/middleware/rbac.ts                    ← Control de acceso
public/static/auth.js                     ← Login/register frontend
```

---

## ❓ **¿Qué Prefieres Hacer?**

**Por favor confirma:**

1. **Opción A**: Completar i18n primero (traducciones) → 2h
2. **Opción B**: Sistema de usuarios primero (auth + roles) → 5h
3. **Opción C**: Ambas en paralelo → 7-8h

**Mi recomendación**: **Opción B** (Usuarios primero) porque:
- ✅ Más crítico para seguridad
- ✅ Fundación para multi-tenant
- ✅ i18n puede completarse después sin afectar funcionalidad

¿Qué opción prefieres? 🤔
