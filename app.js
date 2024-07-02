const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to verify IP address
const verifyIP = (req, res, next) => {
  const allowedIPs = ['51.38.47.208']; // Replace with your allowed IP addresses
  const clientIP = req.ip;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
