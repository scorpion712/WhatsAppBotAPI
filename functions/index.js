const express = require('express');
const bodyParser = require('body-parser');
const { initializeClient } = require('./models/whatsappModel');
const whatsappRoutes = require('./routes/whatsappRoutes');
const cors = require("cors");

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
const port = process.env.PORT || 3000;

// Middleware

// Apply body-parsing middleware before route handlers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('tmp'));

// Initialize WhatsApp client
initializeClient();

// Use routes
app.use('/api/whatsapp', whatsappRoutes);

app.use('/api/test', (req, res) => {
  res.json({
    'message': 'hello'
  })
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
