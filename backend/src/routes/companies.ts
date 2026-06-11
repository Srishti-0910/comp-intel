import { Router, Request, Response } from 'express';
import Salary from '../models/Salary';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Salary.aggregate([
      { $match: { verified: true } },
      { $group: { _id: '$company', avgTotal: { $avg: '$totalComp' }, avgBase: { $avg: '$base' }, avgBonus: { $avg: '$bonus' }, avgStock: { $avg: '$stock' }, roles: { $addToSet: '$role' }, locations: { $addToSet: '$location' }, count: { $sum: 1 } } },
      { $sort: { avgTotal: -1 } },
    ]);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/compare', async (req: Request, res: Response): Promise<void> => {
  try {
    const names = (req.query.companies as string)?.split(',').slice(0, 3);
    if (!names || names.length === 0) { res.status(400).json({ message: 'Provide up to 3 company names' }); return; }
    const results = await Promise.all(names.map(async (name) => {
      const data = await Salary.aggregate([
        { $match: { company: { $regex: name.trim(), $options: 'i' }, verified: true } },
        { $group: { _id: '$company', avgBase: { $avg: '$base' }, avgBonus: { $avg: '$bonus' }, avgStock: { $avg: '$stock' }, avgTotal: { $avg: '$totalComp' }, maxTotal: { $max: '$totalComp' }, count: { $sum: 1 } } },
      ]);
      return data[0] || null;
    }));
    res.json(results.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;