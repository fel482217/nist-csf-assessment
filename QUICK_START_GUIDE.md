# Guía de Inicio Rápido - NIST CSF Assessment Platform

## 🚀 Setup en 15 Minutos

### **Prerequisitos (5 minutos)**

Verifica que tienes instalado:

```bash
node --version   # Necesitas v18 o superior
git --version    # Cualquier versión 2.x
```

**Si no tienes Node.js o Git:**
- **Node.js**: https://nodejs.org/ (descargar LTS version)
- **Git**: https://git-scm.com/downloads

**Si no tienes cuenta Cloudflare (gratis):**
- Crear cuenta: https://dash.cloudflare.com/sign-up

---

### **Setup Local (10 minutos)**

#### **1. Clonar Repositorio**
```bash
git clone https://github.com/fel482217/nist-csf-assessment.git
cd nist-csf-assessment
```

#### **2. Instalar Dependencias**
```bash
npm install
# Espera ~2 minutos, instala todas las librerías
```

#### **3. Build Proyecto**
```bash
npm run build
# Compila TypeScript y genera dist/
```

#### **4. Configurar Database Local**
```bash
# Crear y aplicar migraciones
npx wrangler d1 migrations apply nist-csf-db --local

# Seed datos de prueba
npx wrangler d1 execute nist-csf-db --local --file=./seed-development.sql
```

#### **5. Iniciar Servidor**
```bash
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000
```

#### **6. Abrir en Browser**
```
http://localhost:3000
```

**Login de prueba:**
- Email: `admin@dev.local`
- Password: `Admin123!`

---

## 📦 Stack Tecnológico Resumido

| Componente | Tecnología | ¿Por qué? |
|------------|------------|-----------|
| **Frontend** | HTML + Tailwind CSS + JS | Bundle pequeño, rápido |
| **Backend** | Hono (TypeScript) | Ligero (13KB), Edge-ready |
| **Database** | Cloudflare D1 (SQLite) | SQL completo, global, gratis |
| **Hosting** | Cloudflare Pages/Workers | Edge computing, <50ms latency |
| **Build** | Vite | Rápido, moderno |
| **CLI** | Wrangler | Cloudflare official CLI |
| **i18n** | JSON files | English + Spanish |

---

## 🛠️ Comandos Esenciales

### **Desarrollo Diario**
```bash
# Build proyecto
npm run build

# Iniciar dev server
npx wrangler pages dev dist --local --port 3000

# Ver logs
# Check browser console (F12)
```

### **Database**
```bash
# Aplicar migraciones local
npx wrangler d1 migrations apply nist-csf-db --local

# Ejecutar query
npx wrangler d1 execute nist-csf-db --local --command="SELECT * FROM users"

# Reset database local
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply nist-csf-db --local
```

### **Git**
```bash
# Ver cambios
git status

# Commit cambios
git add -A
git commit -m "descripción del cambio"

# Push a GitHub
git push origin main
```

### **Deploy a Producción**
```bash
# Deploy completo (build + deploy)
npm run deploy

# Solo deploy (si ya hiciste build)
npx wrangler pages deploy dist --project-name nist-csf-assessment
```

---

## 📁 Estructura del Proyecto

```
nist-csf-assessment/
├── src/                    # Backend (TypeScript)
│   ├── index.tsx          # Main entry point + API routes
│   ├── auth-routes.ts     # Authentication endpoints
│   ├── auth.ts            # Auth middleware
│   └── types.ts           # TypeScript types
│
├── public/static/          # Frontend (JavaScript)
│   ├── app.js             # Main app logic (~2000 lines)
│   ├── auth-ui.js         # Login/Register UI
│   ├── reports.js         # Reports & PDF generation
│   ├── i18n.js            # Internationalization
│   └── i18n/
│       ├── en.json        # English translations
│       └── es.json        # Spanish translations
│
├── migrations/             # Database migrations (SQL)
│   ├── 0001_initial_schema.sql
│   ├── ...
│   └── 0008_enhanced_response_fields.sql
│
├── dist/                   # Build output (generated)
│   ├── _worker.js         # Compiled worker code
│   └── _routes.json       # Routes configuration
│
├── .wrangler/              # Local dev files (not in git)
│   └── state/v3/d1/       # Local SQLite databases
│
├── wrangler.jsonc          # Cloudflare configuration
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Build configuration
└── README.md               # Project documentation
```

