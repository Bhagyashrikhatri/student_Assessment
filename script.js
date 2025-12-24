/**
 * Student Speaking Assessment Report - Frontend Logic
 * 
 * This script handles:
 * 1. Fetching student data from the backend API
 * 2. Displaying scores and progress bars
 * 3. Generating dynamic feedback based on score ranges
 * 4. Creating interactive charts using Chart.js
 */

// ============================================
// FEEDBACK LOGIC SYSTEM
// ============================================

/**
 * Generates descriptive feedback based on score and skill type
 * 
 * @param {number} score - The score value (0-9)
 * @param {string} skillType - Type of skill ('overall', 'pronunciation', 'fluency', 'vocabulary', 'grammar')
 * @returns {string} Appropriate feedback message
 * 
 * Score Ranges:
 * - 8.0-9.0: Excellent
 * - 7.0-7.9: Very Good
 * - 6.0-6.9: Good
 * - 5.0-5.9: Moderate
 * - 0.0-4.9: Needs Improvement
 */
function getFeedback(score, skillType = 'overall') {
    // Feedback messages for each skill type and score range
    const feedbackMap = {
        overall: {
            excellent: "Excellent performance! You demonstrate exceptional speaking abilities with strong control across all areas.",
            veryGood: "Very good performance! You show strong speaking skills with minor areas for improvement.",
            good: "Good performance with noticeable competence, though some inaccuracies are present.",
            moderate: "Moderate performance. You can communicate but need significant improvement in several areas.",
            needsImprovement: "Needs improvement. Focus on building fundamental speaking skills across all areas."
        },
        pronunciation: {
            excellent: "Excellent pronunciation with clear and accurate articulation of sounds.",
            veryGood: "Very good pronunciation with occasional minor errors that don't impede understanding.",
            good: "Good pronunciation but some sounds need improvement for better clarity.",
            moderate: "Pronunciation needs work; some words are unclear and may affect comprehension.",
            needsImprovement: "Significant pronunciation challenges affecting overall clarity and understanding."
        },
        fluency: {
            excellent: "Excellent fluency with natural speech flow and minimal hesitation.",
            veryGood: "Very good fluency with smooth delivery and only occasional pauses.",
            good: "Good fluency though some hesitation and unnatural pauses are noticeable.",
            moderate: "Fluency needs improvement; frequent hesitation affects the natural flow of speech.",
            needsImprovement: "Significant fluency issues with many pauses and disrupted speech flow."
        },
        vocabulary: {
            excellent: "Excellent vocabulary range with precise and sophisticated word choices.",
            veryGood: "Very good vocabulary with appropriate word selection and variety.",
            good: "Good vocabulary but limited range; occasional difficulty expressing complex ideas.",
            moderate: "Vocabulary needs expansion; basic words used, limiting expression.",
            needsImprovement: "Limited vocabulary significantly restricts communication ability."
        },
        grammar: {
            excellent: "Excellent grammatical accuracy with sophisticated sentence structures.",
            veryGood: "Very good grammar with minor errors that don't impede communication.",
            good: "Good grammar but some errors in complex structures are noticeable.",
            moderate: "Grammar needs improvement; errors are frequent and may affect clarity.",
            needsImprovement: "Significant grammatical issues affecting overall comprehension."
        }
    };

    // Get feedback messages for the specified skill type
    const messages = feedbackMap[skillType];
    
    // Return appropriate message based on score range
    if (score >= 8.0) return messages.excellent;
    if (score >= 7.0) return messages.veryGood;
    if (score >= 6.0) return messages.good;
    if (score >= 5.0) return messages.moderate;
    return messages.needsImprovement;
}

// ============================================
// COLOR CODING SYSTEM
// ============================================

/**
 * Returns CSS class for color-coding scores
 * 
 * @param {number} score - The score value (0-9)
 * @returns {string} CSS class name
 * 
 * Color mapping:
 * - Green: Excellent (8.0+)
 * - Blue: Good (7.0-7.9)
 * - Yellow: Fair (6.0-6.9)
 * - Red: Poor (<6.0)
 */
function getScoreClass(score) {
    if (score >= 8.0) return 'score-excellent';
    if (score >= 7.0) return 'score-good';
    if (score >= 6.0) return 'score-fair';
    return 'score-poor';
}

// ============================================
// PROGRESS BAR ANIMATIONS
// ============================================

/**
 * Updates progress bar width based on score
 * 
 * @param {string} elementId - ID of the progress bar element
 * @param {number} score - The score value (0-9)
 * 
 * Calculates percentage: (score / 9) * 100
 */
function updateProgressBar(elementId, score) {
    const progressBar = document.getElementById(elementId);
    const percentage = (score / 9) * 100;
    progressBar.style.width = percentage + '%';
}

// ============================================
// DATA LOADING
// ============================================

/**
 * Fetches student assessment data from the backend API
 * 
 * Endpoint: GET /api/student-report
 * 
 * Handles errors gracefully and alerts user if loading fails
 */
async function loadStudentData() {
    try {
        // Fetch data from API endpoint
        const response = await fetch('/api/student-report');
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Display data on the page
        displayStudentData(data);
        
    } catch (error) {
        console.error('Error loading student data:', error);
        alert('Failed to load student data. Please make sure the server is running on port 3000.');
    }
}

