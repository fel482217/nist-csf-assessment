-- Migration: Content Internationalization Support
-- Adds translation tables for NIST CSF content (Functions, Categories, Subcategories)

-- CSF Functions translations
CREATE TABLE IF NOT EXISTS csf_function_translations (
  function_id TEXT NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en', 'es')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (function_id, language),
  FOREIGN KEY (function_id) REFERENCES csf_functions(id) ON DELETE CASCADE
);

-- CSF Categories translations
CREATE TABLE IF NOT EXISTS csf_category_translations (
  category_id TEXT NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en', 'es')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (category_id, language),
  FOREIGN KEY (category_id) REFERENCES csf_categories(id) ON DELETE CASCADE
);

-- CSF Subcategories translations
CREATE TABLE IF NOT EXISTS csf_subcategory_translations (
  subcategory_id TEXT NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en', 'es')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (subcategory_id, language),
  FOREIGN KEY (subcategory_id) REFERENCES csf_subcategories(id) ON DELETE CASCADE
);

-- Framework translations
CREATE TABLE IF NOT EXISTS framework_translations (
  framework_id INTEGER NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en', 'es')),
  name TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (framework_id, language),
  FOREIGN KEY (framework_id) REFERENCES frameworks(id) ON DELETE CASCADE
);

-- Framework control translations
CREATE TABLE IF NOT EXISTS framework_control_translations (
  control_id INTEGER NOT NULL,
  language TEXT NOT NULL CHECK(language IN ('en', 'es')),
  name TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (control_id, language),
  FOREIGN KEY (control_id) REFERENCES framework_controls(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_func_trans_lang ON csf_function_translations(language);
CREATE INDEX IF NOT EXISTS idx_cat_trans_lang ON csf_category_translations(language);
CREATE INDEX IF NOT EXISTS idx_subcat_trans_lang ON csf_subcategory_translations(language);
CREATE INDEX IF NOT EXISTS idx_framework_trans_lang ON framework_translations(language);
CREATE INDEX IF NOT EXISTS idx_control_trans_lang ON framework_control_translations(language);

-- Populate English translations from existing data
INSERT OR IGNORE INTO csf_function_translations (function_id, language, name, description)
SELECT id, 'en', name, description FROM csf_functions;

INSERT OR IGNORE INTO csf_category_translations (category_id, language, name, description)
SELECT id, 'en', name, description FROM csf_categories;

INSERT OR IGNORE INTO csf_subcategory_translations (subcategory_id, language, name, description)
SELECT id, 'en', name, description FROM csf_subcategories;

INSERT OR IGNORE INTO framework_translations (framework_id, language, name, description)
SELECT id, 'en', name, description FROM frameworks;

INSERT OR IGNORE INTO framework_control_translations (control_id, language, name, description)
SELECT id, 'en', name, description FROM framework_controls;
