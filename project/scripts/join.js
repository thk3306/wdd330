import { initializeHamburgerMenu } from './navigation.js';

// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

// Initialize navigation
initializeHamburgerMenu();