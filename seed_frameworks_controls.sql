-- Complete Framework Controls
-- ISO 27001:2022 and CIS Controls v8

-- Delete existing framework controls to avoid duplicates
DELETE FROM framework_controls WHERE framework_id IN (1, 2);

-- ISO 27001:2022 Controls (93 controls in Annex A)

-- Organizational Controls (37 controls)
INSERT INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(1, 'A.5.1', 'Policies for information security', 'A set of policies for information security shall be defined', 'Organizational'),
(1, 'A.5.2', 'Information security roles and responsibilities', 'Information security roles and responsibilities shall be defined and allocated', 'Organizational'),
(1, 'A.5.3', 'Segregation of duties', 'Conflicting duties and areas of responsibility shall be segregated', 'Organizational'),
(1, 'A.5.4', 'Management responsibilities', 'Management shall require all personnel to apply information security', 'Organizational'),
(1, 'A.5.5', 'Contact with authorities', 'Appropriate contacts with relevant authorities shall be maintained', 'Organizational'),
(1, 'A.5.6', 'Contact with special interest groups', 'Contacts with special interest groups or other specialist security forums shall be maintained', 'Organizational'),
(1, 'A.5.7', 'Threat intelligence', 'Information relating to information security threats shall be collected and analyzed', 'Organizational'),
(1, 'A.5.8', 'Information security in project management', 'Information security shall be integrated into project management', 'Organizational'),
(1, 'A.5.9', 'Inventory of information and other associated assets', 'An inventory of information and other associated assets shall be developed and maintained', 'Organizational'),
(1, 'A.5.10', 'Acceptable use of information and other associated assets', 'Rules for acceptable use shall be identified, documented and implemented', 'Organizational'),
(1, 'A.5.11', 'Return of assets', 'Personnel shall return all organizational assets in their possession upon termination', 'Organizational'),
(1, 'A.5.12', 'Classification of information', 'Information shall be classified according to information security needs', 'Organizational'),
(1, 'A.5.13', 'Labelling of information', 'An appropriate set of procedures for information labelling shall be developed', 'Organizational'),
(1, 'A.5.14', 'Information transfer', 'Information transfer rules, procedures, or agreements shall be in place', 'Organizational'),
(1, 'A.5.15', 'Access control', 'Rules to control physical and logical access to information shall be established', 'Organizational'),
(1, 'A.5.16', 'Identity management', 'The full life cycle of identities shall be managed', 'Organizational'),
(1, 'A.5.17', 'Authentication information', 'Allocation and management of authentication information shall be controlled', 'Organizational'),
(1, 'A.5.18', 'Access rights', 'Access rights to information and other associated assets shall be provisioned and managed', 'Organizational'),
(1, 'A.5.19', 'Information security in supplier relationships', 'Processes and procedures shall be defined to manage supplier relationships', 'Organizational'),
(1, 'A.5.20', 'Addressing information security within supplier agreements', 'Relevant information security requirements shall be addressed in agreements', 'Organizational'),
(1, 'A.5.21', 'Managing information security in ICT supply chain', 'Processes and procedures shall be defined for managing information security in ICT supply chain', 'Organizational'),
(1, 'A.5.22', 'Monitoring, review and change management of supplier services', 'Organizations shall monitor, review, evaluate and manage supplier service delivery', 'Organizational'),
(1, 'A.5.23', 'Information security for use of cloud services', 'Processes for acquisition, use, management and exit from cloud services shall be established', 'Organizational'),
(1, 'A.5.24', 'Information security incident management planning and preparation', 'Organization shall plan and prepare for managing information security incidents', 'Organizational'),
(1, 'A.5.25', 'Assessment and decision on information security events', 'Organization shall assess security events and decide if they are to be categorized as incidents', 'Organizational'),
(1, 'A.5.26', 'Response to information security incidents', 'Information security incidents shall be responded to in accordance with procedures', 'Organizational'),
(1, 'A.5.27', 'Learning from information security incidents', 'Knowledge gained from information security incidents shall be used to strengthen security', 'Organizational'),
(1, 'A.5.28', 'Collection of evidence', 'Procedures for identification, collection, acquisition and preservation of evidence shall be established', 'Organizational'),
(1, 'A.5.29', 'Information security during disruption', 'Organization shall plan how to maintain information security during disruption', 'Organizational'),
(1, 'A.5.30', 'ICT readiness for business continuity', 'ICT readiness shall be planned, implemented, maintained and tested', 'Organizational'),
(1, 'A.5.31', 'Legal, statutory, regulatory and contractual requirements', 'Legal, statutory, regulatory and contractual requirements shall be identified and documented', 'Organizational'),
(1, 'A.5.32', 'Intellectual property rights', 'Organization shall implement appropriate procedures to protect intellectual property rights', 'Organizational'),
(1, 'A.5.33', 'Protection of records', 'Records shall be protected from loss, destruction, falsification and unauthorized access', 'Organizational'),
(1, 'A.5.34', 'Privacy and protection of personal information', 'Organization shall identify and meet requirements for privacy and protection', 'Organizational'),
(1, 'A.5.35', 'Independent review of information security', 'Information security shall be independently reviewed at planned intervals', 'Organizational'),
(1, 'A.5.36', 'Compliance with policies, rules and standards', 'Compliance shall be independently reviewed at planned intervals', 'Organizational'),
(1, 'A.5.37', 'Documented operating procedures', 'Operating procedures for information processing facilities shall be documented', 'Organizational');

