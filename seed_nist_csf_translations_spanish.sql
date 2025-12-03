-- NIST CSF 2.0 Spanish Translations
-- Based on official NIST CSWP 29 Spanish document

-- ===================
-- FUNCTIONS (Funciones)
-- ===================

INSERT OR REPLACE INTO csf_function_translations (function_id, language, name, description) VALUES
('GV', 'es', 'GOBERNAR', 'La función GOBERNAR proporciona resultados para establecer y monitorear la estrategia, expectativas y política de gestión de riesgos de seguridad cibernética de la organización.'),
('ID', 'es', 'IDENTIFICAR', 'La función IDENTIFICAR proporciona resultados para permitir que una organización comprenda su contexto actual de gestión de riesgos de seguridad cibernética.'),
('PR', 'es', 'PROTEGER', 'La función PROTEGER proporciona resultados para permitir que una organización use salvaguardas para prevenir o reducir los riesgos de seguridad cibernética.'),
('DE', 'es', 'DETECTAR', 'La función DETECTAR proporciona resultados para permitir la identificación y análisis oportuno de anomalías, indicadores de compromiso y otros eventos adversos de seguridad cibernética.'),
('RS', 'es', 'RESPONDER', 'La función RESPONDER proporciona resultados para permitir que una organización responda y gestione el impacto de los eventos de seguridad cibernética detectados.'),
('RC', 'es', 'RECUPERAR', 'La función RECUPERAR proporciona resultados para permitir la restauración oportuna de las operaciones normales para reducir el impacto de los eventos de seguridad cibernética.');

-- ===================
-- CATEGORIES (Categorías)
-- ===================

-- GOVERN Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('GV.OC', 'es', 'Contexto Organizacional', 'Se entienden las circunstancias (misión, expectativas de stakeholders, dependencias y requisitos legales, regulatorios y contractuales) que rodean las decisiones de gestión de riesgos de seguridad cibernética de la organización.'),
('GV.RM', 'es', 'Estrategia de Gestión de Riesgos', 'Las prioridades, restricciones, tolerancias y suposiciones de riesgos de la organización se establecen, comunican y utilizan para apoyar las decisiones de riesgo operacional.'),
('GV.RR', 'es', 'Roles, Responsabilidades y Autoridades', 'Los roles, responsabilidades y autoridades de seguridad cibernética se establecen, comunican, entienden, coordinan apropiadamente y ejercen.'),
('GV.PO', 'es', 'Política', 'Las políticas organizacionales, procesos y procedimientos se mantienen y utilizan para gestionar la protección de información y activos.'),
('GV.OV', 'es', 'Supervisión', 'Los resultados de las actividades de gestión de riesgos de seguridad cibernética de la organización se establecen, comunican y revisan.'),
('GV.SC', 'es', 'Gestión de Riesgos de la Cadena de Suministro de Seguridad Cibernética', 'Los procesos para gestionar los riesgos de seguridad cibernética de la cadena de suministro de la organización se identifican, establecen, gestionan, monitorean y mejoran.');

-- IDENTIFY Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('ID.AM', 'es', 'Gestión de Activos', 'Los activos (datos, hardware, software, sistemas, instalaciones, servicios y personas) que permiten a la organización alcanzar los resultados del negocio se identifican y gestionan de manera consistente con su importancia relativa para los objetivos organizacionales y la estrategia de riesgo.'),
('ID.RA', 'es', 'Evaluación de Riesgos', 'Los riesgos de seguridad cibernética para la organización y las prioridades de la organización, restricciones, tolerancias al riesgo y suposiciones se entienden y se utilizan para apoyar las decisiones de riesgo operacional.'),
('ID.IM', 'es', 'Mejora', 'Se identifican, establecen, evalúan, priorizan e implementan mejoras.');

