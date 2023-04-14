// Dependencies
const express = require('express'); // Import the express package

// Import custom route modules
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Initialize the express app
const app = express();

// Set up the server's listening port
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming request bodies (e.g., form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Mount API routes under the '/api' path
app.use('/api', apiRoutes);

// Mount HTML routes under the root path '/'
app.use('/', htmlRoutes);

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
console.log(API server is ready on port ${PORT}!);
});
