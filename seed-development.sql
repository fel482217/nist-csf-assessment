-- ============================================
-- SEED DATA FOR LOCAL DEVELOPMENT
-- NIST CSF Assessment Platform
-- ============================================
-- 
-- This file creates test data for local development environment.
-- Run with: npx wrangler d1 execute nist-csf-db --local --file=./seed-development.sql
--
-- Credentials created:
-- - Admin: admin@dev.local / Admin123!
-- - Users: john.doe@devcorp.local / Test123!
--          jane.smith@devcorp.local / Test123!
--          bob.jones@securebank.local / Test123!
--          alice.williams@securebank.local / Test123!
-- - Pending: pending@dev.local / Test123!
-- ============================================

-- 1. Test Organizations
INSERT INTO organizations (id, name, industry, size, description, created_at)
VALUES 
  (1, 'DevCorp Tech Solutions', 'Technology', 'Large (500+)', 'Primary development organization for testing features', CURRENT_TIMESTAMP),
  (2, 'SecureBank Financial', 'Finance', 'Medium (100-500)', 'Banking sector organization for multi-org testing', CURRENT_TIMESTAMP),
  (3, 'HealthCare Systems Inc', 'Healthcare', 'Medium (100-500)', 'Healthcare provider for testing industry-specific scenarios', CURRENT_TIMESTAMP);

-- 2. Test Users
-- Note: Passwords are base64 encoded with btoa() for development only
-- In production, use bcrypt or similar secure hashing