-- PROTECT Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('PR.AA', 'es', 'Gestión de Identidad, Autenticación y Control de Acceso', 'Se gestionan el acceso a activos físicos y lógicos, instalaciones y recursos asociados para que solo las entidades autorizadas (usuarios, procesos y dispositivos) puedan acceder según la necesidad y el privilegio mínimo.'),
('PR.AT', 'es', 'Concienciación y Entrenamiento', 'El personal de la organización está capacitado y consciente de las políticas, procesos y procedimientos de seguridad cibernética.'),
('PR.DS', 'es', 'Seguridad de Datos', 'Los datos se gestionan de manera consistente con la estrategia de riesgo de la organización para proteger la confidencialidad, integridad y disponibilidad de la información.'),
('PR.PS', 'es', 'Seguridad de la Plataforma', 'Se gestionan la seguridad de las plataformas de hardware, software y servicios (operadas por la organización o externamente) de manera consistente con las políticas, procedimientos y acuerdos organizacionales.'),
('PR.IR', 'es', 'Gestión de Riesgos de Infraestructura de Tecnología', 'Se gestionan los riesgos de seguridad cibernética de la infraestructura de tecnología de la organización.');

-- DETECT Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('DE.CM', 'es', 'Monitoreo Continuo', 'Los activos se monitorean para detectar eventos de seguridad cibernética y verificar la efectividad de las medidas de protección, incluyendo la red, entornos físicos y personal.'),
('DE.AE', 'es', 'Análisis de Eventos Adversos', 'Los eventos adversos de seguridad cibernética se analizan para entender los objetivos de ataque, métodos, vectores y herramientas.');

-- RESPOND Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('RS.MA', 'es', 'Gestión de Incidentes', 'Se gestionan las respuestas a eventos de seguridad cibernética detectados.'),
('RS.AN', 'es', 'Análisis de Incidentes', 'Se analizan los incidentes para informar la respuesta y las actividades de recuperación.'),
('RS.RP', 'es', 'Reporte de Incidentes', 'Se informa sobre las actividades de respuesta y las lecciones aprendidas a los stakeholders apropiados internos y externos.'),
('RS.MI', 'es', 'Mitigación de Incidentes', 'Se realizan actividades para prevenir la expansión de un evento, mitigar sus efectos y resolver el incidente.');

-- RECOVER Categories
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('RC.RP', 'es', 'Planificación de Recuperación', 'Se ejecutan los procesos y procedimientos de gestión de recuperación para restaurar los sistemas y servicios afectados por eventos de seguridad cibernética.'),
('RC.IM', 'es', 'Mejoras en la Recuperación', 'Las actividades de recuperación se mejoran incorporando las lecciones aprendidas.');

-- ===================
-- SUBCATEGORIES (Subcategorías) - GOVERN
-- ===================

-- GV.OC: Organizational Context
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.OC-01', 'es', 'Se comprende la misión organizacional', '¿Se han documentado y comunicado claramente la misión, objetivos y actividades de la organización?'),
('GV.OC-02', 'es', 'Se comprenden las partes interesadas internas y externas', '¿Se han identificado todas las partes interesadas internas y externas y se comprenden sus necesidades?'),
('GV.OC-03', 'es', 'Se comprenden los requisitos legales, regulatorios y contractuales', '¿Se conocen y documentan todos los requisitos legales, regulatorios y contractuales aplicables?'),
('GV.OC-04', 'es', 'Se comprenden las capacidades y servicios críticos', '¿Se han identificado y priorizado los objetivos, capacidades y servicios críticos?'),
('GV.OC-05', 'es', 'Se comprenden y comunican los resultados y capacidades', '¿Se han definido los resultados esperados y las métricas para medirlos?');

