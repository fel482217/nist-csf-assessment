# Guía de Pruebas - Sistema de Aprobación de Usuarios

## 🎯 Objetivo
Este documento describe cómo probar el nuevo sistema de auto-registro con aprobación de administrador y filtrado de evaluaciones por organización.

---

## 📋 Pre-requisitos

### URLs de Producción
- **Principal**: https://nist-csf-assessment.pages.dev
- **Última actualización**: https://0a1cd2ca.nist-csf-assessment.pages.dev

### Credenciales de Administrador
- **Email**: `admin@csp.com`
- **Password**: `Admin123!`

---

## 🧪 Escenario 1: Auto-Registro de Usuario

### Paso 1: Registrar un nuevo usuario
1. Ir a la URL de producción
2. Click en **"Register"** en la parte superior derecha
3. Completar el formulario:
   - **Full Name**: `Carlos Mendoza`
   - **Email**: `carlos.mendoza@example.com`
   - **Organization**: Seleccionar cualquier organización del dropdown (ej: "Acme Corporation")
   - **Password**: `Test123!`
4. Click en **"Create Account"**

### ✅ Resultado Esperado
- Mensaje de éxito: *"Registration successful! Your account is pending administrator approval."* (EN)
- O: *"¡Registro exitoso! Tu cuenta está pendiente de aprobación por un administrador."* (ES)
- Automáticamente redirigido a la pantalla de Login (después de 2 segundos)

---

## 🧪 Escenario 2: Intento de Login SIN Aprobación

### Paso 2: Intentar iniciar sesión
1. En la pantalla de Login
2. Ingresar:
   - **Email**: `carlos.mendoza@example.com`
   - **Password**: `Test123!`
3. Click en **"Login"**

### ✅ Resultado Esperado
- **ERROR**: *"Your account has not been approved yet. Please contact an administrator."* (EN)
- O: *"Tu cuenta aún no ha sido aprobada. Por favor contacta a un administrador."* (ES)
- **NO** debe permitir el acceso al sistema

---

## 🧪 Escenario 3: Aprobación por Administrador

### Paso 3: Login como Administrador
1. Click en **"Logout"** si está conectado
2. Click en **"Login"**
3. Ingresar credenciales de administrador:
   - **Email**: `admin@csp.com`
   - **Password**: `Admin123!`
4. Click en **"Login"**

### ✅ Resultado Esperado
- Acceso exitoso al sistema
- Ver menú con: Assessments, Frameworks, Organizations, **Users**

### Paso 4: Ver usuarios pendientes
1. Click en menú **"Users"**
2. Observar la interfaz

### ✅ Resultado Esperado
Debe aparecer DOS secciones:

#### 📍 Sección 1: "Pending Approval" (fondo naranja)
- **Título**: "Pending Approval" con badge naranja (cantidad de usuarios pendientes)
- **Contenido**: Carlos Mendoza
  - Badge: "Awaiting Approval"
  - Email: carlos.mendoza@example.com
  - Organization: Acme Corporation (la que seleccionó)
  - Registered on: [fecha de hoy]
  - **Botones**:
    - ✅ **Approve** (verde)
    - ❌ **Reject** (rojo)

#### 📍 Sección 2: "Active Users" (fondo blanco)
- **Título**: "Active Users" con badge azul (cantidad de usuarios activos)
- **Contenido**: Lista de usuarios ya aprobados
  - Admin user
  - Otros usuarios existentes
  - Cada uno con su organización
  - **Botones**: Edit, Delete

### Paso 5: Aprobar usuario
1. Click en el botón **"Approve"** de Carlos Mendoza
2. Confirmar en el diálogo: *"Approve user 'Carlos Mendoza'? They will be able to log in and access the system."*

### ✅ Resultado Esperado
- Mensaje de éxito: *"User approved successfully"* / *"Usuario aprobado exitosamente"*
- Carlos Mendoza **desaparece** de la sección "Pending Approval"
- Carlos Mendoza **aparece** en la sección "Active Users"
- Badge cambia de "Awaiting Approval" a "Active"

---

## 🧪 Escenario 4: Login Exitoso DESPUÉS de Aprobación

### Paso 6: Logout del Admin
1. Click en **"Logout"**
2. Confirmar

### Paso 7: Login como Carlos Mendoza
1. Click en **"Login"**
2. Ingresar:
   - **Email**: `carlos.mendoza@example.com`
   - **Password**: `Test123!`
