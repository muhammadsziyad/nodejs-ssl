const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Set up SSL options
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, SSL!');
});

// Create an HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
    console.log('Secure server running on https://localhost:443');
});

