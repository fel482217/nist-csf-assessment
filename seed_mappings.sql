-- Strategic Mappings between NIST CSF 2.0 and other frameworks
-- Focus on key controls with direct and partial mappings

-- Delete existing mappings
DELETE FROM csf_framework_mappings;

-- ========================================
-- GOVERN Function Mappings
-- ========================================

-- GV.OC (Organizational Context) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.OC-01', 1, 'direct', 'Both address organizational policies and mission alignment'),
('GV.OC-03', 31, 'direct', 'Legal and regulatory requirements identification'),
('GV.OC-05', 35, 'partial', 'Independent review supports outcomes measurement');

-- GV.RM (Risk Management Strategy) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.RM-01', 1, 'partial', 'Risk management objectives align with security policy'),
('GV.RM-06', 1, 'direct', 'Standardized risk management approach');

-- GV.RR (Roles and Responsibilities) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.RR-01', 2, 'direct', 'Leadership responsibility for information security'),
('GV.RR-02', 2, 'direct', 'Roles and responsibilities definition and communication'),
('GV.RR-05', 18, 'partial', 'Personnel understanding of their security roles');

-- GV.PO (Policy) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.PO-01', 1, 'direct', 'Information security policy establishment'),
('GV.PO-02', 36, 'direct', 'Policy review and compliance verification'),
('GV.PO-05', 31, 'direct', 'Legal and regulatory requirements in policy');

-- GV.OV (Oversight) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.OV-01', 35, 'direct', 'Independent review of security strategy outcomes'),
('GV.OV-04', 36, 'direct', 'Compliance monitoring and evaluation');

-- GV.SC (Supply Chain) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('GV.SC-01', 19, 'direct', 'Supplier relationship management processes'),
('GV.SC-02', 20, 'direct', 'Supplier assessment and agreements'),
('GV.SC-03', 20, 'direct', 'Security requirements in supplier contracts'),
('GV.SC-04', 19, 'direct', 'Supplier due diligence before acquisition');

-- ========================================
-- IDENTIFY Function Mappings
-- ========================================

-- ID.AM (Asset Management) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('ID.AM-01', 9, 'direct', 'ISO 27001: Hardware inventory requirement'),
('ID.AM-01', 94, 'direct', 'CIS Control 1: Enterprise asset inventory'),
('ID.AM-02', 9, 'direct', 'ISO 27001: Software and systems inventory'),
('ID.AM-02', 95, 'direct', 'CIS Control 2: Software asset inventory'),
('ID.AM-05', 9, 'partial', 'Asset prioritization based on criticality');

-- ID.RA (Risk Assessment) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('ID.RA-01', 62, 'direct', 'Technical vulnerability management'),
('ID.RA-02', 7, 'direct', 'Threat intelligence collection and analysis'),
('ID.RA-03', 7, 'partial', 'Threat identification and monitoring'),
('ID.RA-08', 62, 'partial', 'Vulnerability disclosure handling');

-- ========================================
-- PROTECT Function Mappings
-- ========================================

-- PR.AA (Access Control) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('PR.AA-01', 16, 'direct', 'ISO 27001: Identity management'),
('PR.AA-01', 98, 'direct', 'CIS Control 5: Account management'),
('PR.AA-02', 16, 'direct', 'Identity proofing and credential binding'),
('PR.AA-03', 59, 'direct', 'ISO 27001: Secure authentication'),
('PR.AA-03', 99, 'partial', 'CIS Control 6: Access control management'),
('PR.AA-04', 59, 'partial', 'Protection of authentication information'),
('PR.AA-05', 18, 'direct', 'ISO 27001: Access rights management'),
('PR.AA-05', 99, 'direct', 'CIS Control 6: Access rights provisioning'),
('PR.AA-06', 37, 'direct', 'ISO 27001: Physical access control');

-- PR.AT (Awareness and Training) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('PR.AT-01', 57, 'direct', 'ISO 27001: Security awareness and training'),
('PR.AT-01', 107, 'direct', 'CIS Control 14: Security awareness training'),
('PR.AT-02', 57, 'partial', 'Specialized role training requirements');

