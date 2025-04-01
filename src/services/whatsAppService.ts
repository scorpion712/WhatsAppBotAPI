import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
const qrcode = require('qrcode');

interface WhatsAppMessageContent {
  number: string;
  message: string;
  media?: MessageMedia;
}

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--unhandled-rejections=strict",
    ],
  },
});

let currentSession: string | null = null;

let isReady: boolean = false;

client.on('qr', (qr: string) => {
  // convert qr to image
  qrcode.toDataURL(qr, (err: any, url: string) => {
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

client.on('message', (msg: any) => {
  // console.log(msg.body, msg);
});

client.initialize();

export const generateQRCode = () => {
  return new Promise<string>((resolve, reject) => {
    if (isReady)
      resolve("");
    if (currentSession) {
      resolve(currentSession);
    } else {
      reject('El código QR no ha sido generado');
    }
  });
};

export const sendMessage = async (content: WhatsAppMessageContent): Promise<string> => {
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

export const isClientReady = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    if (isReady) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};