# 🧪 Guía de Prueba: Admin vs Usuario Regular

**Fecha**: 2024-12-03  
**URL de Producción**: https://4c414d2d.nist-csf-assessment.pages.dev  
**Estado**: ✅ Botones de Eliminación Implementados

---

## 🎯 Objetivo de la Prueba

Verificar que:
1. ✅ **Admin** puede **ver y usar** botones de "Eliminar"
2. ✅ **Usuario regular** **NO puede ver** botones de "Eliminar"
3. ✅ Backend rechaza intentos de eliminación de usuarios regulares (403 Forbidden)

---

## 👑 PRUEBA 1: Login como Administrador

### Paso 1: Acceder a la Aplicación
```
URL: https://4c414d2d.nist-csf-assessment.pages.dev
```

### Paso 2: Login como Admin
- **Email**: `admin@csp.com`
- **Password**: `Admin123!`
- Haz clic en **"Login"**

### Paso 3: Verificar que Eres Admin
En la esquina superior derecha deberías ver:
```
Administrator
Administrador
```

### Paso 4: Ir a la Vista de Assessments
- Haz clic en **"Assessments"** (o **"Evaluaciones"** si está en español)
- Verás la lista de assessments

### Paso 5: ✅ VERIFICAR BOTONES DE ELIMINAR
**Deberías ver**:
- Cada assessment tiene un **botón rojo "Delete"** (o "Eliminar")
- El botón está a la derecha, junto al estado del assessment

**Captura visual**:
```
┌─────────────────────────────────────────────────────┐
│ Assessment Name                    NIST CSF 2.0     │
│ 🏢 Organization Name                                │
│ 📅 2024-12-03   👤 Assessor Name                   │
│                                                      │
│                        [DRAFT]  [🗑️ Delete]       │
└─────────────────────────────────────────────────────┘
```

### Paso 6: Probar Eliminación
1. **Haz clic en "Delete"** de cualquier assessment
2. Aparecerá una **primera confirmación**:
   ```
   ¿Estás seguro de que quieres eliminar esta evaluación?
   Esta acción no se puede deshacer.
   ```
3. Haz clic en **"OK"**
4. Aparecerá una **segunda confirmación** (más segura):
   ```
   Esto eliminará permanentemente la evaluación y todas sus respuestas.
   Escribe DELETE para confirmar:
   ```
5. Escribe exactamente: **`DELETE`** (en mayúsculas)
6. Haz clic en **"OK"**
7. Verás una **notificación verde**: "Assessment deleted successfully"
8. El assessment **desaparece de la lista**

### Paso 7: Ir a la Vista de Organizaciones
- Haz clic en **"Organizations"** (o **"Organizaciones"**)
- Verás la lista de organizaciones

### Paso 8: ✅ VERIFICAR BOTONES DE ELIMINAR EN ORGANIZACIONES
**Deberías ver**:
- Cada organización tiene un **botón rojo "Delete"**
- Similar al de assessments

### Paso 9: Probar Eliminación de Organización (Opcional)
⚠️ **ADVERTENCIA**: Esto eliminará también todos los assessments asociados
1. Haz clic en **"Delete"** de una organización
2. Confirma dos veces (igual que con assessments)
3. La organización **desaparece de la lista**

---

## 👤 PRUEBA 2: Login como Usuario Regular

### Paso 1: Cerrar Sesión como Admin
- Haz clic en **"Logout"** (o **"Cerrar Sesión"**) en la esquina superior derecha
- Confirma que quieres cerrar sesión

### Paso 2: Login como Usuario Regular
- **Email**: `user@csp.com`
- **Password**: `User123!`
- Haz clic en **"Login"**

### Paso 3: Verificar que Eres Usuario Regular
En la esquina superior derecha deberías ver:
```
Regular User
Usuario
```

### Paso 4: Ir a la Vista de Assessments
- Haz clic en **"Assessments"**

### Paso 5: ❌ VERIFICAR QUE NO HAY BOTONES DE ELIMINAR
**NO deberías ver**:
- ❌ Botón "Delete" en los assessments
- Los assessments se ven normales, pero **sin botón de eliminar**

**Captura visual**:
```
┌─────────────────────────────────────────────────────┐
│ Assessment Name                    NIST CSF 2.0     │
│ 🏢 Organization Name                                │
│ 📅 2024-12-03   👤 Assessor Name                   │
│                                                      │
│                                      [DRAFT]        │  ← Sin botón Delete
└─────────────────────────────────────────────────────┘
```

### Paso 6: Ir a la Vista de Organizaciones
- Haz clic en **"Organizations"**

### Paso 7: ❌ VERIFICAR QUE NO HAY BOTONES DE ELIMINAR
**NO deberías ver**:
- ❌ Botón "Delete" en las organizaciones

### Paso 8: Verificar Protección del Backend (Opcional)
Si intentas eliminar mediante API (consola del navegador):
```javascript
// Presiona F12 y ve a Console, ejecuta:
axios.delete('/api/assessments/1')
```

