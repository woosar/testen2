import { Router } from 'express';
import Transaction from '../models/Transaction.ts';

const router = Router();

/**
 * GET /items
 * Retrieves all items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get('/transactions', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Transaction.find(query);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
