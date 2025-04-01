import * as admin from 'firebase-admin'; 
import { config } from '../config/config';

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccountKeyPath as admin.ServiceAccount),
});

export default admin;
