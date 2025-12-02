-- Complete NIST CSF 2.0 Subcategories (108 total)
-- This file contains all official subcategories with assessment questions

-- GOVERN Function Subcategories (54 total)

-- GV.OC: Organizational Context (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.OC-01', 'GV.OC', 'Organizational mission, objectives, and activities are understood', '¿La misión, objetivos y actividades de la organización están claramente documentados y comunicados?', 1),
('GV.OC-02', 'GV.OC', 'Internal and external stakeholders are identified and their needs understood', '¿Se han identificado todos los stakeholders internos y externos y se entienden sus necesidades?', 2),
('GV.OC-03', 'GV.OC', 'Legal, regulatory, and contractual requirements are understood', '¿Se conocen y documentan todos los requisitos legales, regulatorios y contractuales aplicables?', 3),
('GV.OC-04', 'GV.OC', 'Critical objectives, capabilities, and services are identified and prioritized', '¿Se han identificado y priorizado los objetivos, capacidades y servicios críticos?', 4),
('GV.OC-05', 'GV.OC', 'Outcomes and measures are identified and understood', '¿Se han definido y se entienden los resultados esperados y las métricas para medirlos?', 5);

-- GV.RM: Risk Management Strategy (7 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.RM-01', 'GV.RM', 'Risk management objectives are established and agreed upon', '¿Se han establecido y acordado formalmente los objetivos de gestión de riesgos?', 1),
('GV.RM-02', 'GV.RM', 'Risk appetite and risk tolerance statements are established and communicated', '¿Están definidos y comunicados el apetito de riesgo y los niveles de tolerancia?', 2),
('GV.RM-03', 'GV.RM', 'Cybersecurity risk management activities are integrated with enterprise risk management', '¿Las actividades de gestión de riesgos de ciberseguridad están integradas con la gestión de riesgos empresariales?', 3),
('GV.RM-04', 'GV.RM', 'Strategic direction is established and communicated', '¿Se ha establecido y comunicado la dirección estratégica de ciberseguridad?', 4),
('GV.RM-05', 'GV.RM', 'Lines of communication across the organization are established', '¿Existen líneas de comunicación establecidas a través de toda la organización?', 5),
('GV.RM-06', 'GV.RM', 'A standardized approach to risk management is established', '¿Existe un enfoque estandarizado para la gestión de riesgos en toda la organización?', 6),
('GV.RM-07', 'GV.RM', 'Strategic decisions are informed by cybersecurity risk information', '¿Las decisiones estratégicas se informan con base en información de riesgos de ciberseguridad?', 7);

-- GV.RR: Roles, Responsibilities, and Authorities (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.RR-01', 'GV.RR', 'Organizational leadership is responsible for cybersecurity', '¿El liderazgo organizacional es responsable de la ciberseguridad?', 1),
('GV.RR-02', 'GV.RR', 'Roles, responsibilities, and authorities are established and communicated', '¿Los roles, responsabilidades y autoridades están establecidos y comunicados?', 2),
('GV.RR-03', 'GV.RR', 'Adequate resources are allocated for cybersecurity', '¿Se asignan recursos adecuados para las actividades de ciberseguridad?', 3),
('GV.RR-04', 'GV.RR', 'Cybersecurity is integrated into enterprise risk management', '¿La ciberseguridad está integrada en la gestión de riesgos empresariales?', 4),
('GV.RR-05', 'GV.RR', 'Personnel understand their cybersecurity roles and responsibilities', '¿El personal entiende sus roles y responsabilidades en ciberseguridad?', 5),
('GV.RR-06', 'GV.RR', 'Cybersecurity supply chain risk management is integrated', '¿La gestión de riesgos de ciberseguridad en la cadena de suministro está integrada?', 6);

-- GV.PO: Policy (7 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.PO-01', 'GV.PO', 'Policy for cybersecurity is established, communicated, and maintained', '¿Existe una política de ciberseguridad establecida, comunicada y mantenida?', 1),
('GV.PO-02', 'GV.PO', 'Policy is reviewed, updated, and approved', '¿La política se revisa, actualiza y aprueba regularmente?', 2),
('GV.PO-03', 'GV.PO', 'Cybersecurity policy includes roles and responsibilities', '¿La política de ciberseguridad incluye roles y responsabilidades?', 3),
('GV.PO-04', 'GV.PO', 'Cybersecurity policy addresses risk management', '¿La política de ciberseguridad aborda la gestión de riesgos?', 4),
('GV.PO-05', 'GV.PO', 'Legal and regulatory requirements are addressed in policy', '¿Los requisitos legales y regulatorios están abordados en la política?', 5),
('GV.PO-06', 'GV.PO', 'Policy addresses supply chain risk management', '¿La política aborda la gestión de riesgos de la cadena de suministro?', 6),
('GV.PO-07', 'GV.PO', 'Policies are applied to cybersecurity functions', '¿Las políticas se aplican a todas las funciones de ciberseguridad?', 7);

-- GV.OV: Oversight (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.OV-01', 'GV.OV', 'Cybersecurity strategy outcomes are reviewed', '¿Se revisan los resultados de la estrategia de ciberseguridad?', 1),
('GV.OV-02', 'GV.OV', 'The cybersecurity strategy is reviewed and adjusted', '¿Se revisa y ajusta la estrategia de ciberseguridad periódicamente?', 2),
('GV.OV-03', 'GV.OV', 'Organizational cybersecurity policies are reviewed and adjusted', '¿Las políticas organizacionales de ciberseguridad se revisan y ajustan?', 3),
('GV.OV-04', 'GV.OV', 'Organizational cybersecurity performance is evaluated', '¿Se evalúa el desempeño organizacional en ciberseguridad?', 4),
('GV.OV-05', 'GV.OV', 'Third-party performance is evaluated', '¿Se evalúa el desempeño de terceros en temas de ciberseguridad?', 5),
('GV.OV-06', 'GV.OV', 'Cybersecurity investments are evaluated', '¿Se evalúan las inversiones en ciberseguridad?', 6);

-- GV.SC: Cybersecurity Supply Chain Risk Management (23 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.SC-01', 'GV.SC', 'A cybersecurity supply chain risk management program is established', '¿Existe un programa establecido de gestión de riesgos de ciberseguridad en la cadena de suministro?', 1),
('GV.SC-02', 'GV.SC', 'Suppliers and third-party partners are identified and assessed', '¿Se identifican y evalúan los proveedores y socios de terceros?', 2),
('GV.SC-03', 'GV.SC', 'Contracts include cybersecurity requirements', '¿Los contratos incluyen requisitos de ciberseguridad?', 3),
('GV.SC-04', 'GV.SC', 'Suppliers and third parties are assessed prior to acquisition', '¿Los proveedores y terceros se evalúan antes de la adquisición?', 4),
('GV.SC-05', 'GV.SC', 'Requirements for suppliers and third parties are established', '¿Se establecen requisitos para proveedores y terceros?', 5),
('GV.SC-06', 'GV.SC', 'Planning includes suppliers and third parties', '¿La planificación incluye a proveedores y terceros?', 6),
('GV.SC-07', 'GV.SC', 'Relevant suppliers and third parties are included in incident response', '¿Los proveedores y terceros relevantes se incluyen en la respuesta a incidentes?', 7),
('GV.SC-08', 'GV.SC', 'Relevant suppliers and third parties are included in recovery', '¿Los proveedores y terceros relevantes se incluyen en la recuperación?', 8),
('GV.SC-09', 'GV.SC', 'Supply chain security practices are integrated and monitored', '¿Las prácticas de seguridad de la cadena de suministro están integradas y monitoreadas?', 9),
('GV.SC-10', 'GV.SC', 'Cybersecurity supply chain risk management is part of the culture', '¿La gestión de riesgos de ciberseguridad en la cadena de suministro es parte de la cultura?', 10);

-- IDENTIFY Function Subcategories (23 total)

-- ID.AM: Asset Management (8 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.AM-01', 'ID.AM', 'Hardware assets are inventoried', '¿Se mantiene un inventario de activos de hardware?', 1),
('ID.AM-02', 'ID.AM', 'Software, services, and systems are inventoried', '¿Se mantiene un inventario de software, servicios y sistemas?', 2),
('ID.AM-03', 'ID.AM', 'Network assets are identified and managed', '¿Los activos de red están identificados y gestionados?', 3),
('ID.AM-04', 'ID.AM', 'Software and hardware are approved and managed', '¿El software y hardware están aprobados y gestionados?', 4),
('ID.AM-05', 'ID.AM', 'Assets are prioritized based on criticality', '¿Los activos se priorizan según su criticidad?', 5),
('ID.AM-07', 'ID.AM', 'Inventories include asset owners and lifecycle stage', '¿Los inventarios incluyen propietarios de activos y etapa del ciclo de vida?', 6),
('ID.AM-08', 'ID.AM', 'Systems, hardware, software, services, and data are managed', '¿Los sistemas, hardware, software, servicios y datos están gestionados?', 7);

-- ID.RA: Risk Assessment (10 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.RA-01', 'ID.RA', 'Vulnerabilities in assets are identified and documented', '¿Las vulnerabilidades en los activos se identifican y documentan?', 1),
('ID.RA-02', 'ID.RA', 'Cyber threat intelligence is received and analyzed', '¿Se recibe y analiza inteligencia de amenazas cibernéticas?', 2),
('ID.RA-03', 'ID.RA', 'Internal and external threats are identified', '¿Se identifican las amenazas internas y externas?', 3),
('ID.RA-04', 'ID.RA', 'Potential impacts are identified and documented', '¿Los impactos potenciales se identifican y documentan?', 4),
('ID.RA-05', 'ID.RA', 'Threats, vulnerabilities, and impacts are used to understand risk', '¿Las amenazas, vulnerabilidades e impactos se usan para entender el riesgo?', 5),
('ID.RA-06', 'ID.RA', 'Risk responses are identified and prioritized', '¿Las respuestas a los riesgos se identifican y priorizan?', 6),
('ID.RA-07', 'ID.RA', 'Changes and exceptions are managed through a change control process', '¿Los cambios y excepciones se gestionan mediante un proceso de control de cambios?', 7),
('ID.RA-08', 'ID.RA', 'Processes for receiving, analyzing, and responding to disclosures are established', '¿Existen procesos para recibir, analizar y responder a divulgaciones de vulnerabilidades?', 8),
('ID.RA-09', 'ID.RA', 'The authenticity and integrity of hardware and software are assessed', '¿Se evalúa la autenticidad e integridad del hardware y software?', 9),
('ID.RA-10', 'ID.RA', 'Critical suppliers are assessed prior to acquisition', '¿Los proveedores críticos se evalúan antes de la adquisición?', 10);

-- ID.IM: Improvement (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.IM-01', 'ID.IM', 'Improvements are identified from evaluations', '¿Se identifican mejoras a partir de evaluaciones?', 1),
('ID.IM-02', 'ID.IM', 'Improvements are identified from security tests and exercises', '¿Se identifican mejoras a partir de pruebas de seguridad y ejercicios?', 2),
('ID.IM-03', 'ID.IM', 'Improvements are identified from incident response activities', '¿Se identifican mejoras a partir de actividades de respuesta a incidentes?', 3),
('ID.IM-04', 'ID.IM', 'Incident response plans incorporate lessons learned', '¿Los planes de respuesta a incidentes incorporan lecciones aprendidas?', 4);

-- PROTECT Function Subcategories (15 total)

-- PR.AA: Identity Management, Authentication and Access Control (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.AA-01', 'PR.AA', 'Identities and credentials are issued, managed, and verified', '¿Las identidades y credenciales se emiten, gestionan y verifican?', 1),
('PR.AA-02', 'PR.AA', 'Identities are proofed and bound to credentials', '¿Las identidades se verifican y vinculan a credenciales?', 2),
('PR.AA-03', 'PR.AA', 'Users, services, and hardware are authenticated', '¿Los usuarios, servicios y hardware se autentican?', 3),
('PR.AA-04', 'PR.AA', 'Identity assertions are protected', '¿Las aserciones de identidad están protegidas?', 4),
('PR.AA-05', 'PR.AA', 'Access permissions and authorizations are managed', '¿Los permisos y autorizaciones de acceso se gestionan?', 5),
('PR.AA-06', 'PR.AA', 'Physical access is managed', '¿El acceso físico está gestionado?', 6);

-- PR.AT: Awareness and Training (2 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.AT-01', 'PR.AT', 'Personnel are trained and aware', '¿El personal está capacitado y consciente de los riesgos de ciberseguridad?', 1),
('PR.AT-02', 'PR.AT', 'Individuals in specialized roles are trained', '¿Las personas en roles especializados reciben capacitación específica?', 2);

-- PR.DS: Data Security (8 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.DS-01', 'PR.DS', 'The confidentiality, integrity, and availability of data-at-rest are protected', '¿Se protege la confidencialidad, integridad y disponibilidad de los datos en reposo?', 1),
('PR.DS-02', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-transit are protected', '¿Se protege la confidencialidad, integridad y disponibilidad de los datos en tránsito?', 2),
('PR.DS-10', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-use are protected', '¿Se protege la confidencialidad, integridad y disponibilidad de los datos en uso?', 3),
('PR.DS-11', 'PR.DS', 'Backups of data are created, protected, maintained, and tested', '¿Se crean, protegen, mantienen y prueban respaldos de datos?', 4);

-- PR.PS: Platform Security (2 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.PS-01', 'PR.PS', 'Configuration management practices are established and applied', '¿Se establecen y aplican prácticas de gestión de configuración?', 1),
('PR.PS-06', 'PR.PS', 'Secure software development practices are integrated', '¿Se integran prácticas de desarrollo seguro de software?', 2);

-- PR.IR: Technology Infrastructure Resilience (6 subcategories - sample)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.IR-01', 'PR.IR', 'Networks and environments are protected', '¿Las redes y entornos están protegidos?', 1),
('PR.IR-02', 'PR.IR', 'Security operations centers are established', '¿Se han establecido centros de operaciones de seguridad?', 2);

-- DETECT Function Subcategories (8 total)

-- DE.CM: Continuous Monitoring (9 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('DE.CM-01', 'DE.CM', 'Networks and network services are monitored', '¿Se monitorean las redes y servicios de red?', 1),
('DE.CM-02', 'DE.CM', 'The physical environment is monitored', '¿Se monitorea el entorno físico?', 2),
('DE.CM-03', 'DE.CM', 'Personnel activity and technology usage are monitored', '¿Se monitorea la actividad del personal y el uso de tecnología?', 3),
('DE.CM-06', 'DE.CM', 'External service provider activities are monitored', '¿Se monitorean las actividades de proveedores de servicios externos?', 4),
('DE.CM-09', 'DE.CM', 'Computing hardware and software are monitored', '¿Se monitorean el hardware y software de computación?', 5);

-- DE.AE: Adverse Event Analysis (8 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('DE.AE-02', 'DE.AE', 'Potentially adverse events are analyzed', '¿Se analizan los eventos potencialmente adversos?', 1),
('DE.AE-03', 'DE.AE', 'Information is correlated from multiple sources', '¿Se correlaciona información de múltiples fuentes?', 2),
('DE.AE-04', 'DE.AE', 'The estimated impact and scope of adverse events are understood', '¿Se entiende el impacto estimado y el alcance de los eventos adversos?', 3),
('DE.AE-06', 'DE.AE', 'Information on adverse events is provided to authorized staff', '¿Se proporciona información sobre eventos adversos al personal autorizado?', 4),
('DE.AE-07', 'DE.AE', 'Cyber threat intelligence is integrated into analysis', '¿La inteligencia de amenazas cibernéticas se integra en el análisis?', 5),
('DE.AE-08', 'DE.AE', 'Incidents are declared when adverse events meet defined criteria', '¿Se declaran incidentes cuando los eventos adversos cumplen criterios definidos?', 6);

-- RESPOND Function Subcategories (5 total)

-- RS.MA: Incident Management (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.MA-01', 'RS.MA', 'The incident response plan is executed', '¿Se ejecuta el plan de respuesta a incidentes?', 1),
('RS.MA-02', 'RS.MA', 'Incident reports are triaged and validated', '¿Los informes de incidentes se trian y validan?', 2),
('RS.MA-03', 'RS.MA', 'Incidents are categorized and prioritized', '¿Los incidentes se categorizan y priorizan?', 3),
('RS.MA-04', 'RS.MA', 'Incidents are escalated or elevated as needed', '¿Los incidentes se escalan o elevan según sea necesario?', 4),
('RS.MA-05', 'RS.MA', 'The criteria for initiating incident recovery are met', '¿Se cumplen los criterios para iniciar la recuperación del incidente?', 5);

-- RS.AN: Incident Analysis (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.AN-03', 'RS.AN', 'Analysis is performed to establish what happened and why', '¿Se realiza análisis para establecer qué sucedió y por qué?', 1),
('RS.AN-06', 'RS.AN', 'Actions performed during investigation are recorded', '¿Se registran las acciones realizadas durante la investigación?', 2),
('RS.AN-07', 'RS.AN', 'Incident data and metadata are collected and stored', '¿Se recopilan y almacenan los datos y metadatos del incidente?', 3);

-- RS.RP: Incident Response Reporting and Communication (1 subcategory)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.RP-01', 'RS.RP', 'Personnel know their roles and order of operations', '¿El personal conoce sus roles y el orden de operaciones?', 1);

-- RS.MI: Incident Mitigation (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.MI-01', 'RS.MI', 'Incidents are contained', '¿Los incidentes se contienen?', 1),
('RS.MI-02', 'RS.MI', 'Incidents are eradicated', '¿Los incidentes se erradican?', 2),
('RS.MI-03', 'RS.MI', 'Newly identified vulnerabilities are mitigated', '¿Las vulnerabilidades recién identificadas se mitigan?', 3);

-- RECOVER Function Subcategories (13 total)

-- RC.RP: Incident Recovery Plan Execution (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.RP-01', 'RC.RP', 'The recovery plan is executed', '¿Se ejecuta el plan de recuperación?', 1),
('RC.RP-02', 'RC.RP', 'Recovery actions are selected, scoped, prioritized, and performed', '¿Las acciones de recuperación se seleccionan, definen, priorizan y ejecutan?', 2),
('RC.RP-03', 'RC.RP', 'The integrity of backups is verified', '¿Se verifica la integridad de los respaldos?', 3),
('RC.RP-04', 'RC.RP', 'Critical mission functions and services are restored', '¿Se restauran las funciones y servicios de misión crítica?', 4),
('RC.RP-05', 'RC.RP', 'The integrity of restored assets is verified', '¿Se verifica la integridad de los activos restaurados?', 5);

-- RC.CO: Incident Recovery Communication (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.CO-01', 'RC.CO', 'Public relations are managed', '¿Se gestionan las relaciones públicas?', 1),
('RC.CO-02', 'RC.CO', 'Internal and external stakeholders are notified', '¿Se notifica a los stakeholders internos y externos?', 2),
('RC.CO-03', 'RC.CO', 'Recovery activities are communicated', '¿Se comunican las actividades de recuperación?', 3);

-- RC.HL: Incident Recovery Lessons Learned (1 subcategory)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.HL-01', 'RC.HL', 'Lessons learned are applied to improve security', '¿Se aplican lecciones aprendidas para mejorar la seguridad?', 1);
