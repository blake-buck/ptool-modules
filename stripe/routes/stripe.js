const dependencyInjector = require('../dependency-injector');
const stripeController = dependencyInjector.inject('stripeController');

const express = require('express');
const router = express.Router();

router.get('/stripe/customers', stripeController.getCustomers);
router.get('/stripe/customer/:customerId', stripeController.getSpecificCustomer);
router.post('/stripe/customer', stripeController.createCustomer);
router.put('/stripe/customer/:customerId', stripeController.updateSpecificCustomer);
router.delete('/stripe/customer/:customerId', stripeController.deleteSpecificCustomer);

router.get('/stripe/customer/:customerId/card/:cardId', stripeController.getSpecificCard);
router.post('/stripe/customer/:customerId/card', stripeController.createCard);
router.put('/stripe/customer/:customerId/card/:cardId', stripeController.updateSpecificCard);
router.delete('/stripe/customer/:customerId/card/:cardId', stripeController.deleteSpecificCard);

router.get('/stripe/subscriptions', stripeController.getSubscriptions);
router.get('/stripe/subscription/:subscriptionId', stripeController.getSpecificSubscription);
router.post('/stripe/subscription', stripeController.createSubscription);
router.put('/stripe/subscription/:subscriptionId', stripeController.updateSpecificSubscription);
router.delete('/stripe/subscription/:subscriptionId', stripeController.deleteSpecificSubscription);

router.get('/stripe/products', stripeController.getProducts);
router.get('/stripe/product/:productId', stripeController.getSpecificProduct);
router.post('/stripe/product', stripeController.createProduct);
router.put('/stripe/product/:productId', stripeController.updateSpecificProduct);
router.delete('/stripe/product/:productId', stripeController.deleteSpecificProduct);

router.get('/stripe/prices', stripeController.getPrices);
router.get('/stripe/price/:priceId', stripeController.getSpecificPrice);
router.post('/stripe/price', stripeController.createPrice);
router.put('/stripe/price/:priceId', stripeController.updateSpecificPrice);
router.delete('/stripe/price/:priceId', stripeController.deleteSpecificPrice);

module.exports = router;