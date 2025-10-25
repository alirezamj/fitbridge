const ZarinpalCheckout = require('zarinpal-checkout');

const zarinpal = ZarinpalCheckout.create('e316e68f-9cc2-41fe-91a4-a6e4d3271349', true); //true = sandbox mode

module.exports = zarinpal;