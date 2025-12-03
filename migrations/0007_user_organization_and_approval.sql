-- Migration 0007: User Organization Association and Approval System
-- Adds organization_id and is_approved fields to users table

-- Step 1: Add new columns to users table
ALTER TABLE users ADD COLUMN organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;
ALTER TABLE users ADD COLUMN is_approved INTEGER DEFAULT 0 CHECK(is_approved IN (0, 1));

-- Step 2: Create index for organization lookup
CREATE INDEX IF NOT EXISTS idx_users_organization ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_approved ON users(is_approved);

-- Step 3: Update existing users
-- Set existing users as approved (backwards compatibility)
UPDATE users SET is_approved = 1 WHERE is_approved IS NULL OR is_approved = 0;

-- Step 4: Admin users don't need organization (they can manage all)
-- Regular users will be assigned organization during registration
UPDATE users SET organization_id = NULL WHERE role = 'admin';
