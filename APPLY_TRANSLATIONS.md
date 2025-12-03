# 🌍 Guía de Aplicación de Traducciones Españolas

**Fecha**: 2024-12-03  
**Estado**: ⚠️ Pendiente - Requiere Cloudflare API Key válida

---

## ⚠️ IMPORTANTE: Actualizar API Key Primero

Antes de ejecutar cualquier comando, debes:

1. **Ir a la pestaña "Deploy"** en la barra lateral
2. **Eliminar la API key actual** (está inválida)
3. **Crear un nuevo token de API** en Cloudflare con permisos:
   - ✅ **Account: D1 Edit** (para modificar la base de datos)
   - ✅ **Account: Workers Scripts Edit** (para desplegar)
4. **Guardar el nuevo token** en la configuración

---

## 📋 Estado Actual de Traducciones

| Contenido | Inglés | Español | Estado |
|-----------|--------|---------|--------|
| **UI (Interfaz)** | ✅ | ✅ | Completo |
| **Funciones NIST CSF** | ✅ | ✅ | **Aplicado a BD** |
| **Categorías NIST CSF** | ✅ | ✅ | **Aplicado a BD** |
| **Subcategorías NIST CSF** | ✅ | ⚠️ | **Pendiente** |

---

## 🚀 Comandos para Aplicar Traducciones

### Paso 1: Aplicar Migración de Autenticación
```bash
cd /home/user/webapp
npx wrangler d1 migrations apply nist-csf-db --remote
```

**Resultado esperado**:
- Crea tabla `users`
- Crea tabla `sessions`
- Agrega columnas `created_by` y `updated_by` a `assessments`
- Inserta usuarios de demo (admin@csp.com, user@csp.com)

---

### Paso 2: Aplicar Traducciones Españolas

El archivo `seed_nist_csf_translations_spanish.sql` contiene **todas las traducciones** pero debe aplicarse en lotes pequeños para evitar errores de FOREIGN KEY.

#### Opción A: Aplicar por lotes manualmente

```bash
# Funciones (6 traducciones) - YA APLICADAS ✅
# npx wrangler d1 execute nist-csf-db --remote --file=seed_es_functions_categories.sql

# Categorías (23 traducciones) - YA APLICADAS ✅
# (incluidas en seed_es_functions_categories.sql)

# Subcategorías (110+ traducciones) - PENDIENTE ⚠️
npx wrangler d1 execute nist-csf-db --remote --command="
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.OC-01', 'es', 'Establecimiento del propósito organizacional', 'El propósito de la organización se entiende e informa sobre los roles, responsabilidades y decisiones relacionadas con la ciberseguridad'),
('GV.OC-02', 'es', 'Comprensión del papel de la ciberseguridad', 'El papel de la ciberseguridad en el apoyo de los objetivos de la organización, la responsabilidad de las partes interesadas y las funciones organizacionales se comunica en toda la organización'),
('GV.OC-03', 'es', 'Determinación de requisitos legales/regulatorios', 'Los requisitos legales, reglamentarios y contractuales con respecto a las capacidades y responsabilidades de ciberseguridad se entienden y gestionan'),
('GV.OC-04', 'es', 'Consideración de tecnologías críticas', 'Las tecnologías y sistemas críticos del negocio se identifican, y su rendimiento de ciberseguridad se prioriza en base a su clasificación, criticidad y valor comercial'),
('GV.OC-05', 'es', 'Establecimiento de requisitos de ciberseguridad para proveedores', 'Los requisitos y objetivos de ciberseguridad de los proveedores de tecnología organizacional se establecen, se comunican y se supervisan')"
```

**Nota**: Este comando es solo un ejemplo con 5 subcategorías. El archivo completo tiene 110+ traducciones.

#### Opción B: Script Python Automático

El archivo `apply_translations.py` puede aplicar todas las traducciones automáticamente en lotes seguros:

```bash
# Instalar dependencias (si es necesario)
pip install python-dotenv

# Configurar token de Cloudflare
export CLOUDFLARE_API_TOKEN="tu-token-aqui"

# Ejecutar script
python apply_translations.py
```

---

## 🧪 Verificar Traducciones Aplicadas

### Verificar Funciones
```bash
npx wrangler d1 execute nist-csf-db --remote --command="
SELECT language, COUNT(*) as count 
FROM csf_function_translations 
GROUP BY language"
```

