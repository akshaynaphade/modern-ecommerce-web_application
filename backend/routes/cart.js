const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Add/update item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, qty = 1 } = req.body;
    const itemObj = await Item.findById(itemId);
    if (!itemObj) return res.status(404).json({ msg: 'Item not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const idx = cart.items.findIndex(ci => ci.item.toString() === itemId);
    if (idx > -1) {
      cart.items[idx].qty = qty;
    } else {
      cart.items.push({ item: itemId, qty });
    }
    await cart.save();
    await cart.populate('items.item');
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Remove item
router.post('/remove', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(400).json({ msg: 'Cart not found' });

    cart.items = cart.items.filter(ci => ci.item.toString() !== itemId);
    await cart.save();
    await cart.populate('items.item');
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
