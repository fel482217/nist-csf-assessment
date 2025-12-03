# Guía de Usuario - Módulo de Reportes y Análisis

## 🎯 Introducción

El **Módulo de Reportes** permite generar reportes profesionales en PDF, visualizar comparaciones entre evaluaciones mediante gráficos radar, y analizar el progreso de madurez de ciberseguridad de tu organización.

---

## 📊 Tipos de Reportes Disponibles

### 1. **Reporte Individual (PDF Export)**
Exporta una evaluación individual a PDF con todos sus detalles, estadísticas y respuestas.

**Disponible para**: Todos los usuarios (solo evaluaciones de su organización)

### 2. **Comparación de Evaluaciones (Radar Charts)**
Compara de 2 a 5 evaluaciones de tu organización mediante gráficos radar interactivos.

**Disponible para**: Todos los usuarios (limitado a su organización)

### 3. **Comparación Multi-Organización**
Compara evaluaciones entre diferentes organizaciones para análisis de benchmarking.

**Disponible para**: Solo Administradores

---

## 🚀 Cómo Usar el Módulo de Reportes

### Paso 1: Acceder al Módulo de Reportes

1. Inicia sesión en la plataforma CSP
2. Click en el menú **"Reports"** (Reportes) en la barra de navegación superior
3. Verás 3 tarjetas con los tipos de reportes disponibles

---

## 📄 Reporte Individual (PDF Export)

### Descripción
Genera un reporte PDF profesional de una evaluación específica, ideal para presentar a stakeholders o auditorías.

### Contenido del PDF

**Página 1 - Información General:**
- Título del assessment
- Organización
- Fecha de la evaluación
- Estado (Draft, In Progress, Completed)
- Nombre del evaluador
- Estadísticas:
  - Porcentaje de completitud
  - Madurez promedio (X / 4.0)
  - Subcategorías evaluadas (X / 110)
- Descripción (si está disponible)

**Página 2+ - Resumen de Respuestas:**
- Lista de subcategorías evaluadas (hasta 20 por página)
- Para cada subcategoría:
  - Identificador y nombre (ej: "GV.OC-01: Cybersecurity Risk Management Strategy")
  - Nivel de madurez (Tier 0-4)
  - Estado de implementación
- Si hay más de 20 respuestas, indica cuántas más existen

**Footer:**
- Número de página (Page X of Y)
- Fecha y hora de generación

### Cómo Generar un Reporte Individual

1. Click en la tarjeta **"Individual Report"**
2. Se mostrará la lista de evaluaciones disponibles
3. Click en el botón **"Export PDF"** de la evaluación deseada
4. El PDF se descargará automáticamente con el nombre: `[NombreEvaluacion]_Report.pdf`

### Ejemplo de Nombre de Archivo
```
Q4_2025_Security_Assessment_Report.pdf
```

---

## 📈 Comparación de Evaluaciones (Radar Charts)

### Descripción
Visualiza y compara el nivel de madurez de múltiples evaluaciones mediante un gráfico radar interactivo. Permite identificar fortalezas, debilidades y evolución en el tiempo.

### Gráfico Radar - ¿Qué Muestra?

**Ejes (6 Funciones NIST CSF 2.0):**
- **GV** - Govern (Gobernar)
- **ID** - Identify (Identificar)
- **PR** - Protect (Proteger)
- **DE** - Detect (Detectar)
- **RS** - Respond (Responder)
- **RC** - Recover (Recuperar)

**Escala:** 0 a 4 (Niveles de Madurez NIST CSF)
- **0** - No Evaluado
- **1** - Tier 1 - Parcial
- **2** - Tier 2 - Informado por Riesgo
- **3** - Tier 3 - Repetible
- **4** - Tier 4 - Adaptativo

**Datasets:** Cada evaluación seleccionada se muestra con un color diferente:
- Azul, Morado, Verde, Naranja, Rosa

### Cómo Generar una Comparación

1. Click en la tarjeta **"Compare Assessments"**
2. Se muestran las evaluaciones agrupadas por organización
3. Selecciona entre **2 y 5 evaluaciones** usando los checkboxes
   - Contador en vivo: "Selected: X / 5"
   - Botón "Generate Comparison" se habilita con 2+ seleccionadas
