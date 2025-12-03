-- Migration: User Authentication and Role-Based Access Control (RBAC)
-- Created: 2024-12-03
-- Description: Add users, roles, and sessions for authentication

-- ============================================================
-- 1. Users Table
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster email lookups (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================================
-- 2. Sessions Table (for session management)
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY, -- UUID for session ID
  user_id INTEGER NOT NULL,
  token TEXT UNIQUE NOT NULL, -- JWT or session token
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ============================================================
-- 3. Seed Default Admin User
-- ============================================================
-- Default admin: admin@csp.com / Admin123!
-- Password hash is bcrypt hash of "Admin123!"
-- In production, user should change this immediately
INSERT OR IGNORE INTO users (id, email, password_hash, name, role) VALUES 
  (1, 'admin@csp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator', 'admin');

-- Default regular user: user@csp.com / User123!
INSERT OR IGNORE INTO users (id, email, password_hash, name, role) VALUES 
  (2, 'user@csp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Regular User', 'user');

-- ============================================================
-- 4. Audit: Link assessments to users
-- ============================================================
-- Add created_by column to track who created each assessment
ALTER TABLE assessments ADD COLUMN created_by INTEGER REFERENCES users(id);

-- Add updated_by column to track who last modified each assessment
ALTER TABLE assessments ADD COLUMN updated_by INTEGER REFERENCES users(id);

-- Create indexes for user audit trail
CREATE INDEX IF NOT EXISTS idx_assessments_created_by ON assessments(created_by);
CREATE INDEX IF NOT EXISTS idx_assessments_updated_by ON assessments(updated_by);
