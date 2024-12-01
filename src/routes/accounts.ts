import { Router } from 'express';
import Account from '../models/Account.ts';

const router = Router();

router.get('/accounts', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Account.find(query);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
