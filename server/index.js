const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');

const app = express();
const PORT = process.env.PORT || 8181;

// Connect to MongoDB
connectToMongo();

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Improved CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    methods: 'GET, POST, PUT, DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization' // Allowed headers
}));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
