import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Extending standard Express request type definition locally to carry the decoded session info
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export default function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): any {
  // Get header string formatting ("Bearer <token>")
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  try {
    // Decrypt signature block using your unique environment key
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    
    // Inject the current verified session parameters straight into your processing route context
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token session.' });
  }
}