---

## 🎯 Flujo de Trabajo Típico

### **Escenario: Agregar un Nuevo Campo**

1. **Crear migración de DB** (si necesario)
   ```sql
   -- migrations/0009_add_field.sql
   ALTER TABLE table_name ADD COLUMN new_field TEXT;
   ```

2. **Actualizar backend**
   ```typescript
   // src/index.tsx
   app.post('/api/endpoint', async (c) => {
     const { new_field } = await c.req.json()
     // ... use new_field
   })
   ```

3. **Actualizar frontend**
   ```javascript
   // public/static/app.js
   const data = {
     new_field: document.getElementById('new-field').value
   }
   ```

4. **Agregar traducciones**
   ```json
   // public/static/i18n/en.json & es.json
   {
     "field_name": "Field Name"
   }
   ```

5. **Test local**
   ```bash
   npm run build
   npx wrangler pages dev dist --local --port 3000
   ```

6. **Commit y deploy**
   ```bash
   git add -A
   git commit -m "feat: Add new field"
   git push origin main
   npm run deploy
   ```

---

## 🔧 Troubleshooting Rápido

### **Puerto 3000 ocupado**
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# O usar otro puerto
npx wrangler pages dev dist --local --port 3001
```

### **Cambios no se ven**
```bash
# 1. Hard refresh browser
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)

# 2. Rebuild
npm run build

# 3. Clear cache
# Browser → Settings → Clear browsing data
```

### **Database error**
```bash
# Reset local database
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply nist-csf-db --local
```

### **npm install falla**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Credenciales de Prueba

Creadas automáticamente con seed data:

| Email | Password | Role | Organization |
|-------|----------|------|--------------|
| admin@dev.local | Admin123! | Admin | DevCorp Tech |
| john.doe@devcorp.local | Test123! | User | DevCorp Tech |
| jane.smith@devcorp.local | Test123! | User | DevCorp Tech |
| bob.jones@securebank.local | Test123! | User | SecureBank |
| pending@dev.local | Test123! | User | Pending Approval |

---

## 🌐 URLs Importantes

- **Producción**: https://nist-csf-assessment.pages.dev
- **GitHub**: https://github.com/fel482217/nist-csf-assessment
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Cloudflare Docs**: https://developers.cloudflare.com
- **Hono Docs**: https://hono.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## 📖 Documentación Completa

Para información más detallada, ver:
- **TECHNICAL_EDUCATION_GUIDE.md** - Guía técnica completa (2000+ líneas)
- **README.md** - Documentación del proyecto
- **USER_APPROVAL_TESTING_GUIDE.md** - Testing de aprobación de usuarios
- **REPORTS_USER_GUIDE.md** - Guía de reportes

---

## 🎓 Próximos Pasos

Después de setup exitoso:

1. ✅ **Explorar la app** - Login, crear assessment, generar reports
2. ✅ **Modificar un texto** - Cambiar algo en `public/static/i18n/en.json`
3. ✅ **Cambiar un estilo** - Modificar clases Tailwind en `src/index.tsx`
4. ✅ **Agregar un endpoint** - Crear nueva ruta API en `src/index.tsx`
5. ✅ **Deploy tu cambio** - `npm run deploy` y ver en producción

---

**¿Listo para desarrollar? 🚀**

- **Documentación técnica completa**: Ver `TECHNICAL_EDUCATION_GUIDE.md`
- **Preguntas o problemas**: Revisa sección Troubleshooting
- **Stack Overflow**: Tag `cloudflare-workers` o `hono`

**Versión**: 1.0  
**Fecha**: Diciembre 2025  
**Proyecto**: NIST CSF Assessment Platform