4. Click en **"Generate Comparison"**
5. Se genera el gráfico radar interactivo
6. Hover sobre los puntos del gráfico para ver valores exactos

### Exportar Comparación a PDF

Después de generar el gráfico:

1. Scroll down hasta el gráfico
2. Click en **"Export Comparison Report"**
3. Se descargará un PDF que incluye:
   - Lista de evaluaciones comparadas
   - Imagen del gráfico radar
   - Página de notas explicando niveles de madurez
   - Fecha y hora de generación

**Nombre del archivo:** `Assessment_Comparison_Report.pdf`

---

## 🏢 Comparación Multi-Organización (Solo Admin)

### Descripción
Función exclusiva para administradores que permite comparar evaluaciones de diferentes organizaciones. Útil para benchmarking y análisis comparativos entre clientes o departamentos.

### Banner de Advertencia
Al seleccionar esta opción, verás un banner rojo con el mensaje:
> **"Administrator Only Feature"**  
> This feature allows comparing assessments across different organizations. Regular users can only compare assessments within their own organization.

### Diferencias con Comparación Regular

| Característica | Comparación Regular | Multi-Organización |
|----------------|---------------------|-------------------|
| **Acceso** | Todos los usuarios | Solo Admin |
| **Organizaciones** | Solo la propia | Todas |
| **UI Theme** | Morado | Rojo |
| **Agrupación** | Por organización (opcional) | Por organización (obligatorio) |
| **Etiquetas** | Solo nombre de assessment | Nombre + Organización |

### Cómo Usar Multi-Organización

1. Login como administrador
2. Click en **"Reports"**
3. Click en la tarjeta roja **"Multi-Organization"**
4. Las evaluaciones se muestran agrupadas por organización con bordes
5. Selecciona evaluaciones de **diferentes organizaciones** (2-5)
6. Click en **"Generate Comparison"** (botón rojo)
7. El gráfico muestra cada evaluación con su organización en la leyenda:
   - `Assessment Name (Organization Name)`

### Ejemplo de Leyenda
```
Q4 2025 Assessment (Acme Corporation)
Q4 2025 Assessment (Tech Solutions Inc)
Annual Review (Global Enterprises)
```

---

## 🔐 Control de Acceso y Seguridad

### Usuarios Regulares

**Pueden:**
- ✅ Generar reportes PDF de evaluaciones de su organización
- ✅ Comparar evaluaciones de su organización (máximo 5)
- ✅ Exportar comparaciones a PDF

**NO Pueden:**
- ❌ Ver evaluaciones de otras organizaciones
- ❌ Generar reportes de evaluaciones de otras organizaciones
- ❌ Acceder a la función Multi-Organización (tarjeta oculta)

### Administradores

**Pueden:**
- ✅ Todo lo que pueden hacer usuarios regulares
- ✅ Ver evaluaciones de todas las organizaciones
- ✅ Comparar evaluaciones dentro de una organización
- ✅ Comparar evaluaciones entre múltiples organizaciones
- ✅ Acceder a la función Multi-Organización

---

## 💡 Casos de Uso

### Caso 1: Reporte Ejecutivo Trimestral
**Objetivo:** Presentar resultados de evaluación al CEO

**Pasos:**
1. Seleccionar "Individual Report"
2. Exportar la evaluación del Q4
3. PDF listo para presentación en reunión de directorio

### Caso 2: Análisis de Evolución Anual
**Objetivo:** Ver progreso de madurez a lo largo del año

**Pasos:**
1. Seleccionar "Compare Assessments"
2. Seleccionar evaluaciones: Q1, Q2, Q3, Q4 del 2025
3. Generar gráfico radar
4. Observar mejoras en funciones ID, PR, DE
5. Exportar PDF para documentación de auditoría

### Caso 3: Benchmarking de Clientes (Admin)
**Objetivo:** Comparar madurez entre diferentes clientes

**Pasos:**
1. Login como admin
2. Seleccionar "Multi-Organization"
3. Seleccionar una evaluación de cada cliente:
   - Cliente A: Annual Assessment 2025
   - Cliente B: Quarterly Review Q4
   - Cliente C: Security Audit 2025
4. Generar comparación
5. Identificar cliente con mejor madurez promedio
6. Exportar PDF para presentación a stakeholders

