// Reports & Analytics Module
// Handles PDF export, radar charts, and assessment comparisons

// Global state for reports
let currentReportType = null;
let selectedAssessments = [];
let radarChart = null;

// Initialize reports view
function loadReports() {
    // Reset state
    currentReportType = null;
    selectedAssessments = [];
    if (radarChart) {
        radarChart.destroy();
        radarChart = null;
    }
    
    // Hide report content area
    document.getElementById('report-content').classList.add('hidden');
    
    // Translate page
    if (window.i18n && window.i18n.translatePage) {
        window.i18n.translatePage();
    }
}

// Show specific report type
async function showReportType(type) {
    currentReportType = type;
    const contentArea = document.getElementById('report-content');
    
    switch(type) {
        case 'individual':
            await showIndividualReportForm();
            break;
        case 'comparison':
            await showComparisonReportForm();
            break;
        case 'multi-org':
            await showMultiOrgReportForm();
            break;
    }
    
    contentArea.classList.remove('hidden');
    
    // Translate
    if (window.i18n && window.i18n.translatePage) {
        window.i18n.translatePage();
    }
}

// ===================
// Individual Report (PDF Export)
// ===================

async function showIndividualReportForm() {
    try {
        const user = window.authState.user;
        const isAdmin = user && user.role === 'admin';
        
        // Get assessments (filtered by organization for non-admin)
        const response = await axios.get('/api/assessments');
        const assessments = response.data;
        
        if (assessments.length === 0) {
            document.getElementById('report-content').innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-clipboard-list text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="reports.no_assessments">No assessments available for reporting</p>
                </div>
            `;
            return;
        }
        
        document.getElementById('report-content').innerHTML = `
            <div class="border-t pt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-file-pdf text-blue-600 mr-2"></i>
                    <span data-i18n="reports.select_assessment">Select Assessment to Export</span>
                </h3>
                
                <div class="grid grid-cols-1 gap-4 mb-6">
                    ${assessments.map(assessment => `
                        <div class="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer" 
                             onclick="generatePDFReport(${assessment.id})">
                            <div class="flex justify-between items-center">
                                <div class="flex-1">
                                    <h4 class="text-lg font-semibold text-gray-800">${assessment.name}</h4>
                                    <p class="text-sm text-gray-600 mt-1">
                                        <i class="fas fa-building mr-1"></i>${assessment.organization_name}
                                    </p>
                                    <p class="text-sm text-gray-600">
                                        <i class="fas fa-calendar mr-1"></i>${new Date(assessment.assessment_date).toLocaleDateString()}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        <span class="px-2 py-1 bg-${getStatusColor(assessment.status)}-100 text-${getStatusColor(assessment.status)}-700 rounded-full text-xs">
                                            ${assessment.status || 'Draft'}
                                        </span>
                                    </p>
                                </div>
                                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                                    <i class="fas fa-download"></i>
                                    <span data-i18n="reports.export_pdf">Export PDF</span>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading individual report form:', error);
        showNotification('Error loading assessments', 'error');
    }
}

// Generate PDF report for assessment
async function generatePDFReport(assessmentId) {
    try {
        showNotification('Generating PDF report...', 'info');
        
        // Fetch assessment details
        const [assessmentRes, responsesRes, statsRes] = await Promise.all([
            axios.get(`/api/assessments/${assessmentId}`),
            axios.get(`/api/assessments/${assessmentId}/responses`),
            axios.get(`/api/assessments/${assessmentId}/statistics`)
        ]);
        
        const assessment = assessmentRes.data;
        const responses = responsesRes.data;
        const stats = statsRes.data;
        
        // Create PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(20);
        doc.setTextColor(59, 130, 246); // Blue
        doc.text('NIST CSF 2.0 Assessment Report', 20, 20);
        
        // Assessment Info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Assessment: ${assessment.name}`, 20, 35);
        doc.text(`Organization: ${assessment.organization_name}`, 20, 42);
        doc.text(`Date: ${new Date(assessment.assessment_date).toLocaleDateString()}`, 20, 49);
        doc.text(`Status: ${assessment.status || 'Draft'}`, 20, 56);
        doc.text(`Assessor: ${assessment.assessor_name || 'N/A'}`, 20, 63);
        
        // Statistics
        doc.setFontSize(14);
        doc.setTextColor(59, 130, 246);
        doc.text('Assessment Statistics', 20, 78);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Completion: ${stats.completion_percentage.toFixed(1)}%`, 20, 88);
        doc.text(`Average Maturity: ${stats.average_maturity.toFixed(2)} / 4.0`, 20, 95);
        doc.text(`Subcategories Assessed: ${stats.assessed_subcategories} / ${stats.total_subcategories}`, 20, 102);
        
        // Description (if available)
        if (assessment.description) {
            doc.setFontSize(12);
            doc.setTextColor(59, 130, 246);
            doc.text('Description', 20, 117);
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const descLines = doc.splitTextToSize(assessment.description, 170);
            doc.text(descLines, 20, 125);
        }
        
        // Responses Summary (new page)
        doc.addPage();
        doc.setFontSize(16);
        doc.setTextColor(59, 130, 246);
        doc.text('Assessment Responses Summary', 20, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        let yPos = 35;
        responses.slice(0, 20).forEach((response, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${response.subcategory_identifier}: ${response.subcategory_name}`, 20, yPos);
            doc.setFont(undefined, 'normal');
            yPos += 7;
            
            doc.text(`   Maturity: ${getMaturityLabel(response.maturity_level)}`, 20, yPos);
            yPos += 5;
            doc.text(`   Status: ${response.implementation_status || 'Not Assessed'}`, 20, yPos);
            yPos += 10;
        });
        
        if (responses.length > 20) {
            doc.text(`... and ${responses.length - 20} more responses`, 20, yPos);
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${i} of ${pageCount}`, 20, 285);
            doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 285);
        }
        
        // Save PDF
        doc.save(`${assessment.name.replace(/\s+/g, '_')}_Report.pdf`);
        showNotification('PDF report generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF report', 'error');
    }
}

// ===================
// Assessment Comparison (Radar Chart)
// ===================

async function showComparisonReportForm() {
    try {
        const user = window.authState.user;
        const isAdmin = user && user.role === 'admin';
        
        // Get assessments (filtered by organization for non-admin)
        const response = await axios.get('/api/assessments');
        const assessments = response.data;
        
        if (assessments.length < 2) {
            document.getElementById('report-content').innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-chart-line text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="reports.need_multiple">You need at least 2 assessments to compare</p>
                </div>
            `;
            return;
        }
        
        // Group by organization for display
        const orgGroups = {};
        assessments.forEach(a => {
            if (!orgGroups[a.organization_name]) {
                orgGroups[a.organization_name] = [];
            }
            orgGroups[a.organization_name].push(a);
        });
        
        selectedAssessments = [];
        
        document.getElementById('report-content').innerHTML = `
            <div class="border-t pt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-chart-line text-purple-600 mr-2"></i>
                    <span data-i18n="reports.select_compare">Select Assessments to Compare (2-5)</span>
                </h3>
                
                <div class="mb-6">
                    ${Object.entries(orgGroups).map(([orgName, orgAssessments]) => `
                        <div class="mb-6">
                            <h4 class="text-md font-bold text-gray-700 mb-3">
                                <i class="fas fa-building text-gray-500 mr-2"></i>${orgName}
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                                ${orgAssessments.map(assessment => `
                                    <div class="border border-gray-200 rounded-lg p-3 hover:bg-purple-50 transition">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" 
                                                   id="compare-${assessment.id}" 
                                                   value="${assessment.id}"
                                                   onchange="toggleComparisonSelection(${assessment.id}, '${assessment.name.replace(/'/g, "\\'")}', '${assessment.organization_name.replace(/'/g, "\\'")}')"
                                                   class="mr-3 w-5 h-5 text-purple-600">
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800">${assessment.name}</p>
                                                <p class="text-xs text-gray-600">
                                                    <i class="fas fa-calendar mr-1"></i>${new Date(assessment.assessment_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <p class="text-sm text-gray-600">
                            <span data-i18n="reports.selected">Selected</span>: 
                            <span id="selected-count" class="font-bold text-purple-600">0</span> / 5
                        </p>
                    </div>
                    <button onclick="generateComparisonChart()" 
                            id="compare-btn"
                            disabled
                            class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <i class="fas fa-chart-radar mr-2"></i>
                        <span data-i18n="reports.generate_comparison">Generate Comparison</span>
                    </button>
                </div>
                
                <!-- Chart Canvas -->
                <div id="comparison-chart-container" class="hidden mt-8">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h4 class="text-lg font-bold text-gray-800 mb-4 text-center">
                            <span data-i18n="reports.maturity_comparison">Maturity Level Comparison by NIST CSF Function</span>
                        </h4>
                        <canvas id="comparison-radar-chart" width="400" height="400"></canvas>
                        
                        <!-- Export Chart Button -->
                        <div class="text-center mt-6">
                            <button onclick="exportComparisonPDF()" 
                                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                <i class="fas fa-file-pdf mr-2"></i>
                                <span data-i18n="reports.export_comparison">Export Comparison Report</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading comparison form:', error);
        showNotification('Error loading assessments', 'error');
    }
}

// Toggle assessment selection for comparison
function toggleComparisonSelection(assessmentId, assessmentName, orgName) {
    const checkbox = document.getElementById(`compare-${assessmentId}`);
    
    if (checkbox.checked) {
        if (selectedAssessments.length >= 5) {
            checkbox.checked = false;
            showNotification('Maximum 5 assessments can be compared', 'warning');
            return;
        }
        selectedAssessments.push({ id: assessmentId, name: assessmentName, organization: orgName });
    } else {
        selectedAssessments = selectedAssessments.filter(a => a.id !== assessmentId);
    }
    
    // Update UI
    document.getElementById('selected-count').textContent = selectedAssessments.length;
    const compareBtn = document.getElementById('compare-btn');
    compareBtn.disabled = selectedAssessments.length < 2;
}

// Generate comparison radar chart
async function generateComparisonChart() {
    try {
        if (selectedAssessments.length < 2) {
            showNotification('Please select at least 2 assessments', 'warning');
            return;
        }
        
        showNotification('Generating comparison chart...', 'info');
        
        // Fetch statistics for each selected assessment
        const statsPromises = selectedAssessments.map(a => 
            axios.get(`/api/assessments/${a.id}/statistics`)
        );
        const statsResponses = await Promise.all(statsPromises);
        
        // Fetch function-level maturity data
        const lang = i18n ? i18n.getLanguage() : 'en';
        const functionsRes = await axios.get(`/api/csf/functions?lang=${lang}`);
        const functions = functionsRes.data;
        
        // Calculate average maturity per function for each assessment
        const datasets = [];
        const colors = [
            { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgb(59, 130, 246)' },  // Blue
            { bg: 'rgba(147, 51, 234, 0.2)', border: 'rgb(147, 51, 234)' },  // Purple
            { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgb(34, 197, 94)' },    // Green
            { bg: 'rgba(234, 88, 12, 0.2)', border: 'rgb(234, 88, 12)' },    // Orange
            { bg: 'rgba(236, 72, 153, 0.2)', border: 'rgb(236, 72, 153)' }   // Pink
        ];
        
        for (let i = 0; i < selectedAssessments.length; i++) {
            const assessment = selectedAssessments[i];
            const responsesRes = await axios.get(`/api/assessments/${assessment.id}/responses`);
            const responses = responsesRes.data;
            
            // Calculate average maturity per function
            const functionMaturity = functions.map(func => {
                const functionResponses = responses.filter(r => r.function_id === func.id);
                if (functionResponses.length === 0) return 0;
                const sum = functionResponses.reduce((acc, r) => acc + (r.maturity_level || 0), 0);
                return (sum / functionResponses.length).toFixed(2);
            });
            
            datasets.push({
                label: `${assessment.name} (${assessment.organization})`,
                data: functionMaturity,
                backgroundColor: colors[i].bg,
                borderColor: colors[i].border,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            });
        }
        
        // Show chart container
        document.getElementById('comparison-chart-container').classList.remove('hidden');
        
        // Destroy existing chart
        if (radarChart) {
            radarChart.destroy();
        }
        
        // Create radar chart
        const ctx = document.getElementById('comparison-radar-chart').getContext('2d');
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: functions.map(f => f.identifier),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 4,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return value.toFixed(0);
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.r} / 4.0`;
                            }
                        }
                    }
                }
            }
        });
        
        showNotification('Comparison chart generated successfully!', 'success');
        
        // Scroll to chart
        document.getElementById('comparison-chart-container').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error generating comparison chart:', error);
        showNotification('Error generating comparison chart', 'error');
    }
}

