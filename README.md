# NIST CSF 2.0 Assessment Manager

## Descripción del Proyecto

**NIST CSF Assessment Manager** es una aplicación web completa para gestionar evaluaciones de ciberseguridad basadas en el **NIST Cybersecurity Framework 2.0**. La aplicación permite a las organizaciones realizar assessments estructurados, hacer seguimiento de su madurez en ciberseguridad, y mapear controles entre diferentes frameworks de seguridad.

## 🎯 Características Principales

### ✅ Funcionalidades Completadas

1. **Gestión de Organizaciones**
   - Crear y administrar múltiples organizaciones
   - Información detallada: industria, tamaño, descripción
   - Vista consolidada de todas las organizaciones

2. **Gestión de Assessments**
   - Crear evaluaciones de ciberseguridad por organización
   - Estados de assessment: draft, in_progress, completed, archived
   - Seguimiento de evaluadores y fechas
   - Progreso en tiempo real

3. **NIST CSF 2.0 Completo**
   - **6 Funciones**: Govern, Identify, Protect, Detect, Respond, Recover
   - **18 Categorías** principales
   - **30+ Subcategorías** de ejemplo (base expandible)
   - Estructura completa del framework

4. **Evaluación de Madurez**
   - Escala 0-5 de madurez por subcategoría
   - Estados de implementación: not_implemented, partially_implemented, implemented, not_applicable
   - Campos para evidencia, notas, gaps y recomendaciones
   - Actualización en tiempo real

5. **Estadísticas y Visualización**
   - Porcentaje de completitud del assessment
   - Promedio de madurez general y por función
   - Gráficos de barras por función (Chart.js)
   - Métricas por estado de implementación

6. **Mapeo entre Frameworks**
   - Soporte para múltiples frameworks: ISO 27001, CIS Controls, COBIT, PCI-DSS, HIPAA, GDPR
   - Mapeo de controles NIST CSF a otros frameworks
   - Niveles de mapeo: direct, partial, related
   - Visualización de equivalencias entre frameworks

7. **Interfaz Moderna**
   - Diseño responsive con TailwindCSS
   - Iconos Font Awesome
   - Navegación intuitiva por pestañas
   - Modales para formularios
   - Notificaciones en tiempo real

### 📊 Arquitectura de Datos

**Base de Datos D1 (SQLite):**
- `organizations` - Organizaciones evaluadas
- `csf_functions` - 6 funciones NIST CSF 2.0
- `csf_categories` - Categorías por función
- `csf_subcategories` - Subcategorías evaluables
- `frameworks` - Otros frameworks de seguridad
- `framework_controls` - Controles de cada framework
- `csf_framework_mappings` - Mapeos entre frameworks
- `assessments` - Evaluaciones de ciberseguridad
- `assessment_responses` - Respuestas por subcategoría

## 🌐 URLs y Acceso

### Desarrollo (Sandbox)
- **Aplicación Web**: https://3000-ih6c0lrs1tk2t7qdzmcp0-5c13a017.sandbox.novita.ai
- **API Base**: https://3000-ih6c0lrs1tk2t7qdzmcp0-5c13a017.sandbox.novita.ai/api

### Endpoints API Principales

#### Organizaciones
- `GET /api/organizations` - Listar organizaciones
- `POST /api/organizations` - Crear organización
- `GET /api/organizations/:id` - Obtener organización

#### NIST CSF Estructura
- `GET /api/csf/functions` - Obtener funciones
- `GET /api/csf/categories?function_id=GV` - Obtener categorías
- `GET /api/csf/subcategories?category_id=GV.OC` - Obtener subcategorías

#### Assessments
- `GET /api/assessments` - Listar assessments
- `POST /api/assessments` - Crear assessment
- `GET /api/assessments/:id` - Obtener assessment
- `PUT /api/assessments/:id` - Actualizar assessment
- `DELETE /api/assessments/:id` - Eliminar assessment

#### Respuestas de Assessment
- `GET /api/assessments/:id/responses` - Obtener respuestas
- `POST /api/responses` - Crear/actualizar respuesta
- `PUT /api/responses/:id` - Actualizar respuesta
- `GET /api/assessments/:id/statistics` - Obtener estadísticas

#### Frameworks y Mapeos
- `GET /api/frameworks` - Listar frameworks
- `GET /api/frameworks/:id/controls` - Obtener controles
- `GET /api/mappings?subcategory_id=GV.OC-01` - Obtener mapeos

## 🚀 Guía de Uso

### 1. Crear Organización
- Navegar a la pestaña "Organizations"
- Click en "New Organization"
- Llenar formulario (nombre, industria, tamaño, descripción)