// ============================================
// DATA DISPLAY
// ============================================

/**
 * Displays student assessment data on the page
 * 
 * Updates:
 * - Student information (name, date)
 * - Overall score and feedback
 * - Individual skill scores, progress bars, and feedback
 * - Creates interactive charts
 * 
 * @param {Object} data - Student assessment data from API
 */
function displayStudentData(data) {
    // ========== STUDENT INFORMATION ==========
    document.getElementById('studentName').textContent = data.studentName;
    document.getElementById('testDate').textContent = data.testDate;

    // ========== OVERALL SCORE ==========
    const overallScore = data.overallScore;
    const overallScoreEl = document.getElementById('overallScore');
    
    // Display score with one decimal place
    overallScoreEl.textContent = overallScore.toFixed(1);
    
    // Apply color-coded class
    overallScoreEl.className = 'score-value ' + getScoreClass(overallScore);
    
    // Display overall feedback in two places (summary card and feedback section)
    const overallFeedbackText = getFeedback(overallScore, 'overall');
    document.getElementById('overallDescription').textContent = overallFeedbackText;
    document.getElementById('overallFeedback').textContent = overallFeedbackText;

    // ========== INDIVIDUAL SKILLS ==========
    const skills = data.skills;
    
    // --- PRONUNCIATION ---
    const pronScore = skills.pronunciation;
    document.getElementById('pronunciationScore').textContent = pronScore.toFixed(1);
    document.getElementById('pronunciationScore').className = 'skill-score ' + getScoreClass(pronScore);
    updateProgressBar('pronunciationProgress', pronScore);
    document.getElementById('pronunciationFeedback').textContent = getFeedback(pronScore, 'pronunciation');

    // --- FLUENCY ---
    const fluencyScore = skills.fluency;
    document.getElementById('fluencyScore').textContent = fluencyScore.toFixed(1);
    document.getElementById('fluencyScore').className = 'skill-score ' + getScoreClass(fluencyScore);
    updateProgressBar('fluencyProgress', fluencyScore);
    document.getElementById('fluencyFeedback').textContent = getFeedback(fluencyScore, 'fluency');

    // --- VOCABULARY ---
    const vocabScore = skills.vocabulary;
    document.getElementById('vocabularyScore').textContent = vocabScore.toFixed(1);
    document.getElementById('vocabularyScore').className = 'skill-score ' + getScoreClass(vocabScore);
    updateProgressBar('vocabularyProgress', vocabScore);
    document.getElementById('vocabularyFeedback').textContent = getFeedback(vocabScore, 'vocabulary');

    // --- GRAMMAR ---
    const grammarScore = skills.grammar;
    document.getElementById('grammarScore').textContent = grammarScore.toFixed(1);
    document.getElementById('grammarScore').className = 'skill-score ' + getScoreClass(grammarScore);
    updateProgressBar('grammarProgress', grammarScore);
    document.getElementById('grammarFeedback').textContent = getFeedback(grammarScore, 'grammar');

    // ========== CREATE CHARTS ==========
    createCharts(skills);
}

// ============================================
// CHART CREATION (Chart.js)
// ============================================

/**
 * Creates interactive charts using Chart.js library
 * 
 * Creates two charts:
 * 1. Radar Chart - Shows all skills in a comparative spider/radar view
 * 2. Bar Chart - Shows individual skills as vertical bars
 * 
 * @param {Object} skills - Object containing all skill scores
 */
function createCharts(skills) {
    // Prepare data for charts
    const skillLabels = ['Pronunciation', 'Fluency', 'Vocabulary', 'Grammar'];
    const skillValues = [
        skills.pronunciation,
        skills.fluency,
        skills.vocabulary,
        skills.grammar
    ];

    // ========== RADAR CHART ==========
    // Shows comparative view of all skills
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: skillLabels,
            datasets: [{
                label: 'Skills Assessment',
                data: skillValues,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',      // Fill color
                borderColor: 'rgba(102, 126, 234, 1)',            // Line color
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',   // Point color
                pointBorderColor: '#fff',                         // Point border
                pointHoverBackgroundColor: '#fff',                // Hover color
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 9,                    // Maximum score
                    ticks: {
                        stepSize: 1            // Increment by 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false             // Hide legend for cleaner look
                }
            }
        }
    });

    // ========== BAR CHART ==========
    // Shows individual skills as bars
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: skillLabels,
            datasets: [{
                label: 'Score',
                data: skillValues,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',    // Pronunciation - Blue
                    'rgba(118, 75, 162, 0.8)',     // Fluency - Purple
                    'rgba(102, 126, 234, 0.8)',    // Vocabulary - Blue
                    'rgba(118, 75, 162, 0.8)'      // Grammar - Purple
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 9,                        // Maximum score
                    ticks: {
                        stepSize: 1                // Increment by 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false                 // Hide legend
                }
            }
        }
    });
}

// ============================================
// PAGE INITIALIZATION
// ============================================

/**
 * Load student data when the page finishes loading
 * 
 * This ensures all HTML elements are available before
 * we try to update them with data
 */
document.addEventListener('DOMContentLoaded', loadStudentData);

// ============================================
// END OF SCRIPT
// ============================================