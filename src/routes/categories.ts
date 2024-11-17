import { Router } from 'express';
import Category from '../models/Category.ts';

const router = Router();

/**
 * GET /items
 * Retrieves all items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get('/categories', async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const items = await Category.find(query).sort({ date: -1 }).limit(1);
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

export default router;
