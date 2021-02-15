const dependencyInjector = require('../dependency-injector');
const stripe = dependencyInjector.inject('stripe');

const {BadRequestError} = require('../constants/errors');

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
async function getCustomers(requestObj){
    const {error, value} = getCustomersValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {email, limit, created, startingAfter} = value;
    return await stripe.customers.list({
        email,
        limit,
        created,
        starting_after: startingAfter
    })
}

const getSpecificCustomerValidation = Joi.object({
    customerId: Joi.string()
});
async function getSpecificCustomer(requestObj){
    const {error, value} = getSpecificCustomerValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {customerId} = value;
    return await stripe.customers.retrieve(customerId);
}

const createCustomerValidation = Joi.object({
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone:Joi.number().integer()
});
async function createCustomer(requestObj){
    const {error, value} = createCustomerValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }
    const {description, email, name, phone} = value;

    return await stripe.customers.create({
        description,
        email,
        name,
        phone
    })
}

const updateSpecificCustomerValidation = Joi.object({
    customerId: Joi.string(),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone:Joi.number().integer()
});
async function updateSpecificCustomer(requestObj){
    const {error, value} = updateSpecificCustomerValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        customerId,
        description,
        email,
        name,
        phone
    } = value;

    return await stripe.customers.update(
        customerId,
        {
            description, 
            email,
            name,
            phone
        }
    )
}

const deleteSpecificCustomerValidation = Joi.object({
    customerId: Joi.string()
});
async function deleteSpecificCustomer(requestObj){
    const {error, value} = deleteSpecificCustomerValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {customerId} = value;
    return await stripe.customers.del(customerId);
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
async function createCard(requestObj){
    const {error, value} = createCardValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }
    const {customerId, source} = value;

    return await stripe.customers.createSource(
        customerId,
        {
            source:{
                ...source,
                object: 'card'
            }
        }
    )
}

const getSpecificCardValidation = Joi.object({
    customerId: Joi.string(),
    cardId: Joi.string()
});
async function getSpecificCard(requestObj){
    const {error, value} = getSpecificCardValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {customerId, cardId} = value;

    return await stripe.customers.retrieveSource(
        customerId,
        cardId
    )
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
async function updateSpecificCard(requestObj){
    const {error, value} = updateSpecificCardValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }
    const {
        customerId,
        cardId,
        source
    } = value;

    return stripe.customers.updateSource(
        customerId,
        cardId,
        source
    )
}

const deleteSpecificCardValidation = Joi.object({
    customerId: Joi.string(),
    cardId: Joi.string()
});
async function deleteSpecificCard(requestObj){
    const {error, value} = deleteSpecificCardValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        customerId,
        cardId
    } = value;

    return await stripe.customers.delSource(
        customerId,
        cardId
    )
}

const getSubscriptionsValidation = Joi.object({
    customer: Joi.string(),
    priceId: Joi.string(),
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
async function getSubscriptions(requestObj){
    const {error, value} = getSubscriptionsValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        customer,
        priceId,
        status
    } = value;

    return await stripe.subscriptions.list({
        customer,
        price:priceId,
        status
    })
}

const getSpecificSubscriptionValidation = Joi.object({
    subscriptionId: Joi.string()
});
async function getSpecificSubscription(requestObj){
    const {error, value} = getSpecificSubscriptionValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {subscriptionId} = value;

    return await stripe.subscriptions.retrieve(subscriptionId);
}

const createSubscriptionValidation = Joi.object({
    customerId: Joi.string(),
    items: Joi.array().items(
        Joi.object({
            price: Joi.string(),
            quantity: Joi.number().integer()
        })
    )
});
async function createSubscription(requestObj){
    const {error, value} = createSubscriptionValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }
    const {
        customerId, 
        items
    } = value;

    return await stripe.subscriptions.create({
        customer: customerId,
        items
    })
}

