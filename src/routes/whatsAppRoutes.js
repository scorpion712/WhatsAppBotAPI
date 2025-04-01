import express from 'express'; 

// import authMiddleware from '../middlewares/authMiddleware';
import { sendMessageHandler, validateUser, isWhatsAppReady } from '../controllers/whatsAppController.js';

const router = express.Router();

// router.get('/validate', authMiddleware, validateUser);
router.get('/validate', validateUser);
router.get('/isReady', isWhatsAppReady);
router.post('/sendMessage',  sendMessageHandler);

export default router;