**Resultado esperado**:
```json
{
  "error": "Forbidden: Admin access required"
}
Status: 403 Forbidden
```

---

## 📊 Resumen de Diferencias

| Funcionalidad | Admin | Usuario Regular |
|---------------|-------|-----------------|
| **Ver assessments** | ✅ Sí | ✅ Sí |
| **Crear assessments** | ✅ Sí | ✅ Sí |
| **Responder assessments** | ✅ Sí | ✅ Sí |
| **Ver botón "Delete" en assessments** | ✅ **Sí** | ❌ **No** |
| **Eliminar assessments** | ✅ **Sí** | ❌ **No** |
| **Ver botón "Delete" en organizaciones** | ✅ **Sí** | ❌ **No** |
| **Eliminar organizaciones** | ✅ **Sí** | ❌ **No** |

---

## 🔒 Seguridad Implementada

### Nivel 1: Frontend (UI)
```javascript
const isAdmin = window.authState.user.role === 'admin';

// Solo muestra botón si es admin
${isAdmin ? `<button>Delete</button>` : ''}
```

### Nivel 2: Backend (API)
```typescript
// Middleware protege endpoint
app.delete('/api/assessments/:id', requireAuth, requireAdmin, async (c) => {
  // Solo ejecuta si user.role === 'admin'
})
```

**Resultado**:
- ✅ Si usuario regular intenta eliminar → **403 Forbidden**
- ✅ Doble protección (UI + Backend)

---

## 🎨 Diferencias Visuales

### Como Admin:
![Admin View - Con Botones Delete](Cada tarjeta tiene botón rojo de eliminar)

### Como Usuario Regular:
![User View - Sin Botones Delete](Tarjetas idénticas pero sin botón de eliminar)

---

## 🧪 Checklist de Prueba

### ✅ Prueba como Admin
- [ ] Login exitoso con admin@csp.com / Admin123!
- [ ] Ver nombre "Administrator" en header
- [ ] Ver botones "Delete" en assessments
- [ ] Ver botones "Delete" en organizaciones
- [ ] Eliminar un assessment (con doble confirmación)
- [ ] Verificar que desaparece de la lista
- [ ] Notificación de éxito aparece

### ✅ Prueba como Usuario Regular
- [ ] Logout como admin
- [ ] Login exitoso con user@csp.com / User123!
- [ ] Ver nombre "Regular User" en header
- [ ] **NO** ver botones "Delete" en assessments
- [ ] **NO** ver botones "Delete" en organizaciones
- [ ] Poder crear assessments (sin problemas)
- [ ] Poder responder assessments (sin problemas)

### ✅ Prueba de Seguridad Backend
- [ ] Intentar DELETE desde consola como user
- [ ] Recibir error 403 Forbidden
- [ ] Confirmar mensaje "Admin access required"

---

## 🆘 Solución de Problemas

### No veo los botones de "Delete" como Admin
**Problema**: Puede que no hayas hecho login o el token expiró  
**Solución**:
1. Verifica que dice "Administrator" en el header
2. Recarga la página (F5)
3. Si no funciona, logout y login de nuevo

### Los botones aparecen pero no eliminan
**Problema**: Error en la llamada API  
**Solución**:
1. Abre la consola del navegador (F12)
2. Verifica si hay errores
3. Comprueba que el token es válido

### Botones aparecen para usuario regular
**Problema**: El `authState` no está actualizado  
**Solución**:
1. Logout y login de nuevo
2. Recarga la página completamente
3. Verifica que dice "Regular User" en el header

---

## 📝 Notas Importantes

1. **Doble Confirmación**: Los botones de eliminar requieren **DOS** confirmaciones para evitar eliminaciones accidentales
2. **Escribir "DELETE"**: La segunda confirmación requiere escribir exactamente `DELETE` en mayúsculas
3. **Traducción**: Los mensajes de confirmación están traducidos según el idioma seleccionado
4. **Eliminación en Cascada**: Eliminar una organización **también elimina** todos sus assessments asociados

---

## ✅ Resultado Esperado

**Al completar esta prueba, deberías confirmar que**:

1. ✅ **Admin tiene control total**: Puede ver y usar botones de eliminación
2. ✅ **Usuario regular está limitado**: NO ve botones de eliminación
3. ✅ **Backend protege las rutas**: Usuario regular recibe 403 si intenta llamar API
4. ✅ **Sistema de doble confirmación funciona**: Evita eliminaciones accidentales
5. ✅ **Traducciones funcionan**: Mensajes en español/inglés según idioma

---

**¡La diferencia entre Admin y Usuario está completamente implementada!** 🎉

**URLs de Prueba**:
- **Principal**: https://nist-csf-assessment.pages.dev
- **Última actualización**: https://4c414d2d.nist-csf-assessment.pages.dev

**Usuarios de Prueba**:
- **Admin**: admin@csp.com / Admin123!
- **User**: user@csp.com / User123!