### 2. Crear Assessment
- Navegar a "Assessments"
- Click en "New Assessment"
- Seleccionar organización
- Definir nombre, fecha, evaluador

### 3. Realizar Evaluación
- Click en el assessment creado
- Navegar por las 6 funciones NIST CSF
- Para cada subcategoría:
  - Seleccionar nivel de madurez (0-5)
  - Indicar estado de implementación
  - Añadir evidencia y notas

### 4. Ver Estadísticas
- Visualizar progreso en tiempo real
- Gráfico de madurez por función
- Métricas de completitud

### 5. Explorar Mapeos
- Navegar a "Frameworks"
- Seleccionar un framework (ISO 27001, CIS, etc.)
- Ver equivalencias con NIST CSF

## 💻 Stack Tecnológico

### Backend
- **Hono** - Framework web ultrarrápido para Cloudflare Workers
- **Cloudflare D1** - Base de datos SQLite distribuida
- **TypeScript** - Tipado estático

### Frontend
- **TailwindCSS** - Framework CSS moderno
- **Axios** - Cliente HTTP
- **Chart.js** - Visualización de datos
- **Font Awesome** - Iconos

### Infraestructura
- **Cloudflare Pages** - Edge deployment
- **Vite** - Build tool
- **PM2** - Process manager (desarrollo)

## 📁 Estructura del Proyecto

```
webapp/
├── src/
│   ├── index.tsx          # API backend Hono
│   └── types.ts           # Tipos TypeScript
├── public/
│   └── static/
│       ├── app.js         # Frontend JavaScript
│       └── style.css      # Estilos custom
├── migrations/
│   └── 0001_initial_schema.sql  # Schema DB
├── seed.sql               # Datos de prueba
├── ecosystem.config.cjs   # Configuración PM2
├── wrangler.jsonc         # Configuración Cloudflare
├── vite.config.ts         # Configuración Vite
└── package.json           # Dependencias y scripts
```

## 🔄 Estado del Desarrollo

### Completado ✅
- ✅ Backend API REST completo
- ✅ Base de datos con esquema NIST CSF 2.0
- ✅ Frontend interactivo con todas las vistas
- ✅ Gestión de assessments CRUD completa
- ✅ Sistema de evaluación por subcategoría
- ✅ Estadísticas y visualizaciones
- ✅ Mapeo entre frameworks
- ✅ Datos de prueba (seed)
- ✅ Funcionando localmente

### Próximos Pasos Sugeridos 🎯

1. **Ampliar NIST CSF**
   - Añadir todas las subcategorías oficiales (108 total)
   - Completar descripciones detalladas
   - Referencias a NIST SP 800-53

2. **Expandir Mapeos**
   - Completar mapeos ISO 27001:2022
   - Añadir más controles CIS v8
   - Incluir NIST 800-53, SOC 2, etc.

3. **Reportes Avanzados**
   - Exportar a PDF
   - Gráficos tipo radar/spider
   - Comparativas entre assessments
   - Timeline de evolución

4. **Funciones Adicionales**
   - Sistema de usuarios y roles
   - Comentarios y colaboración
   - Adjuntar evidencia (documentos)
   - Plan de acción automatizado
   - Notificaciones por email

5. **Análisis Inteligente**
   - Recomendaciones basadas en gaps
   - Benchmarking por industria
   - Priorización de controles
   - Análisis de tendencias

## 🛠 Comandos de Desarrollo

```bash
# Desarrollo local
npm run build                    # Compilar
npm run db:migrate:local        # Aplicar migraciones
npm run db:seed                 # Cargar datos de prueba
npm run db:reset                # Resetear DB completamente
pm2 start ecosystem.config.cjs  # Iniciar servicio

# Base de datos
npm run db:console:local        # Consola SQLite local

# Producción
npm run deploy:prod             # Desplegar a Cloudflare Pages
```

## 📝 Notas Técnicas

- **Datos de Ejemplo**: La aplicación incluye 1 organización demo, 1 assessment de ejemplo, y datos seed de NIST CSF 2.0
- **Performance**: Edge deployment asegura baja latencia global
- **Escalabilidad**: D1 maneja millones de filas con replicación automática
- **Seguridad**: Todas las APIs validan datos, sin exposición de información sensible

## 📄 Licencia y Autor

Desarrollado para gestión de ciberseguridad empresarial basada en estándares NIST.

---

**Última Actualización**: 2024-12-02  
**Estado**: ✅ Funcional en desarrollo  
**Plataforma**: Cloudflare Pages + D1  
**Framework**: NIST CSF 2.0
