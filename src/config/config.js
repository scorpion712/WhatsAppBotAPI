import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  firebaseServiceAccountKeyPath: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH,
};
