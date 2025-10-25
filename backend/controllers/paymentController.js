const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const { createPaymentRequest, verifyPayment } = require('../helpers/paymentHelper');

exports.initiatePayment = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const paymentUrl = await createPaymentRequest(cart, req.user);
    res.status(200).json({ redirectUrl: paymentUrl });
  } catch (err) {
    console.error('Payment initiation error:', err);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

exports.handlePaymentCallback = async (req, res) => {
    const { Authority, Status } = req.query;
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
       
            if(Status !== 'OK') {
                return res.status(400).json({ error: 'Payment was canceled by user' });
            } 

        const verified = await verifyPayment(Authority, total);
        
          if (!verified) {
             return res.status(400).json({ error: 'Payment verification failed' });
           }


    const order = await Order.create({ userId: req.user._id, items: cart.items, status: 'Paid '});

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Payment successful' , orderId: order._id });
};