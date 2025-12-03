// TypeScript types for NIST CSF Assessment application

export type Bindings = {
  DB: D1Database;
};

// Maturity levels (0-5 scale)
export type MaturityLevel = 0 | 1 | 2 | 3 | 4 | 5;

// Implementation status
export type ImplementationStatus = 'not_implemented' | 'partially_implemented' | 'implemented' | 'not_applicable';

// Assessment status
export type AssessmentStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

// Mapping strength
export type MappingStrength = 'direct' | 'partial' | 'related';

// Database models
export interface Organization {
  id: number;
  name: string;
  industry?: string;
  size?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CSFFunction {
  id: string;
  name: string;
  description: string;
  sequence: number;
}

export interface CSFCategory {
  id: string;
  function_id: string;
  name: string;
  description: string;
  sequence: number;
}

export interface CSFSubcategory {
  id: string;
  category_id: string;
  name: string;
  description: string;
  sequence: number;
}

export interface Framework {
  id: number;
  code: string;
  name: string;
  version?: string;
  description?: string;
  url?: string;
  created_at: string;
}

export interface FrameworkControl {
  id: number;
  framework_id: number;
  control_id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface CSFFrameworkMapping {
  id: number;
  csf_subcategory_id: string;
  framework_control_id: number;
  mapping_strength: MappingStrength;
  notes?: string;
}

export interface Assessment {
  id: number;
  organization_id: number;
  framework_id: number;
  framework_type: 'nist_csf' | 'iso27001' | 'cis' | 'custom';
  name: string;
  description?: string;
  assessment_date: string;
  assessor_name?: string;
  status: AssessmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AssessmentResponse {
  id: number;
  assessment_id: number;
  csf_subcategory_id: string;
  maturity_level: MaturityLevel;
  implementation_status: ImplementationStatus;
  evidence?: string;
  notes?: string;
  gaps?: string;
  recommendations?: string;
  created_at: string;
  updated_at: string;
}

// Extended types with joined data
export interface CSFSubcategoryWithCategory extends CSFSubcategory {
  category_name?: string;
  function_id?: string;
  function_name?: string;
}

export interface AssessmentWithOrg extends Assessment {
  organization_name?: string;
  framework_name?: string;
  framework_code?: string;
}

export interface AssessmentResponseWithDetails extends AssessmentResponse {
  subcategory_name?: string;
  category_id?: string;
  category_name?: string;
  function_id?: string;
  function_name?: string;
}

// API request/response types
export interface CreateAssessmentRequest {
  organization_id: number;
  framework_id: number;
  name: string;
  description?: string;
  assessment_date: string;
  assessor_name?: string;
}

export interface UpdateAssessmentRequest {
  name?: string;
  description?: string;
  assessment_date?: string;
  assessor_name?: string;
  status?: AssessmentStatus;
}

export interface CreateResponseRequest {
  assessment_id: number;
  csf_subcategory_id: string;
  maturity_level: MaturityLevel;
  implementation_status: ImplementationStatus;
  evidence?: string;
  notes?: string;
  gaps?: string;
  recommendations?: string;
}

export interface UpdateResponseRequest {
  maturity_level?: MaturityLevel;
  implementation_status?: ImplementationStatus;
  evidence?: string;
  notes?: string;
  gaps?: string;
  recommendations?: string;
}

// Statistics and analytics
export interface AssessmentStatistics {
  assessment_id: number;
  total_subcategories: number;
  assessed_subcategories: number;
  completion_percentage: number;
  average_maturity: number;
  by_function: {
    function_id: string;
    function_name: string;
    average_maturity: number;
    count: number;
  }[];
  by_implementation_status: {
    status: ImplementationStatus;
    count: number;
    percentage: number;
  }[];
}