const updateSpecificSubscriptionValidation = Joi.object({
    subscriptionId: Joi.string(),
    items: Joi.array().items(
        Joi.object({
            price: Joi.string(),
            quantity: Joi.number().integer()
        })
    ),
    cancelAtEndOfCurrentPeriod: Joi.boolean()
});
async function updateSpecificSubscription(requestObj){
    const {error, value} = updateSpecificSubscriptionValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        subscriptionId,
        items,
        cancelAtEndOfCurrentPeriod
    } = value;

    return await stripe.subscriptions.update(
        subscriptionId,
        {
            items,
            cancel_at_period_end: cancelAtEndOfCurrentPeriod
        }
    )
}

const deleteSpecificSubscriptionValidation = Joi.object({
    subscriptionId: Joi.string()
});
async function deleteSpecificSubscription(requestObj){
    const {error, value} = deleteSpecificSubscriptionValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {subscriptionId} = value;

    return await stripe.subscriptions.del(subscriptionId);
}



const getProductsValidation = Joi.object({
    active: Joi.boolean()
});
async function getProducts(requestObj){
    const {error, value} = getProductsValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {active} = value;

    return await stripe.products.list({
        active
    })
}
const getSpecificProductValidation = Joi.object({
    productId: Joi.string()
});
async function getSpecificProduct(requestObj){
    const {error, value} = getSpecificProductValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        productId
    } = value;

    return await stripe.products.retrieve(productId);
}
const createProductValidation = Joi.object({
    name: Joi.string().required(),
    description:Joi.string()
});
async function createProduct(requestObj){
    const {error, value} = createProductValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        name,
        description
    } = value;

    return await stripe.products.create({
        name,
        description
    })
}
const updateSpecificProductValidation = Joi.object({
    productId: Joi.string(),
    name: Joi.string(),
    description: Joi.string()
});
async function updateSpecificProduct(requestObj){
    const {error, value} = updateSpecificProductValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        productId,
        name,
        description
    } = value;

    return await stripe.products.update(
        productId,
        {
            name, 
            description
        }
    )
}
const deleteSpecificProductValidation = Joi.object({
    productId: Joi.string()
});
async function deleteSpecificProduct(requestObj){
    const {error, value} = deleteSpecificProductValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {productId} = value;

    return await stripe.products.del(productId);
}



const getPricesValidation = Joi.object({
    active: Joi.boolean(),
    currency:Joi.string().length(3),
    productId: Joi.string(),
    limit: Joi.number().integer().min(1).max(100).default(10)
});
async function getPrices(requestObj){
    const {error, value} = getPricesValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        active,
        currency,
        productId,
        limit
    } = value;

    return await stripe.prices.list({
        active,
        currency,
        product: productId,
        limit
    })
}
const getSpecificPriceValidation = Joi.object({
    priceId: Joi.string()
});
async function getSpecificPrice(requestObj){
    const {error, value} = getSpecificPriceValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {priceId} = value;

    return await stripe.prices.retrieve(priceId);
}
const createPriceValidation = Joi.object({
    currency:Joi.string().length(3),
    unitAmount: Joi.number().integer(),
    productId: Joi.string()
});
async function createPrice(requestObj){
    const {error, value} = createPriceValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        currency,
        unitAmount,
        productId
    } = value;

    return await stripe.prices.create({
        currency,
        unit_amount:unitAmount,
        product: productId
    })
}
const updateSpecificPriceValidation = Joi.object({
    priceId: Joi.string(),
    active: Joi.boolean()
});
async function updateSpecificPrice(requestObj){
    const {error, value} = updateSpecificPriceValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {
        priceId,
        active
    } = value;

    return await stripe.prices.update(
        priceId,
        {
            active
        }
    )
}
const deleteSpecificPriceValidation = Joi.object({
    priceId: Joi.string()
});
async function deleteSpecificPrice(requestObj){
    const {error, value} = deleteSpecificPriceValidation.validate(requestObj);
    if(error){
        throw new BadRequestError(error);
    }

    const {priceId} = value;

    return await stripe.prices.delete(priceId);
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