**Resultado esperado**:
```
language | count
---------|------
en       | 6
es       | 6
```

### Verificar Categorías
```bash
npx wrangler d1 execute nist-csf-db --remote --command="
SELECT language, COUNT(*) as count 
FROM csf_category_translations 
GROUP BY language"
```

**Resultado esperado**:
```
language | count
---------|------
en       | 23
es       | 23
```

### Verificar Subcategorías
```bash
npx wrangler d1 execute nist-csf-db --remote --command="
SELECT language, COUNT(*) as count 
FROM csf_subcategory_translations 
GROUP BY language"
```

**Resultado esperado (después de aplicar traducciones)**:
```
language | count
---------|------
en       | 110+
es       | 110+
```

---

## 🌍 Probar Cambio de Idioma

### Desde el Navegador
1. Abrir https://nist-csf-assessment.pages.dev
2. Hacer login
3. Cambiar idioma en el selector (arriba a la derecha)
4. Verificar que:
   - ✅ UI cambia de idioma inmediatamente
   - ✅ Funciones NIST CSF se muestran en español
   - ✅ Categorías se muestran en español
   - ✅ Subcategorías se muestran en español

### Desde la API
```bash
# Obtener funciones en español
curl "https://nist-csf-assessment.pages.dev/api/csf/functions?lang=es"

# Resultado esperado:
[
  {
    "id": "GV",
    "name": "GOBERNAR",
    "description": "La función GOBERNAR proporciona resultados...",
    "sequence": 1
  },
  ...
]

# Obtener subcategorías en español
curl "https://nist-csf-assessment.pages.dev/api/csf/subcategories?lang=es"

# Resultado esperado:
[
  {
    "id": "GV.OC-01",
    "name": "Establecimiento del propósito organizacional",
    "description": "El propósito de la organización se entiende...",
    ...
  },
  ...
]
```

---

## 📊 Checklist de Verificación

- [ ] ✅ Actualizar Cloudflare API Key en Deploy tab
- [ ] ✅ Aplicar migración de autenticación (`0005_user_authentication.sql`)
- [ ] ✅ Verificar usuarios de demo creados (admin@csp.com, user@csp.com)
- [ ] ✅ Aplicar traducciones españolas de subcategorías
- [ ] ✅ Verificar conteo de traducciones en BD
- [ ] ✅ Probar cambio de idioma en UI
- [ ] ✅ Probar API con parámetro `lang=es`
- [ ] ✅ Desplegar aplicación final

---

## 🆘 Solución de Problemas

### Error: "Authentication error [code: 10000]"
**Problema**: API Key de Cloudflare inválida o sin permisos  
**Solución**: Actualizar API key en Deploy tab con permisos correctos

### Error: "FOREIGN KEY constraint failed"
**Problema**: Intentando insertar traducción para ID que no existe  
**Solución**: Verificar que las subcategorías existen primero:
```bash
npx wrangler d1 execute nist-csf-db --remote --command="SELECT id FROM csf_subcategories"
```

### UI no cambia de idioma
**Problema**: Traducciones no aplicadas a la base de datos  
**Solución**: Aplicar traducciones con los comandos de esta guía

### Contenido parcialmente en español
**Problema**: Solo funciones y categorías tienen traducciones, faltan subcategorías  
**Solución**: Aplicar traducciones de subcategorías (Paso 2, Opción A o B)

---

## 📝 Notas Importantes

1. **Todos los comandos asumen que estás en el directorio `/home/user/webapp`**
2. **La API Key debe tener permisos de D1 Edit**
3. **Las traducciones ya están preparadas** en `seed_nist_csf_translations_spanish.sql`
4. **No es necesario reiniciar la aplicación** - los cambios son inmediatos
5. **El cambio de idioma es dinámico** - la UI actualiza automáticamente

---

## ✅ Una vez completado

Después de aplicar todas las traducciones:

1. **Desplegar aplicación actualizada**:
   ```bash
   npm run deploy
   ```

2. **Probar funcionalidad completa**:
   - Login como admin y user
   - Cambio de idioma EN/ES
   - Verificar que todo el contenido se traduce
   - Probar permisos de eliminación (admin sí, user no)

3. **Disfrutar de la aplicación bilingüe completa** 🎉
