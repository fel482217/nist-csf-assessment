// NIST CSF 2.0 Assessment Manager - Frontend Application

// Global state
let currentView = 'assessments';
let currentAssessment = null;
let organizations = [];
let frameworks = [];
let csfFunctions = [];

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialData();
    showView('assessments');
});

// Load initial data
async function loadInitialData() {
    try {
        const [orgsResponse, frameworksResponse, functionsResponse] = await Promise.all([
            axios.get('/api/organizations'),
            axios.get('/api/frameworks'),
            axios.get('/api/csf/functions')
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
        case 'organizations':
            loadOrganizations();
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
                    <p class="text-xl">No assessments yet. Create your first one!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = assessments.map(assessment => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer" 
                 onclick="viewAssessmentDetail(${assessment.id})">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">${assessment.name}</h3>
                        <p class="text-sm text-gray-600 mt-1">
                            <i class="fas fa-building mr-1"></i>${assessment.organization_name}
                        </p>
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-calendar mr-1"></i>${new Date(assessment.assessment_date).toLocaleDateString()}
                            ${assessment.assessor_name ? `<span class="ml-3"><i class="fas fa-user mr-1"></i>${assessment.assessor_name}</span>` : ''}
                        </p>
                        ${assessment.description ? `<p class="text-sm text-gray-500 mt-2">${assessment.description}</p>` : ''}
                    </div>
                    <div>
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assessment.status)}">
                            ${assessment.status.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
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

function showNewAssessmentForm() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4">Create New Assessment</h3>
            <form id="new-assessment-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <select id="org-select" class="w-full border border-gray-300 rounded px-3 py-2" required>
                        <option value="">Select organization...</option>
                        ${organizations.map(org => `<option value="${org.id}">${org.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Assessment Name</label>
                    <input type="text" id="assessment-name" class="w-full border border-gray-300 rounded px-3 py-2" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
                    <input type="date" id="assessment-date" class="w-full border border-gray-300 rounded px-3 py-2" 
                           value="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Assessor Name</label>
                    <input type="text" id="assessor-name" class="w-full border border-gray-300 rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="assessment-desc" class="w-full border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
                </div>
                <div class="flex space-x-2">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
    
    document.getElementById('new-assessment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            organization_id: parseInt(document.getElementById('org-select').value),
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
        const [assessmentResponse, responsesResponse, statsResponse, subcategoriesResponse] = await Promise.all([
            axios.get(`/api/assessments/${assessmentId}`),
            axios.get(`/api/assessments/${assessmentId}/responses`),
            axios.get(`/api/assessments/${assessmentId}/statistics`),
            axios.get('/api/csf/subcategories')
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
        detailContainer.classList.remove('hidden');
        
        detailContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <button onclick="closeAssessmentDetail()" class="text-blue-600 hover:text-blue-800 mb-2">
                            <i class="fas fa-arrow-left mr-2"></i>Back to list
                        </button>
                        <h2 class="text-2xl font-bold text-gray-800">${currentAssessment.name}</h2>
                        <p class="text-gray-600 mt-1">
                            <i class="fas fa-building mr-1"></i>${currentAssessment.organization_name} | 
                            <i class="fas fa-calendar mr-1"></i>${new Date(currentAssessment.assessment_date).toLocaleDateString()}
                        </p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentAssessment.status)}">
                        ${currentAssessment.status.replace('_', ' ').toUpperCase()}
                    </span>
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
                        <div class="text-xs text-gray-600">Out of 5.0</div>
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
                        
                        return `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex-1">
                                        <h5 class="font-medium text-gray-900">${sub.id}: ${sub.name}</h5>
                                        <p class="text-sm text-gray-600 mt-1">${sub.description}</p>
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">Maturity Level (0-5)</label>
                                        <select class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                                onchange="updateResponse('${sub.id}', 'maturity_level', this.value)">
                                            ${[0,1,2,3,4,5].map(level => `
                                                <option value="${level}" ${maturity === level ? 'selected' : ''}>
                                                    ${level} - ${getMaturityLabel(level)}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 mb-1">Implementation Status</label>
                                        <select class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                                onchange="updateResponse('${sub.id}', 'implementation_status', this.value)">
                                            <option value="not_implemented" ${status === 'not_implemented' ? 'selected' : ''}>Not Implemented</option>
                                            <option value="partially_implemented" ${status === 'partially_implemented' ? 'selected' : ''}>Partially Implemented</option>
                                            <option value="implemented" ${status === 'implemented' ? 'selected' : ''}>Implemented</option>
                                            <option value="not_applicable" ${status === 'not_applicable' ? 'selected' : ''}>Not Applicable</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <button onclick="showResponseDetail('${sub.id}')" 
                                            class="text-sm text-blue-600 hover:text-blue-800">
                                        <i class="fas fa-edit mr-1"></i>Add notes, evidence & recommendations
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
    const labels = {
        0: 'Not Assessed',
        1: 'Initial/Ad Hoc',
        2: 'Developing',
        3: 'Defined',
        4: 'Managed',
        5: 'Optimizing'
    };
    return labels[level] || 'Unknown';
}

async function updateResponse(subcategoryId, field, value) {
    try {
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

function showResponseDetail(subcategoryId) {
    // TODO: Show modal with detailed fields for notes, evidence, gaps, recommendations
    showNotification('Detailed response editor coming soon', 'info');
}

function updateStatisticsDisplay(stats) {
    // Update statistics cards
    document.querySelector('.bg-blue-50 .text-2xl').textContent = `${stats.completion_percentage}%`;
    document.querySelector('.bg-blue-50 .text-xs').textContent = `${stats.assessed_subcategories} / ${stats.total_subcategories}`;
    document.querySelector('.bg-green-50 .text-2xl').textContent = stats.average_maturity;
}

function closeAssessmentDetail() {
    document.getElementById('assessment-detail').classList.add('hidden');
    currentAssessment = null;
}

// ===================
// Frameworks Functions
// ===================

async function loadFrameworks() {
    const container = document.getElementById('frameworks-list');
    
    container.innerHTML = frameworks.map(framework => `
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
                <p class="text-xl">No organizations yet. Create your first one!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = organizations.map(org => `
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800">${org.name}</h3>
                    ${org.industry ? `<p class="text-sm text-gray-600 mt-1"><i class="fas fa-industry mr-1"></i>${org.industry}</p>` : ''}
                    ${org.size ? `<p class="text-sm text-gray-600"><i class="fas fa-users mr-1"></i>${org.size}</p>` : ''}
                    ${org.description ? `<p class="text-sm text-gray-500 mt-2">${org.description}</p>` : ''}
                </div>
            </div>
        </div>
    `).join('');
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
