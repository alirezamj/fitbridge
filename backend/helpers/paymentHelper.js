const zarinpal = require("./zarinpalClient");

exports.createPaymentRequest = async (cart, user) => {
    const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    const response = await zarinpal.PaymentRequest({
        Amount: total,
        CallbackURL: 'http://localhost:5000/api/payment/callback',
        Description: `FitBridge purchase for user ${user.email}`,
        Email: user.email,
    });

    if (response.status === 100) {
        return response.url; //Redirect user to this URL
    }else {
        throw new Error(`Zarinpal error: ${response.status}`);
    }
};

exports.verifyPayment = async (Authority, Amount) => {
    const response = await zarinpal.PaymentVerification({
        Amount,
        Authority
    });
    return response.status === '100';
};