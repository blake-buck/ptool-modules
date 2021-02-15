const dependencyInjector = require('../dependency-injector');
const stripe = dependencyInjector.inject('stripe');

const Joi = require('joi');

const getCustomersValidation = Joi.object({
    email: Joi.string(),
    created: Joi.object({
        gt: Joi.string().isoDate(),
        gte: Joi.string().isoDate(),
        lt: Joi.string().isoDate(),
        lte: Joi.string().isoDate()
    }),
    limit: Joi.number().integer().max(100).min(1).default(10),
    startingAfter: Joi.string()
});
async function getCustomers(){

}

const getSpecificCustomerValidation = Joi.object({
    customerId: Joi.string()
});
async function getSpecificCustomer(){

}

const createCustomerValidation = Joi.object({
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone:Joi.number().integer()
});
async function createCustomer(){

}

const updateSpecificCustomerValidation = Joi.object({
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone:Joi.number().integer()
});
async function updateSpecificCustomer(){

}

const deleteSpecificCustomerValidation = Joi.object({
    customerId: Joi.string()
});
async function deleteSpecificCustomer(){

}

const createCardValidation = Joi.object({
    customerId: Joi.string(),
    source:Joi.object({
        number: Joi.string(),
        expirationMonth: Joi.string().length(2),
        expirationYear: Joi.alternatives(
            Joi.string().length(2),
            Joi.string().length(4)
        ),
        cvc: Joi.string(),
        name: Joi.string(),
        addressLineOne: Joi.string(),
        addressLineTwo: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
    })
});
async function createCard(){

}

const getSpecificCardValidation = Joi.object({
    customerId: Joi.string(),
    cardId: Joi.string()
});
async function getSpecificCard(){

}

const updateSpecificCardValidation = Joi.object({
    customerId: Joi.string(),
    cardId: Joi.string(),
    source:Joi.object({
        number: Joi.string(),
        expirationMonth: Joi.string().length(2),
        expirationYear: Joi.alternatives(
            Joi.string().length(2),
            Joi.string().length(4)
        ),
        cvc: Joi.string(),
        name: Joi.string(),
        addressLineOne: Joi.string(),
        addressLineTwo: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string()
    })
});
async function updateSpecificCard(){

}

const deleteSpecificCardValidation = Joi.object({
    customerId: Joi.string(),
    cardId: Joi.string()
});
async function deleteSpecificCard(){

}

const getSubscriptionsValidation = Joi.object({
    customer: Joi.string(),
    price: Joi.string(),
    status:Joi.alternatives().try(
        'active',
        'past_due',
        'unpaid',
        'canceled',
        'incomplete',
        'incomplete_expired',
        'trialing',
        'all',
        'ended'
    )
});
async function getSubscriptions(){

}

const getSpecificSubscriptionValidation = Joi.object({
    subscriptionId: Joi.string()
});
async function getSpecificSubscription(){

}

const createSubscriptionValidation = Joi.object({
    customer: Joi.string(),
    items: Joi.array().items(
        Joi.object({
            price: Joi.string(),
            quantity: Joi.number().integer()
        })
    )
});
async function createSubscription(){

}

const updateSpecificSubscriptionValidation = Joi.object({
    items: Joi.array().items(
        Joi.object({
            price: Joi.string(),
            quantity: Joi.number().integer()
        })
    ),
    cancelAtEndOfCurrentPeriod: Joi.boolean()
});
async function updateSpecificSubscription(){

}

const deleteSpecificSubscriptionValidation = Joi.object({
    subscriptionId: Joi.string()
});
async function deleteSpecificSubscription(){

}



const getProductsValidation = Joi.object({
    active: Joi.boolean()
});
async function getProducts(){

}
const getSpecificProductValidation = Joi.object({
    productId: Joi.string()
});
async function getSpecificProduct(){

}
const createProductValidation = Joi.object({
    name: Joi.string().required(),
    description:Joi.string()
});
async function createProduct(){

}
const updateSpecificProductValidation = Joi.object({
    productId: Joi.string(),
    name: Joi.string(),
    description: Joi.string()
});
async function updateSpecificProduct(){

}
const deleteSpecificProductValidation = Joi.object({
    productId: Joi.string()
});
async function deleteSpecificProduct(){

}



const getPricesValidation = Joi.object({
    active: Joi.boolean(),
    currency:Joi.string().length(3),
    productId: Joi.string(),
    limit: Joi.number().integer().min(1).max(100).default(10)
});
async function getPrices(){

}
const getSpecificPriceValidation = Joi.object({
    priceId: Joi.string()
});
async function getSpecificPrice(){

}
const createPriceValidation = Joi.object({
    currency:Joi.string().length(3),
    unitAmount: Joi.number().integer(),
    productId: Joi.string()
});
async function createPrice(){

}
const updateSpecificPriceValidation = Joi.object({
    priceId: Joi.string()
});
async function updateSpecificPrice(){

}
const deleteSpecificPriceValidation = Joi.object({
    priceId: Joi.string()
});
async function deleteSpecificPrice(){

}

module.exports = {
    getCustomers,
    getSpecificCustomer,
    createCustomer,
    updateSpecificCustomer,
    deleteSpecificCustomer,
    createCard,
    getSpecificCard,
    updateSpecificCard,
    deleteSpecificCard,
    getSubscriptions,
    getSpecificSubscription,
    createSubscription,
    updateSpecificSubscription,
    deleteSpecificSubscription,
    getProducts,
    getSpecificProduct,
    createProduct,
    updateSpecificProduct,
    deleteSpecificProduct,
    getPrices,
    getSpecificPrice,
    createPrice,
    updateSpecificPrice,
    deleteSpecificPrice
}