-- People Controls (8 controls)
INSERT INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(1, 'A.6.1', 'Screening', 'Background verification checks shall be carried out on all candidates for employment', 'People'),
(1, 'A.6.2', 'Terms and conditions of employment', 'Employment contractual agreements shall state personnel and organizational responsibilities', 'People'),
(1, 'A.6.3', 'Information security awareness, education and training', 'Personnel shall receive appropriate awareness education and training', 'People'),
(1, 'A.6.4', 'Disciplinary process', 'A formal disciplinary process shall be established for personnel who have committed violations', 'People'),
(1, 'A.6.5', 'Responsibilities after termination or change of employment', 'Information security responsibilities that remain valid after termination shall be defined', 'People'),
(1, 'A.6.6', 'Confidentiality or non-disclosure agreements', 'Confidentiality or non-disclosure agreements shall reflect organizational needs', 'People'),
(1, 'A.6.7', 'Remote working', 'Security measures shall be implemented when personnel work remotely', 'People'),
(1, 'A.6.8', 'Information security event reporting', 'Organization shall provide a mechanism for personnel to report security events', 'People');

-- Physical Controls (14 controls)
INSERT INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(1, 'A.7.1', 'Physical security perimeters', 'Security perimeters shall be defined and used to protect information processing facilities', 'Physical'),
(1, 'A.7.2', 'Physical entry', 'Secure areas shall be protected by appropriate entry controls', 'Physical'),
(1, 'A.7.3', 'Securing offices, rooms and facilities', 'Physical security for offices, rooms and facilities shall be designed and implemented', 'Physical'),
(1, 'A.7.4', 'Physical security monitoring', 'Premises shall be continuously monitored for unauthorized physical access', 'Physical'),
(1, 'A.7.5', 'Protecting against physical and environmental threats', 'Protection against physical and environmental threats shall be designed and implemented', 'Physical'),
(1, 'A.7.6', 'Working in secure areas', 'Security measures for working in secure areas shall be designed and implemented', 'Physical'),
(1, 'A.7.7', 'Clear desk and clear screen', 'Clear desk rules and clear screen rules shall be defined and appropriately enforced', 'Physical'),
(1, 'A.7.8', 'Equipment siting and protection', 'Equipment shall be sited securely and protected', 'Physical'),
(1, 'A.7.9', 'Security of assets off-premises', 'Off-site assets shall be protected', 'Physical'),
(1, 'A.7.10', 'Storage media', 'Storage media shall be managed through their life cycle', 'Physical'),
(1, 'A.7.11', 'Supporting utilities', 'Information processing facilities shall be protected from power failures', 'Physical'),
(1, 'A.7.12', 'Cabling security', 'Cables carrying power, data or supporting information services shall be protected', 'Physical'),
(1, 'A.7.13', 'Equipment maintenance', 'Equipment shall be maintained correctly to ensure availability, integrity and confidentiality', 'Physical'),
(1, 'A.7.14', 'Secure disposal or re-use of equipment', 'Items of equipment containing storage media shall be verified to ensure sensitive data is removed', 'Physical');

