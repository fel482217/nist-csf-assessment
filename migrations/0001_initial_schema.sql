-- NIST CSF 2.0 Assessment Database Schema

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- NIST CSF 2.0 Functions (Govern, Identify, Protect, Detect, Respond, Recover)
CREATE TABLE IF NOT EXISTS csf_functions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sequence INTEGER NOT NULL
);

-- NIST CSF 2.0 Categories
CREATE TABLE IF NOT EXISTS csf_categories (
  id TEXT PRIMARY KEY,
  function_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  FOREIGN KEY (function_id) REFERENCES csf_functions(id)
);

-- NIST CSF 2.0 Subcategories
CREATE TABLE IF NOT EXISTS csf_subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES csf_categories(id)
);

-- Other security frameworks
CREATE TABLE IF NOT EXISTS frameworks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  version TEXT,
  description TEXT,
  url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Framework controls/requirements
CREATE TABLE IF NOT EXISTS framework_controls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  framework_id INTEGER NOT NULL,
  control_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  FOREIGN KEY (framework_id) REFERENCES frameworks(id),
  UNIQUE(framework_id, control_id)
);

-- Mapping between NIST CSF and other frameworks
CREATE TABLE IF NOT EXISTS csf_framework_mappings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  csf_subcategory_id TEXT NOT NULL,
  framework_control_id INTEGER NOT NULL,
  mapping_strength TEXT CHECK(mapping_strength IN ('direct', 'partial', 'related')) DEFAULT 'related',
  notes TEXT,
  FOREIGN KEY (csf_subcategory_id) REFERENCES csf_subcategories(id),
  FOREIGN KEY (framework_control_id) REFERENCES framework_controls(id),
  UNIQUE(csf_subcategory_id, framework_control_id)
);

-- Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  assessment_date DATE NOT NULL,
  assessor_name TEXT,
  status TEXT CHECK(status IN ('draft', 'in_progress', 'completed', 'archived')) DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Assessment responses for each subcategory
CREATE TABLE IF NOT EXISTS assessment_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  csf_subcategory_id TEXT NOT NULL,
  maturity_level INTEGER CHECK(maturity_level >= 0 AND maturity_level <= 5) DEFAULT 0,
  implementation_status TEXT CHECK(implementation_status IN ('not_implemented', 'partially_implemented', 'implemented', 'not_applicable')) DEFAULT 'not_implemented',
  evidence TEXT,
  notes TEXT,
  gaps TEXT,
  recommendations TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id),
  FOREIGN KEY (csf_subcategory_id) REFERENCES csf_subcategories(id),
  UNIQUE(assessment_id, csf_subcategory_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_csf_categories_function ON csf_categories(function_id);
CREATE INDEX IF NOT EXISTS idx_csf_subcategories_category ON csf_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_framework_controls_framework ON framework_controls(framework_id);
CREATE INDEX IF NOT EXISTS idx_csf_mappings_subcategory ON csf_framework_mappings(csf_subcategory_id);
CREATE INDEX IF NOT EXISTS idx_csf_mappings_control ON csf_framework_mappings(framework_control_id);
CREATE INDEX IF NOT EXISTS idx_assessments_org ON assessments(organization_id);
CREATE INDEX IF NOT EXISTS idx_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_responses_subcategory ON assessment_responses(csf_subcategory_id);