-- PR.DS (Data Security) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('PR.DS-01', 78, 'direct', 'ISO 27001: Use of cryptography for data at rest'),
('PR.DS-01', 96, 'partial', 'CIS Control 3: Data protection'),
('PR.DS-02', 78, 'direct', 'Cryptography for data in transit'),
('PR.DS-11', 67, 'direct', 'ISO 27001: Information backup'),
('PR.DS-11', 104, 'direct', 'CIS Control 11: Data recovery');

-- PR.PS (Platform Security) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('PR.PS-01', 63, 'direct', 'ISO 27001: Configuration management'),
('PR.PS-01', 97, 'direct', 'CIS Control 4: Secure configuration'),
('PR.PS-06', 79, 'direct', 'ISO 27001: Secure development lifecycle'),
('PR.PS-06', 109, 'partial', 'CIS Control 16: Application software security');

-- PR.IR (Infrastructure Resilience) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('PR.IR-01', 74, 'direct', 'Network security and segmentation'),
('PR.IR-02', 70, 'partial', 'Monitoring for anomalous behavior');

-- ========================================
-- DETECT Function Mappings
-- ========================================

-- DE.CM (Continuous Monitoring) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('DE.CM-01', 74, 'direct', 'ISO 27001: Network monitoring'),
('DE.CM-01', 106, 'direct', 'CIS Control 13: Network monitoring and defense'),
('DE.CM-02', 38, 'direct', 'ISO 27001: Physical security monitoring'),
('DE.CM-03', 70, 'direct', 'Monitoring activities and user behavior'),
('DE.CM-06', 22, 'partial', 'Supplier service monitoring'),
('DE.CM-09', 70, 'direct', 'System and software monitoring');

-- DE.AE (Adverse Event Analysis) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('DE.AE-02', 70, 'direct', 'Analysis of monitoring data'),
('DE.AE-02', 101, 'partial', 'CIS Control 8: Audit log analysis'),
('DE.AE-03', 69, 'direct', 'Logging and correlation of events'),
('DE.AE-04', 24, 'partial', 'Incident assessment and scoping'),
('DE.AE-08', 25, 'direct', 'Incident declaration criteria');

-- ========================================
-- RESPOND Function Mappings
-- ========================================

-- RS.MA (Incident Management) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RS.MA-01', 24, 'direct', 'ISO 27001: Incident management planning'),
('RS.MA-01', 110, 'direct', 'CIS Control 17: Incident response management'),
('RS.MA-02', 25, 'direct', 'Event assessment and incident categorization'),
('RS.MA-03', 25, 'direct', 'Incident categorization and prioritization'),
('RS.MA-04', 26, 'partial', 'Response procedures and escalation');

-- RS.AN (Incident Analysis) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RS.AN-03', 26, 'direct', 'Incident response and investigation'),
('RS.AN-06', 28, 'direct', 'Evidence collection and preservation'),
('RS.AN-07', 28, 'partial', 'Incident data collection');

-- RS.RP (Reporting and Communication) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RS.RP-01', 2, 'partial', 'Role clarity in incident response');

-- RS.MI (Incident Mitigation) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RS.MI-01', 26, 'direct', 'Incident containment procedures'),
('RS.MI-02', 26, 'direct', 'Incident eradication procedures'),
('RS.MI-03', 62, 'direct', 'Vulnerability mitigation');

-- ========================================
-- RECOVER Function Mappings
-- ========================================

-- RC.RP (Recovery Plan Execution) → ISO 27001 & CIS
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RC.RP-01', 29, 'direct', 'ISO 27001: Disruption management'),
('RC.RP-01', 30, 'direct', 'ICT readiness for business continuity'),
('RC.RP-02', 30, 'partial', 'Recovery action prioritization'),
('RC.RP-03', 67, 'direct', 'Backup integrity verification'),
('RC.RP-04', 30, 'direct', 'Critical function restoration'),
('RC.RP-05', 67, 'partial', 'Restored asset verification');

-- RC.CO (Recovery Communication) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RC.CO-02', 5, 'partial', 'Stakeholder communication'),
('RC.CO-03', 30, 'partial', 'Recovery activity coordination');

-- RC.HL (Lessons Learned) → ISO 27001
INSERT INTO csf_framework_mappings (csf_subcategory_id, framework_control_id, mapping_strength, notes) VALUES
('RC.HL-01', 27, 'direct', 'Learning from incidents to improve security');