### Caso 4: Análisis de Gap (Brecha)
**Objetivo:** Identificar áreas de mejora entre evaluación inicial y actual

**Pasos:**
1. Seleccionar "Compare Assessments"
2. Seleccionar:
   - Initial Assessment (Jan 2025)
   - Current Assessment (Dec 2025)
3. Generar gráfico radar
4. Identificar funciones con mayor crecimiento (ej: PR pasó de 1.5 a 3.2)
5. Identificar funciones con menor crecimiento para enfoque 2026

---

## 🎨 Interfaz de Usuario

### Pantalla Principal de Reportes

```
┌─────────────────────────────────────────────────────────┐
│                    Reports & Analytics                  │
└─────────────────────────────────────────────────────────┘

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   [PDF]     │  │   [Chart]   │  │ [Building]  │
│             │  │             │  │             │
│  Individual │  │  Compare    │  │ Multi-Org   │
│   Report    │  │ Assessments │  │ (Admin)     │
│             │  │             │  │             │
│ Export PDF  │  │ Radar Charts│  │ Cross-Org   │
│   for one   │  │  for 2-5    │  │ Comparison  │
│ assessment  │  │ assessments │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Pantalla de Comparación

```
┌─────────────────────────────────────────────────────────┐
│  Select Assessments to Compare (2-5)                    │
│  Selected: 3 / 5                    [Generate Comparison]│
└─────────────────────────────────────────────────────────┘

Organization: Acme Corporation
  ☑ Q1 2025 Security Assessment
  ☑ Q2 2025 Security Assessment
  ☐ Q3 2025 Security Assessment

Organization: Tech Solutions
  ☑ Annual Review 2025
  ☐ Mid-Year Assessment

┌─────────────────────────────────────────────────────────┐
│        Maturity Level Comparison by Function            │
│                                                          │
│                    [Radar Chart]                         │
│                                                          │
│  Legend:                                                 │
│  ━ Q1 2025 (Acme Corp)                                  │
│  ━ Q2 2025 (Acme Corp)                                  │
│  ━ Annual Review (Tech Solutions)                       │
│                                                          │
│                [Export Comparison Report]                │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Ejemplo de Interpretación de Gráfico Radar

### Escenario: Comparar Q1 vs Q4 2025

**Gráfico Radar Muestra:**

```
        GV (4)
         /\
        /  \
   RC  /    \  ID
  (4) /      \ (4)
     |        |
     |   ●●   |  ← Assessment Q4 (línea azul)
     |  ●  ●  |  ← Assessment Q1 (línea morada)
     |        |
  RS  \      /  PR
  (4)  \    /  (4)
        \  /
         \/
        DE (4)
```

**Valores de Ejemplo:**

| Función | Q1 2025 | Q4 2025 | Mejora |
|---------|---------|---------|--------|
| GV      | 2.1     | 2.8     | +0.7   |
| ID      | 1.5     | 2.5     | +1.0   |
| PR      | 1.8     | 3.2     | +1.4   |
| DE      | 2.0     | 2.6     | +0.6   |
| RS      | 1.2     | 2.0     | +0.8   |
| RC      | 1.0     | 1.8     | +0.8   |

**Interpretación:**

1. **Mayor Mejora: PR (Protect)** - +1.4 puntos
   - Implementación significativa de controles de protección
   - Enfoque exitoso en prevención

2. **Segunda Mejor: ID (Identify)** - +1.0 punto
   - Mejor identificación de activos y riesgos
   - Procesos de gestión de riesgos más maduros

3. **Área de Oportunidad: RC (Recover)** - Solo +0.8, aún en 1.8
   - Necesita atención en planes de continuidad
   - Foco para Q1 2026

---

## ⚠️ Limitaciones y Consideraciones

### Limitaciones Técnicas

1. **Máximo de Evaluaciones:**
   - Comparación: Máximo 5 evaluaciones
   - Individual: Sin límite, pero una a la vez

2. **Tamaño de PDF:**
   - Individual: Limitado a ~50 páginas (aprox. 1000 respuestas)
   - Comparación: 2-3 páginas fijas

3. **Resolución de Gráfico:**
   - Canvas: 400x400 pixeles
   - PDF export: 180x180 mm (alta calidad)

