const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopItemSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    keyword: { type: String, unique: true, required: true },
    storage: { type: Array, default: [] },
    stock: { type: Number, default: 1 },
    description: { type: String, default: '-' },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShopItems', shopItemSchema);
