const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
