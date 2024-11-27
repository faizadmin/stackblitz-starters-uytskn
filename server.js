const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

// Proxy endpoint for create-order
app.post('/api/create-order', async (req, res) => {
  try {
    const response = await axios.post('https://imb.org.in/api/create-order', req.body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Create Order Error:', error.response?.data || error.message);
    res.status(500).json({
      status: false,
      message: error.response?.data?.message || 'Failed to create order'
    });
  }
});

// Proxy endpoint for check-order-status
app.post('/api/check-order-status', async (req, res) => {
  try {
    const response = await axios.post('https://imb.org.in/api/check-order-status', req.body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Check Status Error:', error.response?.data || error.message);
    res.status(500).json({
      status: 'ERROR',
      message: error.response?.data?.message || 'Failed to check order status'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});