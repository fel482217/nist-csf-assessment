import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings, CreateAssessmentRequest, UpdateAssessmentRequest, CreateResponseRequest, UpdateResponseRequest, AssessmentStatistics } from './types'
import authRoutes from './auth-routes'
import { requireAuth, requireAdmin, getCurrentUser } from './auth'

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// ===================
// Authentication Routes (no auth required)
// ===================
app.route('/api/auth', authRoutes)

// ===================
// API Routes - Users (Admin Only)
// ===================

// Get all users (Admin only)
app.get('/api/users', requireAuth, requireAdmin, async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT u.id, u.email, u.name, u.role, u.is_active, u.is_approved, u.organization_id, 
           o.name as organization_name, u.created_at, u.updated_at 
    FROM users u
    LEFT JOIN organizations o ON u.organization_id = o.id
    ORDER BY u.is_approved ASC, u.created_at DESC
  `).all()
  return c.json(results)
})

// Get single user (Admin only)
app.get('/api/users/:id', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare(`
    SELECT u.id, u.email, u.name, u.role, u.is_active, u.is_approved, u.organization_id,
           o.name as organization_name, u.created_at, u.updated_at 
    FROM users u
    LEFT JOIN organizations o ON u.organization_id = o.id
    WHERE u.id = ?
  `).bind(id).all()
  
  if (!results || results.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }
  
  return c.json(results[0])
})

// Create user (Admin only)
app.post('/api/users', requireAuth, requireAdmin, async (c) => {
  const body = await c.req.json()
  const { email, password, name, role } = body
  
  // Validation
  if (!email || !password || !name) {
    return c.json({ error: 'Email, password, and name are required' }, 400)
  }
  
  // Check if user exists
  const { results: existing } = await c.env.DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).all()
  
  if (existing && existing.length > 0) {
    return c.json({ error: 'Email already exists' }, 409)
  }
  
  // Hash password (simple base64 - in production use bcrypt)
  const passwordHash = btoa(password)
  
  // Create user
  const result = await c.env.DB.prepare(
    'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)'
  ).bind(email, passwordHash, name, role || 'user').run()
  
  return c.json({ 
    id: result.meta.last_row_id, 
    email, 
    name, 
    role: role || 'user' 
  }, 201)
})

// Update user (Admin only)
app.put('/api/users/:id', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  
  const updates = []
  const bindings = []
  
  if (body.name) {
    updates.push('name = ?')
    bindings.push(body.name)
  }
  if (body.email) {
    updates.push('email = ?')
    bindings.push(body.email)
  }
  if (body.role) {
    updates.push('role = ?')
    bindings.push(body.role)
  }
  if (body.password) {
    updates.push('password_hash = ?')
    bindings.push(btoa(body.password))
  }
  if (body.is_active !== undefined) {
    updates.push('is_active = ?')
    bindings.push(body.is_active ? 1 : 0)
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP')
  bindings.push(id)
  
  await c.env.DB.prepare(
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...bindings).run()
  
  return c.json({ success: true })
})

// Delete user (Admin only)
app.delete('/api/users/:id', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  const currentUser = getCurrentUser(c)
  
  // Prevent deleting yourself
  if (currentUser && currentUser.id === parseInt(id)) {
    return c.json({ error: 'Cannot delete your own account' }, 400)
  }
  
  // Delete user
  await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// Approve user (Admin only)
app.post('/api/users/:id/approve', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  
  // Update user to approved
  await c.env.DB.prepare('UPDATE users SET is_approved = 1 WHERE id = ?').bind(id).run()
  
  return c.json({ success: true, message: 'User approved successfully' })
})

// Reject user (Admin only)
app.post('/api/users/:id/reject', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  
  // Update user to not approved and deactivate
  await c.env.DB.prepare('UPDATE users SET is_approved = 0, is_active = 0 WHERE id = ?').bind(id).run()
  
  return c.json({ success: true, message: 'User rejected successfully' })
})

// ===================
// API Routes - Organizations
// ===================

app.get('/api/organizations', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM organizations ORDER BY name').all()
  return c.json(results)
})

app.get('/api/organizations/:id', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare('SELECT * FROM organizations WHERE id = ?').bind(id).all()
  if (!results || results.length === 0) {
    return c.json({ error: 'Organization not found' }, 404)
  }
  return c.json(results[0])
})

// Protected: Only authenticated users can create organizations
app.post('/api/organizations', requireAuth, async (c) => {
  const body = await c.req.json()
  const { name, industry, size, description } = body
  
  const result = await c.env.DB.prepare(
    'INSERT INTO organizations (name, industry, size, description) VALUES (?, ?, ?, ?)'
  ).bind(name, industry, size, description).run()
  
  return c.json({ id: result.meta.last_row_id, ...body }, 201)
})

// Protected: Only admins can delete organizations
app.delete('/api/organizations/:id', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  
  // Delete all assessments for this organization first
  await c.env.DB.prepare('DELETE FROM assessments WHERE organization_id = ?').bind(id).run()
  
  // Delete organization
  await c.env.DB.prepare('DELETE FROM organizations WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// ===================
// API Routes - NIST CSF Structure
// ===================

app.get('/api/csf/functions', async (c) => {
  const lang = c.req.query('lang') || 'en'
  
  const query = `
    SELECT f.id, f.sequence,
           COALESCE(t.name, f.name) as name,
           COALESCE(t.description, f.description) as description
    FROM csf_functions f
    LEFT JOIN csf_function_translations t ON f.id = t.function_id AND t.language = ?
    ORDER BY f.sequence
  `
  
  const { results } = await c.env.DB.prepare(query).bind(lang).all()
  return c.json(results)
})

app.get('/api/csf/categories', async (c) => {
  const functionId = c.req.query('function_id')
  const lang = c.req.query('lang') || 'en'
  
  let query = `
    SELECT c.id, c.function_id, c.sequence,
           COALESCE(ct.name, c.name) as name,
           COALESCE(ct.description, c.description) as description,
           COALESCE(ft.name, f.name) as function_name
    FROM csf_categories c
    JOIN csf_functions f ON c.function_id = f.id
    LEFT JOIN csf_category_translations ct ON c.id = ct.category_id AND ct.language = ?
    LEFT JOIN csf_function_translations ft ON f.id = ft.function_id AND ft.language = ?
  `
  
  const bindings = [lang, lang]
  
  if (functionId) {
    query += ' WHERE c.function_id = ?'
    bindings.push(functionId)
  }
  
  query += ' ORDER BY c.sequence'
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  return c.json(results)
})

app.get('/api/csf/subcategories', async (c) => {
  const categoryId = c.req.query('category_id')
  const functionId = c.req.query('function_id')
  const lang = c.req.query('lang') || 'en'
  
  let query = `
    SELECT s.id, s.category_id, s.sequence,
           COALESCE(st.name, s.name) as name,
           COALESCE(st.description, s.description) as description,
           c.function_id,
           COALESCE(ct.name, c.name) as category_name,
           COALESCE(ft.name, f.name) as function_name
    FROM csf_subcategories s 
    JOIN csf_categories c ON s.category_id = c.id
    JOIN csf_functions f ON c.function_id = f.id
    LEFT JOIN csf_subcategory_translations st ON s.id = st.subcategory_id AND st.language = ?
    LEFT JOIN csf_category_translations ct ON c.id = ct.category_id AND ct.language = ?
    LEFT JOIN csf_function_translations ft ON f.id = ft.function_id AND ft.language = ?
  `
  
  const conditions = []
  const bindings = [lang, lang, lang]
  
  if (categoryId) {
    conditions.push('s.category_id = ?')
    bindings.push(categoryId)
  }
  
  if (functionId) {
    conditions.push('c.function_id = ?')
    bindings.push(functionId)
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }
  
  query += ' ORDER BY s.sequence'
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  return c.json(results)
})

// ===================
// API Routes - Frameworks
// ===================

app.get('/api/frameworks', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM frameworks ORDER BY name').all()
  return c.json(results)
})

app.get('/api/frameworks/:id', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare('SELECT * FROM frameworks WHERE id = ?').bind(id).all()
  if (!results || results.length === 0) {
    return c.json({ error: 'Framework not found' }, 404)
  }
  return c.json(results[0])
})

app.get('/api/frameworks/:id/controls', async (c) => {
  const id = c.req.param('id')
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM framework_controls WHERE framework_id = ? ORDER BY control_id'
  ).bind(id).all()
  return c.json(results)
})

// ===================
// API Routes - Mappings
// ===================

app.get('/api/mappings', async (c) => {
  const subcategoryId = c.req.query('subcategory_id')
  const frameworkId = c.req.query('framework_id')
  
  let query = `
    SELECT m.*, 
           s.name as subcategory_name,
           fc.control_id, fc.name as control_name, fc.framework_id,
           f.name as framework_name
    FROM csf_framework_mappings m
    JOIN csf_subcategories s ON m.csf_subcategory_id = s.id
    JOIN framework_controls fc ON m.framework_control_id = fc.id
    JOIN frameworks f ON fc.framework_id = f.id
  `
  
  const conditions = []
  const bindings = []
  
  if (subcategoryId) {
    conditions.push('m.csf_subcategory_id = ?')
    bindings.push(subcategoryId)
  }
  
  if (frameworkId) {
    conditions.push('fc.framework_id = ?')
    bindings.push(frameworkId)
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  return c.json(results)
})

// ===================
// API Routes - Assessments
// ===================

app.get('/api/assessments', requireAuth, async (c) => {
  const currentUser = getCurrentUser(c)
  const orgId = c.req.query('organization_id')
  
  let query = `
    SELECT a.*, o.name as organization_name, f.name as framework_name, f.code as framework_code
    FROM assessments a 
    JOIN organizations o ON a.organization_id = o.id
    LEFT JOIN frameworks f ON a.framework_id = f.id
  `
  
  // Regular users: only see assessments from their organization
  // Admins: see all assessments
  if (currentUser && currentUser.role !== 'admin' && currentUser.organization_id) {
    query += ' WHERE a.organization_id = ?'
    const { results } = await c.env.DB.prepare(query + ' ORDER BY a.created_at DESC').bind(currentUser.organization_id).all()
    return c.json(results)
  }
  
  // Admin or filter by orgId
  if (orgId) {
    query += ' WHERE a.organization_id = ?'
    const { results } = await c.env.DB.prepare(query + ' ORDER BY a.created_at DESC').bind(orgId).all()
    return c.json(results)
  }
  
  // Admin: see all
  const { results } = await c.env.DB.prepare(query + ' ORDER BY a.created_at DESC').all()
  return c.json(results)
})

app.get('/api/assessments/:id', async (c) => {
  const id = c.req.param('id')
  const query = `
    SELECT a.*, o.name as organization_name, f.name as framework_name, f.code as framework_code
    FROM assessments a 
    JOIN organizations o ON a.organization_id = o.id
    LEFT JOIN frameworks f ON a.framework_id = f.id
    WHERE a.id = ?
  `
  const { results } = await c.env.DB.prepare(query).bind(id).all()
  if (!results || results.length === 0) {
    return c.json({ error: 'Assessment not found' }, 404)
  }
  return c.json(results[0])
})

// Protected: Only authenticated users can create assessments
app.post('/api/assessments', requireAuth, async (c) => {
  const body: CreateAssessmentRequest = await c.req.json()
  const { organization_id, framework_id, name, description, assessment_date, assessor_name } = body
  const user = getCurrentUser(c)
  
  // Determine framework_type based on framework_id
  const frameworkQuery = await c.env.DB.prepare('SELECT code FROM frameworks WHERE id = ?').bind(framework_id).first()
  let framework_type = 'custom'
  if (frameworkQuery) {
    const code = (frameworkQuery as any).code
    if (code === 'NIST-CSF') framework_type = 'nist_csf'
    else if (code === 'ISO-27001') framework_type = 'iso27001'
    else if (code === 'CIS') framework_type = 'cis'
  }
  
  const result = await c.env.DB.prepare(
    'INSERT INTO assessments (organization_id, framework_id, framework_type, name, description, assessment_date, assessor_name, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(organization_id, framework_id, framework_type, name, description || null, assessment_date, assessor_name || null, 'draft', user?.id).run()
  
  return c.json({ id: result.meta.last_row_id, ...body, framework_type, status: 'draft' }, 201)
})

// Protected: Only authenticated users can update assessments
app.put('/api/assessments/:id', requireAuth, async (c) => {
  const id = c.req.param('id')
  const body: UpdateAssessmentRequest = await c.req.json()
  const user = getCurrentUser(c)
  
  const updates = []
  const bindings = []
  
  if (body.name) {
    updates.push('name = ?')
    bindings.push(body.name)
  }
  if (body.description !== undefined) {
    updates.push('description = ?')
    bindings.push(body.description)
  }
  if (body.assessment_date) {
    updates.push('assessment_date = ?')
    bindings.push(body.assessment_date)
  }
  if (body.assessor_name !== undefined) {
    updates.push('assessor_name = ?')
    bindings.push(body.assessor_name)
  }
  if (body.status) {
    updates.push('status = ?')
    bindings.push(body.status)
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP')
  updates.push('updated_by = ?')
  bindings.push(user?.id)
  bindings.push(id)
  
  await c.env.DB.prepare(
    `UPDATE assessments SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...bindings).run()
  
  return c.json({ id, ...body })
})

