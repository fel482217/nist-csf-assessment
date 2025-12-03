# 🚀 Guía de Inicio Rápido - CSP

## ⚡ Lo que Debes Hacer AHORA

### ❌ Problema Actual
Tu aplicación está **completamente implementada** pero NO puede desplegarse porque:
```
❌ Tu Cloudflare API Key está inválida o sin permisos
```

### ✅ Solución (5 minutos)

---

## 📋 Pasos Simples

### 1️⃣ Actualizar API Key (2 minutos)

#### En esta interfaz:
1. **Haz clic en "Deploy"** (pestaña en la barra lateral izquierda)
2. **Elimina la API key actual**
3. **Haz clic en "Configure Cloudflare API Key"**

#### En Cloudflare Dashboard:
1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Haz clic en **"Create Token"**
3. Selecciona **"Edit Cloudflare Workers"** template
4. **Modifica permisos** para incluir:
   ```
   ✅ Account - D1: Edit
   ✅ Account - Workers Scripts: Edit
   ✅ Account - Cloudflare Pages: Edit
   ```
5. Haz clic en **"Continue to summary"**
6. Haz clic en **"Create Token"**
7. **Copia el token** (solo se muestra una vez)

#### De vuelta en esta interfaz:
1. **Pega el token** en Deploy tab
2. Haz clic en **"Save"**

---

### 2️⃣ Aplicar Migración de BD (1 minuto)

**Comando**:
```bash
cd /home/user/webapp
npx wrangler d1 migrations apply nist-csf-db --remote
```

**¿Qué hace?**
- ✅ Crea tabla de usuarios
- ✅ Crea tabla de sesiones
- ✅ Inserta usuarios de prueba:
  - `admin@csp.com` / `Admin123!` (Administrador)
  - `user@csp.com` / `User123!` (Usuario)

---

### 3️⃣ Desplegar Aplicación (2 minutos)

**Comando**:
```bash
npm run deploy
```

**Resultado**:
```
✨ Deployment complete! ✨

URL: https://xxxxxxxx.nist-csf-assessment.pages.dev
```

---

### 4️⃣ Probar la Aplicación (3 minutos)

1. **Abre la URL** del despliegue
2. **Haz login** con:
   - Email: `admin@csp.com`
   - Password: `Admin123!`
3. **Prueba crear un assessment**
4. **Cambia el idioma** a Español (selector arriba a la derecha)
5. **Verifica que funciona** el cambio de idioma

---

## 🎯 ¿Qué obtendrás?

### ✅ Sistema de Autenticación Completo
- Login/Registro/Logout
- Sesiones seguras con tokens JWT
- UI bilingüe (Español/Inglés)

### ✅ Control de Roles y Permisos
| Rol | Puede Crear | Puede Editar | Puede Eliminar |
|-----|-------------|--------------|----------------|
| **Admin** | ✅ | ✅ | ✅ |
| **User** | ✅ | ✅ | ❌ |

### ✅ Internacionalización
- UI completa en Español/Inglés
- Funciones NIST CSF traducidas
- Categorías NIST CSF traducidas
- Cambio de idioma instantáneo

---

## 🔥 Comandos Resumidos (Copiar/Pegar)

```bash
# 1. Navegar al proyecto
cd /home/user/webapp

# 2. Aplicar migración (después de actualizar API key)
npx wrangler d1 migrations apply nist-csf-db --remote

# 3. Desplegar
npm run deploy

# 4. (Opcional) Ver logs
npm run deploy -- --tail
```

---

## 🆘 Solución de Problemas

### Error: "Authentication error [code: 10000]"
**Causa**: API Key inválida  
**Solución**: Repetir Paso 1️⃣ (actualizar API key con permisos correctos)

### Error: "D1 database not found"
**Causa**: Base de datos no existe  
**Solución**:
```bash
npx wrangler d1 create nist-csf-db
# Luego actualizar database_id en wrangler.jsonc
```

### Error: "Migration already applied"
**Causa**: Ya aplicaste la migración antes  
**Solución**: Está bien, continúa con el despliegue

### La app no tiene usuarios
**Causa**: No aplicaste la migración  
**Solución**: Ejecutar `npx wrangler d1 migrations apply nist-csf-db --remote`

---

## 📱 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Cloudflare Dashboard** | https://dash.cloudflare.com |
| **API Tokens** | https://dash.cloudflare.com/profile/api-tokens |
| **GitHub Repo** | https://github.com/fel482217/nist-csf-assessment |
| **Producción** | https://nist-csf-assessment.pages.dev |

---

## 📚 Documentación Completa

| Archivo | Descripción |
|---------|-------------|
| **`RESUMEN_PARA_USUARIO.md`** | Resumen ejecutivo en español |
| **`AUTHENTICATION_IMPLEMENTATION.md`** | Documentación técnica completa |
| **`APPLY_TRANSLATIONS.md`** | Guía de traducciones españolas |
| **`CURRENT_STATUS_AND_NEXT_STEPS.md`** | Estado actual del proyecto |

---

## ✅ Checklist Final

- [ ] ✅ Actualizar Cloudflare API Key en Deploy tab
- [ ] ✅ Aplicar migración: `npx wrangler d1 migrations apply nist-csf-db --remote`
- [ ] ✅ Desplegar aplicación: `npm run deploy`
- [ ] ✅ Abrir URL de producción
- [ ] ✅ Login como admin (`admin@csp.com` / `Admin123!`)
- [ ] ✅ Probar crear assessment
- [ ] ✅ Cambiar idioma a Español
- [ ] ✅ Verificar que admin puede eliminar
- [ ] ✅ Logout y login como user (`user@csp.com` / `User123!`)
- [ ] ✅ Verificar que user NO puede eliminar

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación estará:
- ✅ **Desplegada en producción**
- ✅ **Con autenticación funcional**
- ✅ **Con control de roles**
- ✅ **Bilingüe (EN/ES)**
- ✅ **Lista para usar**

**Tiempo total estimado**: **10-15 minutos** ⏱️

---

**¿Preguntas?** Avísame cuando hayas actualizado tu API Key y continuaremos.
