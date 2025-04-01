import { Request, Response, NextFunction } from 'express';
import admin from '../utils/firebaseAuth';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authorization token is missing' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

export default authMiddleware;
