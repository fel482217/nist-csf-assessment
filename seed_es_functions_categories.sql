-- Spanish Translations: Functions and Categories Only
-- Safe to apply - no foreign key dependencies

-- Functions (6 total)
INSERT OR REPLACE INTO csf_function_translations (function_id, language, name, description) VALUES
('GV', 'es', 'GOBERNAR', 'La función GOBERNAR proporciona resultados para establecer y monitorear la estrategia, expectativas y política de gestión de riesgos de seguridad cibernética de la organización.'),
('ID', 'es', 'IDENTIFICAR', 'La función IDENTIFICAR proporciona resultados para permitir que una organización comprenda su contexto actual de gestión de riesgos de seguridad cibernética.'),
('PR', 'es', 'PROTEGER', 'La función PROTEGER proporciona resultados para permitir que una organización use salvaguardas para prevenir o reducir los riesgos de seguridad cibernética.'),
('DE', 'es', 'DETECTAR', 'La función DETECTAR proporciona resultados para permitir la identificación y análisis oportuno de anomalías, indicadores de compromiso y otros eventos adversos de seguridad cibernética.'),
('RS', 'es', 'RESPONDER', 'La función RESPONDER proporciona resultados para permitir que una organización responda y gestione el impacto de los eventos de seguridad cibernética detectados.'),
('RC', 'es', 'RECUPERAR', 'La función RECUPERAR proporciona resultados para permitir la restauración oportuna de las operaciones normales para reducir el impacto de los eventos de seguridad cibernética.');

-- Categories (22 total - matching existing categories)
INSERT OR REPLACE INTO csf_category_translations (category_id, language, name, description) VALUES
('GV.OC', 'es', 'Contexto Organizacional', 'Se entienden las circunstancias que rodean las decisiones de gestión de riesgos de seguridad cibernética.'),
('GV.RM', 'es', 'Estrategia de Gestión de Riesgos', 'Las prioridades, restricciones y tolerancias de riesgos se establecen y comunican.'),
('GV.RR', 'es', 'Roles, Responsabilidades y Autoridades', 'Los roles de seguridad cibernética se establecen y comunican.'),
('GV.PO', 'es', 'Política', 'Las políticas organizacionales se mantienen y utilizan.'),
('GV.OV', 'es', 'Supervisión', 'Los resultados de las actividades se establecen y revisan.'),
('GV.SC', 'es', 'Gestión de Riesgos de la Cadena de Suministro', 'Los procesos para gestionar riesgos de la cadena de suministro.'),
('ID.AM', 'es', 'Gestión de Activos', 'Los activos que permiten alcanzar resultados del negocio se identifican y gestionan.'),
('ID.RA', 'es', 'Evaluación de Riesgos', 'Los riesgos de seguridad cibernética se entienden y se usan para decisiones operacionales.'),
('ID.IM', 'es', 'Mejora', 'Se identifican, establecen y priorizan mejoras.'),
('PR.AA', 'es', 'Gestión de Identidad y Control de Acceso', 'Se gestiona el acceso a activos físicos y lógicos.'),
('PR.AT', 'es', 'Concienciación y Entrenamiento', 'El personal está capacitado y consciente de políticas de seguridad.'),
('PR.DS', 'es', 'Seguridad de Datos', 'Los datos se gestionan para proteger confidencialidad, integridad y disponibilidad.'),
('PR.PS', 'es', 'Seguridad de la Plataforma', 'Se gestionan la seguridad de plataformas de hardware y software.'),
('PR.IR', 'es', 'Gestión de Riesgos de Infraestructura', 'Se gestionan los riesgos de infraestructura de tecnología.'),
('DE.CM', 'es', 'Monitoreo Continuo', 'Los activos se monitorean para detectar eventos de seguridad cibernética.'),
('DE.AE', 'es', 'Análisis de Eventos Adversos', 'Los eventos adversos se analizan para entender objetivos de ataque.'),
('RS.MA', 'es', 'Gestión de Incidentes', 'Se gestionan las respuestas a eventos de seguridad detectados.'),
('RS.AN', 'es', 'Análisis de Incidentes', 'Se analizan los incidentes para informar respuesta y recuperación.'),
('RS.RP', 'es', 'Reporte de Incidentes', 'Se informa sobre actividades de respuesta a stakeholders apropiados.'),
('RS.MI', 'es', 'Mitigación de Incidentes', 'Se realizan actividades para prevenir expansión y mitigar efectos.'),
('RC.RP', 'es', 'Planificación de Recuperación', 'Se ejecutan procesos de recuperación para restaurar sistemas.'),
('RC.CO', 'es', 'Mejoras en la Recuperación', 'Las actividades de recuperación se mejoran con lecciones aprendidas.');
