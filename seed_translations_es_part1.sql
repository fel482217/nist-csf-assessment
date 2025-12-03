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
