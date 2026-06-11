import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) { res.status(400).json({ message: 'Email already registered' }); return; }
    const user = new User({ email, password, name });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.get('role') }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.get('name'), email: user.get('email') } });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { res.status(401).json({ message: 'Invalid credentials' }); return; }
    const match = await (user as any).comparePassword(password);
    if (!match) { res.status(401).json({ message: 'Invalid credentials' }); return; }
    const token = jwt.sign({ userId: user._id, role: user.get('role') }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.get('name'), email: user.get('email') } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

export default router;