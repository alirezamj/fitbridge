const cart = require('../models/cartModel');

async function syncCart(userId, sessionCart) {
    const dbCart = await cart.findOne({ userId });

    if(!dbCart) {
        return await cart.create({ userId, items: sessionCart.items || []});
    }

    const mergeItems = mergeCartItems(dbCart.items, sessionCart.items);
    dbCart.items = mergeItems;
    dbCart.updatedAt = new Date();
    await dbCart.save();

    return dbCart;

}


function mergeCartItems(dbItems, sessionItems) {
    const map = new Map()

    dbItems.forEach(item =>  map.set(item.productId.toString(), item.quantity));
    sessionItems.forEach(item => { 
        const id = item.productId.toString();
        map.set(id, (map.get(id) || 0) + item.quantity);
    });
        
    
}

module.exports = { syncCart };