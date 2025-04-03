const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');


let client;
    
let currentSession = null;

let isReady = false;

const initializeClient = () => { 
    client = new Client({
        authStrategy: new LocalAuth({
            dataPath: '/app/.wwebjs_auth'
        }),
        puppeteer: {
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            headless: true,
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--no-first-run',
              '--no-zygote',
              '--single-process',
              '--disable-gpu',
              '--unhandled-rejections=strict'
            ],
        },
    });
    
    client.on('qr', (qr) => {
        // convert qr to image
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generando el QR:', err);
                return;
            }
            // save qr url 
            currentSession = url;
        });
    });
    
    client.on('ready', () => {
        isReady = true;
        console.log('WhatsApp is ready');
    });
    
    client.on('message', (msg) => {
        // console.log(msg.body, msg);
    });
    
    client.initialize();
}

const generateQRCode = () => {
    if (isReady) return "";
    if (currentSession) return currentSession;
    else return "El código QR no ha sido generado"
};

const sendMessage = async (content) => {
    if (!isReady) throw new Error('WhatsApp is not ready');
    const { number, message, media } = content;

    const formattedNumber = number.toString().includes('@c.us') ? number : `549${number}@c.us`;
    try {
        const chat = await client.getChatById(formattedNumber);
        await chat.sendMessage(media ?? message, media ? { caption: message } : undefined);
        return 'Message sent successfully';
    } catch (error) {
        throw new Error('Failed to send message');
    }
};

const isClientReady = async () => {
    return isReady;
};

module.exports = { generateQRCode, isClientReady, sendMessage, initializeClient }; 
