-- Seed data for NIST CSF 2.0

-- Disable foreign key checks temporarily
PRAGMA foreign_keys = OFF;

-- Insert NIST CSF 2.0 Functions
INSERT OR IGNORE INTO csf_functions (id, name, description, sequence) VALUES
('GV', 'Govern', 'The organization''s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored', 1),
('ID', 'Identify', 'The organization''s current cybersecurity risks are understood', 2),
('PR', 'Protect', 'Safeguards to manage the organization''s cybersecurity risks are used', 3),
('DE', 'Detect', 'Possible cybersecurity attacks and compromises are found and analyzed', 4),
('RS', 'Respond', 'Actions regarding a detected cybersecurity incident are taken', 5),
('RC', 'Recover', 'Assets and operations affected by a cybersecurity incident are restored', 6);

-- Insert NIST CSF 2.0 Categories (sample - principales categorías)
INSERT OR IGNORE INTO csf_categories (id, function_id, name, description, sequence) VALUES
-- Govern categories
('GV.OC', 'GV', 'Organizational Context', 'The circumstances that surround the organization''s cybersecurity risk management decisions are understood', 1),
('GV.RM', 'GV', 'Risk Management Strategy', 'The organization''s priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions', 2),
('GV.RR', 'GV', 'Roles, Responsibilities, and Authorities', 'Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated', 3),
('GV.PO', 'GV', 'Policy', 'Organizational cybersecurity policy is established, communicated, and enforced', 4),
('GV.OV', 'GV', 'Oversight', 'Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy', 5),
('GV.SC', 'GV', 'Cybersecurity Supply Chain Risk Management', 'Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders', 6),

-- Identify categories
('ID.AM', 'ID', 'Asset Management', 'Assets are managed consistent with the organization''s priorities, assets, and risk strategy', 1),
('ID.RA', 'ID', 'Risk Assessment', 'The cybersecurity risk to the organization is understood', 2),
('ID.IM', 'ID', 'Improvement', 'Improvements to organizational cybersecurity risk management processes, procedures, and activities are identified across all CSF Functions', 3),

-- Protect categories
('PR.AA', 'PR', 'Identity Management, Authentication and Access Control', 'Access to physical and logical assets is limited to authorized users, services, and hardware', 1),
('PR.AT', 'PR', 'Awareness and Training', 'The organization''s personnel are provided with cybersecurity awareness and training', 2),
('PR.DS', 'PR', 'Data Security', 'Data are managed consistent with the organization''s risk strategy', 3),
('PR.PS', 'PR', 'Platform Security', 'The hardware, software, and services of physical and virtual platforms are managed consistent with the organization''s risk strategy', 4),
('PR.IR', 'PR', 'Technology Infrastructure Resilience', 'Security architectures are managed to limit damage, maintain or restore capabilities, and support incident recovery', 5),

-- Detect categories
('DE.CM', 'DE', 'Continuous Monitoring', 'Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events', 1),
('DE.AE', 'DE', 'Adverse Event Analysis', 'Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events', 2),

-- Respond categories
('RS.MA', 'RS', 'Incident Management', 'Responses to detected cybersecurity incidents are managed', 1),
('RS.AN', 'RS', 'Incident Analysis', 'Investigations are conducted to ensure effective response and support forensics and recovery activities', 2),
('RS.RP', 'RS', 'Incident Response Reporting and Communication', 'Response activities are coordinated with internal and external stakeholders', 3),
('RS.MI', 'RS', 'Incident Mitigation', 'Activities are performed to prevent expansion of an event and mitigate its effects', 4),

-- Recover categories
('RC.RP', 'RC', 'Incident Recovery Plan Execution', 'Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents', 1),
('RC.CO', 'RC', 'Incident Recovery Communication', 'Restoration activities are coordinated with internal and external parties', 2);

-- Insert sample subcategories (algunos ejemplos representativos de cada categoría)
INSERT OR IGNORE INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
-- GV.OC subcategories
('GV.OC-01', 'GV.OC', 'The organizational mission is understood and informs cybersecurity risk management', 'The organization''s mission, objectives, and activities are understood and inform cybersecurity risk management decisions', 1),
('GV.OC-02', 'GV.OC', 'Internal and external stakeholders are understood', 'Key stakeholders and their expectations are identified and considered in cybersecurity risk management', 2),
('GV.OC-03', 'GV.OC', 'Legal, regulatory, and contractual requirements are understood', 'Applicable requirements affecting the organization''s cybersecurity risk management are identified and managed', 3),

-- GV.RM subcategories
('GV.RM-01', 'GV.RM', 'Risk management objectives are established', 'Risk management objectives and priorities are established and communicated', 1),
('GV.RM-02', 'GV.RM', 'Risk appetite and risk tolerance are established', 'The organization''s risk appetite and risk tolerance statements are established and communicated', 2),
('GV.RM-03', 'GV.RM', 'Organizational risk strategy is determined', 'The organization''s risk management strategy is determined and communicated', 3),

-- ID.AM subcategories
('ID.AM-01', 'ID.AM', 'Inventories of hardware managed by the organization are maintained', 'Physical devices and systems within the organization are inventoried', 1),
('ID.AM-02', 'ID.AM', 'Inventories of software, services, and systems managed by the organization are maintained', 'Software platforms and applications within the organization are inventoried', 2),
('ID.AM-03', 'ID.AM', 'Representations of the organization''s authorized network communication and internal and external network data flows are maintained', 'Network data flows are documented and maintained', 3),

