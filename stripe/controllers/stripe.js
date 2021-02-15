const dependencyInjector = require('../dependency-injector');
const stripeService = dependencyInjector.inject('stripeService');
const controllerWrapper = require('./controllerWrapper');

async function getCustomers(request, response){
    const result = await stripeService.getCustomers(request.query);
    response.status(200).json(result);
}

async function getSpecificCustomer(request, response){
    const result = await stripeService.getSpecificCustomer(request.params);
    response.status(200).json(result);
}

async function createCustomer(request, response){
    const result = await stripeService.createCustomer(request.body);
    response.status(200).json({message: 'Customer record created'});
}

async function updateSpecificCustomer(request, response){
    const result = await stripeService.updateSpecificCustomer({
        ...request.params,
        ...request.body
    })
    response.status(200).json({message: 'Customer record updated'})
}

async function deleteSpecificCustomer(request, response){
    const result = await stripeService.deleteSpecificCustomer(request.params)
    response.status(200).json({message: 'Customer record deleted'})
}

async function createCard(request, response){
    const result = await stripeService.createCard(request.body);
    response.status(200).json({message: 'Card record created'})
}

async function getSpecificCard(request, response){
    const result = await stripeService.getSpecificCard(request.params);
    response.status(200).json(result);
}

async function updateSpecificCard(request, response){
    const result = await stripeService.updateSpecificCard({
        ...request.params,
        ...request.body
    })
    response.status(200).json({message: 'Card record updated'})
}

async function deleteSpecificCard(request, response){
    const result = await stripeService.deleteSpecificCard(request.params);
    response.status(200).json({message: 'Card record deleted'})
}

async function getSubscriptions(request, response){
    const result = await stripeService.getSubscriptions(request.query);
    response.status(200).json(result);
}

async function getSpecificSubscription(request, response){
    const result = await stripeService.getSpecificSubscription(request.params);
    response.status(200).json(result)
}

async function createSubscription(request, response){
    const result = await stripeService.createSubscription(request.body);
    response.status(200).json({message: 'Subscription record created'})
}

async function updateSpecificSubscription(request, response){
    const result = await stripeService.updateSpecificSubscription({
        ...request.params,
        ...request.body
    })
    response.status(200).json({message: 'Subscription record updated'})
}

async function deleteSpecificSubscription(request, response){
    const result = await stripeService.deleteSpecificSubscription(request.params);
    response.status(200).json({message: 'Subscription record deleted'})
}

async function getProducts(request, response){
    const result = await stripeService.getProducts(request.query);
    response.status(200).json(result)
}

async function getSpecificProduct(request, response){
    const result = await stripeService.getSpecificProduct(request.params);
    response.status(200).json(result)
}

async function createProduct(request, response){
    const result = await stripeService.createProduct(request.body);
    response.status(200).json({message: 'Product record created'})
}

async function updateSpecificProduct(request, response){
    const result = await stripeService.updateSpecificProduct({
        ...request.params,
        ...request.body
    })
    response.status(200).json({message: 'Product record updated'})
}

async function deleteSpecificProduct(request, response){
    const result = await stripeService.deleteSpecificProduct(request.params);
    response.status(200).json({message: 'Product record deleted'})
}

async function getPrices(request, response){
    const result = await stripeService.getPrices(request.query);
    response.status(200).json(result);
}

async function getSpecificPrice(request, response){
    const result = await stripeService.getSpecificPrice(request.params);
    response.status(200).json(result);
}

async function createPrice(request, response){
    const result = await stripeService.createPrice(request.body);
    response.status(200).json({message: 'Price record created'})
}

async function updateSpecificPrice(request, response){
    const result = await stripeService.updateSpecificPrice({
        ...request.params,
        ...request.body
    })
    response.status(200).json({message: 'Price record updated'})
}

async function deleteSpecificPrice(request, response){
    const result = await stripeService.deleteSpecificPrice(request.params);
    response.status(200).json({message: 'Price record deleted'})
}


module.exports = {
    getCustomers: controllerWrapper(getCustomers),
    getSpecificCustomer: controllerWrapper(getSpecificCustomer),
    createCustomer: controllerWrapper(createCustomer),
    updateSpecificCustomer: controllerWrapper(updateSpecificCustomer),
    deleteSpecificCustomer: controllerWrapper(deleteSpecificCustomer),
    createCard: controllerWrapper(createCard),
    getSpecificCard: controllerWrapper(getSpecificCard),
    updateSpecificCard: controllerWrapper(updateSpecificCard),
    deleteSpecificCard: controllerWrapper(deleteSpecificCard),
    getSubscriptions: controllerWrapper(getSubscriptions),
    getSpecificSubscription: controllerWrapper(getSpecificSubscription),
    createSubscription: controllerWrapper(createSubscription),
    updateSpecificSubscription: controllerWrapper(updateSpecificSubscription),
    deleteSpecificSubscription: controllerWrapper(deleteSpecificSubscription),
    getProducts: controllerWrapper(getProducts),
    getSpecificProduct: controllerWrapper(getSpecificProduct),
    createProduct: controllerWrapper(createProduct),
    updateSpecificProduct: controllerWrapper(updateSpecificProduct),
    deleteSpecificProduct: controllerWrapper(deleteSpecificProduct),
    getPrices: controllerWrapper(getPrices),
    getSpecificPrice: controllerWrapper(getSpecificPrice),
    createPrice: controllerWrapper(createPrice),
    updateSpecificPrice: controllerWrapper(updateSpecificPrice),
    deleteSpecificPrice: controllerWrapper(deleteSpecificPrice)
}