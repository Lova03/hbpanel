const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userid: { type: String, unique: true, required: true },
    coins: { type: Number, default: 15 },
    hcoins: { type: Number, default: 0 },
    nickname: { type: String, default: '' },
    daily: { type: Number, default: 0 },
    inventory: {
      cases: {
        jamcase: { type: Number, default: 0 },
        houmlescase: { type: Number, default: 0 },
        zcase: { type: Number, default: 0 },
        vipcase: { type: Number, default: 0 },
        monkecase: { type: Number, default: 0 },
        vigocase: { type: Number, default: 0 },
        lukdogcase: { type: Number, default: 0 },
        dreamcase: { type: Number, default: 0 },
      },
    },
    bj: { type: Object, default: {} },
    active: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