// Export comparison chart to PDF
async function exportComparisonPDF() {
    try {
        if (!radarChart) {
            showNotification('No chart to export', 'warning');
            return;
        }
        
        showNotification('Generating comparison PDF...', 'info');
        
        // Get chart as image
        const chartCanvas = document.getElementById('comparison-radar-chart');
        const chartImage = chartCanvas.toDataURL('image/png');
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(18);
        doc.setTextColor(147, 51, 234); // Purple
        doc.text('Assessment Comparison Report', 20, 20);
        
        // Comparison Info
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Assessments Compared:', 20, 35);
        
        let yPos = 42;
        selectedAssessments.forEach((assessment, index) => {
            doc.text(`${index + 1}. ${assessment.name} (${assessment.organization})`, 25, yPos);
            yPos += 6;
        });
        
        // Add chart image
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(147, 51, 234);
        doc.text('Maturity Level Comparison by NIST CSF Function', 20, yPos);
        
        // Add chart (centered)
        doc.addImage(chartImage, 'PNG', 15, yPos + 5, 180, 180);
        
        // Legend/Notes
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Notes', 20, 20);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text('- Radar chart shows average maturity levels (0-4) across NIST CSF 2.0 functions', 20, 30);
        doc.text('- Higher values indicate more mature cybersecurity practices', 20, 37);
        doc.text('- Maturity Levels: 0=Not Assessed, 1=Partial, 2=Risk Informed, 3=Repeatable, 4=Adaptive', 20, 44);
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${i} of ${pageCount}`, 20, 285);
            doc.text(`Generated: ${new Date().toLocaleString()}`, 150, 285);
        }
        
        // Save
        doc.save('Assessment_Comparison_Report.pdf');
        showNotification('Comparison PDF exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error exporting comparison PDF:', error);
        showNotification('Error exporting PDF', 'error');
    }
}

// ===================
// Multi-Organization Comparison (Admin Only)
// ===================

async function showMultiOrgReportForm() {
    try {
        // This is admin-only, so we can fetch ALL assessments
        const response = await axios.get('/api/assessments');
        const assessments = response.data;
        
        if (assessments.length < 2) {
            document.getElementById('report-content').innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-building text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="reports.need_multiple_org">You need assessments from multiple organizations to compare</p>
                </div>
            `;
            return;
        }
        
        // Group by organization
        const orgGroups = {};
        assessments.forEach(a => {
            if (!orgGroups[a.organization_name]) {
                orgGroups[a.organization_name] = [];
            }
            orgGroups[a.organization_name].push(a);
        });
        
        if (Object.keys(orgGroups).length < 2) {
            document.getElementById('report-content').innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-building text-6xl mb-4"></i>
                    <p class="text-xl" data-i18n="reports.need_multiple_org">You need assessments from at least 2 different organizations</p>
                </div>
            `;
            return;
        }
        
        selectedAssessments = [];
        
        document.getElementById('report-content').innerHTML = `
            <div class="border-t pt-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div class="flex items-start">
                        <i class="fas fa-shield-alt text-red-600 text-2xl mr-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-red-800 mb-1">
                                <span data-i18n="reports.admin_only">Administrator Only Feature</span>
                            </h4>
                            <p class="text-sm text-red-700" data-i18n="reports.admin_warning">
                                This feature allows comparing assessments across different organizations. 
                                Regular users can only compare assessments within their own organization.
                            </p>
                        </div>
                    </div>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-building text-red-600 mr-2"></i>
                    <span data-i18n="reports.select_multi_org">Select Assessments Across Organizations (2-5)</span>
                </h3>
                
                <div class="mb-6">
                    ${Object.entries(orgGroups).map(([orgName, orgAssessments]) => `
                        <div class="mb-6 border border-gray-200 rounded-lg p-4">
                            <h4 class="text-md font-bold text-gray-700 mb-3">
                                <i class="fas fa-building text-red-500 mr-2"></i>${orgName}
                                <span class="text-xs text-gray-500 ml-2">(${orgAssessments.length} assessments)</span>
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                ${orgAssessments.map(assessment => `
                                    <div class="border border-gray-200 rounded-lg p-3 hover:bg-red-50 transition">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" 
                                                   id="compare-${assessment.id}" 
                                                   value="${assessment.id}"
                                                   onchange="toggleComparisonSelection(${assessment.id}, '${assessment.name.replace(/'/g, "\\'")}', '${assessment.organization_name.replace(/'/g, "\\'")}')"
                                                   class="mr-3 w-5 h-5 text-red-600">
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800">${assessment.name}</p>
                                                <p class="text-xs text-gray-600">
                                                    <i class="fas fa-calendar mr-1"></i>${new Date(assessment.assessment_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <p class="text-sm text-gray-600">
                            <span data-i18n="reports.selected">Selected</span>: 
                            <span id="selected-count" class="font-bold text-red-600">0</span> / 5
                        </p>
                    </div>
                    <button onclick="generateComparisonChart()" 
                            id="compare-btn"
                            disabled
                            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <i class="fas fa-chart-radar mr-2"></i>
                        <span data-i18n="reports.generate_comparison">Generate Comparison</span>
                    </button>
                </div>
                
                <!-- Chart Canvas -->
                <div id="comparison-chart-container" class="hidden mt-8">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h4 class="text-lg font-bold text-gray-800 mb-4 text-center">
                            <span data-i18n="reports.multi_org_chart_title">Multi-Organization Maturity Comparison</span>
                        </h4>
                        <canvas id="comparison-radar-chart" width="400" height="400"></canvas>
                        
                        <!-- Export Chart Button -->
                        <div class="text-center mt-6">
                            <button onclick="exportComparisonPDF()" 
                                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                <i class="fas fa-file-pdf mr-2"></i>
                                <span data-i18n="reports.export_comparison">Export Comparison Report</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading multi-org comparison form:', error);
        showNotification('Error loading assessments', 'error');
    }
}

// ===================
// Helper Functions
// ===================

function getStatusColor(status) {
    switch (status) {
        case 'Draft': return 'gray';
        case 'In Progress': return 'blue';
        case 'Completed': return 'green';
        case 'Archived': return 'orange';
        default: return 'gray';
    }
}

function getMaturityLabel(level) {
    const labels = {
        0: 'Not Assessed',
        1: 'Tier 1 - Partial',
        2: 'Tier 2 - Risk Informed',
        3: 'Tier 3 - Repeatable',
        4: 'Tier 4 - Adaptive'
    };
    return labels[level] || 'Unknown';
}
