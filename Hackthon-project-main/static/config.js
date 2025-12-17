// Inject runtime configuration for backend API URL
// This script runs before the app loads and sets window.BACKEND_API_URL
(function () {
    // In Vercel, environment variables are available at build time
    // We need to inject them at runtime for the client

    // For local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.BACKEND_API_URL = 'http://localhost:8000';
    } else {
        // For production (Vercel) - use Railway backend
        window.BACKEND_API_URL = 'https://hackthon-project-production.up.railway.app';
    }

    console.log('Backend API URL configured:', window.BACKEND_API_URL);
})();
