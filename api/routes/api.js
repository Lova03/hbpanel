const apiRouter = require('express').Router();

const checkAuth = require('../helpers/verify');
const adminVerify = require('../helpers/adminVerify');
const ShopItem = require('../models/shopitem');

apiRouter.get('/items', checkAuth, adminVerify, async (req, res, next) => {
  const docs = await ShopItem.find();
  const toSend = docs.map((item) => {
    if (item.name !== 'keys') return item;
    return { ...item._doc, storage: item._doc.storage.map((key) => key.name) };
  });
  res.status(200).json({ success: true, data: toSend });
});

apiRouter.put('/items', checkAuth, adminVerify, async (req, res, next) => {
  const { item } = req.body;
  const existingItem = await ShopItem.findOne({ name: item.name });
  if (!existingItem) return res.status(404).json({ success: false, msg: 'Předmět nebyl nalezen' });
  await ShopItem.findOneAndUpdate(
    { name: item.name },
    {
      $set: {
        enabled: item.enabled,
        stock: item.stock,
        storage:
          item.name !== 'keys'
            ? item.storage
            : existingItem.storage.filter((x) => item.storage.includes(x.name)),
      },
    }
  );
  res.status(201).json({ success: true, msg: 'Předmět byl úspěšně upraven' });
});

module.exports = apiRouter;
