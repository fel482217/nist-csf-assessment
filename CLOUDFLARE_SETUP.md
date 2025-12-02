# Configuración de Despliegue Automático - Cloudflare Pages

## 🔗 Conectar GitHub con Cloudflare Pages

### Paso 1: Acceder al Dashboard de Cloudflare

1. Ve a: https://dash.cloudflare.com
2. Inicia sesión con tu cuenta (jfeliper@gmail.com)
3. Click en **"Workers & Pages"** (menú lateral izquierdo)

### Paso 2: Conectar tu repositorio de GitHub

Tienes dos opciones:

#### **OPCIÓN A: Conectar proyecto existente (Recomendado)**

1. En la lista de proyectos, busca: **"nist-csf-assessment"**
2. Click en el proyecto
3. Click en la pestaña **"Settings"**
4. Busca la sección **"Builds & deployments"**
5. Click en **"Connect a git repository"**
6. Selecciona **"GitHub"**
7. Autoriza Cloudflare para acceder a tu cuenta de GitHub
8. Selecciona el repositorio: **fel482217/nist-csf-assessment**
9. Configura los ajustes (ver abajo)

#### **OPCIÓN B: Crear nuevo proyecto conectado a Git**

1. En Workers & Pages, click en **"Create application"**
2. Selecciona la pestaña **"Pages"**
3. Click en **"Connect to Git"**
4. Autoriza GitHub si aún no lo has hecho
5. Selecciona el repositorio: **fel482217/nist-csf-assessment**
6. Configura los ajustes (ver abajo)

### Paso 3: Configuración de Build

**⚙️ Build Configuration:**

```
Framework preset: None (o Vite si está disponible)
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: / (dejar vacío o poner /)
```

**📦 Environment Variables (Opcional):**

Por ahora no necesitas variables de entorno.

**🔧 Build Settings Avanzados:**

```
Node.js version: 20 (se detecta automáticamente con .node-version)
Install command: npm install
```

### Paso 4: Conectar Base de Datos D1

1. En la configuración del proyecto (Settings)
2. Busca la sección **"Functions"** o **"Bindings"**
3. Click en **"Add binding"**
4. Selecciona **"D1 database"**
5. Configuración:
   - Variable name: `DB`
   - D1 database: `nist-csf-db`
6. Click en **"Save"**

### Paso 5: Hacer el primer deployment

1. Click en **"Save and Deploy"**
2. Cloudflare comenzará a construir tu proyecto desde GitHub
3. Espera 2-3 minutos
4. Verás el deployment completado

---

## ✅ Verificar que funciona

Después del deployment:

1. Ve a la URL de tu proyecto: https://nist-csf-assessment.pages.dev
2. Verifica que la aplicación carga correctamente
3. Prueba crear una organización o assessment

---

## 🔄 Cómo funciona el despliegue automático

Una vez configurado:

1. **Haces cambios en tu código localmente**
2. **Haces commit:** `git commit -m "descripción del cambio"`
3. **Subes a GitHub:** `git push origin main`
4. **Cloudflare detecta el cambio automáticamente**
5. **Construye y despliega en 2-3 minutos**
6. **Tu aplicación se actualiza automáticamente**

---

## 📝 Comandos útiles para desarrollo

```bash
# Hacer cambios y subirlos a GitHub
git add .
git commit -m "Descripción de tus cambios"
git push origin main

# Ver el estado de git
git status

# Ver historial de commits
git log --oneline

# Ver configuración remota
git remote -v
```

---

## 🎯 Workflows recomendados

### Workflow 1: Cambios rápidos
1. Edita archivos en tu editor
2. `git add .`
3. `git commit -m "Fix: descripción"`
4. `git push origin main`
5. Espera 2-3 minutos
6. Verifica en https://nist-csf-assessment.pages.dev

### Workflow 2: Probar localmente primero
1. Edita archivos
2. `npm run build` (probar que compila)
3. Probar localmente con PM2
4. Si funciona bien:
   - `git add .`
   - `git commit -m "Feature: descripción"`
   - `git push origin main`

---

## 🚨 Troubleshooting

### Problema: El build falla en Cloudflare

**Solución:**
1. Ve a la pestaña "Deployments" en Cloudflare
2. Click en el deployment fallido
3. Lee los logs de error
4. Corrige el error localmente
5. Push nuevamente

### Problema: La base de datos no funciona

**Solución:**
1. Verifica que el binding D1 esté configurado (Settings → Functions → Bindings)
2. Variable name debe ser exactamente: `DB`
3. Database debe ser: `nist-csf-db`

### Problema: Los cambios no se reflejan

**Solución:**
1. Verifica que el push se hizo correctamente: `git log --oneline`
2. Ve a Cloudflare → Deployments y verifica el último deployment
3. Limpia la caché del navegador (Ctrl + Shift + R)

---

## 📚 Recursos adicionales

- Dashboard Cloudflare: https://dash.cloudflare.com
- Tu repositorio: https://github.com/fel482217/nist-csf-assessment
- Documentación Cloudflare Pages: https://developers.cloudflare.com/pages/
- Documentación D1: https://developers.cloudflare.com/d1/

---

## 🎊 Una vez configurado

Cuando esté todo conectado, verás en Cloudflare:

✅ **Source:** Connected to GitHub (fel482217/nist-csf-assessment)
✅ **Production branch:** main
✅ **Last deployment:** Fecha y hora del último deploy
✅ **D1 Binding:** DB → nist-csf-db

Y cada push a GitHub activará un nuevo deployment automáticamente.