3. Click en **"Login"**

### ✅ Resultado Esperado
- **ÉXITO**: Acceso permitido al sistema
- Ver menú: Assessments, Frameworks, Organizations (NO debe ver "Users" porque no es admin)

---

## 🧪 Escenario 5: Filtrado de Evaluaciones por Organización

### Paso 8: Ver evaluaciones como usuario regular
1. Estando logueado como Carlos Mendoza
2. Click en **"Assessments"**
3. Observar la lista de evaluaciones

### ✅ Resultado Esperado
- **SOLO** debe ver evaluaciones de **Acme Corporation** (su organización)
- **NO** debe ver evaluaciones de otras organizaciones
- Si no hay evaluaciones para Acme Corporation, debe ver mensaje: *"No assessments yet. Create your first one!"*

### Paso 9: Crear evaluación como usuario regular
1. Click en **"New Assessment"**
2. Observar el formulario

### ✅ Resultado Esperado
- Formulario muestra **SOLO** los campos:
  - ✅ Organization (selector)
  - ✅ Assessment Name
  - ✅ Assessment Date
  - ✅ Assessor Name (opcional)
  - ✅ Description (opcional)
- **NO** debe aparecer selector de "Framework" (NIST CSF 2.0 es por defecto)

### Paso 10: Completar y crear evaluación
1. Completar:
   - **Organization**: Acme Corporation (debe estar pre-seleccionado o ser la única opción)
   - **Assessment Name**: `Q4 2025 Security Assessment`
   - **Assessment Date**: [fecha de hoy]
   - **Assessor**: `Carlos Mendoza`
   - **Description**: `Quarterly security posture evaluation`
2. Click en **"Create Assessment"**

### ✅ Resultado Esperado
- Mensaje de éxito
- La evaluación aparece en la lista
- Framework asignado automáticamente: **NIST CSF 2.0**

### Paso 11: Verificar filtrado como Admin
1. Logout de Carlos Mendoza
2. Login como Admin (`admin@csp.com` / `Admin123!`)
3. Click en **"Assessments"**

### ✅ Resultado Esperado
- **Admin ve TODAS las evaluaciones** de **TODAS las organizaciones**
- No hay filtrado por organización para el administrador

---

## 🧪 Escenario 6: Rechazar Usuario Pendiente

### Paso 12: Registrar otro usuario
1. Logout si está conectado
2. Click en **"Register"**
3. Registrar:
   - **Full Name**: `Maria Rodriguez`
   - **Email**: `maria.rodriguez@example.com`
   - **Organization**: Tech Solutions Inc.
   - **Password**: `Test456!`

### Paso 13: Login como Admin y rechazar
1. Login como Admin
2. Click en **"Users"**
3. En sección "Pending Approval", encontrar a Maria Rodriguez
4. Click en **"Reject"**
5. Confirmar: *"Reject user 'Maria Rodriguez'? This will permanently delete their registration."*

### ✅ Resultado Esperado
- Mensaje: *"User registration rejected and deleted"* / *"Registro de usuario rechazado y eliminado"*
- Maria Rodriguez **desaparece completamente** del sistema
- **NO** pasa a "Active Users"
- El registro es **eliminado permanentemente**

---

## 📊 Matriz de Permisos

| Funcionalidad | Usuario Regular | Administrador |
|---------------|----------------|---------------|
| Ver usuarios pendientes | ❌ NO | ✅ SÍ |
| Aprobar usuarios | ❌ NO | ✅ SÍ |
| Rechazar usuarios | ❌ NO | ✅ SÍ |
| Ver todas las evaluaciones | ❌ NO (solo su org) | ✅ SÍ |
| Crear evaluaciones | ✅ SÍ (solo su org) | ✅ SÍ |
| Eliminar evaluaciones | ❌ NO | ✅ SÍ |
| Gestionar organizaciones | ❌ NO | ✅ SÍ |
| Menú "Users" | ❌ NO visible | ✅ SÍ visible |
| Reabrir evaluaciones | ❌ NO | ✅ SÍ |

---

## 🔐 Modelo de Seguridad Verificado

### ✅ Flujo de Registro
```
Usuario se registra
   ↓
is_approved = FALSE (no puede login)
   ↓
Admin revisa en "Pending Approval"
   ↓
Admin APRUEBA → is_approved = TRUE → Usuario puede login
   ↓
Admin RECHAZA → Registro eliminado permanentemente
```

