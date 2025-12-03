-- Migrate database to English
-- This script clears Spanish content and loads English content

-- Disable foreign keys temporarily
PRAGMA foreign_keys = OFF;

-- Clear existing data in reverse dependency order
DELETE FROM assessment_responses;
DELETE FROM csf_framework_mappings;
DELETE FROM csf_subcategories;

-- Re-enable foreign keys
PRAGMA foreign_keys = ON;
