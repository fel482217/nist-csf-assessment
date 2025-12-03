-- Migration: Multi-Framework Support (Fixed - Idempotent)
-- Transforms the app from NIST CSF-only to multi-framework assessment platform

-- 1. Insert NIST CSF as a framework first
INSERT OR IGNORE INTO frameworks (id, code, name, version, description, url) 
VALUES (1, 'NIST-CSF', 'NIST Cybersecurity Framework', '2.0', 'The NIST Cybersecurity Framework provides a policy framework of computer security guidance for how private sector organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.', 'https://www.nist.gov/cyberframework');

-- 2. Create generic assessment items table (for non-NIST frameworks)
CREATE TABLE IF NOT EXISTS assessment_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  framework_control_id INTEGER NOT NULL,
  maturity_level INTEGER CHECK(maturity_level >= 0 AND maturity_level <= 5) DEFAULT 0,
  implementation_status TEXT CHECK(implementation_status IN ('not_implemented', 'partially_implemented', 'implemented', 'not_applicable')) DEFAULT 'not_implemented',
  evidence TEXT,
  notes TEXT,
  gaps TEXT,
  recommendations TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (framework_control_id) REFERENCES framework_controls(id),
  UNIQUE(assessment_id, framework_control_id)
);

-- 3. Update existing assessments to reference NIST CSF framework (if not already set)
UPDATE assessments SET framework_id = 1 WHERE framework_id IS NULL;
UPDATE assessments SET framework_type = 'nist_csf' WHERE framework_type IS NULL OR framework_type = '';

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessments_framework ON assessments(framework_id);
CREATE INDEX IF NOT EXISTS idx_assessment_items_assessment ON assessment_items(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_items_control ON assessment_items(framework_control_id);
