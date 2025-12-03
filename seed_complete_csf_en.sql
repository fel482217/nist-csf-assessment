-- Complete NIST CSF 2.0 Subcategories (English version)
-- All 100+ subcategories with assessment questions in English

-- GOVERN Function Subcategories

-- GV.OC: Organizational Context (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.OC-01', 'GV.OC', 'The organizational mission is understood and informs cybersecurity risk management', 'Are the organization''s mission, objectives, and activities clearly documented and communicated?', 1),
('GV.OC-02', 'GV.OC', 'Internal and external stakeholders are understood, and their needs and expectations are prioritized', 'Have all internal and external stakeholders been identified and are their needs understood?', 2),
('GV.OC-03', 'GV.OC', 'Legal, regulatory, and contractual requirements regarding cybersecurity are understood', 'Are all applicable legal, regulatory, and contractual requirements known and documented?', 3),
('GV.OC-04', 'GV.OC', 'Critical objectives, capabilities, and services that stakeholders depend on are understood', 'Have critical objectives, capabilities, and services been identified and prioritized?', 4),
('GV.OC-05', 'GV.OC', 'Outcomes, capabilities, and services are understood and communicated', 'Have expected outcomes and metrics to measure them been defined and are they understood?', 5);

-- GV.RM: Risk Management Strategy (7 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.RM-01', 'GV.RM', 'Risk management objectives are established and agreed upon', 'Have risk management objectives been formally established and agreed upon?', 1),
('GV.RM-02', 'GV.RM', 'Risk appetite and risk tolerance statements are established, communicated, and maintained', 'Are risk appetite and tolerance levels defined and communicated?', 2),
('GV.RM-03', 'GV.RM', 'Cybersecurity risk management activities and outcomes are integrated into enterprise risk management processes', 'Are cybersecurity risk management activities integrated with enterprise risk management?', 3),
('GV.RM-04', 'GV.RM', 'Strategic direction that describes appropriate risk response options is established and communicated', 'Has the strategic cybersecurity direction been established and communicated?', 4),
('GV.RM-05', 'GV.RM', 'Lines of communication across the organization are established for cybersecurity risks', 'Are communication lines established throughout the organization?', 5),
('GV.RM-06', 'GV.RM', 'A standardized approach to reporting cybersecurity risks is established', 'Is there a standardized approach to risk management across the organization?', 6),
('GV.RM-07', 'GV.RM', 'Strategic decisions are informed by cybersecurity risk information', 'Are strategic decisions informed based on cybersecurity risk information?', 7);

-- GV.RR: Roles, Responsibilities, and Authorities (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.RR-01', 'GV.RR', 'Organizational leadership is responsible and accountable for cybersecurity risk', 'Is organizational leadership responsible for cybersecurity?', 1),
('GV.RR-02', 'GV.RR', 'Roles, responsibilities, and authorities related to cybersecurity risk management are established', 'Are roles, responsibilities, and authorities established and communicated?', 2),
('GV.RR-03', 'GV.RR', 'Adequate resources are allocated commensurate with the cybersecurity risk strategy', 'Are adequate resources allocated for cybersecurity activities?', 3),
('GV.RR-04', 'GV.RR', 'Cybersecurity is included in enterprise risk management processes', 'Is cybersecurity integrated into enterprise risk management?', 4),
('GV.RR-05', 'GV.RR', 'Personnel understand their cybersecurity-related roles and responsibilities', 'Does personnel understand their cybersecurity roles and responsibilities?', 5),
('GV.RR-06', 'GV.RR', 'Cybersecurity supply chain risk management is integrated into enterprise risk management', 'Is cybersecurity supply chain risk management integrated?', 6);

-- GV.PO: Policy (7 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.PO-01', 'GV.PO', 'Policy for managing cybersecurity risks is established and communicated', 'Is there an established, communicated, and maintained cybersecurity policy?', 1),
('GV.PO-02', 'GV.PO', 'Policy is reviewed, updated, and approved per defined process', 'Is the policy reviewed, updated, and approved regularly?', 2),
('GV.PO-03', 'GV.PO', 'Cybersecurity policy includes security principles or mandated security requirements', 'Does the cybersecurity policy include roles and responsibilities?', 3),
('GV.PO-04', 'GV.PO', 'Governance, risk management, and compliance requirements are incorporated', 'Does the cybersecurity policy address risk management?', 4),
('GV.PO-05', 'GV.PO', 'Legal and regulatory requirements regarding cybersecurity are incorporated into policy', 'Are legal and regulatory requirements addressed in the policy?', 5),
('GV.PO-06', 'GV.PO', 'Policy addresses cybersecurity implications of working with external entities', 'Does the policy address supply chain risk management?', 6),
('GV.PO-07', 'GV.PO', 'Policies are applied to all cybersecurity functions', 'Are policies applied to all cybersecurity functions?', 7);

-- GV.OV: Oversight (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.OV-01', 'GV.OV', 'Cybersecurity risk management strategy outcomes are reviewed', 'Are the cybersecurity strategy outcomes reviewed?', 1),
('GV.OV-02', 'GV.OV', 'The cybersecurity risk management strategy is reviewed and adjusted', 'Is the cybersecurity strategy reviewed and adjusted periodically?', 2),
('GV.OV-03', 'GV.OV', 'Organizational cybersecurity risk management policies are reviewed and adjusted', 'Are organizational cybersecurity policies reviewed and adjusted?', 3),
('GV.OV-04', 'GV.OV', 'Organizational cybersecurity risk management performance is evaluated and reviewed', 'Is organizational cybersecurity performance evaluated?', 4),
('GV.OV-05', 'GV.OV', 'Service provider cybersecurity risk management performance is reviewed', 'Is third-party cybersecurity performance evaluated?', 5),
('GV.OV-06', 'GV.OV', 'Cybersecurity risk management activities and outcomes are reported to leadership and relevant oversight entities', 'Are cybersecurity investments evaluated?', 6);

-- GV.SC: Cybersecurity Supply Chain Risk Management (10 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('GV.SC-01', 'GV.SC', 'A cybersecurity supply chain risk management program is established', 'Is there an established cybersecurity supply chain risk management program?', 1),
('GV.SC-02', 'GV.SC', 'Cyber supply chain risk management objectives are identified and integrated', 'Are suppliers and third-party partners identified and assessed?', 2),
('GV.SC-03', 'GV.SC', 'Cybersecurity requirements are included in supplier and third-party provider contracts', 'Do contracts include cybersecurity requirements?', 3),
('GV.SC-04', 'GV.SC', 'Suppliers and third-party providers are assessed prior to acquisition', 'Are suppliers and third parties assessed before acquisition?', 4),
('GV.SC-05', 'GV.SC', 'Requirements for cybersecurity in supplier and third-party provider relationships are established', 'Are requirements established for suppliers and third parties?', 5),
('GV.SC-06', 'GV.SC', 'Planning includes suppliers, third-party providers, and other relevant entities', 'Does planning include suppliers and third parties?', 6),
('GV.SC-07', 'GV.SC', 'Relevant suppliers, third-party providers, and other entities are included in incident planning', 'Are relevant suppliers and third parties included in incident response?', 7),
('GV.SC-08', 'GV.SC', 'Relevant suppliers and third-party providers are included in incident response and recovery activities', 'Are relevant suppliers and third parties included in recovery?', 8),
('GV.SC-09', 'GV.SC', 'Supply chain security practices are integrated and monitored throughout the supply chain', 'Are supply chain security practices integrated and monitored?', 9),
('GV.SC-10', 'GV.SC', 'Cybersecurity supply chain risk management plans include provisions for activities', 'Is cybersecurity supply chain risk management part of the culture?', 10);

-- IDENTIFY Function Subcategories

-- ID.AM: Asset Management (7 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.AM-01', 'ID.AM', 'Inventories of hardware managed by the organization are maintained', 'Is an inventory of hardware assets maintained?', 1),
('ID.AM-02', 'ID.AM', 'Inventories of software, services, and systems managed by the organization are maintained', 'Is an inventory of software, services, and systems maintained?', 2),
('ID.AM-03', 'ID.AM', 'Representations of the organization''s authorized network communication are maintained', 'Are network assets identified and managed?', 3),
('ID.AM-04', 'ID.AM', 'Inventories of services provided by suppliers are maintained', 'Are software and hardware approved and managed?', 4),
('ID.AM-05', 'ID.AM', 'Assets are prioritized based on classification, criticality, and business value', 'Are assets prioritized based on criticality?', 5),
('ID.AM-07', 'ID.AM', 'Inventories of data and corresponding metadata for designated data types are maintained', 'Do inventories include asset owners and lifecycle stage?', 6),
('ID.AM-08', 'ID.AM', 'Systems, hardware, software, services, and data are managed throughout their life cycles', 'Are systems, hardware, software, services, and data managed?', 7);

-- ID.RA: Risk Assessment (10 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.RA-01', 'ID.RA', 'Vulnerabilities in assets are identified, validated, and recorded', 'Are vulnerabilities in assets identified and documented?', 1),
('ID.RA-02', 'ID.RA', 'Cyber threat intelligence is received from information sharing forums and sources', 'Is cyber threat intelligence received and analyzed?', 2),
('ID.RA-03', 'ID.RA', 'Internal and external threats to the organization are identified and recorded', 'Are internal and external threats identified?', 3),
('ID.RA-04', 'ID.RA', 'Potential impacts and likelihood of threats exploiting vulnerabilities are identified', 'Are potential impacts identified and documented?', 4),
('ID.RA-05', 'ID.RA', 'Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk', 'Are threats, vulnerabilities, and impacts used to understand risk?', 5),
('ID.RA-06', 'ID.RA', 'Risk responses are chosen, prioritized, planned, tracked, and communicated', 'Are risk responses identified and prioritized?', 6),
('ID.RA-07', 'ID.RA', 'Changes and exceptions are managed, assessed for risk impact, recorded, and tracked', 'Are changes and exceptions managed through a change control process?', 7),
('ID.RA-08', 'ID.RA', 'Processes for receiving, analyzing, and responding to vulnerability disclosures are established', 'Are processes established for receiving, analyzing, and responding to disclosures?', 8),
('ID.RA-09', 'ID.RA', 'The authenticity and integrity of hardware and software are assessed prior to acquisition', 'Is the authenticity and integrity of hardware and software assessed?', 9),
('ID.RA-10', 'ID.RA', 'Critical suppliers are assessed prior to acquisition', 'Are critical suppliers assessed prior to acquisition?', 10);

-- ID.IM: Improvement (4 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('ID.IM-01', 'ID.IM', 'Improvements are identified from evaluations and exercises', 'Are improvements identified from evaluations?', 1),
('ID.IM-02', 'ID.IM', 'Improvements are identified from security tests and exercises', 'Are improvements identified from security tests and exercises?', 2),
('ID.IM-03', 'ID.IM', 'Improvements are identified from execution of operational processes', 'Are improvements identified from incident response activities?', 3),
('ID.IM-04', 'ID.IM', 'Incident response plans incorporate lessons learned', 'Do incident response plans incorporate lessons learned?', 4);

-- PROTECT Function Subcategories

-- PR.AA: Identity Management, Authentication and Access Control (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.AA-01', 'PR.AA', 'Identities and credentials for authorized users, services, and hardware are managed', 'Are identities and credentials issued, managed, and verified?', 1),
('PR.AA-02', 'PR.AA', 'Identities are proofed and bound to credentials based on risk', 'Are identities proofed and bound to credentials?', 2),
('PR.AA-03', 'PR.AA', 'Users, services, and hardware are authenticated', 'Are users, services, and hardware authenticated?', 3),
('PR.AA-04', 'PR.AA', 'Identity assertions are protected, conveyed, and verified', 'Are identity assertions protected?', 4),
('PR.AA-05', 'PR.AA', 'Access permissions, entitlements, and authorizations are defined and managed', 'Are access permissions and authorizations managed?', 5),
('PR.AA-06', 'PR.AA', 'Physical access to assets is managed, monitored, and enforced commensurate with risk', 'Is physical access managed?', 6);

-- PR.AT: Awareness and Training (2 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.AT-01', 'PR.AT', 'Personnel are provided with cybersecurity awareness and training', 'Is personnel trained and aware of cybersecurity risks?', 1),
('PR.AT-02', 'PR.AT', 'Individuals in specialized roles are trained to perform their information security-related duties', 'Are individuals in specialized roles trained?', 2);

-- PR.DS: Data Security (4 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.DS-01', 'PR.DS', 'The confidentiality, integrity, and availability of data-at-rest are protected', 'Is the confidentiality, integrity, and availability of data-at-rest protected?', 1),
('PR.DS-02', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-transit are protected', 'Is the confidentiality, integrity, and availability of data-in-transit protected?', 2),
('PR.DS-10', 'PR.DS', 'The confidentiality, integrity, and availability of data-in-use are protected', 'Is the confidentiality, integrity, and availability of data-in-use protected?', 3),
('PR.DS-11', 'PR.DS', 'Backups of data are created, protected, maintained, and tested', 'Are backups of data created, protected, maintained, and tested?', 4);

-- PR.PS: Platform Security (2 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.PS-01', 'PR.PS', 'Configuration management practices are established and applied', 'Are configuration management practices established and applied?', 1),
('PR.PS-06', 'PR.PS', 'Secure software development practices are integrated', 'Are secure software development practices integrated?', 2);

-- PR.IR: Technology Infrastructure Resilience (2 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('PR.IR-01', 'PR.IR', 'Networks and environments are protected from unauthorized logical access', 'Are networks and environments protected?', 1),
('PR.IR-02', 'PR.IR', 'The organization''s technology assets are protected from environmental threats', 'Are security operations centers established?', 2);

-- DETECT Function Subcategories

-- DE.CM: Continuous Monitoring (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('DE.CM-01', 'DE.CM', 'Networks and network services are monitored to find potentially adverse events', 'Are networks and network services monitored?', 1),
('DE.CM-02', 'DE.CM', 'The physical environment is monitored to find potentially adverse events', 'Is the physical environment monitored?', 2),
('DE.CM-03', 'DE.CM', 'Personnel activity and technology usage are monitored to find potentially adverse events', 'Are personnel activity and technology usage monitored?', 3),
('DE.CM-06', 'DE.CM', 'External service provider activities and services are monitored to find potentially adverse events', 'Are external service provider activities monitored?', 4),
('DE.CM-09', 'DE.CM', 'Computing hardware and software, runtime environments, and their data are monitored', 'Are computing hardware and software monitored?', 5);

-- DE.AE: Adverse Event Analysis (6 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('DE.AE-02', 'DE.AE', 'Potentially adverse events are analyzed to better understand associated activities', 'Are potentially adverse events analyzed?', 2),
('DE.AE-03', 'DE.AE', 'Information is correlated from multiple sources', 'Is information correlated from multiple sources?', 3),
('DE.AE-04', 'DE.AE', 'The estimated impact and scope of adverse events are understood', 'Is the estimated impact and scope of adverse events understood?', 4),
('DE.AE-06', 'DE.AE', 'Information on adverse events is provided to authorized staff and tools', 'Is information on adverse events provided to authorized staff?', 6),
('DE.AE-07', 'DE.AE', 'Cyber threat intelligence and other contextual information are integrated into analysis', 'Is cyber threat intelligence integrated into analysis?', 7),
('DE.AE-08', 'DE.AE', 'Incidents are declared when adverse events meet the defined incident criteria', 'Are incidents declared when adverse events meet defined criteria?', 8);

-- RESPOND Function Subcategories

-- RS.MA: Incident Management (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.MA-01', 'RS.MA', 'The incident response plan is executed in coordination with relevant parties', 'Is the incident response plan executed?', 1),
('RS.MA-02', 'RS.MA', 'Incident reports are triaged and validated', 'Are incident reports triaged and validated?', 2),
('RS.MA-03', 'RS.MA', 'Incidents are categorized and prioritized', 'Are incidents categorized and prioritized?', 3),
('RS.MA-04', 'RS.MA', 'Incidents are escalated or elevated as needed', 'Are incidents escalated or elevated as needed?', 4),
('RS.MA-05', 'RS.MA', 'The criteria for initiating incident recovery are applied', 'Are the criteria for initiating incident recovery met?', 5);

-- RS.AN: Incident Analysis (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.AN-03', 'RS.AN', 'Analysis is performed to establish what happened during an incident and why', 'Is analysis performed to establish what happened and why?', 3),
('RS.AN-06', 'RS.AN', 'Actions performed during an investigation are recorded', 'Are actions performed during investigation recorded?', 6),
('RS.AN-07', 'RS.AN', 'Incident data and metadata are collected and maintained', 'Are incident data and metadata collected and stored?', 7);

-- RS.RP: Incident Response Reporting and Communication (1 subcategory)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.RP-01', 'RS.RP', 'Personnel know their roles and order of operations when a response is needed', 'Do personnel know their roles and order of operations?', 1);

-- RS.MI: Incident Mitigation (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RS.MI-01', 'RS.MI', 'Incidents are contained to minimize adverse impacts', 'Are incidents contained?', 1),
('RS.MI-02', 'RS.MI', 'Incidents are eradicated to eliminate the presence of adversaries', 'Are incidents eradicated?', 2),
('RS.MI-03', 'RS.MI', 'Newly identified vulnerabilities are mitigated or documented as accepted risks', 'Are newly identified vulnerabilities mitigated?', 3);

-- RECOVER Function Subcategories

-- RC.RP: Incident Recovery Plan Execution (5 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.RP-01', 'RC.RP', 'The recovery portion of the incident response plan is executed', 'Is the recovery plan executed?', 1),
('RC.RP-02', 'RC.RP', 'Recovery actions are selected, scoped, prioritized, and performed', 'Are recovery actions selected, scoped, prioritized, and performed?', 2),
('RC.RP-03', 'RC.RP', 'The integrity of backups and other restoration assets is verified', 'Is the integrity of backups verified?', 3),
('RC.RP-04', 'RC.RP', 'Critical mission functions and services are restored', 'Are critical mission functions and services restored?', 4),
('RC.RP-05', 'RC.RP', 'The integrity of restored assets is verified', 'Is the integrity of restored assets verified?', 5);

-- RC.CO: Incident Recovery Communication (3 subcategories)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.CO-01', 'RC.CO', 'Public relations are managed during incident recovery', 'Are public relations managed?', 1),
('RC.CO-02', 'RC.CO', 'Internal and external stakeholders are notified of incident recovery activities', 'Are internal and external stakeholders notified?', 2),
('RC.CO-03', 'RC.CO', 'Recovery activities and progress are communicated to designated internal and external stakeholders', 'Are recovery activities communicated?', 3);

-- RC.HL: Incident Recovery Lessons Learned (1 subcategory)
INSERT INTO csf_subcategories (id, category_id, name, description, sequence) VALUES
('RC.HL-01', 'RC.HL', 'Lessons learned are applied to improve the effectiveness of recovery processes', 'Are lessons learned applied to improve security?', 1);
