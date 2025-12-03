// Authentication UI and State Management

// Global auth state
window.authState = {
  user: null,
  token: null,
  isAuthenticated: false
}

// Initialize authentication
async function initAuth() {
  const token = localStorage.getItem('auth_token')
  
  if (token) {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      window.authState = {
        user: response.data,
        token: token,
        isAuthenticated: true
      }
      
      updateAuthUI()
      return true
    } catch (error) {
      console.error('Token validation failed:', error)
      logout()
      return false
    }
  }
  
  updateAuthUI()
  return false
}

// Update UI based on auth state
function updateAuthUI() {
  const { isAuthenticated, user } = window.authState
  const userInfo = document.getElementById('user-info')
  const authButtons = document.getElementById('auth-buttons')
  const loginView = document.getElementById('login-view')
  
  if (isAuthenticated && user) {
    // Show user info
    userInfo.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <p class="text-sm font-medium">${user.name}</p>
          <p class="text-xs text-blue-200">${user.role === 'admin' ? i18n.t('auth.role_admin') : i18n.t('auth.role_user')}</p>
        </div>
        <button onclick="logout()" class="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-sm">
          <i class="fas fa-sign-out-alt mr-1"></i><span data-i18n="nav.logout">Logout</span>
        </button>
      </div>
    `
    userInfo.classList.remove('hidden')
    authButtons.classList.add('hidden')
    loginView?.classList.add('hidden')
    
    // Show/hide admin-only buttons
    const adminButtons = document.querySelectorAll('.admin-only')
    adminButtons.forEach(btn => {
      if (user.role === 'admin') {
        btn.classList.remove('hidden')
      } else {
        btn.classList.add('hidden')
      }
    })
    
    // Show main content
    document.getElementById('main-content')?.classList.remove('hidden')
  } else {
    // Show login/register buttons
    userInfo.classList.add('hidden')
    authButtons.classList.remove('hidden')
    authButtons.innerHTML = `
      <button onclick="showLoginForm()" class="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 transition">
        <i class="fas fa-sign-in-alt mr-2"></i><span data-i18n="nav.login">Login</span>
      </button>
      <button onclick="showRegisterForm()" class="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">
        <i class="fas fa-user-plus mr-2"></i><span data-i18n="nav.register">Register</span>
      </button>
    `
    
    // Hide main content
    document.getElementById('main-content')?.classList.add('hidden')
    
    // Show login form by default
    if (!loginView || loginView.classList.contains('hidden')) {
      showLoginForm()
    }
  }
  
  // Re-translate new elements
  if (window.i18n && window.i18n.translatePage) {
    window.i18n.translatePage()
  }
}

// Show login form
function showLoginForm() {
  const loginView = document.getElementById('login-view')
  loginView.innerHTML = `
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
        <span data-i18n="auth.login_title">Login to CSP</span>
      </h2>
      
      <form onsubmit="handleLogin(event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="auth.email">Email Address</label>
          <input type="email" id="login-email" required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="admin@csp.com">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="auth.password">Password</label>
          <input type="password" id="login-password" required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••">
        </div>
        
        <div id="login-error" class="hidden text-red-600 text-sm"></div>
        
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          <i class="fas fa-sign-in-alt mr-2"></i><span data-i18n="auth.login_button">Login</span>
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">
          <span data-i18n="auth.no_account">Don't have an account?</span>
          <button onclick="showRegisterForm()" class="text-blue-600 hover:underline ml-1" data-i18n="auth.register_link">Register here</button>
        </p>
      </div>
    </div>
  `
  loginView.classList.remove('hidden')
  
  // Translate new content
  if (window.i18n && window.i18n.translatePage) {
    window.i18n.translatePage()
  }
}

// Show register form
function showRegisterForm() {
  const loginView = document.getElementById('login-view')
  loginView.innerHTML = `
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i class="fas fa-user-plus text-green-600 mr-2"></i>
        <span data-i18n="auth.register_title">Register New Account</span>
      </h2>
      
      <form onsubmit="handleRegister(event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="auth.name">Full Name</label>
          <input type="text" id="register-name" required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="John Doe">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="auth.email">Email Address</label>
          <input type="email" id="register-email" required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="john@example.com">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="auth.password">Password</label>
          <input type="password" id="register-password" required minlength="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="••••••••">
          <p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
        </div>
        
        <div id="register-error" class="hidden text-red-600 text-sm"></div>
        
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
          <i class="fas fa-user-plus mr-2"></i><span data-i18n="auth.register_button">Create Account</span>
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">
          <span data-i18n="auth.have_account">Already have an account?</span>
          <button onclick="showLoginForm()" class="text-blue-600 hover:underline ml-1" data-i18n="auth.login_link">Login here</button>
        </p>
      </div>
    </div>
  `
  loginView.classList.remove('hidden')
  
  // Translate new content
  if (window.i18n && window.i18n.translatePage) {
    window.i18n.translatePage()
  }
}

// Handle login
async function handleLogin(event) {
  event.preventDefault()
  
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  const errorDiv = document.getElementById('login-error')
  
  try {
    const response = await axios.post('/api/auth/login', { email, password })
    
    // Store token
    localStorage.setItem('auth_token', response.data.token)
    
    // Update state
    window.authState = {
      user: response.data.user,
      token: response.data.token,
      isAuthenticated: true
    }
    
    // Update UI
    updateAuthUI()
    
    // Load initial data
    if (window.init) {
      await window.init()
    }
    
    // Show success message
    showNotification('Login successful!', 'success')
  } catch (error) {
    console.error('Login error:', error)
    errorDiv.textContent = error.response?.data?.error || 'Login failed. Please try again.'
    errorDiv.classList.remove('hidden')
  }
}

// Handle register
async function handleRegister(event) {
  event.preventDefault()
  
  const name = document.getElementById('register-name').value
  const email = document.getElementById('register-email').value
  const password = document.getElementById('register-password').value
  const errorDiv = document.getElementById('register-error')
  
  try {
    const response = await axios.post('/api/auth/register', { name, email, password })
    
    // Store token
    localStorage.setItem('auth_token', response.data.token)
    
    // Update state
    window.authState = {
      user: response.data.user,
      token: response.data.token,
      isAuthenticated: true
    }
    
    // Update UI
    updateAuthUI()
    
    // Load initial data
    if (window.init) {
      await window.init()
    }
    
    // Show success message
    showNotification('Account created successfully!', 'success')
  } catch (error) {
    console.error('Registration error:', error)
    errorDiv.textContent = error.response?.data?.error || 'Registration failed. Please try again.'
    errorDiv.classList.remove('hidden')
  }
}

// Logout
function logout() {
  if (!confirm(i18n.t('auth.logout_confirm'))) {
    return
  }
  
  const token = localStorage.getItem('auth_token')
  
  if (token) {
    // Call logout endpoint (fire and forget)
    axios.post('/api/auth/logout', {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).catch(err => console.error('Logout API error:', err))
  }
  
  // Clear local state
  localStorage.removeItem('auth_token')
  window.authState = {
    user: null,
    token: null,
    isAuthenticated: false
  }
  
  // Update UI
  updateAuthUI()
  
  showNotification('Logged out successfully', 'info')
}

// Add Authorization header to all axios requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses (expired token)
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      logout()
    }
    return Promise.reject(error)
  }
)
