import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware, { AuthenticatedRequest } from '../middleware/auth';

const router = Router();

const usersDb: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

router.post('/signup', async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Signup request received:', req.body);
    const { fullName, email, phone, password } = req.body;

    // 1. Basic validation
    if (!fullName || !email || !password) {
      console.log('Missing fields - fullName:', !!fullName, 'email:', !!email, 'password:', !!password);
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Check if user already exists
    const userExists = usersDb.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // 3. Hash the user's password safely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and store user entry record
    const newUser = {
      id: Date.now().toString(), // Generates a clean random unique string id
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      password: hashedPassword,
    };
    usersDb.push(newUser);
    console.log('User created successfully:', newUser.id, newUser.email);

    // 5. Generate authorization token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log('Account created, returning response');
    return res.status(201).json({
      message: 'Account registered successfully',
      token,
      user: { id: newUser.id, fullName: newUser.fullName, email: newUser.email },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================================
// LOGIN ENDPOINT: POST /api/auth/login
// ==========================================
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Check if user exists in our local store
    const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 3. Compare hashed strings using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 4. Sign standard session token wrapper
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================================
// GET CURRENT USER: GET /api/auth/me
// ==========================================
router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    const user = usersDb.find(u => u.id === req.user?.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      user: { id: user.id, fullName: user.fullName, email: user.email }
    });
  } catch (error) {
    console.error('Get user Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;