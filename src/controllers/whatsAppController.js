import { Request, Response, NextFunction } from 'express';
const qrcode = require('qrcode-terminal');

import { generateQRCode, sendMessage, isClientReady } from '../services/whatsAppService';
import { MessageMedia } from 'whatsapp-web.js';

export const validateUser = async (req, res, next) => {
  try {
    const qr = await generateQRCode();
    
    res.status(200).json({ qrCode: qr != "" ? qr : null });  // QR code url
  } catch (error) {
    next(error);
  }
};

export const sendMessageHandler = async (req, res, next) => { 
  const { number, message, pdf } = req.body; 

  try {
    // Decode Base64 PDF
    const pdfBuffer = Buffer.from(pdf.split(',')[1], 'base64'); // Remove 'data:application/pdf;base64,' prefix if present

    // Create the media for WhatsApp
    const media = new MessageMedia('application/pdf', pdfBuffer.toString('base64'), 'invoice.pdf');

    const response = await sendMessage({number: number, message: message, media: media});
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};
export const isWhatsAppReady = async (req, res, next) => {
  try {
    const isReady = await isClientReady();
    
    res.status(200).json({ isReady: isReady }); 
  } catch (error) {
    console.log(error)
    next(error); 
  }
};