### ✅ Filtrado de Evaluaciones
```
Usuario Regular login
   ↓
GET /api/assessments (backend verifica role)
   ↓
role = 'user' → Filtra por organization_id del usuario
   ↓
role = 'admin' → No filtra, retorna TODAS
```

### ✅ Asociación a Organización
```
Registro incluye organization_id obligatorio
   ↓
Usuario asociado permanentemente a su organización
   ↓
Solo ve/crea evaluaciones de su organización
   ↓
Admin puede reasignar organización desde User Edit
```

---

## 🌍 Traducciones a Verificar

### English (en.json)
- ✅ "Pending Approval"
- ✅ "Awaiting Approval"
- ✅ "Active Users"
- ✅ "Registered on"
- ✅ "Registration successful! Your account is pending administrator approval."
- ✅ "Your account has not been approved yet. Please contact an administrator."
- ✅ "User approved successfully"
- ✅ "User registration rejected and deleted"

### Español (es.json)
- ✅ "Pendientes de Aprobación"
- ✅ "Esperando Aprobación"
- ✅ "Usuarios Activos"
- ✅ "Registrado el"
- ✅ "¡Registro exitoso! Tu cuenta está pendiente de aprobación por un administrador."
- ✅ "Tu cuenta aún no ha sido aprobada. Por favor contacta a un administrador."
- ✅ "Usuario aprobado exitosamente"
- ✅ "Registro de usuario rechazado y eliminado"

---

## ⚠️ Casos Edge a Probar

### 1. Usuario sin organización (legacy)
- **Escenario**: Usuarios existentes antes de la migración
- **Esperado**: Funcionan normalmente, organization_id = NULL

### 2. Organización eliminada
- **Escenario**: Eliminar organización con usuarios asociados
- **Comportamiento**: Por definir (actualmente FOREIGN KEY puede impedir eliminación)

### 3. Múltiples registros mismo email
- **Escenario**: Intentar registrar email ya existente
- **Esperado**: Error de validación (UNIQUE constraint)

### 4. Cambio de idioma en formularios
- **Escenario**: Cambiar idioma (EN ↔ ES) en formulario de registro
- **Esperado**: Todos los textos se traducen correctamente

---

## 🎉 Checklist Final

### Funcionalidad Core
- [ ] Usuario puede auto-registrarse con organización
- [ ] Usuario NO puede login sin aprobación
- [ ] Admin ve sección "Pending Approval"
- [ ] Admin puede aprobar usuarios
- [ ] Admin puede rechazar/eliminar usuarios
- [ ] Usuario aprobado puede login exitosamente
- [ ] Usuario regular solo ve evaluaciones de su organización
- [ ] Admin ve evaluaciones de todas las organizaciones
- [ ] Formulario "New Assessment" sin selector de Framework
- [ ] NIST CSF 2.0 se asigna automáticamente

### UI/UX
- [ ] Usuarios pendientes en sección destacada (naranja)
- [ ] Usuarios activos en sección separada (blanco)
- [ ] Nombres de organizaciones visibles en user cards
- [ ] Badges de estado claros ("Awaiting Approval", "Active")
- [ ] Botones Approve/Reject visibles solo para pendientes
- [ ] Mensajes de confirmación claros en español e inglés

### Seguridad
- [ ] No se puede bypassear aprobación modificando is_approved directamente
- [ ] Filtrado de evaluaciones aplicado en backend (no solo UI)
- [ ] Endpoints admin verifican role antes de ejecutar
- [ ] organization_id obligatorio en registro

### Traducciones
- [ ] Todos los nuevos textos en inglés
- [ ] Todos los nuevos textos en español
- [ ] Cambio de idioma funciona en todos los formularios
- [ ] Confirmaciones y errores traducidos

---

## 📞 Contacto / Soporte

Si encuentras algún problema durante las pruebas, verifica:
1. Consola del navegador (F12) para errores JavaScript
2. Network tab para ver respuestas de API
3. Versión del deployment (debe ser https://0a1cd2ca.nist-csf-assessment.pages.dev o posterior)

---

**Versión del Sistema**: 2.1.0  
**Fecha de Implementación**: 03 Diciembre 2025  
**Migración DB**: 0007_user_organization_and_approval.sql  
**Deployment URL**: https://0a1cd2ca.nist-csf-assessment.pages.dev