-- PR.AA subcategories
('PR.AA-01', 'PR.AA', 'Identities and credentials for authorized users are managed', 'Identity management processes are implemented', 1),
('PR.AA-02', 'PR.AA', 'Identities are proofed and bound to credentials', 'Identity proofing and credential binding are implemented', 2),
('PR.AA-03', 'PR.AA', 'Users, services, and hardware are authenticated', 'Authentication mechanisms are implemented and managed', 3),
('PR.AA-04', 'PR.AA', 'Identity assertions are protected and verified', 'Identity assertions are secured and validated', 4),

-- PR.DS subcategories
('PR.DS-01', 'PR.DS', 'The confidentiality, integrity, and availability of data-at-rest are protected', 'Data at rest is protected using encryption and access controls', 1),
('PR.DS-02', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-transit are protected', 'Data in transit is protected using encryption and secure protocols', 2),
('PR.DS-10', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-use are protected', 'Data being processed is protected', 3),

-- DE.CM subcategories
('DE.CM-01', 'DE.CM', 'Networks and network services are monitored to detect potentially adverse events', 'Network monitoring is performed to identify anomalies', 1),
('DE.CM-02', 'DE.CM', 'The physical environment is monitored to detect potentially adverse events', 'Physical security monitoring is implemented', 2),
('DE.CM-03', 'DE.CM', 'Personnel activity is monitored to detect potentially adverse events', 'User activity monitoring is implemented', 3),

-- RS.MA subcategories
('RS.MA-01', 'RS.MA', 'The incident response plan is executed during or after an incident', 'Incident response procedures are followed', 1),
('RS.MA-02', 'RS.MA', 'Incident reports are triaged and validated', 'Incident reports are reviewed and prioritized', 2),
('RS.MA-03', 'RS.MA', 'Incidents are categorized and prioritized', 'Incidents are classified based on severity and impact', 3),

-- RC.RP subcategories
('RC.RP-01', 'RC.RP', 'The recovery plan is executed during or after a cybersecurity incident', 'Recovery procedures are implemented', 1),
('RC.RP-02', 'RC.RP', 'Recovery plan testing is conducted', 'Recovery procedures are tested regularly', 2);

-- Insert other frameworks
INSERT OR IGNORE INTO frameworks (code, name, version, description, url) VALUES
('ISO27001', 'ISO/IEC 27001', '2022', 'Information Security Management Systems', 'https://www.iso.org/standard/27001'),
('CIS', 'CIS Controls', 'v8', 'Center for Internet Security Controls', 'https://www.cisecurity.org/controls/'),
('COBIT', 'COBIT', '2019', 'Control Objectives for Information Technologies', 'https://www.isaca.org/resources/cobit'),
('PCI-DSS', 'PCI DSS', 'v4.0', 'Payment Card Industry Data Security Standard', 'https://www.pcisecuritystandards.org/'),
('HIPAA', 'HIPAA Security Rule', '2013', 'Health Insurance Portability and Accountability Act', 'https://www.hhs.gov/hipaa/'),
('GDPR', 'GDPR', '2016', 'General Data Protection Regulation', 'https://gdpr-info.eu/');

-- Insert sample framework controls (ISO 27001 examples)
INSERT OR IGNORE INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(1, 'A.5.1', 'Policies for information security', 'Information security policy and topic-specific policies', 'Organizational'),
(1, 'A.5.2', 'Information security roles and responsibilities', 'Information security roles and responsibilities shall be defined and allocated', 'Organizational'),
(1, 'A.8.1', 'User endpoint devices', 'Information stored on, processed by or accessible via user endpoint devices shall be protected', 'Technological'),
(1, 'A.8.2', 'Privileged access rights', 'The allocation and use of privileged access rights shall be restricted and managed', 'Technological'),
(1, 'A.8.3', 'Information access restriction', 'Access to information and other associated assets shall be restricted', 'Technological');

-- Insert sample CIS Controls
INSERT OR IGNORE INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(2, '1.1', 'Establish and Maintain Detailed Enterprise Asset Inventory', 'Establish and maintain an accurate, detailed, and up-to-date inventory of all enterprise assets', 'Basic'),
(2, '2.1', 'Establish and Maintain a Software Inventory', 'Establish and maintain a detailed inventory of all licensed software', 'Basic'),
(2, '5.1', 'Establish and Maintain an Inventory of Accounts', 'Establish and maintain an inventory of all accounts managed in the enterprise', 'Basic'),
(2, '6.1', 'Establish an Access Granting Process', 'Establish and follow a process for granting access to enterprise assets', 'Basic');

-- Insert sample mappings between NIST CSF and ISO 27001
INSERT OR IGNORE INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.OC-01', 1, 'partial', 'Organizational context relates to security policies'),
('GV.RM-01', 2, 'direct', 'Risk management roles and responsibilities'),
('PR.AA-03', 4, 'direct', 'Both cover privileged access management'),
('PR.AA-04', 5, 'partial', 'Related to access control and information protection'),
('ID.AM-01', 1, 'related', 'Asset inventory supports security management');

-- Insert sample mappings between NIST CSF and CIS Controls
INSERT OR IGNORE INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('ID.AM-01', 6, 'direct', 'Both require hardware asset inventory'),
('ID.AM-02', 7, 'direct', 'Both require software inventory'),
('PR.AA-01', 8, 'direct', 'Both address account management'),
('PR.AA-03', 9, 'partial', 'Related to access control processes');

-- Insert sample organization
INSERT OR IGNORE INTO organizations (name, industry, size, description) VALUES
('Demo Corporation', 'Technology', 'Medium (100-500 employees)', 'A sample organization for demonstration purposes');

-- Insert sample assessment
INSERT OR IGNORE INTO assessments (organization_id, name, description, assessment_date, assessor_name, status) VALUES
(1, 'Q4 2024 Cybersecurity Assessment', 'Quarterly cybersecurity posture assessment based on NIST CSF 2.0', '2024-12-02', 'Security Team', 'draft');
PRAGMA foreign_keys = ON;
