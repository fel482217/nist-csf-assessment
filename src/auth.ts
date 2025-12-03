import { Context } from 'hono'
import type { Bindings, User, UserRole } from './types'

// Simple password hashing (in production, use bcrypt)
// For now, we'll use a basic implementation
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or similar
  // For now, using a simple base64 encoding (NOT SECURE - just for demo)
  return btoa(password)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // In production, use bcrypt.compare
  // For now, simple comparison
  return btoa(password) === hash
}

// Generate session token
export function generateToken(): string {
  // Generate a random token (UUID-like)
  return crypto.randomUUID()
}

// Middleware: Require authentication
export async function requireAuth(c: Context<{ Bindings: Bindings }>, next: Function) {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401)
  }
  
  const token = authHeader.substring(7)
  
  // Verify token in database
  const { results } = await c.env.DB.prepare(`
    SELECT s.*, u.id as user_id, u.email, u.name, u.role, u.is_active
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).bind(token).all()
  
  if (!results || results.length === 0) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401)
  }
  
  const session = results[0] as any
  
  if (!session.is_active) {
    return c.json({ error: 'Unauthorized: User account is disabled' }, 401)
  }
  
  // Attach user to context
  c.set('user', {
    id: session.user_id,
    email: session.email,
    name: session.name,
    role: session.role,
    is_active: session.is_active
  } as User)
  
  await next()
}

// Middleware: Require admin role
export async function requireAdmin(c: Context<{ Bindings: Bindings }>, next: Function) {
  const user = c.get('user') as User
  
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Forbidden: Admin access required' }, 403)
  }
  
  await next()
}

// Middleware: Require specific role
export function requireRole(role: UserRole) {
  return async (c: Context<{ Bindings: Bindings }>, next: Function) => {
    const user = c.get('user') as User
    
    if (!user || user.role !== role) {
      return c.json({ error: `Forbidden: ${role} role required` }, 403)
    }
    
    await next()
  }
}

// Get current user from context
export function getCurrentUser(c: Context<{ Bindings: Bindings }>): User | null {
  return c.get('user') as User || null
}
