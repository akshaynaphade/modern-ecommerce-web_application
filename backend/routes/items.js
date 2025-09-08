const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// Create item (protected)
router.post('/', auth, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Read items with filters: ?category=&minPrice=&maxPrice=&q=
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (q) filter.name = { $regex: q, $options: 'i' };
    const items = await Item.find(filter).limit(200);
    res.json(items);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Read single
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Update item (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Delete (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