-- Admin User (password: Admin123!)
INSERT INTO users (id, email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES (1, 'admin@dev.local', 'Dev Admin', 'QWRtaW4xMjMh', 'admin', 1, 1, 1, CURRENT_TIMESTAMP);

-- Regular Users - Organization 1 (DevCorp Tech)
INSERT INTO users (id, email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES 
  (2, 'john.doe@devcorp.local', 'John Doe', 'VGVzdDEyMyE=', 'user', 1, 1, 1, CURRENT_TIMESTAMP),
  (3, 'jane.smith@devcorp.local', 'Jane Smith', 'VGVzdDEyMyE=', 'user', 1, 1, 1, CURRENT_TIMESTAMP);

-- Regular Users - Organization 2 (SecureBank)
INSERT INTO users (id, email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES 
  (4, 'bob.jones@securebank.local', 'Bob Jones', 'VGVzdDEyMyE=', 'user', 1, 1, 2, CURRENT_TIMESTAMP),
  (5, 'alice.williams@securebank.local', 'Alice Williams', 'VGVzdDEyMyE=', 'user', 1, 1, 2, CURRENT_TIMESTAMP);

-- Pending Approval User (to test approval workflow)
INSERT INTO users (id, email, name, password_hash, role, is_approved, is_active, organization_id, created_at)
VALUES (6, 'pending@dev.local', 'Pending User', 'VGVzdDEyMyE=', 'user', 0, 1, 1, CURRENT_TIMESTAMP);

-- 3. Test Assessments
-- framework_id = 7 is NIST CSF 2.0 (from initial schema)
INSERT INTO assessments (id, organization_id, framework_id, name, assessment_date, status, created_by, created_at)
VALUES 
  (1, 1, 7, 'Q4 2025 Security Assessment', '2025-12-03', 'draft', 1, CURRENT_TIMESTAMP),
  (2, 1, 7, 'Annual Compliance Review 2025', '2025-11-15', 'in_progress', 2, CURRENT_TIMESTAMP),
  (3, 1, 7, 'Completed Assessment Example', '2025-10-01', 'completed', 2, CURRENT_TIMESTAMP),
  (4, 2, 7, 'Banking Security Audit', '2025-12-01', 'draft', 4, CURRENT_TIMESTAMP),
  (5, 3, 7, 'Healthcare Compliance Check', '2025-11-20', 'in_progress', 1, CURRENT_TIMESTAMP);

-- 4. Sample Assessment Responses
-- Create diverse sample responses for assessment #1 (draft)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, gaps, action_plan, recommendations, control_owner_id, created_at, updated_at)
SELECT 
  1 as assessment_id,
  id as csf_subcategory_id,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 0 THEN 3
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 1 THEN 2
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 4 = 2 THEN 1
    ELSE 0
  END as maturity_level,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 3 = 0 THEN 'implemented'
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 3 = 1 THEN 'partial'
    ELSE 'not_implemented'
  END as implementation_status,
  'Sample evidence documentation for development testing purposes. This includes policies, procedures, and technical controls.' as evidence,
  'Development testing notes. Review quarterly and update based on organizational changes.' as notes,
  'Sample gap identified during development testing. Need to implement additional monitoring controls.' as gaps,
  'Action plan to address the identified gap: 1) Review current controls, 2) Implement missing capabilities, 3) Test and validate.' as action_plan,
  'Recommendation for improvement: Consider implementing automated monitoring and regular audit reviews.' as recommendations,
  2 as control_owner_id,
  CURRENT_TIMESTAMP as created_at,
  CURRENT_TIMESTAMP as updated_at
FROM csf_subcategories
LIMIT 15;

-- Add comprehensive responses for assessment #3 (completed)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, gaps, recommendations, control_owner_id, created_at, updated_at)
SELECT 
  3 as assessment_id,
  id as csf_subcategory_id,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 5 = 0 THEN 4
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 5 = 1 THEN 3
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 5 = 2 THEN 3
    ELSE 2
  END as maturity_level,
  'implemented' as implementation_status,
  'Fully documented and implemented control with evidence of regular testing and review processes.' as evidence,
  'Completed assessment sample data. Control has been operational for over 12 months with quarterly reviews.' as notes,
  'No significant gaps identified. Continuous improvement process in place.' as gaps,
  'Maintain current implementation level and continue quarterly reviews for continuous improvement.' as recommendations,
  2 as control_owner_id,
  CURRENT_TIMESTAMP as created_at,
  CURRENT_TIMESTAMP as updated_at
FROM csf_subcategories
LIMIT 25;

-- Add partial responses for assessment #2 (in_progress)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, control_owner_id, created_at, updated_at)
SELECT 
  2 as assessment_id,
  id as csf_subcategory_id,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 3 = 0 THEN 2
    ELSE 1
  END as maturity_level,
  CASE 
    WHEN CAST(SUBSTR(id, -1) AS INTEGER) % 2 = 0 THEN 'partial'
    ELSE 'not_implemented'
  END as implementation_status,
  'Initial documentation and implementation in progress.' as evidence,
  'Assessment currently in progress. Additional information to be collected.' as notes,
  3 as control_owner_id,
  CURRENT_TIMESTAMP as created_at,
  CURRENT_TIMESTAMP as updated_at
FROM csf_subcategories
LIMIT 10;

-- Add responses for multi-org assessment #4 (SecureBank)
INSERT INTO assessment_responses 
  (assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
   evidence, notes, control_owner_id, created_at, updated_at)
SELECT 
  4 as assessment_id,
  id as csf_subcategory_id,
  3 as maturity_level,
  'implemented' as implementation_status,
  'Banking sector specific control implementation with regulatory compliance documentation.' as evidence,
  'Compliance with financial industry standards and regulations.' as notes,
  4 as control_owner_id,
  CURRENT_TIMESTAMP as created_at,
  CURRENT_TIMESTAMP as updated_at
FROM csf_subcategories
LIMIT 12;

-- 5. Create test sessions for quick login testing (optional)
-- These sessions are valid for 7 days from creation
INSERT INTO sessions (id, user_id, token, expires_at, created_at)
VALUES 
  (1, 1, 'dev-admin-token-12345678', datetime('now', '+7 days'), CURRENT_TIMESTAMP),
  (2, 2, 'dev-user-token-87654321', datetime('now', '+7 days'), CURRENT_TIMESTAMP);

-- ============================================
-- SUMMARY OF CREATED DATA:
-- ============================================
-- Organizations: 3
--   - DevCorp Tech Solutions (Technology)
--   - SecureBank Financial (Finance)
--   - HealthCare Systems Inc (Healthcare)
--
-- Users: 6
--   - 1 Admin (admin@dev.local)
--   - 4 Active Regular Users
--   - 1 Pending Approval User
--
-- Assessments: 5
--   - 2 Draft (organizations 1, 2)
--   - 2 In Progress (organizations 1, 3)
--   - 1 Completed (organization 1)
--
-- Assessment Responses: 62+
--   - Assessment #1: 15 responses (diverse maturity levels)
--   - Assessment #2: 10 responses (partial completion)
--   - Assessment #3: 25 responses (all implemented)
--   - Assessment #4: 12 responses (banking specific)
--
-- Sessions: 2 (valid for 7 days)
-- ============================================
--
-- TESTING SCENARIOS ENABLED:
-- ============================================
-- ✅ User Authentication & Authorization
--    - Login as admin, regular user, or pending user
--    - Test approval workflow (approve pending user)
--
-- ✅ Organization-Based Access Control
--    - Users see only their organization's assessments
--    - Admins see all assessments
--    - Multi-org comparison (admin only)
--
-- ✅ Assessment Management
--    - Create new assessments
--    - Edit draft/in-progress assessments
--    - View completed assessments (read-only)
--    - Delete assessments
--
-- ✅ Assessment Responses
--    - Add responses with all fields
--    - Edit responses (maturity, status, evidence, etc.)
--    - Assign control owners
--    - Add action plans and recommendations
--
-- ✅ Reports & Analytics
--    - Generate PDF reports for individual assessments
--    - Compare multiple assessments (radar charts)
--    - Multi-organization comparison (admin only)
--    - Export reports
--
-- ✅ Internationalization (i18n)
--    - Switch between English and Spanish
--    - Verify translations in all views
--
-- ✅ User Management (Admin)
--    - View pending approval users
--    - Approve/reject users
--    - Manage active users
--    - View user organizations
-- ============================================
