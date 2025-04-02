const { generateQRCode, isClientReady, sendMessage } = require('../models/whatsappModel');
const { MessageMedia } = require('whatsapp-web.js');

const validateUser = async (req, res) => {
    try {
        const qr = await generateQRCode();

        res.status(200).json({ qrCode: qr != "" ? qr : null });  // QR code url
    } catch (error) {
        throw error;
    }
};

const sendMessageHandler = async (req, res) => {
    const { number, message, pdf } = req.body;

    try {
        // Decode Base64 PDF
        const pdfBuffer = Buffer.from(pdf.split(',')[1], 'base64'); // Remove 'data:application/pdf;base64,' prefix if present

        // Create the media for WhatsApp
        const media = new MessageMedia('application/pdf', pdfBuffer.toString('base64'), 'invoice.pdf');

        const response = await sendMessage({ number: number, message: message, media: media });
        res.status(200).json({ message: response });
    } catch (error) {
        throw error;
    }
};

const isReady = async (req, res, next) => {
    try {
        const isReady = await isClientReady();

        res.status(200).json({ isReady: isReady });
    } catch (error) {
        console.log(error)
        throw error;
    }
};


module.exports = { validateUser, isReady, sendMessageHandler };
