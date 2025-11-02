const Cart = require('../models/cartModel');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.status(200).json(cart || { items: []});
};


exports.addToCart = async (req, res) => {
    const { productID, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        { $push: { items: { productID, quantity } }, $set: { updatedAt: new Date() } },
        { upsert: true, new: true}
    );
    res.status(200).json(cart);
};


exports.updateCartItem = async (req , res) => {
    const { productId , quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    const item = cart.items.find( i => i.productId.toString() === productId);
    if (item) item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
};


exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { items: { productId } }, $set: { updatedAt: new Date() } },
        { new: true }
    );
    res.status(200).json(cart);
};

