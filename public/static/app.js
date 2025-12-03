// NIST CSF 2.0 Assessment Manager - Frontend Application

// Global state
let currentView = 'assessments';
let currentAssessment = null;
let organizations = [];
let frameworks = [];
let csfFunctions = [];

// Initialize app (called after authentication is ready)
window.init = async function() {
    await loadInitialData();
    showView('assessments');
}

// Load initial data
async function loadInitialData() {
    try {
        const lang = i18n ? i18n.getLanguage() : 'en';
        const [orgsResponse, frameworksResponse, functionsResponse] = await Promise.all([
            axios.get('/api/organizations'),
            axios.get('/api/frameworks'),
            axios.get(`/api/csf/functions?lang=${lang}`)
        ]);
        
        organizations = orgsResponse.data;
        frameworks = frameworksResponse.data;
        csfFunctions = functionsResponse.data;
    } catch (error) {
        console.error('Error loading initial data:', error);
        showNotification('Error loading data', 'error');
    }
}

// View management
function showView(viewName) {
    currentView = viewName;
    
    // Hide all views
    document.querySelectorAll('.view-container').forEach(el => el.classList.add('hidden'));
    
    // Show selected view
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    
    // Load view data
    switch(viewName) {
        case 'assessments':
            loadAssessments();
            break;
        case 'frameworks':
            loadFrameworks();
            break;
        case 'reports':
            loadReports();
            break;
        case 'organizations':
            loadOrganizations();
            break;
        case 'users':
            loadUsers();
            break;
    }
}

// ===================
// Assessments Functions
// ===================

async function loadAssessments() {
    try {
        const response = await axios.get('/api/assessments');
        const assessments = response.data;
        
        const container = document.getElementById('assessments-list');
        
        if (assessments.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-clipboard-list text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="assessments.empty">No assessments yet. Create your first one!</p>
                </div>
            `;
            i18n.updatePageLanguage();
            return;
        }
        
        const isAdmin = window.authState && window.authState.user && window.authState.user.role === 'admin';
        
        container.innerHTML = assessments.map(assessment => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div class="flex justify-between items-start">
                    <div class="flex-1 cursor-pointer" onclick="viewAssessmentDetail(${assessment.id})">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-lg font-semibold text-gray-800">${assessment.name}</h3>
                            <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                ${assessment.framework_name || 'NIST CSF 2.0'}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">
                            <i class="fas fa-building mr-1"></i>${assessment.organization_name}
                        </p>
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-calendar mr-1"></i>${new Date(assessment.assessment_date).toLocaleDateString()}
                            ${assessment.assessor_name ? `<span class="ml-3"><i class="fas fa-user mr-1"></i>${assessment.assessor_name}</span>` : ''}
                        </p>
                        ${assessment.description ? `<p class="text-sm text-gray-500 mt-2">${assessment.description}</p>` : ''}
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assessment.status)}">
                            ${getStatusLabel(assessment.status)}
                        </span>
                        ${isAdmin ? `
                        <button onclick="event.stopPropagation(); deleteAssessment(${assessment.id}, '${assessment.name.replace(/'/g, "\\'")}')" 
                                class="admin-only px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center gap-1">
                            <i class="fas fa-trash"></i>
                            <span data-i18n="assessments.delete">Delete</span>
                        </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-translate new elements
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
    } catch (error) {
        console.error('Error loading assessments:', error);
        showNotification('Error loading assessments', 'error');
    }
}

function getStatusColor(status) {
    const colors = {
        'draft': 'bg-gray-200 text-gray-700',
        'in_progress': 'bg-blue-200 text-blue-700',
        'completed': 'bg-green-200 text-green-700',
        'archived': 'bg-yellow-200 text-yellow-700'
    };
    return colors[status] || 'bg-gray-200 text-gray-700';
}

function getStatusLabel(status) {
    return i18n.t(`status.${status}`, status.replace('_', ' ').toUpperCase());
}