-- Technological Controls (34 controls)
INSERT INTO framework_controls (framework_id, control_id, name, description, category) VALUES
(1, 'A.8.1', 'User endpoint devices', 'Information stored on, processed by or accessible via user endpoint devices shall be protected', 'Technological'),
(1, 'A.8.2', 'Privileged access rights', 'The allocation and use of privileged access rights shall be restricted and managed', 'Technological'),
(1, 'A.8.3', 'Information access restriction', 'Access to information and other associated assets shall be restricted', 'Technological'),
(1, 'A.8.4', 'Access to source code', 'Read and write access to source code shall be appropriately managed', 'Technological'),
(1, 'A.8.5', 'Secure authentication', 'Secure authentication technologies and procedures shall be implemented', 'Technological'),
(1, 'A.8.6', 'Capacity management', 'The use of resources shall be monitored and adjusted in line with capacity requirements', 'Technological'),
(1, 'A.8.7', 'Protection against malware', 'Protection against malware shall be implemented', 'Technological'),
(1, 'A.8.8', 'Management of technical vulnerabilities', 'Information about technical vulnerabilities shall be obtained and managed', 'Technological'),
(1, 'A.8.9', 'Configuration management', 'Configurations shall be established, documented, implemented and maintained', 'Technological'),
(1, 'A.8.10', 'Information deletion', 'Information stored in information systems shall be deleted when no longer required', 'Technological'),
(1, 'A.8.11', 'Data masking', 'Data masking shall be used in accordance with organizational policy', 'Technological'),
(1, 'A.8.12', 'Data leakage prevention', 'Data leakage prevention measures shall be applied to systems', 'Technological'),
(1, 'A.8.13', 'Information backup', 'Backup copies of information shall be maintained in accordance with policy', 'Technological'),
(1, 'A.8.14', 'Redundancy of information processing facilities', 'Information processing facilities shall be implemented with redundancy', 'Technological'),
(1, 'A.8.15', 'Logging', 'Logs that record activities, exceptions, faults and security events shall be produced', 'Technological'),
(1, 'A.8.16', 'Monitoring activities', 'Networks, systems and applications shall be monitored for anomalous behavior', 'Technological'),
(1, 'A.8.17', 'Clock synchronization', 'The clocks of information processing systems shall be synchronized', 'Technological'),
(1, 'A.8.18', 'Use of privileged utility programs', 'The use of utility programs that might override system controls shall be restricted', 'Technological'),
(1, 'A.8.19', 'Installation of software on operational systems', 'Procedures shall be implemented to control installation of software', 'Technological'),
(1, 'A.8.20', 'Networks security', 'Networks and network devices shall be secured, managed and controlled', 'Technological'),
(1, 'A.8.21', 'Security of network services', 'Security mechanisms and service levels shall be identified and implemented', 'Technological'),
(1, 'A.8.22', 'Segregation of networks', 'Groups of information services, users and information systems shall be segregated', 'Technological'),
(1, 'A.8.23', 'Web filtering', 'Access to external websites shall be managed to reduce exposure', 'Technological'),
(1, 'A.8.24', 'Use of cryptography', 'Rules for effective use of cryptography shall be defined and implemented', 'Technological'),
(1, 'A.8.25', 'Secure development life cycle', 'Rules for secure development of software and systems shall be established', 'Technological'),
(1, 'A.8.26', 'Application security requirements', 'Information security requirements shall be identified and applied', 'Technological'),
(1, 'A.8.27', 'Secure system architecture and engineering principles', 'Principles for secure system architecture shall be established and applied', 'Technological'),
(1, 'A.8.28', 'Secure coding', 'Secure coding principles shall be applied to software development', 'Technological'),
(1, 'A.8.29', 'Security testing in development and acceptance', 'Security testing processes shall be defined and implemented', 'Technological'),
(1, 'A.8.30', 'Outsourced development', 'Organization shall direct, monitor and review outsourced system development', 'Technological'),
(1, 'A.8.31', 'Separation of development, test and production environments', 'Development, testing and production environments shall be separated', 'Technological'),
(1, 'A.8.32', 'Change management', 'Changes to information processing facilities shall be subject to change management', 'Technological'),
(1, 'A.8.33', 'Test information', 'Test information shall be appropriately selected, protected and managed', 'Technological'),
(1, 'A.8.34', 'Protection of information systems during audit testing', 'Audit tests shall be planned and agreed to minimize disruptions', 'Technological');

-- CIS Controls v8 (18 Implementation Groups)

-- CIS Critical Security Controls
INSERT INTO framework_controls (framework_id, control_id, name, description, category) VALUES
-- Basic CIS Controls (IG1)
(2, '1', 'Inventory and Control of Enterprise Assets', 'Actively manage all enterprise assets connected to infrastructure', 'Basic'),
(2, '2', 'Inventory and Control of Software Assets', 'Actively manage all software on the network', 'Basic'),
(2, '3', 'Data Protection', 'Develop processes and technical controls to identify, classify and secure data', 'Basic'),
(2, '4', 'Secure Configuration of Enterprise Assets and Software', 'Establish and maintain secure configurations', 'Basic'),
(2, '5', 'Account Management', 'Use processes and tools to assign and manage authorization', 'Basic'),
(2, '6', 'Access Control Management', 'Use processes and tools to create, assign, manage and revoke access', 'Basic'),
(2, '7', 'Continuous Vulnerability Management', 'Develop processes to continuously identify, prioritize and remediate vulnerabilities', 'Basic'),
(2, '8', 'Audit Log Management', 'Collect, alert and analyze audit logs of events', 'Basic'),
(2, '9', 'Email and Web Browser Protections', 'Improve defenses and reduce risks from email and web browsers', 'Basic'),
(2, '10', 'Malware Defenses', 'Control the installation, spread and execution of malicious applications', 'Basic'),
(2, '11', 'Data Recovery', 'Establish and maintain data recovery practices', 'Basic'),
(2, '12', 'Network Infrastructure Management', 'Establish, implement and manage enterprise network infrastructure', 'Basic'),
(2, '13', 'Network Monitoring and Defense', 'Operate processes and tools to establish and maintain defenses', 'Basic'),
(2, '14', 'Security Awareness and Skills Training', 'Establish security awareness training program', 'Basic'),
(2, '15', 'Service Provider Management', 'Develop processes to evaluate service providers', 'Basic'),
(2, '16', 'Application Software Security', 'Manage security lifecycle of internally developed and externally procured software', 'Basic'),
(2, '17', 'Incident Response Management', 'Establish process to quickly discover attack and contain damage', 'Basic'),
(2, '18', 'Penetration Testing', 'Test the effectiveness of defenses through penetration tests', 'Basic');
