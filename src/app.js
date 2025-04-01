import express from 'express';
import cors from "cors"

const serverless = requiere('serverless-http');

import whatsappRoutes from './routes/whatsAppRoutes'; 
 
const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('tmp'))

app.use('/.netlify/functions/api/whatsapp', whatsappRoutes); // Mount the WhatsApp routes

app.use('/.netlify/functions/api/', (req, res) => {
  res.json({
    'message': 'hello'
  })
})

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.handler = serverless(app);