function showNewAssessmentForm() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4" data-i18n="assessments.new">Create New Assessment</h3>
            <form id="new-assessment-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="assessments.organization">Organization</label>
                    <select id="org-select" class="w-full border border-gray-300 rounded px-3 py-2" required>
                        <option value="">Select organization...</option>
                        ${organizations.map(org => `<option value="${org.id}">${org.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="assessments.name">Assessment Name</label>
                    <input type="text" id="assessment-name" class="w-full border border-gray-300 rounded px-3 py-2" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="assessments.date">Assessment Date</label>
                    <input type="date" id="assessment-date" class="w-full border border-gray-300 rounded px-3 py-2" 
                           value="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="assessments.assessor">Assessor Name</label>
                    <input type="text" id="assessor-name" class="w-full border border-gray-300 rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="assessments.description">Description</label>
                    <textarea id="assessment-desc" class="w-full border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        <span data-i18n="assessments.create">Create</span>
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                        <span data-i18n="assessments.cancel">Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    i18n.updatePageLanguage();
    
    document.getElementById('new-assessment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Find NIST CSF 2.0 framework ID (default framework)
        const nistFramework = frameworks.find(fw => fw.code === 'NIST-CSF') || frameworks[0];
        
        const data = {
            organization_id: parseInt(document.getElementById('org-select').value),
            framework_id: nistFramework ? nistFramework.id : 7, // Default to NIST CSF (ID 7)
            name: document.getElementById('assessment-name').value,
            assessment_date: document.getElementById('assessment-date').value,
            assessor_name: document.getElementById('assessor-name').value || null,
            description: document.getElementById('assessment-desc').value || null
        };
        
        try {
            await axios.post('/api/assessments', data);
            modal.remove();
            showNotification('Assessment created successfully', 'success');
            loadAssessments();
        } catch (error) {
            console.error('Error creating assessment:', error);
            showNotification('Error creating assessment', 'error');
        }
    });
}

async function viewAssessmentDetail(assessmentId) {
    try {
        const lang = i18n ? i18n.getLanguage() : 'en';
        const [assessmentResponse, responsesResponse, statsResponse, subcategoriesResponse] = await Promise.all([
            axios.get(`/api/assessments/${assessmentId}`),
            axios.get(`/api/assessments/${assessmentId}/responses`),
            axios.get(`/api/assessments/${assessmentId}/statistics`),
            axios.get(`/api/csf/subcategories?lang=${lang}`)
        ]);
        
        currentAssessment = assessmentResponse.data;
        const responses = responsesResponse.data;
        const stats = statsResponse.data;
        const subcategories = subcategoriesResponse.data;
        
        // Create response map for quick lookup
        const responseMap = {};
        responses.forEach(r => {
            responseMap[r.csf_subcategory_id] = r;
        });
        
        const detailContainer = document.getElementById('assessment-detail');
        const assessmentsList = document.getElementById('assessments-list');
        const isAdmin = window.authState && window.authState.user && window.authState.user.role === 'admin';
        const isCompleted = currentAssessment.status === 'completed';
        
        // Hide assessments list when viewing detail
        assessmentsList.classList.add('hidden');
        detailContainer.classList.remove('hidden');
        
        detailContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <button onclick="closeAssessmentDetail()" class="text-blue-600 hover:text-blue-800 mb-2 flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i>
                            <span data-i18n="assessments.back_to_list">Back to List</span>
                        </button>
                        <h2 class="text-2xl font-bold text-gray-800">${currentAssessment.name}</h2>
                        <p class="text-gray-600 mt-1">
                            <i class="fas fa-building mr-1"></i>${currentAssessment.organization_name} | 
                            <i class="fas fa-calendar mr-1"></i>${new Date(currentAssessment.assessment_date).toLocaleDateString()}
                        </p>
                        ${isCompleted ? `
                            <div class="mt-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                                <i class="fas fa-lock text-yellow-600 mr-2"></i>
                                <span class="text-sm text-yellow-700" data-i18n="assessments.read_only">This assessment is completed and cannot be edited</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentAssessment.status)}">
                            ${getStatusLabel(currentAssessment.status)}
                        </span>
                        ${!isCompleted ? `
                            <button onclick="submitAssessment()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm flex items-center gap-2">
                                <i class="fas fa-check-circle"></i>
                                <span data-i18n="assessments.submit_assessment">Submit Assessment</span>
                            </button>
                        ` : isAdmin ? `
                            <button onclick="reopenAssessment()" class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm flex items-center gap-2">
                                <i class="fas fa-unlock"></i>
                                <span data-i18n="assessments.reopen">Reopen Assessment</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="text-sm text-blue-600 font-medium">Completion</div>
                        <div class="text-2xl font-bold text-blue-900">${stats.completion_percentage}%</div>
                        <div class="text-xs text-gray-600">${stats.assessed_subcategories} / ${stats.total_subcategories}</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <div class="text-sm text-green-600 font-medium">Avg Maturity</div>
                        <div class="text-2xl font-bold text-green-900">${stats.average_maturity}</div>
                        <div class="text-xs text-gray-600">Out of 4.0</div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                        <div class="text-sm text-purple-600 font-medium">Functions</div>
                        <div class="text-2xl font-bold text-purple-900">${csfFunctions.length}</div>
                        <div class="text-xs text-gray-600">NIST CSF 2.0</div>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4">
                        <div class="text-sm text-orange-600 font-medium">Status</div>
                        <div class="text-2xl font-bold text-orange-900">${currentAssessment.status}</div>
                        <div class="text-xs text-gray-600">Current state</div>
                    </div>
                </div>
                
                <!-- Maturity by Function Chart -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">Maturity Level by Function</h3>
                    <canvas id="maturity-chart" height="80"></canvas>
                </div>
                
                <!-- CSF Functions Tabs -->
                <div class="mb-4">
                    <div class="flex space-x-2 border-b">
                        ${csfFunctions.map((func, idx) => `
                            <button onclick="showFunction('${func.id}')" 
                                    class="function-tab px-4 py-2 font-medium transition ${idx === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}"
                                    data-function="${func.id}">
                                ${func.id}: ${func.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Subcategories List -->
                <div id="subcategories-container"></div>
            </div>
        `;
        
        // Render maturity chart
        renderMaturityChart(stats);
        
        // Show first function by default
        if (csfFunctions.length > 0) {
            await showFunction(csfFunctions[0].id);
        }
        
        // Scroll to detail
        detailContainer.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading assessment detail:', error);
        showNotification('Error loading assessment details', 'error');
    }
}

function renderMaturityChart(stats) {
    const ctx = document.getElementById('maturity-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.by_function.map(f => f.function_name),
            datasets: [{
                label: 'Average Maturity Level',
                data: stats.by_function.map(f => f.average_maturity),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

async function showFunction(functionId) {
    // Update tab styling
    document.querySelectorAll('.function-tab').forEach(tab => {
        if (tab.dataset.function === functionId) {
            tab.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
            tab.classList.remove('text-gray-600');
        } else {
            tab.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
            tab.classList.add('text-gray-600');
        }
    });
    
    try {
        const [subcategoriesResponse, responsesResponse] = await Promise.all([
            axios.get(`/api/csf/subcategories?function_id=${functionId}`),
            axios.get(`/api/assessments/${currentAssessment.id}/responses?function_id=${functionId}`)
        ]);
        
        const subcategories = subcategoriesResponse.data;
        const responses = responsesResponse.data;
        
        // Create response map
        const responseMap = {};
        responses.forEach(r => {
            responseMap[r.csf_subcategory_id] = r;
        });
        
        // Group by category
        const categories = {};
        subcategories.forEach(sub => {
            if (!categories[sub.category_id]) {
                categories[sub.category_id] = {
                    id: sub.category_id,
                    name: sub.category_name,
                    subcategories: []
                };
            }
            categories[sub.category_id].subcategories.push(sub);
        });
        
        const container = document.getElementById('subcategories-container');
        container.innerHTML = Object.values(categories).map(category => `
            <div class="mb-6">
                <h4 class="text-md font-semibold text-gray-800 mb-3 bg-gray-100 px-3 py-2 rounded">
                    ${category.id}: ${category.name}
                </h4>
                <div class="space-y-3">
                    ${category.subcategories.map(sub => {
                        const response = responseMap[sub.id];
                        const maturity = response ? response.maturity_level : 0;
                        const status = response ? response.implementation_status : 'not_implemented';
                        const isCompleted = currentAssessment.status === 'completed';
                        
                        return `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition ${isCompleted ? 'bg-gray-50' : ''}">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex-1">
                                        <h5 class="font-medium text-gray-900">${sub.id}: ${sub.name}</h5>
                                        <p class="text-sm text-gray-600 mt-1">${sub.description}</p>
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1" data-i18n="evaluation.maturity_level">Maturity Level</label>
                                        <select class="w-full border border-gray-300 rounded px-2 py-1 text-sm ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}"
                                                onchange="updateResponse('${sub.id}', 'maturity_level', this.value)"
                                                ${isCompleted ? 'disabled' : ''}>
                                            ${[0,1,2,3,4].map(level => `
                                                <option value="${level}" ${maturity === level ? 'selected' : ''}>
                                                    ${getMaturityLabel(level)}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">Implementation Status</label>
                                        <select class="w-full border border-gray-300 rounded px-2 py-1 text-sm ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}"
                                                onchange="updateResponse('${sub.id}', 'implementation_status', this.value)"
                                                ${isCompleted ? 'disabled' : ''}>
                                            <option value="not_implemented" ${status === 'not_implemented' ? 'selected' : ''}>Not Implemented</option>
                                            <option value="partially_implemented" ${status === 'partially_implemented' ? 'selected' : ''}>Partially Implemented</option>
                                            <option value="implemented" ${status === 'implemented' ? 'selected' : ''}>Implemented</option>
                                            <option value="not_applicable" ${status === 'not_applicable' ? 'selected' : ''}>Not Applicable</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <button onclick="${isCompleted ? '' : `showResponseDetail('${sub.id}')`}" 
                                            class="text-sm ${isCompleted ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}"
                                            ${isCompleted ? 'disabled' : ''}>
                                        <i class="fas fa-${isCompleted ? 'eye' : 'edit'} mr-1"></i>${isCompleted ? 'View details' : 'Add notes, evidence & recommendations'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading function data:', error);
        showNotification('Error loading subcategories', 'error');
    }
}

function getMaturityLabel(level) {
    // NIST CSF 2.0 Official Tiers
    const key = `maturity.tier_${level}`;
    return i18n ? i18n.t(key) : {
        0: 'Not Assessed',
        1: 'Tier 1 - Partial',
        2: 'Tier 2 - Risk Informed',
        3: 'Tier 3 - Repeatable',
        4: 'Tier 4 - Adaptive'
    }[level] || 'Unknown';
}

async function updateResponse(subcategoryId, field, value) {
    try {
        // Check if assessment is completed
        if (currentAssessment.status === 'completed') {
            showNotification(i18n.t('assessments.read_only'), 'error');
            return;
        }
        
        // Check if response exists
        const existingResponses = await axios.get(`/api/assessments/${currentAssessment.id}/responses`);
        const existing = existingResponses.data.find(r => r.csf_subcategory_id === subcategoryId);
        
        if (existing) {
            // Update existing response
            await axios.put(`/api/responses/${existing.id}`, {
                [field]: field === 'maturity_level' ? parseInt(value) : value
            });
        } else {
            // Create new response
            await axios.post('/api/responses', {
                assessment_id: currentAssessment.id,
                csf_subcategory_id: subcategoryId,
                maturity_level: field === 'maturity_level' ? parseInt(value) : 0,
                implementation_status: field === 'implementation_status' ? value : 'not_implemented'
            });
            
            // Auto-update status from 'draft' to 'in_progress' on first response
            if (currentAssessment.status === 'draft') {
                await axios.put(`/api/assessments/${currentAssessment.id}`, {
                    status: 'in_progress'
                });
                currentAssessment.status = 'in_progress';
                // Update status badge in UI
                const statusBadge = document.querySelector('.rounded-full.font-medium');
                if (statusBadge) {
                    statusBadge.className = `px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('in_progress')}`;
                    statusBadge.textContent = getStatusLabel('in_progress');
                }
            }
        }
        
        showNotification('Response updated', 'success');
        
        // Refresh statistics
        const statsResponse = await axios.get(`/api/assessments/${currentAssessment.id}/statistics`);
        updateStatisticsDisplay(statsResponse.data);
        
    } catch (error) {
        console.error('Error updating response:', error);
        showNotification('Error updating response', 'error');
    }
}

async function showResponseDetail(subcategoryId) {
    try {
        // Get current response data
        const response = await axios.get(`/api/assessments/${currentAssessment.id}/responses`);
        const responses = response.data;
        const currentResponse = responses.find(r => r.csf_subcategory_id === subcategoryId) || {};
        
        // Get subcategory info
        const lang = i18n ? i18n.getLanguage() : 'en';
        const subResponse = await axios.get(`/api/csf/subcategories?lang=${lang}`);
        const subcategory = subResponse.data.find(s => s.id === subcategoryId);
        
        if (!subcategory) {
            showNotification('Subcategory not found', 'error');
            return;
        }
        
        // Get users for control owner selector (only from same organization for regular users)
        let users = [];
        try {
            const usersResponse = await axios.get('/api/users');
            users = usersResponse.data.filter(u => u.is_approved && u.is_active);
        } catch (error) {
            // Non-admin users won't have access to /api/users
            // Try to get organization users via a different endpoint if needed
            console.log('Could not fetch users for control owner selector');
        }
        
        const isCompleted = currentAssessment.status === 'completed';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full mx-auto my-8">
                <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-900">${subcategory.identifier}: ${subcategory.name}</h3>
                            <p class="text-sm text-gray-600 mt-1">${subcategory.description}</p>
                        </div>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 ml-4">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>
                
                <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    <form id="response-detail-form" class="space-y-4">
                        <!-- Control Owner -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-user-shield mr-1 text-indigo-600"></i>
                                <span data-i18n="evaluation.control_owner">Control Owner</span>
                            </label>
                            <select id="control-owner" 
                                    class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                    ${isCompleted ? 'disabled' : ''}>
                                <option value="">-- Select Control Owner --</option>
                                ${users.map(user => `
                                    <option value="${user.id}" ${currentResponse.control_owner_id === user.id ? 'selected' : ''}>
                                        ${user.name}${user.organization_name ? ' (' + user.organization_name + ')' : ''}
                                    </option>
                                `).join('')}
                            </select>
                            <p class="text-xs text-gray-500 mt-1" data-i18n="evaluation.control_owner_hint">Person responsible for implementing and maintaining this control</p>
                        </div>
                        
                        <!-- Notes -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-sticky-note mr-1 text-yellow-600"></i>
                                <span data-i18n="evaluation.notes">Notes</span>
                            </label>
                            <textarea id="response-notes" 
                                      rows="3" 
                                      class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                      placeholder="General notes about the control implementation..."
                                      ${isCompleted ? 'disabled' : ''}>${currentResponse.notes || ''}</textarea>
                        </div>
                        
                        <!-- Evidence -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-file-alt mr-1 text-blue-600"></i>
                                <span data-i18n="evaluation.evidence">Evidence</span>
                            </label>
                            <textarea id="response-evidence" 
                                      rows="3" 
                                      class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                      placeholder="Documentation, artifacts, or proof of control implementation..."
                                      ${isCompleted ? 'disabled' : ''}>${currentResponse.evidence || ''}</textarea>
                        </div>
                        
                        <!-- Gaps -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-exclamation-triangle mr-1 text-orange-600"></i>
                                <span data-i18n="evaluation.gaps">Gaps</span>
                            </label>
                            <textarea id="response-gaps" 
                                      rows="3" 
                                      class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                      placeholder="Identified gaps or weaknesses in the control..."
                                      ${isCompleted ? 'disabled' : ''}>${currentResponse.gaps || ''}</textarea>
                        </div>
                        
                        <!-- Action Plan -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-tasks mr-1 text-purple-600"></i>
                                <span data-i18n="evaluation.action_plan">Action Plan</span>
                            </label>
                            <textarea id="response-action-plan" 
                                      rows="3" 
                                      class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                      placeholder="Planned actions to address gaps and improve the control..."
                                      ${isCompleted ? 'disabled' : ''}>${currentResponse.action_plan || ''}</textarea>
                        </div>
                        
                        <!-- Recommendations -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-lightbulb mr-1 text-green-600"></i>
                                <span data-i18n="evaluation.recommendations">Recommendations</span>
                            </label>
                            <textarea id="response-recommendations" 
                                      rows="3" 
                                      class="w-full border border-gray-300 rounded-lg px-3 py-2 ${isCompleted ? 'bg-gray-100 cursor-not-allowed' : ''}" 
                                      placeholder="Recommendations for improving control effectiveness..."
                                      ${isCompleted ? 'disabled' : ''}>${currentResponse.recommendations || ''}</textarea>
                        </div>
                    </form>
                </div>
                
                <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
                    <button onclick="this.closest('.fixed').remove()" 
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                        <i class="fas fa-times mr-2"></i>
                        <span data-i18n="common.cancel">Cancel</span>
                    </button>
                    ${!isCompleted ? `
                        <button onclick="saveResponseDetail('${subcategoryId}')" 
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-save mr-2"></i>
                            <span data-i18n="common.save">Save</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Translate modal content
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
        
    } catch (error) {
        console.error('Error showing response detail:', error);
        showNotification('Error loading response details', 'error');
    }
}

async function saveResponseDetail(subcategoryId) {
    try {
        const controlOwner = document.getElementById('control-owner').value;
        const notes = document.getElementById('response-notes').value;
        const evidence = document.getElementById('response-evidence').value;
        const gaps = document.getElementById('response-gaps').value;
        const actionPlan = document.getElementById('response-action-plan').value;
        const recommendations = document.getElementById('response-recommendations').value;
        
        // Get current response to check if it exists
        const response = await axios.get(`/api/assessments/${currentAssessment.id}/responses`);
        const responses = response.data;
        const existingResponse = responses.find(r => r.csf_subcategory_id === subcategoryId);
        
        const data = {
            csf_subcategory_id: subcategoryId,
            control_owner_id: controlOwner ? parseInt(controlOwner) : null,
            notes: notes || null,
            evidence: evidence || null,
            gaps: gaps || null,
            action_plan: actionPlan || null,
            recommendations: recommendations || null
        };
        
        if (existingResponse) {
            // Update existing response
            await axios.put(`/api/responses/${existingResponse.id}`, data);
        } else {
            // Create new response with default maturity level
            data.assessment_id = currentAssessment.id;
            data.maturity_level = 0;
            data.implementation_status = 'not_implemented';
            await axios.post(`/api/assessments/${currentAssessment.id}/responses`, data);
        }
        
        showNotification('Response details saved successfully', 'success');
        
        // Close modal
        document.querySelector('.fixed.inset-0').remove();
        
        // Refresh the current function view
        const activeBtn = document.querySelector('.function-btn.bg-blue-600');
        if (activeBtn) {
            const functionId = activeBtn.getAttribute('onclick').match(/\d+/)[0];
            showFunction(parseInt(functionId));
        }
        
    } catch (error) {
        console.error('Error saving response detail:', error);
        showNotification('Error saving response details', 'error');
    }
}

function updateStatisticsDisplay(stats) {
    // Update statistics cards
    document.querySelector('.bg-blue-50 .text-2xl').textContent = `${stats.completion_percentage}%`;
    document.querySelector('.bg-blue-50 .text-xs').textContent = `${stats.assessed_subcategories} / ${stats.total_subcategories}`;
    document.querySelector('.bg-green-50 .text-2xl').textContent = stats.average_maturity;
}

function closeAssessmentDetail() {
    document.getElementById('assessment-detail').classList.add('hidden');
    document.getElementById('assessments-list').classList.remove('hidden');
    currentAssessment = null;
}

// ===================
// Frameworks Functions
// ===================

async function loadFrameworks() {
    const container = document.getElementById('frameworks-list');
    const nistFramework = frameworks.find(fw => fw.code === 'NIST-CSF');
    const otherFrameworks = frameworks.filter(fw => fw.code !== 'NIST-CSF');
    
    let html = '';
    
    // NIST CSF 2.0 - Featured Section (Full Width)
    if (nistFramework) {
        html += `
        <div class="col-span-full border-2 border-blue-300 bg-blue-50 rounded-lg p-6 mb-4">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-star text-yellow-500 mr-2"></i>
                        <h3 class="text-2xl font-bold text-blue-900">${nistFramework.name}</h3>
                        <span class="ml-3 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">v${nistFramework.version}</span>
                    </div>
                    <p class="text-gray-700 mt-2 mb-4">${nistFramework.description || ''}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 class="font-semibold text-blue-900 mb-2">
                                <i class="fas fa-book mr-2"></i>Official Documentation
                            </h4>
                            <ul class="space-y-2 text-sm">
                                <li>
                                    <a href="https://www.nist.gov/cyberframework" target="_blank" 
                                       class="text-blue-600 hover:text-blue-800 flex items-center">
                                        <i class="fas fa-external-link-alt mr-2"></i>NIST Cybersecurity Framework Homepage
                                    </a>
                                </li>
                                <li>
                                    <a href="https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf" target="_blank" 
                                       class="text-blue-600 hover:text-blue-800 flex items-center">
                                        <i class="fas fa-file-pdf mr-2"></i>NIST CSF 2.0 Framework (PDF)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.28.pdf" target="_blank" 
                                       class="text-blue-600 hover:text-blue-800 flex items-center">
                                        <i class="fas fa-file-pdf mr-2"></i>Quick Start Guide (PDF)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://csrc.nist.gov/projects/cybersecurity-framework/filters" target="_blank" 
                                       class="text-blue-600 hover:text-blue-800 flex items-center">
                                        <i class="fas fa-search mr-2"></i>Reference Tool (Online)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 class="font-semibold text-blue-900 mb-2">
                                <i class="fas fa-layer-group mr-2"></i>Framework Structure
                            </h4>
                            <ul class="space-y-1 text-sm text-gray-700">
                                <li><strong>6 Functions:</strong> Govern, Identify, Protect, Detect, Respond, Recover</li>
                                <li><strong>23 Categories:</strong> Grouped by function</li>
                                <li><strong>110+ Subcategories:</strong> Specific outcomes</li>
                                <li class="mt-3 pt-3 border-t border-blue-200">
                                    <span class="text-blue-600 font-medium">Default framework for all assessments</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    // Other Frameworks
    if (otherFrameworks.length > 0) {
        html += `
        <div class="col-span-full mb-2">
            <h3 class="text-lg font-semibold text-gray-700">
                <i class="fas fa-link mr-2"></i>Framework Mappings
            </h3>
            <p class="text-sm text-gray-500">Other security frameworks mapped to NIST CSF</p>
        </div>
        `;
        
        html += otherFrameworks.map(framework => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <h3 class="text-lg font-semibold text-gray-800">${framework.name}</h3>
                <p class="text-sm text-gray-600 mt-1">${framework.version || ''}</p>
                <p class="text-sm text-gray-500 mt-2">${framework.description || ''}</p>
                ${framework.url ? `
                    <a href="${framework.url}" target="_blank" class="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
                        <i class="fas fa-external-link-alt mr-1"></i>Learn more
                    </a>
                ` : ''}
                <button onclick="viewFrameworkMappings(${framework.id})" 
                        class="mt-3 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200">
                    <i class="fas fa-project-diagram mr-1"></i>View CSF Mappings
                </button>
            </div>
        `).join('');
    }
    
    container.innerHTML = html;
}

async function viewFrameworkMappings(frameworkId) {
    try {
        const response = await axios.get(`/api/mappings?framework_id=${frameworkId}`);
        const mappings = response.data;
        const framework = frameworks.find(f => f.id === frameworkId);
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">NIST CSF Mappings: ${framework.name}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${mappings.length > 0 ? mappings.map(mapping => `
                        <div class="border border-gray-200 rounded p-3">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="font-medium text-blue-700">${mapping.csf_subcategory_id}: ${mapping.subcategory_name}</div>
                                    <div class="text-sm text-gray-600 mt-1">
                                        <i class="fas fa-arrow-right mx-2"></i>
                                        <span class="font-medium">${mapping.control_id}</span>: ${mapping.control_name}
                                    </div>
                                    ${mapping.notes ? `<p class="text-sm text-gray-500 mt-2">${mapping.notes}</p>` : ''}
                                </div>
                                <span class="px-2 py-1 rounded text-xs font-medium ${getMappingColor(mapping.mapping_strength)}">
                                    ${mapping.mapping_strength}
                                </span>
                            </div>
                        </div>
                    `).join('') : '<p class="text-center text-gray-500 py-8">No mappings available for this framework</p>'}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
    } catch (error) {
        console.error('Error loading framework mappings:', error);
        showNotification('Error loading mappings', 'error');
    }
}

function getMappingColor(strength) {
    const colors = {
        'direct': 'bg-green-100 text-green-700',
        'partial': 'bg-yellow-100 text-yellow-700',
        'related': 'bg-blue-100 text-blue-700'
    };
    return colors[strength] || 'bg-gray-100 text-gray-700';
}

// ===================
// Organizations Functions
// ===================

async function loadOrganizations() {
    const container = document.getElementById('organizations-list');
    
    if (organizations.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fas fa-building text-6xl mb-4"></i>
                <p class="text-xl" data-i18n="organizations.empty">No organizations yet. Create your first one!</p>
            </div>
        `;
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
        return;
    }
    
    const isAdmin = window.authState && window.authState.user && window.authState.user.role === 'admin';
    
    container.innerHTML = organizations.map(org => `
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800">${org.name}</h3>
                    ${org.industry ? `<p class="text-sm text-gray-600 mt-1"><i class="fas fa-industry mr-1"></i>${org.industry}</p>` : ''}
                    ${org.size ? `<p class="text-sm text-gray-600"><i class="fas fa-users mr-1"></i>${org.size}</p>` : ''}
                    ${org.description ? `<p class="text-sm text-gray-500 mt-2">${org.description}</p>` : ''}
                </div>
                ${isAdmin ? `
                <div>
                    <button onclick="deleteOrganization(${org.id}, '${org.name.replace(/'/g, "\\'")}')" 
                            class="admin-only px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center gap-1">
                        <i class="fas fa-trash"></i>
                        <span data-i18n="organizations.delete">Delete</span>
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    // Re-translate new elements
    if (window.i18n && window.i18n.translatePage) {
        window.i18n.translatePage();
    }
}

function showNewOrgForm() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4">Create New Organization</h3>
            <form id="new-org-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <input type="text" id="org-name" class="w-full border border-gray-300 rounded px-3 py-2" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <input type="text" id="org-industry" class="w-full border border-gray-300 rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Organization Size</label>
                    <select id="org-size" class="w-full border border-gray-300 rounded px-3 py-2">
                        <option value="">Select size...</option>
                        <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                        <option value="Medium (51-500 employees)">Medium (51-500 employees)</option>
                        <option value="Large (501-5000 employees)">Large (501-5000 employees)</option>
                        <option value="Enterprise (5000+ employees)">Enterprise (5000+ employees)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="org-desc" class="w-full border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Create
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('new-org-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('org-name').value,
            industry: document.getElementById('org-industry').value || null,
            size: document.getElementById('org-size').value || null,
            description: document.getElementById('org-desc').value || null
        };
        
        try {
            await axios.post('/api/organizations', data);
            modal.remove();
            showNotification('Organization created successfully', 'success');
            await loadInitialData();
            loadOrganizations();
        } catch (error) {
            console.error('Error creating organization:', error);
            showNotification('Error creating organization', 'error');
        }
    });
}

// ===================
// Delete Functions (Admin Only)
// ===================

async function deleteAssessment(assessmentId, assessmentName) {
    // Double confirmation for safety
    const confirmMsg = i18n ? i18n.t('assessments.delete_confirm', `Are you sure you want to delete "${assessmentName}"? This action cannot be undone.`) 
                             : `Are you sure you want to delete "${assessmentName}"? This action cannot be undone.`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    // Second confirmation
    const finalConfirm = i18n ? i18n.t('assessments.delete_final', 'This will permanently delete the assessment and all its responses. Type DELETE to confirm:')
                               : 'This will permanently delete the assessment and all its responses. Type DELETE to confirm:';
    
    const userInput = prompt(finalConfirm);
    if (userInput !== 'DELETE') {
        showNotification(i18n ? i18n.t('common.cancelled', 'Operation cancelled') : 'Operation cancelled', 'info');
        return;
    }
    
    try {
        await axios.delete(`/api/assessments/${assessmentId}`);
        showNotification(i18n ? i18n.t('assessments.deleted', 'Assessment deleted successfully') : 'Assessment deleted successfully', 'success');
        loadAssessments();
    } catch (error) {
        console.error('Error deleting assessment:', error);
        const errorMsg = error.response?.data?.error || 'Error deleting assessment';
        showNotification(errorMsg, 'error');
    }
}

async function deleteOrganization(orgId, orgName) {
    // Double confirmation for safety
    const confirmMsg = i18n ? i18n.t('organizations.delete_confirm', `Are you sure you want to delete "${orgName}"? This will also delete all associated assessments.`) 
                             : `Are you sure you want to delete "${orgName}"? This will also delete all associated assessments.`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    // Second confirmation
    const finalConfirm = i18n ? i18n.t('organizations.delete_final', 'This action cannot be undone. Type DELETE to confirm:')
                               : 'This action cannot be undone. Type DELETE to confirm:';
    
    const userInput = prompt(finalConfirm);
    if (userInput !== 'DELETE') {
        showNotification(i18n ? i18n.t('common.cancelled', 'Operation cancelled') : 'Operation cancelled', 'info');
        return;
    }
    
    try {
        await axios.delete(`/api/organizations/${orgId}`);
        showNotification(i18n ? i18n.t('organizations.deleted', 'Organization deleted successfully') : 'Organization deleted successfully', 'success');
        await loadInitialData();
        loadOrganizations();
    } catch (error) {
        console.error('Error deleting organization:', error);
        const errorMsg = error.response?.data?.error || 'Error deleting organization';
        showNotification(errorMsg, 'error');
    }
}

// ===================
// Utility Functions
// ===================

function showNotification(message, type = 'info') {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'info': 'bg-blue-500',
        'warning': 'bg-yellow-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================
// Users Management (Admin Only)
// ===================

async function loadUsers() {
    try {
        const response = await axios.get('/api/users');
        const users = response.data;
        
        const container = document.getElementById('users-list');
        
        if (users.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-users text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="users.empty">No users yet</p>
                </div>
            `;
            if (window.i18n && window.i18n.translatePage) {
                window.i18n.translatePage();
            }
            return;
        }
        
        // Separate pending and approved users
        const pendingUsers = users.filter(u => !u.is_approved);
        const approvedUsers = users.filter(u => u.is_approved);
        
        let html = '';
        
        // Show pending users section if any
        if (pendingUsers.length > 0) {
            html += `
                <div class="mb-8">
                    <h3 class="text-lg font-bold text-orange-600 mb-4 flex items-center gap-2">
                        <i class="fas fa-clock"></i>
                        <span data-i18n="users.pending_approval">Pending Approval</span>
                        <span class="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">${pendingUsers.length}</span>
                    </h3>
                    <div class="space-y-3">
                        ${pendingUsers.map(user => `
                            <div class="border-2 border-orange-200 bg-orange-50 rounded-lg p-4">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <h3 class="text-lg font-semibold text-gray-800">${user.name}</h3>
                                            <span class="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                                                <i class="fas fa-hourglass-half mr-1"></i>
                                                <span data-i18n="users.awaiting_approval">Awaiting Approval</span>
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-600 mt-1">
                                            <i class="fas fa-envelope mr-1"></i>${user.email}
                                        </p>
                                        <p class="text-sm text-gray-600 mt-1">
                                            <i class="fas fa-building mr-1"></i>${user.organization_name || 'No Organization'}
                                        </p>
                                        <p class="text-sm text-gray-500 mt-1">
                                            <i class="fas fa-calendar mr-1"></i><span data-i18n="users.registered_on">Registered on</span> ${new Date(user.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="approveUser(${user.id}, '${user.name.replace(/'/g, "\\'")}')" 
                                                class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition flex items-center gap-1">
                                            <i class="fas fa-check"></i>
                                            <span data-i18n="users.approve">Approve</span>
                                        </button>
                                        <button onclick="rejectUser(${user.id}, '${user.name.replace(/'/g, "\\'")}')" 
                                                class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center gap-1">
                                            <i class="fas fa-times"></i>
                                            <span data-i18n="users.reject">Reject</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Show approved users section
        if (approvedUsers.length > 0) {
            html += `
                <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-users"></i>
                        <span data-i18n="users.active_users">Active Users</span>
                        <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">${approvedUsers.length}</span>
                    </h3>
                    <div class="space-y-3">
                        ${approvedUsers.map(user => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <h3 class="text-lg font-semibold text-gray-800">${user.name}</h3>
                                            <span class="px-2 py-0.5 ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} text-xs rounded-full font-medium">
                                                ${user.role === 'admin' ? i18n.t('users.role_admin', 'Admin') : i18n.t('users.role_user', 'User')}
                                            </span>
                                            ${user.is_active ? '<span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>' : '<span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">Inactive</span>'}
                                        </div>
                                        <p class="text-sm text-gray-600 mt-1">
                                            <i class="fas fa-envelope mr-1"></i>${user.email}
                                        </p>
                                        <p class="text-sm text-gray-600 mt-1">
                                            <i class="fas fa-building mr-1"></i>${user.organization_name || 'No Organization'}
                                        </p>
                                        <p class="text-sm text-gray-500 mt-1">
                                            <i class="fas fa-calendar mr-1"></i>${new Date(user.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="editUser(${user.id})" 
                                                class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition flex items-center gap-1">
                                            <i class="fas fa-edit"></i>
                                            <span data-i18n="users.edit">Edit</span>
                                        </button>
                                        <button onclick="deleteUser(${user.id}, '${user.name.replace(/'/g, "\\'")}')" 
                                                class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition flex items-center gap-1">
                                            <i class="fas fa-trash"></i>
                                            <span data-i18n="users.delete">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
        
        // Re-translate
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('Error loading users', 'error');
    }
}

function showNewUserForm() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4" data-i18n="users.new">New User</h3>
            <form id="new-user-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.name">Full Name</label>
                    <input type="text" id="user-name" class="w-full border border-gray-300 rounded px-3 py-2" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.email">Email</label>
                    <input type="email" id="user-email" class="w-full border border-gray-300 rounded px-3 py-2" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.password">Password</label>
                    <input type="password" id="user-password" class="w-full border border-gray-300 rounded px-3 py-2" required minlength="8">
                    <p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.role">Role</label>
                    <select id="user-role" class="w-full border border-gray-300 rounded px-3 py-2" required>
                        <option value="user" data-i18n="users.role_user">Regular User</option>
                        <option value="admin" data-i18n="users.role_admin">Administrator</option>
                    </select>
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                        <span data-i18n="users.create">Create User</span>
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" 
                            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                        <span data-i18n="users.cancel">Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Translate modal
    if (window.i18n && window.i18n.translatePage) {
        window.i18n.translatePage();
    }
    
    document.getElementById('new-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            password: document.getElementById('user-password').value,
            role: document.getElementById('user-role').value
        };
        
        try {
            await axios.post('/api/users', data);
            modal.remove();
            showNotification(i18n.t('users.created', 'User created successfully'), 'success');
            loadUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            const errorMsg = error.response?.data?.error || 'Error creating user';
            showNotification(errorMsg, 'error');
        }
    });
}

async function editUser(userId) {
    try {
        const response = await axios.get(`/api/users/${userId}`);
        const user = response.data;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 class="text-xl font-bold mb-4" data-i18n="users.edit">Edit User</h3>
                <form id="edit-user-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.name">Full Name</label>
                        <input type="text" id="edit-user-name" class="w-full border border-gray-300 rounded px-3 py-2" value="${user.name}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.email">Email</label>
                        <input type="email" id="edit-user-email" class="w-full border border-gray-300 rounded px-3 py-2" value="${user.email}" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.password">Password</label>
                        <input type="password" id="edit-user-password" class="w-full border border-gray-300 rounded px-3 py-2" placeholder="Leave empty to keep current">
                        <p class="text-xs text-gray-500 mt-1">Minimum 8 characters (leave empty to keep current)</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" data-i18n="users.role">Role</label>
                        <select id="edit-user-role" class="w-full border border-gray-300 rounded px-3 py-2" required>
                            <option value="user" ${user.role === 'user' ? 'selected' : ''} data-i18n="users.role_user">Regular User</option>
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''} data-i18n="users.role_admin">Administrator</option>
                        </select>
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input type="checkbox" id="edit-user-active" ${user.is_active ? 'checked' : ''} class="mr-2">
                            <span data-i18n="users.is_active">Active</span>
                        </label>
                    </div>
                    <div class="flex space-x-2">
                        <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            <span data-i18n="common.success">Save</span>
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" 
                                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                            <span data-i18n="users.cancel">Cancel</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Translate modal
        if (window.i18n && window.i18n.translatePage) {
            window.i18n.translatePage();
        }
        
        document.getElementById('edit-user-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                name: document.getElementById('edit-user-name').value,
                email: document.getElementById('edit-user-email').value,
                role: document.getElementById('edit-user-role').value,
                is_active: document.getElementById('edit-user-active').checked
            };
            
            const password = document.getElementById('edit-user-password').value;
            if (password) {
                data.password = password;
            }
            
            try {
                await axios.put(`/api/users/${userId}`, data);
                modal.remove();
                showNotification(i18n.t('users.updated', 'User updated successfully'), 'success');
                loadUsers();
            } catch (error) {
                console.error('Error updating user:', error);
                const errorMsg = error.response?.data?.error || 'Error updating user';
                showNotification(errorMsg, 'error');
            }
        });
    } catch (error) {
        console.error('Error loading user:', error);
        showNotification('Error loading user', 'error');
    }
}

async function approveUser(userId, userName) {
    const confirmMsg = i18n ? i18n.t('users.approve_confirm', `Approve user "${userName}"? They will be able to log in and access the system.`) 
                             : `Approve user "${userName}"? They will be able to log in and access the system.`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    try {
        await axios.post(`/api/users/${userId}/approve`);
        showNotification(i18n ? i18n.t('users.approved', 'User approved successfully') : 'User approved successfully', 'success');
        loadUsers();
    } catch (error) {
        console.error('Error approving user:', error);
        const errorMsg = error.response?.data?.error || 'Error approving user';
        showNotification(errorMsg, 'error');
    }
}

async function rejectUser(userId, userName) {
    const confirmMsg = i18n ? i18n.t('users.reject_confirm', `Reject user "${userName}"? This will permanently delete their registration.`) 
                             : `Reject user "${userName}"? This will permanently delete their registration.`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    try {
        await axios.post(`/api/users/${userId}/reject`);
        showNotification(i18n ? i18n.t('users.rejected', 'User registration rejected and deleted') : 'User registration rejected and deleted', 'success');
        loadUsers();
    } catch (error) {
        console.error('Error rejecting user:', error);
        const errorMsg = error.response?.data?.error || 'Error rejecting user';
        showNotification(errorMsg, 'error');
    }
}

async function deleteUser(userId, userName) {
    const confirmMsg = i18n ? i18n.t('users.delete_confirm', `Are you sure you want to delete "${userName}"?`) 
                             : `Are you sure you want to delete "${userName}"?`;
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    const finalConfirm = i18n ? i18n.t('users.delete_final', 'Type DELETE to confirm:')
                               : 'Type DELETE to confirm:';
    
    const userInput = prompt(finalConfirm);
    if (userInput !== 'DELETE') {
        showNotification(i18n ? i18n.t('common.cancelled', 'Operation cancelled') : 'Operation cancelled', 'info');
        return;
    }
    
    try {
        await axios.delete(`/api/users/${userId}`);
        showNotification(i18n ? i18n.t('users.deleted', 'User deleted successfully') : 'User deleted successfully', 'success');
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        const errorMsg = error.response?.data?.error || 'Error deleting user';
        showNotification(errorMsg, 'error');
    }
}

// ===================
// Assessment Status Management
// ===================

async function submitAssessment() {
    const confirmMsg = i18n ? i18n.t('assessments.submit_confirm') 
                            : 'Are you sure you want to submit this assessment? Once submitted, it cannot be edited unless reopened by an administrator.';
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    try {
        await axios.put(`/api/assessments/${currentAssessment.id}`, {
            status: 'completed'
        });
        
        showNotification(i18n ? i18n.t('assessments.submitted') : 'Assessment submitted successfully', 'success');
        
        // Reload assessment detail to update UI
        await viewAssessmentDetail(currentAssessment.id);
        
    } catch (error) {
        console.error('Error submitting assessment:', error);
        showNotification('Error submitting assessment', 'error');
    }
}

async function reopenAssessment() {
    const confirmMsg = i18n ? i18n.t('assessments.reopen_confirm') 
                            : 'Are you sure you want to reopen this assessment for editing?';
    
    if (!confirm(confirmMsg)) {
        return;
    }
    
    try {
        await axios.put(`/api/assessments/${currentAssessment.id}`, {
            status: 'in_progress'
        });
        
        showNotification('Assessment reopened successfully', 'success');
        
        // Reload assessment detail to update UI
        await viewAssessmentDetail(currentAssessment.id);
        
    } catch (error) {
        console.error('Error reopening assessment:', error);
        showNotification('Error reopening assessment', 'error');
    }
}
