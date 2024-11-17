import { Router } from 'express';
import Item from '../models/Purchase.ts';

const router = Router();

/**
 * GET /items
 * Retrieves all items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get('/items', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
