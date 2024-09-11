To create a Node.js project with SSL (HTTPS), you'll need to generate or obtain SSL certificates and configure your Node.js application to use them. 
Here's a step-by-step guide:

Step 1: Install Node.js
Make sure Node.js is installed on your machine. If not, download and install it from Node.js official website.

Step 2: Create a Node.js Project
1. Create a project folder:

```bash
mkdir nodejs-ssl-project
cd nodejs-ssl-project
```

2. Initialize the project:
```bash
npm init -y
```

Step 3: Install Required Packages
You'll need the express package to handle routing, and fs and https to enable SSL.

```bash
npm install express
```

Step 4: Obtain SSL Certificates
You need an SSL certificate and a private key. For development purposes, you can generate self-signed certificates:

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

This will generate two files: server.key (the private key) and server.cert (the certificate). In a production environment, you would obtain a 
certificate from a trusted certificate authority (e.g., Let's Encrypt).

Step 5: Create the server.js File

Create a server.js file with the following code to configure HTTPS:

```javascript
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
```

Step 6: Run the Server
Run the server using:

```bash
node server.js
```


Step 7: Test the Application
Open your browser and go to https://localhost. If you're using a self-signed certificate, your browser will warn you about the certificate not being 
trusted. You can bypass this warning for testing purposes.

Optional: Redirect HTTP to HTTPS
If you also want to support HTTP but redirect all traffic to HTTPS, you can add the following code for the HTTP server:

```javascript
const http = require('http');

// Redirect HTTP to HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
    res.end();
}).listen(80);
```

This will redirect all HTTP requests to the HTTPS version of your site.

Your Node.js application is now configured with SSL and running over HTTPS.