-- GV.RM: Risk Management Strategy
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.RM-01', 'es', 'Se establecen los objetivos de gestión de riesgos', '¿Se han establecido formalmente y acordado los objetivos de gestión de riesgos?'),
('GV.RM-02', 'es', 'Se establece el apetito y tolerancia al riesgo', '¿Se han definido y comunicado los niveles de apetito y tolerancia al riesgo?'),
('GV.RM-03', 'es', 'Se integra la gestión de riesgos de seguridad cibernética', '¿Las actividades de gestión de riesgos de seguridad cibernética están integradas con la gestión de riesgos empresariales?'),
('GV.RM-04', 'es', 'Se establece la dirección estratégica para la respuesta al riesgo', '¿Se ha establecido y comunicado la dirección estratégica de seguridad cibernética?'),
('GV.RM-05', 'es', 'Se establecen líneas de comunicación', '¿Se han establecido líneas de comunicación en toda la organización?'),
('GV.RM-06', 'es', 'Se establece un enfoque estandarizado', '¿Existe un enfoque estandarizado para la gestión de riesgos en toda la organización?'),
('GV.RM-07', 'es', 'Se informan las decisiones estratégicas', '¿Las decisiones estratégicas se informan con base en la información de riesgos de seguridad cibernética?');

-- GV.RR: Roles, Responsibilities, and Authorities
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.RR-01', 'es', 'El liderazgo es responsable de la seguridad cibernética', '¿El liderazgo organizacional es responsable de la seguridad cibernética?'),
('GV.RR-02', 'es', 'Se establecen roles y responsabilidades', '¿Se han establecido y comunicado los roles, responsabilidades y autoridades relacionadas con la gestión de riesgos?'),
('GV.RR-03', 'es', 'Se asignan recursos adecuados', '¿Se asignan recursos adecuados proporcionales a la estrategia de riesgo de seguridad cibernética?'),
('GV.RR-04', 'es', 'Se incluye la seguridad cibernética en la gestión de riesgos', '¿La seguridad cibernética está incluida en los procesos de gestión de riesgos empresariales?');

-- GV.PO: Policy
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.PO-01', 'es', 'Se establece la política organizacional', '¿Se ha establecido, comunicado y mantenido una política de seguridad cibernética que aborda el propósito, alcance, roles, responsabilidades y compromiso de gestión?'),
('GV.PO-02', 'es', 'Se mantienen las políticas y procedimientos', '¿Las políticas, procesos y procedimientos se revisan, actualizan y comunican regularmente?');

-- GV.OV: Oversight
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.OV-01', 'es', 'Se supervisa la estrategia de seguridad cibernética', '¿La estrategia de gestión de riesgos de seguridad cibernética es revisada y actualizada para reflejar los cambios en los riesgos?'),
('GV.OV-02', 'es', 'Se comunican los resultados de las actividades', '¿Los resultados de las actividades de gestión de riesgos de seguridad cibernética se comunican a través de toda la organización?'),
('GV.OV-03', 'es', 'Se realiza supervisión independiente', '¿Se realizan auditorías, evaluaciones o revisiones independientes de la seguridad cibernética?');

-- GV.SC: Supply Chain Cybersecurity Risk Management
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('GV.SC-01', 'es', 'Se establece una política de cadena de suministro', '¿Existe una política de gestión de riesgos de la cadena de suministro que incluye proveedores, clientes y terceros?'),
('GV.SC-02', 'es', 'Se identifican y priorizan los proveedores', '¿Se identifican y priorizan los proveedores según su criticidad e impacto potencial?'),
('GV.SC-03', 'es', 'Se establecen contratos y acuerdos', '¿Los contratos con proveedores incluyen requisitos de seguridad cibernética apropiados?'),
('GV.SC-04', 'es', 'Se supervisan los proveedores', '¿Los proveedores son evaluados periódicamente para verificar el cumplimiento de los requisitos de seguridad?'),
('GV.SC-05', 'es', 'Se comunican las respuestas', '¿Se establecen y prueban procesos de respuesta coordinada con proveedores?');

-- ===================
-- SUBCATEGORIES - IDENTIFY
-- ===================

