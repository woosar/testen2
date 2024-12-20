import { Router } from 'express';
import Purchase from '../models/Purchase.ts';

const router = Router();

router.get('/purchases', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Purchase.find(query);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
