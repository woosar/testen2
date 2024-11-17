import { Router } from 'express';

import Config from '../models/Config.ts';

const router = Router();

router.get('/config', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Config.find(query).sort({ date: -1 }).limit(1);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
