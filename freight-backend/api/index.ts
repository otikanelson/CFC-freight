import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In-memory storage (replace with database in production)
const usersDb: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_development';

// CORS headers helper
function setCORSHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
}

// Auth middleware function
function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  setCORSHeaders(res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url, method } = req;
    console.log(`${new Date().toISOString()} - ${method} ${url}`);

    // Parse URL to get route
    const urlParts = url?.split('/') || [];
    const route = urlParts[urlParts.length - 1];

    // Health check
    if (url === '/health' || route === 'health') {
      return res.status(200).json({
        status: 'Server is running perfectly',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
      });
    }

    // API info
    if (url === '/api' || url === '/') {
      return res.status(200).json({
        message: 'Freight API is running on Vercel!',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        routes: ['/api/auth/signup', '/api/auth/login', '/api/auth/me', '/health']
      });
    }

    // Auth routes
    if (url?.includes('/api/auth')) {
      
      // SIGNUP
      if (method === 'POST' && (route === 'signup' || url?.endsWith('/signup'))) {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !password) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user exists
        const userExists = usersDb.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
          return res.status(400).json({ error: 'An account with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = {
          id: Date.now().toString(),
          fullName,
          email: email.toLowerCase(),
          phone: phone || '',
          password: hashedPassword,
        };
        usersDb.push(newUser);

        // Generate token
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.status(201).json({
          message: 'Account registered successfully',
          token,
          user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email },
        });
      }

      // LOGIN
      if (method === 'POST' && (route === 'login' || url?.endsWith('/login'))) {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.status(200).json({
          message: 'Login successful',
          token,
          user: { id: user.id, fullName: user.fullName, email: user.email },
        });
      }

      // GET CURRENT USER
      if (method === 'GET' && (route === 'me' || url?.endsWith('/me'))) {
        const authHeader = req.headers.authorization as string;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
          return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
          return res.status(403).json({ error: 'Invalid or expired token session.' });
        }

        const user = usersDb.find(u => u.id === decoded.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
          user: { id: user.id, fullName: user.fullName, email: user.email }
        });
      }
    }

    // 404 for unknown routes
    return res.status(404).json({
      error: 'Route not found',
      path: url,
      method: method
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Something went wrong'
    });
  }
}