4. **Navegadores Soportados:**
   - Chrome/Edge: ✅ Totalmente soportado
   - Firefox: ✅ Totalmente soportado
   - Safari: ✅ Soportado (puede requerir permisos de descarga)

### Consideraciones de Performance

1. **Generación de PDF Individual:**
   - Tiempo estimado: 2-5 segundos
   - Depende del número de respuestas

2. **Generación de Radar Chart:**
   - Tiempo estimado: 3-8 segundos
   - Realiza 1 request por evaluación seleccionada

3. **Exportación de Comparación:**
   - Tiempo estimado: 1-2 segundos
   - Convierte canvas a imagen PNG primero

### Mejores Prácticas

1. **Selección de Evaluaciones para Comparar:**
   - ✅ Comparar evaluaciones del mismo periodo (ej: todos Q4)
   - ✅ Comparar evaluaciones del mismo tipo (ej: todas anuales)
   - ⚠️ Evitar mezclar evaluaciones de diferente alcance

2. **Interpretación de Resultados:**
   - ✅ Considerar contexto organizacional
   - ✅ Analizar tendencias, no valores absolutos
   - ⚠️ No usar para comparaciones competitivas sin contexto

3. **Compartir Reportes:**
   - ✅ PDFs son seguros para compartir (sin datos sensibles embebidos)
   - ✅ Gráficos son imágenes estáticas (sin acceso a backend)
   - ⚠️ Verificar que el destinatario tiene autorización

---

## 🔧 Solución de Problemas

### Problema 1: No veo evaluaciones para exportar
**Causa:** No tienes evaluaciones creadas o no pertenecen a tu organización

**Solución:**
1. Verifica que tienes evaluaciones creadas
2. Si eres usuario regular, solo verás las de tu organización
3. Contacta al admin si deberías tener acceso

### Problema 2: Botón "Generate Comparison" está deshabilitado
**Causa:** No has seleccionado al menos 2 evaluaciones

**Solución:**
1. Selecciona al menos 2 checkboxes
2. El contador debe mostrar "Selected: 2 / 5" o más
3. El botón se habilitará automáticamente

### Problema 3: PDF no se descarga
**Causa:** Navegador bloqueando descarga automática

**Solución:**
1. Verifica permisos de descarga del navegador
2. Busca icono de descarga bloqueada en barra de direcciones
3. Permite descargas para este sitio
4. Intenta de nuevo

### Problema 4: Gráfico radar no se muestra
**Causa:** Error cargando Chart.js desde CDN

**Solución:**
1. Verifica conexión a internet
2. Recarga la página (F5 o Ctrl+R)
3. Limpia caché del navegador
4. Si persiste, contacta soporte técnico

### Problema 5: No veo la tarjeta "Multi-Organization"
**Causa:** No eres administrador

**Solución:**
1. Esta función es solo para administradores
2. Contacta a tu administrador si necesitas acceso
3. Los usuarios regulares no pueden acceder a esta función

---

## 📞 Soporte y Ayuda

### Documentación Adicional
- **Guía de Usuario Completa**: `/RESUMEN_PARA_USUARIO.md`
- **Documentación Técnica**: `/README.md`
- **Testing Guide**: `/USER_APPROVAL_TESTING_GUIDE.md`

### URLs de Producción
- **Principal**: https://nist-csf-assessment.pages.dev
- **GitHub**: https://github.com/fel482217/nist-csf-assessment

### Idiomas Soportados
- 🇺🇸 **English** - Fully supported
- 🇪🇸 **Español** - Completamente soportado

Cambia el idioma usando el selector en la esquina superior derecha.

---

## 🎉 Conclusión

El módulo de Reportes transforma tus evaluaciones NIST CSF 2.0 en insights accionables mediante:

✅ **Reportes PDF profesionales** para stakeholders  
✅ **Visualizaciones interactivas** para análisis rápido  
✅ **Comparaciones multi-evaluación** para tracking de progreso  
✅ **Benchmarking cross-org** para administradores  

**¡Empieza a generar tus reportes ahora!**

---

**Versión**: 2.2.0  
**Última Actualización**: 03 Diciembre 2025  
**Autor**: Claude AI (Anthropic)
