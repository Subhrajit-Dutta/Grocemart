const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  items: [{
    productName: {
      type: String,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
Note that I've made a few changes to the schema based on the cartcontroller code:

Changed name to productName in the items array to match the request body.
Made productName in the items array not required since it's already being checked for existence in the controller.
Added required: true to the user field since it's required in the controller.




