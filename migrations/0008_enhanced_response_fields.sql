-- Migration 0008: Enhanced Response Fields
-- Add action_plan and control_owner_id to assessment_responses table

-- Add action plan field (notes, evidence, gaps, recommendations already exist)
ALTER TABLE assessment_responses ADD COLUMN action_plan TEXT;

-- Add control owner reference (FK to users table)
ALTER TABLE assessment_responses ADD COLUMN control_owner_id INTEGER REFERENCES users(id);

-- Create index for control owner lookups
CREATE INDEX IF NOT EXISTS idx_assessment_responses_control_owner ON assessment_responses(control_owner_id);

-- Existing columns (from previous migrations):
-- - evidence: Documentation/evidence of control implementation
-- - notes: General notes about the control implementation
-- - gaps: Identified gaps in control implementation
-- - recommendations: Recommendations for improvement
--
-- New columns added by this migration:
-- - action_plan: Planned actions to improve the control
-- - control_owner_id: User responsible for this control