-- ID.AM: Asset Management
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('ID.AM-01', 'es', 'Se mantienen inventarios de hardware', '¿Se mantienen inventarios de hardware gestionados por la organización?'),
('ID.AM-02', 'es', 'Se mantienen inventarios de software', '¿Se mantienen inventarios de software y servicios gestionados por la organización?'),
('ID.AM-03', 'es', 'Se documentan las conexiones organizacionales', '¿Se documentan y autorizan las conexiones con proveedores y socios externos?'),
('ID.AM-04', 'es', 'Se catalogan los sistemas y activos', '¿Los activos y sistemas se catalogan según importancia para las funciones del negocio?'),
('ID.AM-05', 'es', 'Se asignan prioridades a los recursos', '¿Los recursos (sistemas, datos, personal) se priorizan según clasificación, criticidad e impacto al negocio?'),
('ID.AM-07', 'es', 'Se mantienen inventarios de datos', '¿Se identifican y gestionan los datos recolectados, almacenados, procesados y transmitidos?'),
('ID.AM-08', 'es', 'Se documentan los sistemas y activos', '¿Los sistemas, hardware, software, servicios y datos se documentan según sensibilidad, criticidad y valor?');

-- ID.RA: Risk Assessment  
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('ID.RA-01', 'es', 'Se identifican las vulnerabilidades', '¿Se identifican y documentan las vulnerabilidades de activos y sistemas?'),
('ID.RA-02', 'es', 'Se comparte inteligencia de amenazas', '¿Se recibe, analiza y comparte información sobre amenazas cibernéticas?'),
('ID.RA-03', 'es', 'Se identifican amenazas internas y externas', '¿Se identifican y documentan las amenazas internas y externas?'),
('ID.RA-04', 'es', 'Se identifican impactos potenciales', '¿Se identifican y documentan los impactos potenciales de eventos de seguridad?'),
('ID.RA-05', 'es', 'Se utilizan amenazas e impactos', '¿La información de amenazas, vulnerabilidades e impactos se usa para determinar el riesgo?'),
('ID.RA-06', 'es', 'Se identifican y priorizan las respuestas', '¿Las respuestas al riesgo se identifican y priorizan?'),
('ID.RA-07', 'es', 'Se determinan y monitorean los cambios', '¿Los cambios en riesgos de seguridad cibernética se determinan y monitorean?'),
('ID.RA-08', 'es', 'Se realizan evaluaciones de riesgos', '¿Los procesos de evaluación de riesgos consideran los resultados de auditorías?'),
('ID.RA-09', 'es', 'Se analizan los riesgos de la cadena de suministro', '¿Los riesgos de la cadena de suministro se identifican y evalúan?'),
('ID.RA-10', 'es', 'Se consideran amenazas críticas', '¿Las amenazas críticas para la seguridad cibernética se consideran en las evaluaciones de riesgo?');

-- ID.IM: Improvement
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('ID.IM-01', 'es', 'Se realizan mejoras', '¿Se identifican, establecen, priorizan e implementan mejoras basadas en lecciones aprendidas y auditorías?'),
('ID.IM-02', 'es', 'Se implementa un sistema de gestión', '¿Se implementa un sistema de gestión de seguridad cibernética?'),
('ID.IM-03', 'es', 'Se realiza la gestión de configuración', '¿Los procesos de gestión de configuración se realizan y mantienen?'),
('ID.IM-04', 'es', 'Se mejora el conocimiento de seguridad', '¿El conocimiento de la seguridad cibernética mejora mediante lecciones aprendidas?');

-- ===================
-- SUBCATEGORIES - PROTECT
-- ===================

-- PR.AA: Identity, Authentication and Access Control
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('PR.AA-01', 'es', 'Se gestionan las identidades', '¿Las identidades y credenciales para usuarios, servicios y hardware autorizados se gestionan por la organización?'),
('PR.AA-02', 'es', 'Se gestionan las identidades de dispositivos', '¿Las identidades se gestionan para autenticar dispositivos de red y endpoints?'),
('PR.AA-03', 'es', 'Se autentica el acceso a recursos', '¿Se verifica la identidad de usuarios, servicios y hardware antes de otorgar acceso?'),
('PR.AA-04', 'es', 'Se asignan privilegios mínimos', '¿Se asignan privilegios de acceso basados en el principio de privilegio mínimo y separación de funciones?'),
('PR.AA-05', 'es', 'Se gestionan accesos físicos', '¿El acceso físico a activos se gestiona, monitorea y hace cumplir de manera proporcional al riesgo?'),
('PR.AA-06', 'es', 'Se controlan identidades y credenciales', '¿Las identidades y credenciales para acceso a activos se gestionan según el nivel de riesgo?');