// Protected: Only admins can delete assessments
app.delete('/api/assessments/:id', requireAuth, requireAdmin, async (c) => {
  const id = c.req.param('id')
  
  // Delete responses first
  await c.env.DB.prepare('DELETE FROM assessment_responses WHERE assessment_id = ?').bind(id).run()
  
  // Delete assessment
  await c.env.DB.prepare('DELETE FROM assessments WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// ===================
// API Routes - Assessment Responses
// ===================

app.get('/api/assessments/:id/responses', async (c) => {
  const id = c.req.param('id')
  const functionId = c.req.query('function_id')
  
  let query = `
    SELECT ar.*, 
           s.name as subcategory_name,
           c.id as category_id, c.name as category_name,
           f.id as function_id, f.name as function_name
    FROM assessment_responses ar
    JOIN csf_subcategories s ON ar.csf_subcategory_id = s.id
    JOIN csf_categories c ON s.category_id = c.id
    JOIN csf_functions f ON c.function_id = f.id
    WHERE ar.assessment_id = ?
  `
  
  const bindings = [id]
  
  if (functionId) {
    query += ' AND f.id = ?'
    bindings.push(functionId)
  }
  
  query += ' ORDER BY f.sequence, c.sequence, s.sequence'
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  return c.json(results)
})

// Protected: Only authenticated users can create/update responses
app.post('/api/responses', requireAuth, async (c) => {
  const body: CreateResponseRequest = await c.req.json()
  const { assessment_id, csf_subcategory_id, maturity_level, implementation_status, evidence, notes, gaps, recommendations } = body
  
  const result = await c.env.DB.prepare(
    `INSERT INTO assessment_responses 
     (assessment_id, csf_subcategory_id, maturity_level, implementation_status, evidence, notes, gaps, recommendations) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(assessment_id, csf_subcategory_id) 
     DO UPDATE SET 
       maturity_level = excluded.maturity_level,
       implementation_status = excluded.implementation_status,
       evidence = excluded.evidence,
       notes = excluded.notes,
       gaps = excluded.gaps,
       recommendations = excluded.recommendations,
       updated_at = CURRENT_TIMESTAMP`
  ).bind(assessment_id, csf_subcategory_id, maturity_level, implementation_status, 
         evidence || null, notes || null, gaps || null, recommendations || null).run()
  
  return c.json({ id: result.meta.last_row_id, ...body }, 201)
})

// Protected: Only authenticated users can update responses
app.put('/api/responses/:id', requireAuth, async (c) => {
  const id = c.req.param('id')
  const body: UpdateResponseRequest = await c.req.json()
  
  const updates = []
  const bindings = []
  
  if (body.maturity_level !== undefined) {
    updates.push('maturity_level = ?')
    bindings.push(body.maturity_level)
  }
  if (body.implementation_status) {
    updates.push('implementation_status = ?')
    bindings.push(body.implementation_status)
  }
  if (body.evidence !== undefined) {
    updates.push('evidence = ?')
    bindings.push(body.evidence)
  }
  if (body.notes !== undefined) {
    updates.push('notes = ?')
    bindings.push(body.notes)
  }
  if (body.gaps !== undefined) {
    updates.push('gaps = ?')
    bindings.push(body.gaps)
  }
  if (body.recommendations !== undefined) {
    updates.push('recommendations = ?')
    bindings.push(body.recommendations)
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP')
  bindings.push(id)
  
  await c.env.DB.prepare(
    `UPDATE assessment_responses SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...bindings).run()
  
  return c.json({ id, ...body })
})

// ===================
// API Routes - Statistics
// ===================

app.get('/api/assessments/:id/statistics', async (c) => {
  const id = c.req.param('id')
  
  // Total and assessed subcategories
  const totalQuery = await c.env.DB.prepare('SELECT COUNT(*) as total FROM csf_subcategories').all()
  const assessedQuery = await c.env.DB.prepare(
    'SELECT COUNT(*) as assessed FROM assessment_responses WHERE assessment_id = ?'
  ).bind(id).all()
  
  const total = (totalQuery.results[0] as any).total
  const assessed = (assessedQuery.results[0] as any).assessed
  
  // Average maturity
  const avgQuery = await c.env.DB.prepare(
    'SELECT AVG(maturity_level) as avg_maturity FROM assessment_responses WHERE assessment_id = ?'
  ).bind(id).all()
  const avgMaturity = (avgQuery.results[0] as any).avg_maturity || 0
  
  // By function
  const byFunctionQuery = await c.env.DB.prepare(`
    SELECT 
      f.id as function_id, 
      f.name as function_name, 
      AVG(ar.maturity_level) as average_maturity,
      COUNT(ar.id) as count
    FROM csf_functions f
    LEFT JOIN csf_categories c ON f.id = c.function_id
    LEFT JOIN csf_subcategories s ON c.id = s.category_id
    LEFT JOIN assessment_responses ar ON s.id = ar.csf_subcategory_id AND ar.assessment_id = ?
    GROUP BY f.id, f.name
    ORDER BY f.sequence
  `).bind(id).all()
  
  // By implementation status
  const byStatusQuery = await c.env.DB.prepare(`
    SELECT 
      implementation_status as status,
      COUNT(*) as count
    FROM assessment_responses 
    WHERE assessment_id = ?
    GROUP BY implementation_status
  `).bind(id).all()
  
  const statistics: AssessmentStatistics = {
    assessment_id: Number(id),
    total_subcategories: total,
    assessed_subcategories: assessed,
    completion_percentage: total > 0 ? Math.round((assessed / total) * 100) : 0,
    average_maturity: Math.round(avgMaturity * 10) / 10,
    by_function: byFunctionQuery.results.map((row: any) => ({
      function_id: row.function_id,
      function_name: row.function_name,
      average_maturity: Math.round((row.average_maturity || 0) * 10) / 10,
      count: row.count || 0
    })),
    by_implementation_status: byStatusQuery.results.map((row: any) => ({
      status: row.status,
      count: row.count,
      percentage: assessed > 0 ? Math.round((row.count / assessed) * 100) : 0
    }))
  }
  
  return c.json(statistics)
})

// ===================
// Frontend Route
// ===================

app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyber Security Posture - CSP</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-blue-900 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-shield-alt text-2xl"></i>
                    <div>
                        <h1 class="text-xl font-bold">Cyber Security Posture - CSP</h1>
                        <p class="text-xs text-blue-200" data-i18n="app.subtitle">NIST CSF 2.0 Assessment Platform</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <!-- Navigation buttons (only visible when authenticated) -->
                    <div id="nav-buttons" class="flex items-center space-x-4">
                        <button onclick="showView('assessments')" class="nav-btn px-4 py-2 rounded hover:bg-blue-800 transition">
                            <i class="fas fa-clipboard-check mr-2"></i><span data-i18n="nav.assessments">Assessments</span>
                        </button>
                        <button onclick="showView('frameworks')" class="nav-btn px-4 py-2 rounded hover:bg-blue-800 transition">
                            <i class="fas fa-sitemap mr-2"></i><span data-i18n="nav.frameworks">Frameworks</span>
                        </button>
                        <button onclick="showView('reports')" class="nav-btn px-4 py-2 rounded hover:bg-blue-800 transition">
                            <i class="fas fa-chart-bar mr-2"></i><span data-i18n="nav.reports">Reports</span>
                        </button>
                        <button onclick="showView('organizations')" class="nav-btn px-4 py-2 rounded hover:bg-blue-800 transition">
                            <i class="fas fa-building mr-2"></i><span data-i18n="nav.organizations">Organizations</span>
                        </button>
                        <!-- Admin only: Users management -->
                        <button onclick="showView('users')" class="admin-only nav-btn px-4 py-2 rounded hover:bg-blue-800 transition hidden">
                            <i class="fas fa-users mr-2"></i><span data-i18n="nav.users">Users</span>
                        </button>
                    </div>
                    
                    <!-- Language selector -->
                    <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-blue-700">
                        <i class="fas fa-language"></i>
                        <select id="language-selector" onchange="i18n.setLanguage(this.value)" class="bg-blue-800 text-white px-2 py-1 rounded border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                    
                    <!-- User info (visible when authenticated) -->
                    <div id="user-info" class="hidden ml-4 pl-4 border-l border-blue-700"></div>
                    
                    <!-- Auth buttons (visible when not authenticated) -->
                    <div id="auth-buttons" class="flex items-center space-x-2 ml-4 pl-4 border-l border-blue-700"></div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Login/Register View (shown when not authenticated) -->
    <div id="login-view" class="container mx-auto px-4 py-16"></div>

    <!-- Main Content (shown when authenticated) -->
    <div id="main-content" class="container mx-auto px-4 py-8 hidden">
        <!-- Assessments View -->
        <div id="assessments-view" class="view-container">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-clipboard-check text-blue-600 mr-2"></i>
                        <span data-i18n="assessments.title">Cybersecurity Assessments</span>
                    </h2>
                    <button onclick="showNewAssessmentForm()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <i class="fas fa-plus mr-2"></i><span data-i18n="assessments.new">New Assessment</span>
                    </button>
                </div>
                <div id="assessments-list" class="space-y-4"></div>
            </div>
            
            <!-- Assessment Detail -->
            <div id="assessment-detail" class="hidden"></div>
        </div>

        <!-- Frameworks View -->
        <div id="frameworks-view" class="view-container hidden">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-sitemap text-purple-600 mr-2"></i>
                    <span data-i18n="frameworks.title">Security Frameworks & Mappings</span>
                </h2>
                <div id="frameworks-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            </div>
        </div>

        <!-- Reports View -->
        <div id="reports-view" class="view-container hidden">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-chart-bar text-orange-600 mr-2"></i>
                    <span data-i18n="reports.title">Reports & Analytics</span>
                </h2>
                
                <!-- Report Type Selection -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <!-- Individual Assessment Report -->
                    <div class="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer" onclick="showReportType('individual')">
                        <div class="flex items-center justify-center mb-4">
                            <i class="fas fa-file-pdf text-5xl text-blue-600"></i>
                        </div>
                        <h3 class="text-lg font-bold text-center mb-2" data-i18n="reports.individual_title">Individual Report</h3>
                        <p class="text-sm text-gray-600 text-center" data-i18n="reports.individual_desc">Export PDF report for a single assessment</p>
                    </div>
                    
                    <!-- Assessment Comparison -->
                    <div class="border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer" onclick="showReportType('comparison')">
                        <div class="flex items-center justify-center mb-4">
                            <i class="fas fa-chart-line text-5xl text-purple-600"></i>
                        </div>
                        <h3 class="text-lg font-bold text-center mb-2" data-i18n="reports.comparison_title">Compare Assessments</h3>
                        <p class="text-sm text-gray-600 text-center" data-i18n="reports.comparison_desc">Compare multiple assessments with radar charts</p>
                    </div>
                    
                    <!-- Multi-Organization Comparison (Admin Only) -->
                    <div class="admin-only border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer hidden" onclick="showReportType('multi-org')">
                        <div class="flex items-center justify-center mb-4">
                            <i class="fas fa-building text-5xl text-red-600"></i>
                        </div>
                        <h3 class="text-lg font-bold text-center mb-2" data-i18n="reports.multi_org_title">Multi-Organization</h3>
                        <p class="text-sm text-gray-600 text-center" data-i18n="reports.multi_org_desc">Compare assessments across organizations</p>
                    </div>
                </div>
                
                <!-- Report Content Area -->
                <div id="report-content" class="hidden">
                    <!-- Dynamic content will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Organizations View -->
        <div id="organizations-view" class="view-container hidden">
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-building text-green-600 mr-2"></i>
                        <span data-i18n="organizations.title">Organizations</span>
                    </h2>
                    <button onclick="showNewOrgForm()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        <i class="fas fa-plus mr-2"></i><span data-i18n="organizations.new">New Organization</span>
                    </button>
                </div>
                <div id="organizations-list" class="space-y-4"></div>
            </div>
        </div>

        <!-- Users View (Admin Only) -->
        <div id="users-view" class="view-container hidden">
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-users text-indigo-600 mr-2"></i>
                        <span data-i18n="users.title">User Management</span>
                    </h2>
                    <button onclick="showNewUserForm()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        <i class="fas fa-user-plus mr-2"></i><span data-i18n="users.new">New User</span>
                    </button>
                </div>
                <div id="users-list" class="space-y-4"></div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
    <script src="/static/i18n.js"></script>
    <script src="/static/auth-ui.js"></script>
    <script src="/static/app.js"></script>
    <script src="/static/reports.js"></script>
    <script>
        // Initialize application on page load
        document.addEventListener('DOMContentLoaded', async () => {
            await i18n.init();
            await initAuth();
            
            // If authenticated, load initial data
            if (window.authState.isAuthenticated && window.init) {
                await window.init();
            }
        });
    </script>
</body>
</html>
  `)
})

export default app
