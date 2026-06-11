import { Router, Request, Response } from 'express';
import Salary from '../models/Salary';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { company, role, level, location, page = '1', limit = '50' } = req.query;
    const filter: any = { verified: true };
    if (company) filter.company = { $regex: String(company), $options: 'i' };
    if (role) filter.role = { $regex: String(role), $options: 'i' };
    if (level) filter.level = String(level);
    if (location) filter.location = { $regex: String(location), $options: 'i' };
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const total = await Salary.countDocuments(filter);
    const salaries = await Salary.find(filter).sort({ totalComp: -1 }).skip(skip).limit(parseInt(limit as string));
    res.json({ salaries, total, page: parseInt(page as string), totalPages: Math.ceil(total / parseInt(limit as string)) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Salary.aggregate([
      { $match: { verified: true } },
      { $group: { _id: '$company', avgBase: { $avg: '$base' }, avgBonus: { $avg: '$bonus' }, avgStock: { $avg: '$stock' }, avgTotal: { $avg: '$totalComp' }, maxTotal: { $max: '$totalComp' }, minTotal: { $min: '$totalComp' }, count: { $sum: 1 } } },
      { $sort: { avgTotal: -1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/company/:name', async (req: Request, res: Response): Promise<void> => {
  try {
    const salaries = await Salary.find({ company: { $regex: String(req.params.name), $options: 'i' }, verified: true }).sort({ totalComp: -1 });
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { base, bonus, stock } = req.body;
    const salary = new Salary({ ...req.body, totalComp: base + bonus + stock, submittedBy: req.user?.userId, verified: false });
    await salary.save();
    res.status(201).json({ message: 'Submitted for review', salary });
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error });
  }
});

router.patch('/:id/verify', protect, adminOnly, async (req: Request, res: Response): Promise<void> => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;