-- PR.AT: Awareness and Training
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('PR.AT-01', 'es', 'Se capacita al personal', '¿Todo el personal está informado, capacitado y su conocimiento se valida periódicamente?'),
('PR.AT-02', 'es', 'Se entrena a usuarios privilegiados', '¿Los usuarios privilegiados comprenden sus roles y responsabilidades?');

-- PR.DS: Data Security
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('PR.DS-01', 'es', 'Se protegen los datos en reposo', '¿Los datos en reposo se protegen usando encriptación apropiada?'),
('PR.DS-02', 'es', 'Se protegen los datos en tránsito', '¿Los datos en tránsito se protegen usando encriptación apropiada?'),
('PR.DS-10', 'es', 'Se realizan copias de seguridad', '¿Se crean, protegen, mantienen y prueban copias de seguridad de datos?'),
('PR.DS-11', 'es', 'Se gestionan los activos', '¿Los activos se gestionan de manera segura durante remoción, transferencia y disposición?');

-- PR.PS: Platform Security
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('PR.PS-01', 'es', 'Se configuran las líneas base', '¿Las configuraciones de seguridad de hardware y software se establecen y gestionan?'),
('PR.PS-02', 'es', 'Se gestionan cambios de configuración', '¿Los cambios de configuración se gestionan con control de acceso y auditoría?'),
('PR.PS-03', 'es', 'Se realiza mantenimiento de hardware', '¿Los registros de mantenimiento y reparación de hardware se mantienen con controles de acceso?'),
('PR.PS-04', 'es', 'Se registran eventos', '¿Se generan, recopilan, correlacionan y protegen registros de eventos?'),
('PR.PS-05', 'es', 'Se implementa protección de dispositivos móviles', '¿Los dispositivos móviles se protegen y gestionan?'),
('PR.PS-06', 'es', 'Se aplican principios de diseño seguro', '¿Los principios de diseño seguro se incorporan en las especificaciones de sistemas?');

-- PR.IR: Technology Infrastructure Resilience
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('PR.IR-01', 'es', 'Se protegen las redes', '¿Las redes se protegen (segmentan, aíslan) para contener eventos de seguridad?'),
('PR.IR-02', 'es', 'Se gestionan actualizaciones de software', '¿El software se mantiene actualizado con parches y actualizaciones?'),
('PR.IR-03', 'es', 'Se implementan medidas de protección', '¿Se implementan y gestionan medidas de protección de activos críticos?'),
('PR.IR-04', 'es', 'Se prueba y valida la disponibilidad', '¿Se prueban regularmente los sistemas para disponibilidad, resiliencia y validación de copias de seguridad?');

-- ===================
-- SUBCATEGORIES - DETECT
-- ===================

-- DE.CM: Continuous Monitoring
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('DE.CM-01', 'es', 'Se monitorean las redes', '¿Las redes se monitorean para detectar eventos de seguridad cibernética?'),
('DE.CM-02', 'es', 'Se monitorea el entorno físico', '¿El entorno físico se monitorea para detectar eventos de seguridad?'),
('DE.CM-03', 'es', 'Se monitorea la actividad del personal', '¿Se monitorea la actividad del personal para detectar eventos de seguridad?'),
('DE.CM-06', 'es', 'Se monitorea actividad externa', '¿Se monitorea la actividad de proveedores externos para detectar eventos?'),
('DE.CM-09', 'es', 'Se monitorean los recursos', '¿Los recursos informáticos se monitorean para encontrar eventos adversos?');

