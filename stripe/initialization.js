function initializeStripe(){
    logger.info('Initializing Stripe...');
    const {
        STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY
    } = require('./config');

    const stripe = require('stripe')(STRIPE_SECRET_KEY);
    dependencyInjector.register('stripe', () => stripe);
    logger.info('Stripe initialized...');
}

module.exports.initializeStripe = initializeStripe;