import { Hono } from 'hono'
import type { Bindings, LoginRequest, RegisterRequest, AuthResponse, User } from './types'
import { hashPassword, verifyPassword, generateToken } from './auth'

const authRoutes = new Hono<{ Bindings: Bindings }>()

// ===================
// POST /api/auth/register - Register new user
// ===================
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json() as any
    const { email, password, name, organization_id } = body
    
    // Validation
    if (!email || !password || !name || !organization_id) {
      return c.json({ error: 'Email, password, name, and organization are required' }, 400)
    }
    
    if (password.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters' }, 400)
    }
    
    // Check if user already exists
    const { results: existingUsers } = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).all()
    
    if (existingUsers && existingUsers.length > 0) {
      return c.json({ error: 'Email already registered' }, 409)
    }
    
    // Verify organization exists
    const { results: organizations } = await c.env.DB.prepare(
      'SELECT id FROM organizations WHERE id = ?'
    ).bind(organization_id).all()
    
    if (!organizations || organizations.length === 0) {
      return c.json({ error: 'Invalid organization' }, 400)
    }
    
    // Hash password
    const passwordHash = await hashPassword(password)
    
    // Create user (default role: 'user', is_approved: 0 - pending approval)
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, password_hash, name, role, organization_id, is_approved) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(email, passwordHash, name, 'user', organization_id, 0).run()
    
    const userId = result.meta.last_row_id
    
    // DO NOT create session - user needs approval first
    // Return success message indicating pending approval
    return c.json({ 
      message: 'Registration successful! Your account is pending administrator approval.',
      pending_approval: true 
    }, 201)
  } catch (error: any) {
    console.error('Registration error:', error)
    return c.json({ error: 'Registration failed', details: error.message }, 500)
  }
})

// ===================
// POST /api/auth/login - Login user
// ===================
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json() as LoginRequest
    const { email, password } = body
    
    // Validation
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400)
    }
    
    // Find user
    const { results: users } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).all()
    
    if (!users || users.length === 0) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    
    const user = users[0] as any
    
    // Check if user is active
    if (!user.is_active) {
      return c.json({ error: 'Account is disabled' }, 403)
    }
    
    // Check if user is approved (regular users only, admins bypass)
    if (user.role !== 'admin' && !user.is_approved) {
      return c.json({ error: 'Account is pending approval. Please contact an administrator.' }, 403)
    }
    
    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)
    
    if (!isValid) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    
    // Create session
    const token = generateToken()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    
    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)'
    ).bind(crypto.randomUUID(), user.id, token, expiresAt).run()
    
    // Return user (without password) and token
    const responseUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      organization_id: user.organization_id,
      is_approved: user.is_approved,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
    
    const response: AuthResponse = {
      user: responseUser,
      token,
      expires_at: expiresAt
    }
    
    return c.json(response, 200)
  } catch (error: any) {
    console.error('Login error:', error)
    return c.json({ error: 'Login failed', details: error.message }, 500)
  }
})

// ===================
// POST /api/auth/logout - Logout user
// ===================
authRoutes.post('/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 400)
    }
    
    const token = authHeader.substring(7)
    
    // Delete session
    await c.env.DB.prepare(
      'DELETE FROM sessions WHERE token = ?'
    ).bind(token).run()
    
    return c.json({ message: 'Logged out successfully' }, 200)
  } catch (error: any) {
    console.error('Logout error:', error)
    return c.json({ error: 'Logout failed', details: error.message }, 500)
  }
})

// ===================
// GET /api/auth/me - Get current user
// ===================
authRoutes.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const token = authHeader.substring(7)
    
    // Get user from session
    const { results } = await c.env.DB.prepare(`
      SELECT u.id, u.email, u.name, u.role, u.is_active, u.organization_id, u.is_approved, u.created_at, u.updated_at
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > datetime('now')
    `).bind(token).all()
    
    if (!results || results.length === 0) {
      return c.json({ error: 'Invalid or expired token' }, 401)
    }
    
    return c.json(results[0], 200)
  } catch (error: any) {
    console.error('Get current user error:', error)
    return c.json({ error: 'Failed to get user', details: error.message }, 500)
  }
})

export default authRoutes
