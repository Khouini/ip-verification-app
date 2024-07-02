const express = require('express');
const app = express();
const morgan = require('morgan');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('dev'));
// Middleware to verify IP address
const verifyIP = (req, res, next) => {
  const allowedIPs = ['51.38.47.208']; // Replace with your allowed IP addresses
  console.log('🚀 ~ verifyIP ~ allowedIPs:', allowedIPs);
  let clientIP = req.ip;
  console.log('🚀 ~ verifyIP ~ clientIP:', clientIP);
  // Normalize IPv6 format
  if (clientIP.startsWith('::ffff:')) {
    clientIP = clientIP.split(':').pop();
    console.log('🚀 ~ verifyIP ~ clientIP:', clientIP);
  }
  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).send('Forbidden: Access is denied.');
  }
};

app.use(verifyIP);

// GET request with query parameters
app.get('/get-data', (req, res) => {
  const queryParams = req.query;
  res.send(`GET request received with query parameters: ${JSON.stringify(queryParams)}`);
});

// POST request with JSON body
app.post('/post-data', (req, res) => {
  const requestBody = req.body;
  res.send(`POST request received with body: ${JSON.stringify(requestBody)}`);
});

const PORT = process.env.PORT || 8123;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