-- DE.AE: Adverse Event Analysis
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('DE.AE-02', 'es', 'Se analizan eventos detectados', '¿Los eventos detectados se analizan para comprender objetivos y métodos de ataque?'),
('DE.AE-03', 'es', 'Se correlaciona información de eventos', '¿La información de eventos se correlaciona de múltiples fuentes?'),
('DE.AE-04', 'es', 'Se determina el impacto de eventos', '¿Se determina el impacto de los eventos de seguridad?'),
('DE.AE-06', 'es', 'Se establecen umbrales de alertas', '¿Se establecen y gestionan umbrales para activar investigaciones?'),
('DE.AE-07', 'es', 'Se integran capacidades de detección', '¿Los mecanismos de detección se prueban periódicamente?'),
('DE.AE-08', 'es', 'Se realizan análisis forenses', '¿Se realizan análisis de integridad y forenses en eventos?');

-- ===================
-- SUBCATEGORIES - RESPOND
-- ===================

-- RS.MA: Incident Management
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RS.MA-01', 'es', 'Se ejecuta el plan de respuesta', '¿Se ejecuta el plan de respuesta a incidentes cuando se detecta un evento?'),
('RS.MA-02', 'es', 'Se reportan los incidentes', '¿Los incidentes se reportan de acuerdo con criterios establecidos?'),
('RS.MA-03', 'es', 'Se gestiona información de incidentes', '¿La información sobre eventos se gestiona según el plan de respuesta?'),
('RS.MA-04', 'es', 'Se coordinan los incidentes', '¿Los incidentes se coordinan con partes interesadas internas y externas?'),
('RS.MA-05', 'es', 'Se escalan los incidentes', '¿Los criterios de escalamiento de incidentes se establecen y comunican?');

-- RS.AN: Incident Analysis
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RS.AN-03', 'es', 'Se realiza análisis forense', '¿Se realiza análisis forense en los incidentes?'),
('RS.AN-06', 'es', 'Se utilizan acciones correctivas', '¿Las acciones de respuesta se coordinan con procesos de gestión de eventos?'),
('RS.AN-07', 'es', 'Se identifican lecciones aprendidas', '¿Se identifican y documentan las lecciones aprendidas?'),
('RS.AN-08', 'es', 'Se determinan impactos de incidentes', '¿Los impactos de los incidentes se determinan y documentan?');

-- RS.RP: Incident Reporting
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RS.RP-01', 'es', 'Se reportan respuestas', '¿Las actividades de respuesta se reportan a gerencia y stakeholders apropiados?');

-- RS.MI: Incident Mitigation
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RS.MI-01', 'es', 'Se contienen los incidentes', '¿Los incidentes se contienen para evitar su propagación?'),
('RS.MI-02', 'es', 'Se mitigan los incidentes', '¿Se realizan actividades para mitigar los efectos de los incidentes?');

-- ===================
-- SUBCATEGORIES - RECOVER
-- ===================

-- RC.RP: Recovery Planning
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RC.RP-01', 'es', 'Se ejecuta el plan de recuperación', '¿Se ejecuta el plan de recuperación durante o después de un evento de seguridad?'),
('RC.RP-02', 'es', 'Se actualizan estrategias de recuperación', '¿Las estrategias de recuperación se actualizan durante y después del proceso?'),
('RC.RP-03', 'es', 'Se prueban los procedimientos', '¿Los procedimientos de recuperación se prueban para asegurar efectividad?'),
('RC.RP-04', 'es', 'Se gestionan comunicaciones', '¿Las actividades de comunicación y reputación se gestionan durante la recuperación?'),
('RC.RP-05', 'es', 'Se comunican eventos externos', '¿Los eventos se comunican a autoridades regulatorias apropiadas?');

-- RC.IM: Recovery Improvement  
INSERT OR REPLACE INTO csf_subcategory_translations (subcategory_id, language, name, description) VALUES
('RC.IM-01', 'es', 'Se incorporan lecciones aprendidas', '¿Las lecciones aprendidas se incorporan a futuras actividades de recuperación?'),
('RC.IM-02', 'es', 'Se actualizan estrategias', '¿Las estrategias de recuperación se actualizan basadas en lecciones aprendidas?');
