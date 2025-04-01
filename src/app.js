import functions from 'firebase-functions';
import express from 'express';
import cors from "cors"

import whatsappRoutes from './routes/whatsAppRoutes.js';
 
 
const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('tmp'))

app.use('/api/whatsapp', whatsappRoutes); // Mount the WhatsApp routes

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

exports.api = functions.https.onRequest(app)