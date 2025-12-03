-- Migration 0006: Fix Maturity Levels to align with NIST CSF 2.0 Official Tiers
-- Changes maturity_level from 0-5 to 0-4 (0=Not Assessed, 1-4=Official Tiers)

-- Step 1: Migrate any existing level 5 values to level 4
UPDATE assessment_responses 
SET maturity_level = 4 
WHERE maturity_level = 5;

-- Step 2: Recreate assessment_responses table with correct constraint
-- SQLite doesn't support ALTER COLUMN, so we need to recreate the table

-- Create new table with correct constraint
CREATE TABLE assessment_responses_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  csf_subcategory_id TEXT NOT NULL,
  maturity_level INTEGER CHECK(maturity_level >= 0 AND maturity_level <= 4) DEFAULT 0,
  implementation_status TEXT CHECK(implementation_status IN ('not_implemented', 'partially_implemented', 'implemented', 'not_applicable')) DEFAULT 'not_implemented',
  evidence TEXT,
  notes TEXT,
  gaps TEXT,
  recommendations TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (csf_subcategory_id) REFERENCES csf_subcategories(id),
  UNIQUE(assessment_id, csf_subcategory_id)
);

-- Copy data from old table to new table
INSERT INTO assessment_responses_new 
  (id, assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, gaps, recommendations, created_at, updated_at)
SELECT 
  id, assessment_id, csf_subcategory_id, 
  CASE 
    WHEN maturity_level > 4 THEN 4 
    ELSE maturity_level 
  END as maturity_level,
  implementation_status, evidence, notes, gaps, recommendations, 
  created_at, updated_at
FROM assessment_responses;

-- Drop old table
DROP TABLE assessment_responses;

-- Rename new table
ALTER TABLE assessment_responses_new RENAME TO assessment_responses;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_responses_subcategory ON assessment_responses(csf_subcategory_id);

-- Step 3: Update assessment_items table (for non-NIST frameworks) if it exists
-- Check if table exists and update
CREATE TABLE IF NOT EXISTS assessment_items_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  framework_control_id INTEGER NOT NULL,
  maturity_level INTEGER CHECK(maturity_level >= 0 AND maturity_level <= 4) DEFAULT 0,
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

-- Copy data if assessment_items exists
INSERT OR IGNORE INTO assessment_items_new 
  (id, assessment_id, framework_control_id, maturity_level, implementation_status, 
   evidence, notes, gaps, recommendations, created_at, updated_at)
SELECT 
  id, assessment_id, framework_control_id,
  CASE 
    WHEN maturity_level > 4 THEN 4 
    ELSE maturity_level 
  END as maturity_level,
  implementation_status, evidence, notes, gaps, recommendations, 
  created_at, updated_at
FROM assessment_items
WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='assessment_items');

-- Drop old assessment_items if exists and rename
DROP TABLE IF EXISTS assessment_items;
ALTER TABLE assessment_items_new RENAME TO assessment_items;

-- Recreate indexes for assessment_items
CREATE INDEX IF NOT EXISTS idx_assessment_items_assessment ON assessment_items(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_items_control ON assessment_items(framework_control_id);
