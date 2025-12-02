## 🚀 **CÓMO APLICAR LOS DATOS EXPANDIDOS**

Tienes **dos opciones** para aplicar toda la expansión de NIST CSF 2.0 a tu base de datos en producción:

---

## **OPCIÓN 1: Desde Cloudflare Dashboard** (Más Fácil) ⭐

### Paso 1: Ir a la consola D1

1. Ve a: **https://dash.cloudflare.com**
2. Click en **"Workers & Pages"**  
3. Click en **"D1"**
4. Click en tu base de datos: **"nist-csf-db"**
5. Click en la pestaña **"Console"**

### Paso 2: Limpiar datos antiguos

Copia y pega este comando:

```sql
DELETE FROM csf_framework_mappings;
DELETE FROM assessment_responses WHERE id > 0;
```

Click en **"Execute"**

### Paso 3: Aplicar nuevas categorías

1. Abre el archivo: **migrations/0002_complete_nist_csf.sql.bak** desde GitHub
2. **OMITE** las primeras líneas (PRAGMA y DELETE)
3. **COPIA** solo los INSERT INTO csf_categories
4. **PEGA** en la consola D1
5. Click en **"Execute"**

### Paso 4: Aplicar subcategorías

1. Abre el archivo: **seed_complete_csf.sql** desde GitHub  
2. **COPIA TODO** el contenido
3. **PEGA** en la consola D1
4. Click en **"Execute"**

### Paso 5: Aplicar controles de frameworks

1. Abre el archivo: **seed_frameworks_controls.sql** desde GitHub
2. **COPIA TODO** el contenido  
3. **PEGA** en la consola D1
4. Click en **"Execute"**

### Paso 6: Aplicar mapeos

1. Abre el archivo: **seed_mappings.sql** desde GitHub
2. **COPIA TODO** el contenido
3. **PEGA** en la consola D1  
4. Click en **"Execute"**

### ✅ Verificar

Ejecuta este comando para verificar:

```sql
SELECT 
    (SELECT COUNT(*) FROM csf_categories) as categories,
    (SELECT COUNT(*) FROM csf_subcategories) as subcategories,
    (SELECT COUNT(*) FROM framework_controls) as controls,
    (SELECT COUNT(*) FROM csf_framework_mappings) as mappings;
```

**Deberías ver:**
- Categories: 23
- Subcategories: 100+
- Controls: 111
- Mappings: 100+

---

## **OPCIÓN 2: Desde Terminal con Wrangler** (Para usuarios técnicos)

### Requisitos
- Tener tu Cloudflare API Token
- Tener wrangler instalado

### Comandos

```bash
# Ir al directorio del proyecto
cd /home/user/webapp

# Set token (reemplaza con tu token)
export CLOUDFLARE_API_TOKEN="y7zbytJsoYc_HNof7aViHv_Nu39oPrXWsUL7FMLj"

# 1. Limpiar datos antiguos  
npx wrangler d1 execute nist-csf-db --remote --command="DELETE FROM csf_framework_mappings; DELETE FROM assessment_responses WHERE id > 0;"

# 2. Aplicar subcategorías
npx wrangler d1 execute nist-csf-db --remote --file=./seed_complete_csf.sql

# 3. Aplicar controles
npx wrangler d1 execute nist-csf-db --remote --file=./seed_frameworks_controls.sql

# 4. Aplicar mapeos
npx wrangler d1 execute nist-csf-db --remote --file=./seed_mappings.sql

# Verificar
npx wrangler d1 execute nist-csf-db --remote --command="SELECT COUNT(*) as total FROM csf_subcategories;"
```

---

## 📊 **¿QUÉ VERÁS DESPUÉS?**

Una vez aplicados los datos, tu aplicación tendrá:

### ✅ En la sección "Assessments"
- **23 categorías** de NIST CSF 2.0 (antes: 18)
- **100+ subcategorías** con preguntas claras en español
- Cada subcategoría tiene una pregunta de assessment específica

**Ejemplo:**
- **GV.OC-01**: "¿La misión, objetivos y actividades de la organización están claramente documentados y comunicados?"

### ✅ En la sección "Frameworks"
- **ISO 27001:2022**: 93 controles completos
- **CIS Controls v8**: 18 controles básicos  
- **COBIT, PCI-DSS, HIPAA, GDPR**: (ya existentes)

### ✅ En los "Mappings"
- **100+ mapeos estratégicos** entre NIST CSF y otros frameworks
- Indicadores de fuerza de mapeo (direct, partial, related)
- Notas explicativas para cada mapeo

---

## 🎯 **Próximos Pasos Después de Aplicar**

1. **Probar la aplicación**: https://nist-csf-assessment.pages.dev
2. **Crear un nuevo assessment** y ver las nuevas subcategorías
3. **Explorar los mapeos** entre frameworks
4. **Evaluar controles** con las nuevas preguntas

---

## ❓ **¿Problemas?**

Si encuentras algún error:

1. **Verifica** que ejecutaste los pasos en orden
2. **Revisa** la consola D1 por mensajes de error
3. **Si algo falla**: Puedes volver a ejecutar los scripts (son idempotentes)

Los DELETE al inicio aseguran que no haya duplicados.

---

## 📝 **Resumen de Archivos**

```
seed_complete_csf.sql           → 100+ subcategorías NIST CSF 2.0
seed_frameworks_controls.sql    → 93 ISO 27001 + 18 CIS Controls
seed_mappings.sql               → 100+ mapeos estratégicos
EXPANSION_GUIDE.md              → Documentación completa
```

---

**¿Listo para aplicar los datos? Elige la OPCIÓN 1 (Dashboard) si no tienes experiencia técnica, o la OPCIÓN 2 (Terminal) si prefieres línea de comandos.**

**¡Tu aplicación quedará con contenido de nivel enterprise!** 🚀
