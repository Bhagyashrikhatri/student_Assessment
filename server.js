/**
 * Student Speaking Assessment Report - Backend Server
 * 
 * A simple Express.js server that:
 * 1. Serves static frontend files (HTML, CSS, JS)
 * 2. Provides API endpoint for student assessment data
 * 3. Reads data from JSON file
 * 
 * Dependencies:
 * - express: Web server framework
 * - cors: Enable cross-origin requests
 * - fs: File system operations (built-in)
 * - path: File path utilities (built-in)
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// ============================================
// SERVER CONFIGURATION
// ============================================

const app = express();
const PORT = 3000;  // Server will run on http://localhost:3000

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Enable CORS (Cross-Origin Resource Sharing)
// Allows API requests from different origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files from 'public' directory
// This makes HTML, CSS, and JS files accessible
app.use(express.static('public'));

// ============================================
// API ENDPOINTS
// ============================================

/**
 * GET /api/student-report
 * 
 * Returns student assessment data from data.json file
 * 
 * Response format:
 * {
 *   "studentId": "STU001",
 *   "studentName": "John Doe",
 *   "testDate": "2024-12-20",
 *   "overallScore": 7.5,
 *   "skills": {
 *     "pronunciation": 8.0,
 *     "fluency": 7.5,
 *     "vocabulary": 7.0,
 *     "grammar": 7.5
 *   }
 * }
 * 
 * Error handling:
 * - Returns 500 status if file read fails
 * - Returns error message in JSON format
 */
app.get('/api/student-report', (req, res) => {
    try {
        // Construct path to data.json file
        const dataPath = path.join(__dirname, 'data.json');
        
        // Read file contents (synchronous read for simplicity)
        const data = fs.readFileSync(dataPath, 'utf8');
        
        // Parse JSON string to JavaScript object
        const studentData = JSON.parse(data);
        
        // Send data as JSON response
        res.json(studentData);
        
    } catch (error) {
        // Log error to console for debugging
        console.error('Error reading data:', error);
        
        // Send error response to client
        res.status(500).json({ 
            error: 'Failed to load student data',
            message: error.message 
        });
    }
});

// ============================================
// SERVER STARTUP
// ============================================

/**
 * Start the Express server
 * 
 * Listens on the specified PORT and logs startup message
 * The server will continue running until manually stopped (Ctrl+C)
 */
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Student Assessment Report Server Started!');
    console.log('='.repeat(50));
    console.log(`📍 Server URL: http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
    console.log(`📊 Data source: ${path.join(__dirname, 'data.json')}`);
    console.log('='.repeat(50));
    console.log('✨ Server is ready! Open the URL above in your browser.');
    console.log('⏹️  Press Ctrl+C to stop the server.');
    console.log('='.repeat(50));
});

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Handle uncaught errors to prevent server crashes
 */
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// ============================================
// END OF SERVER
// ============================================