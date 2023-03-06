const asyncHandler = require('express-async-handler');
const User = require('../models/ConsumerModel');
const Cart = require('../models/cartmodel');
const Product = require('../models/productmodel');

const addToCart = asyncHandler(async(req, res) => {
  const { username, productName, quantity,price } = req.body;
  console.log(req.body)
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const product = await Product.findOne({  name:productName });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    const newCart = new Cart({
      user: user._id,
      items: [{
        productName: product.name,
        quantity,
        price: product.price
      }]
    });
    await newCart.save();
    res.status(200).json({ message: 'Cart created' });
  } else {
    const cartItem = cart.items.find(item => item.productName === product.name);
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.price += quantity * product.price;
    } else {
      cart.items.push({
        productName: product.name,
        quantity,
        price: product.price
      });
    }
    await cart.save();
    res.status(200).json({ message: 'Cart updated' });
  }
});

module.exports = { addToCart };
