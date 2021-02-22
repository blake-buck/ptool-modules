const dependencyInjector = require('../dependency-injector');
const {initializeStripe} = require('../initialization');
initializeStripe();
const stripeService = require('./stripe');



const properEmail = 'test@email.com';
    const properGt = '2012-09-27'
    const properGte = '2012-09-27';
    const properLt = '2012-09-27';
    const properLte = '2012-09-27';
    const properLimit = 10;
    const properStartingAfter = 'abcKey';
    let properCustomerId = 'cus_ganetksrd';
    const properDescription = 'description';
    const properName = 'Name Jeff';
    const properPhone = 12358931;
    const properSource = 'tok_mastercard';
    let properCardId = 'card_amnerejksd';
    const properExpirationMonth = 'string'
    const properExpirationYear = 'string'
    const properAddressLineOne = 'string'
    const properAddressLineTwo = 'string'
    const properCity = 'string'
    const properState = 'string'
    const properZip = 'string'
    const properCountry = 'string'
    const properStatus = 'active';
    let properSubscriptionId = 'sub_antmear'
    const properItems = [{price: '12341', quantity: 12}];
    const properCancelAtEndOfCurrentPeriod = true;
    const properActive = true;
    let properProductId = 'prod_alkmntemasdne';
    const properCurrency = 'USD';
    const properUnitAmount = 1234;
    let properPriceId = 'price_abdskjern'

    const improperEmail = 'test';
    const improperGt = '2012-09-'
    const improperGte = 291;
    const improperLt = false;
    const improperLte = {};
    const improperLimit = 'ten';
    const improperStartingAfter = 123;
    const improperCustomerId = 2138;
    const improperDescription = true;
    const improperName = null;
    const improperPhone = '12358931a';
    const improperSource = 345;
    const improperCardId = [];
    const improperExpirationMonth = 222
    const improperExpirationYear = false;
    const improperAddressLineOne = {};
    const improperAddressLineTwo = [];
    const improperCity = true;
    const improperState = null;
    const improperZip = false;
    const improperCountry = {}
    const improperStatus = 1;
    const improperSubscriptionId = true
    const improperItems = [{price: 1128, quantity: 'tewelve'}];
    const improperCancelAtEndOfCurrentPeriod = 'truee';
    const improperActive = [];
    const improperProductId = null;
    const improperCurrency = 'USDA';
    const improperUnitAmount = [];
    const improperPriceId = 1823;

let customerId = '';
let cardId = '';
let source = 'tok_visa';
let priceId = '';
let subscriptionId = '';
let productId = '';
beforeAll(async () => {
    const customerResult = await dependencyInjector.dependencies.stripe.customers.create({
        email: 'test@emailtwo.com'
    });
    customerId = customerResult.id;

    const cardResult = await dependencyInjector.dependencies.stripe.customers.createSource({
        customer: customerId,
        source
    });
    cardId = cardResult.id;

    const priceResult = await dependencyInjector.dependencies.stripe.prices.create({
        currency:'USD',
        unit_amount:100
    })
    priceId = priceResult.id;

    const subscriptionResult = await dependencyInjector.dependencies.stripe.subscriptions.create({
        customer: customerId,
        items:[
            {price: priceId}
        ]
    })
    subscriptionId = subscriptionResult.id;

    const productResult = await dependencyInjector.dependencies.stripe.products.create({
        active:true,
        name:'test product'
    })

    productId = productResult.id;
})

afterAll(async () => {
    const customerResult = await dependencyInjector.dependencies.stripe.customers.del(customerId);

    const cardResult = await dependencyInjector.dependencies.stripe.customers.deleteSource(customerId, cardId);

    const priceResult = await dependencyInjector.dependencies.stripe.prices.del(priceId);

    const subscriptionResult = await dependencyInjector.dependencies.stripe.subscriptions.del(subscriptionId);

    const productResult = await dependencyInjector.dependencies.stripe.products.del(productId)
})

describe('stripe service tests', () => {
    

    it('getCustomers - improperEmail fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: improperEmail,
                created:{
                    gt: properGt,
                    gte: properGte,
                    lt: properLt,
                    lte: properLte
                },
                limit: properLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperGt fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: improperGt,
                    gte: properGte,
                    lt: properLt,
                    lte: properLte
                },
                limit: properLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperGte fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: properGt,
                    gte: improperGte,
                    lt: properLt,
                    lte: properLte
                },
                limit: properLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperLt fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: properGt,
                    gte: properGte,
                    lt: improperLt,
                    lte: properLte
                },
                limit: properLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperLte fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: properGt,
                    gte: properGte,
                    lt: properLt,
                    lte: improperLte
                },
                limit: properLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperLimit fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: properGt,
                    gte: properGte,
                    lt: properLt,
                    lte: properLte
                },
                limit: improperLimit,
                startingAfter: properStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers - improperStartingAfter fails validation', async (done) => {
        try{
            await stripeService.getCustomers({
                email: properEmail,
                created:{
                    gt: properGt,
                    gte: properGte,
                    lt: properLt,
                    lte: properLte
                },
                limit: properLimit,
                startingAfter: improperStartingAfter
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getCustomers is functional', async (done) => {
        const result = await stripeService.getCustomers({});
        expect(result).toHaveProperty('data');
        expect(typeof result.data).toBe('array');
        done();
    })

    it('getSpecificCustomer - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.getSpecificCustomer({
                customerId: improperCustomerId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getSpecificCustomer is functional', async (done) => {
        const result = await stripeService.getSpecificCustomer({
            customerId
        });
        expect(result).toBeTruthy();
        exect(result.id).toBe(customerId);
        done();
    });


    it('createCustomer - improperDescription fails validation', async (done) => {
        try{
            await stripeService.createCustomer({
                description: improperDescription,
                email: properEmail,
                name: properName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createCustomer - improperEmail fails validation', async (done) => {
        try{
            await stripeService.createCustomer({
                description: properDescription,
                email: improperEmail,
                name: properName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createCustomer - improperName fails validation', async (done) => {
        try{
            await stripeService.createCustomer({
                description: properDescription,
                email: properEmail,
                name: improperName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createCustomer - improperPhone fails validation', async (done) => {
        try{
            await stripeService.createCustomer({
                description: properDescription,
                email: properEmail,
                name: properName,
                phone: improperPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createCustomer is functional' , async (done) => {
        const result = await stripeService.createCustomer({
            description: properDescription,
            email: properEmail,
            name: properName,
            phone: properPhone
        });
        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        expect(result.description).toBe(properDescription);
        properCustomerId = result.id;
        done();
    });


    it('updateSpecificCustomer - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCustomer({
                customerId: improperCustomerId,
                description: properDescription,
                email: properEmail,
                name: properName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCustomer - improperDescription fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCustomer({
                customerId: properCustomerId,
                description: improperDescription,
                email: properEmail,
                name: properName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCustomer - improperEmail fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCustomer({
                customerId: properCustomerId,
                description: properDescription,
                email: improperEmail,
                name: properName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCustomer - improperName fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCustomer({
                customerId: properCustomerId,
                description: properDescription,
                email: properEmail,
                name: improperName,
                phone: properPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCustomer - improperPhone fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCustomer({
                customerId: properCustomerId,
                description: properDescription,
                email: properEmail,
                name: properName,
                phone: improperPhone
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCustomer is functional', async (done) => {
        const description =  `updated description ${Math.random()}`;
        const result = await stripeService.updateSpecificCustomer({
            customerId,
            description
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(customerId);
        expect(result.description).toBe(description)
    })


    it('deleteSpecificCustomer - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificCustomer({
                customerId: improperCustomerId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('deleteSpecificCustomer is functional', async (done) => {
        const result = await stripeService.deleteSpecificCard({
            customerId: properCustomerId
        });
        expect(result).toBeTruthy();
        done();
    });


    it('createCard - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.createCard({
                customerId: improperCustomerId,
                source: properSource
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createCard - improperSource fails validation', async (done) => {
        try{
            await stripeService.createCard({
                customerId: properCustomerId,
                source: improperSource
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('createCard is functional', async (done) => {
        const result = await stripeService.createCard({
            customer: customerId,
            source: properSource
        })
        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        expect(result.customer).toBe(customerId);
        properCardId = result.id;
        done();
    })


    it('getSpecificCard - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.getSpecificCard({
                customerId: improperCustomerId,
                cardId: properCardId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getSpecificCard - improperCardId fails validation', async (done) => {
        try{
            await stripeService.getSpecificCard({
                customerId: properCustomerId,
                cardId: improperCardId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getSpecificCard is functional', async (done) => {
        const result = await stripeService.getSpecificCard({
            customerId,
            cardId
        });
        expect(result).toBeTruthy();
        expect(result.id).toBe(cardId);
        expect(result.customer).toBe(customerId)
        done();
    })

    it('updateSpecificCard - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: improperCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperCardId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: improperCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperExpirationMonth fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: improperExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperExpirationYear fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: improperExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperAddressLineOne fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: improperAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperAddressLineTwo fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: improperAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperCity fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: improperCity,
                    state: properState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperState fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: improperState,
                    zip: properZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperZip fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: improperZip,
                    country: properCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificCard - improperCountry fails validation', async (done) => {
        try{
            await stripeService.updateSpecificCard({
                customerId: properCustomerId,
                cardId: properCardId,
                source:{
                    expirationMonth: properExpirationMonth,
                    expirationYear: properExpirationYear,
                    addressLineOne: properAddressLineOne,
                    addressLineTwo: properAddressLineTwo,
                    city: properCity,
                    state: properState,
                    zip: properZip,
                    country: improperCountry
                }
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('updateSpecificCard is functional', async (done) => {
        const city = 'updated city';
        const expirationMonth = '12';
        const expirationYear = '25';
        const result = await stripeService.updateSpecificCard({
            customerId,
            cardId,
            source:{
                city,
                expirationMonth,
                expirationYear
            }
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(cardId);
        expect(result.customer).toBe(customerId);
        expect(result.address_city).toBe(city);
        expect(result.exp_month).toBe(expirationMonth);
        expect(result.exp_year).toBe(expirationYear);
    });

    it('deleteSpecificCard - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificCard({
                customerId: improperCustomerId,
                cardId: properCardId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('deleteSpecificCard - improperCardId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificCard({
                customerId: properCustomerId,
                cardId: improperCardId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('deleteSpecificCard is functional', async (done) => {
        const result = await stripeService.deleteSpecificCard({
            customerId: properCustomerId,
            cardId: properCardId
        })
        expect(result).toBeTruthy();
        done();
    })

    it('getSubscriptions - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.getSubscriptions({
                customerId: improperCustomerId,
                priceId: properPriceId,
                status: properStatus
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getSubscriptions - improperPriceId fails validation', async (done) => {
        try{
            await stripeService.getSubscriptions({
                customerId: properCustomerId,
                priceId: improperPriceId,
                status: properStatus
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getSubscriptions - improperStatus fails validation', async (done) => {
        try{
            await stripeService.getSubscriptions({
                customerId: properCustomerId,
                priceId: properPriceId,
                status: improperStatus
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getSubscriptions is functional', async (done) => {
        const result = await stripeService.getSubscriptions({
            customerId
        });
        expect(result).toBeTruthy();
        expect(typeof result.data).toBe('array');
        done();
    })

    it('getSpecificSubscription - improperSubscriptionId fails validation', async (done) => {
        try{
            await stripeService.getSpecificSubscription({
                subscriptionId: improperSubscriptionId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getSpecificSubscription is functional', async (done) => {
        const result = await stripeService.getSpecificSubscription({
            subscriptionId
        });
        expect(result).toBeTruthy();
        expect(result.id).toBe(subscriptionId);
        done();
    });

    it('createSubscription - improperCustomerId fails validation', async (done) => {
        try{
            await stripeService.createSubscription({
                customerId: improperCustomerId,
                items: properItems
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('createSubscription - improperItems fails validation', async (done) => {
        try{
            await stripeService.createSubscription({
                customerId: properCustomerId,
                items: improperItems
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('createSubscription is functional', async (done) => {
        const result = await stripeService.createSubscription({
            customerId,
            items:[
                {price: priceId}
            ]
        });
        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        properSubscriptionId = result.id;
        done();
    })

    it('updateSpecificSubscription - improperSubscriptionId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificSubscription({
                subscriptionId: improperSubscriptionId,
                items: properItems,
                cancelAtEndOfCurrentPeriod: properCancelAtEndOfCurrentPeriod
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificSubscription - improperItems fails validation', async (done) => {
        try{
            await stripeService.updateSpecificSubscription({
                subscriptionId: properSubscriptionId,
                items: improperItems,
                cancelAtEndOfCurrentPeriod: properCancelAtEndOfCurrentPeriod
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificSubscription - improperCancelAtEndOfCurrentPeriod fails validation', async (done) => {
        try{
            await stripeService.updateSpecificSubscription({
                subscriptionId: properSubscriptionId,
                items: properItems,
                cancelAtEndOfCurrentPeriod: improperCancelAtEndOfCurrentPeriod
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificSubscription is functional', async (done) => {
        const result = await stripeService.updateSpecificSubscription({
            subscriptionId,
            cancelAtEndOfCurrentPeriod: false
        });
        expect(result).toBeTruthy();
        expect(result.id).toBe(subscriptionId);
        expect(result.cancelAtEndOfCurrentPeriod).toBe(false);
        done();
    });

    it('deleteSpecificSubscription - improper subscriptionId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificSubscription({
                subscriptionId: improperSubscriptionId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('deleteSpecificSubscription is functional', async (done) => {
        const result = await stripeService.deleteSpecificSubscription({
            subscriptionId: properSubscriptionId
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(properSubscriptionId);
        done();
    })

    it('getProducts - improperActive fails validation', async (done) => {
        try{
            await stripeService.getProducts({
                active: improperActive
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getProducts is functional', async (done) => {
        const result = await stripeService.getProducts({});
        expect(result).toBeTruthy();
        expect(typeof result.data).toBe('array');
        done();
    })

    it('getSpecificProduct - improperProductId fails validation', async (done) => {
        try{
            await stripeService.getSpecificProduct({
                productId: improperProductId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getSpecificProduct is functional', async (done) => {
        const result = await stripeService.getSpecificProduct({
            productId
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(productId);
        done();
    })

    it('createProduct - improperName fails validation', async (done) => {
        try{
            await stripeService.createProduct({
                name: improperName,
                description: properDescription
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('createProduct - improperDescription fails validation', async (done) => {
        try{
            await stripeService.createProduct({
                name: properName,
                description: improperDescription
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createProduct is functional', async (done) => {
        const result = await stripeService.createProduct({
            name: properName,
            description: properDescription
        })
        expect(result).toBeTruthy();
        expect(result.name).toBe(properName);
        expect(result.description).toBe(properDescription);
        properProductId = result.id;

        done();
    })

    it('updateSpecificProduct - improperProductId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificProduct({
                productId: improperProductId,
                name: properName,
                description: properDescription
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificProduct - improperName fails validation', async (done) => {
        try{
            await stripeService.updateSpecificProduct({
                productId: properProductId,
                name: improperName,
                description: properDescription
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificProduct - improperDescription fails validation', async (done) => {
        try{
            await stripeService.updateSpecificProduct({
                productId: properProductId,
                name: properName,
                description: improperDescription
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificProduct is functional', async (done) => {
        const description = `Random${Math.random()}`;
        const result = await stripeService.updateSpecificProduct({
            productId: properProductId,
            description
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(properProductId);
        expect(result.description).toBe(description);
        done();
    })

    it('deleteSpecificProduct - improperProductId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificProduct({
                productId: improperProductId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('deleteSpecificProduct is functional', async (done) => {
        const result = await stripeService.deleteSpecificProduct({
            productId: properProductId
        });
        expect(result).toBeTruthy();
        expect(result.id).toBe(properProductId);
        done();
    })

    it('getPrices - improperActive fails validation', async (done) => {
        try{
            await stripeService.getPrices({
                active: improperActive,
                currency: properCurrency,
                productId: properProductId,
                limit: properLimit
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getPrices - improperCurrency fails validation', async (done) => {
        try{
            await stripeService.getPrices({
                active: properActive,
                currency: improperCurrency,
                productId: properProductId,
                limit: properLimit
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getPrices - improperProductId fails validation', async (done) => {
        try{
            await stripeService.getPrices({
                active: properActive,
                currency: properCurrency,
                productId: improperProductId,
                limit: properLimit
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getPrices - improperLimit fails validation', async (done) => {
        try{
            await stripeService.getPrices({
                active: properActive,
                currency: properCurrency,
                productId: properProductId,
                limit: improperLimit
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getPrices is functional', async (done) => {
        const result = await stripeService.getPrices({});
        expect(result).toBeTruthy();
        expect(typeof result.data).toBe('array');
        done();
    })

    it('getSpecificPrice - improperPriceId fails validation', async (done) => {
        try{
            await stripeService.getSpecificPrice({
                priceId: improperPriceId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('getSpecificPriceId is functional', async (done) => {
        const result = await stripeService.getSpecificPrice({
            priceId
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(priceId);
        done();
    })

    it('createPrice - improperCurrency fails validation', async (done) => {
        try{
            await stripeService.createPrice({
                currency: improperCurrency,
                unitAmount: properUnitAmount,
                productId: properProductId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createPrice - improperUnitAmount fails validation', async (done) => {
        try{
            await stripeService.createPrice({
                currency: properCurrency,
                unitAmount: improperUnitAmount,
                productId: properProductId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createPrice - improperProductId fails validation', async (done) => {
        try{
            await stripeService.createPrice({
                currency: properCurrency,
                unitAmount: properUnitAmount,
                productId: improperProductId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('createPrice is functional', async (done) => {
        const result = await stripeService.createPrice({
            currency: properCurrency,
            unitAmount: properUnitAmount,
            productId
        })
        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        properPriceId = result.id;
        done();
    })

    it('updateSpecificPrice - improperActive fails validation', async (done) => {
        try{
            await stripeService.updateSpecificPrice({
                active: improperActive,
                priceId: properPriceId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificPrice - improperPriceId fails validation', async (done) => {
        try{
            await stripeService.updateSpecificPrice({
                active: properActive,
                priceId: improperPriceId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('updateSpecificPrice is functional', async (done) => {
        const result = await stripeService.updateSpecificPrice({
            priceId: properPriceId,
            active:false
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(priceId);
        expect(result.active).toBe(false);
        done();
    })

    it('deleteSpecificProduct - improperPriceId fails validation', async (done) => {
        try{
            await stripeService.deleteSpecificPrice({
                priceId: improperPriceId
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    })

    it('deleteSpecificProduct is functional', async (done) => {
        const result = await stripeService.deleteSpecificPrice({
            priceId: properPriceId
        })
        expect(result).toBeTruthy();
        expect(result.id).toBe(properPriceId);
        done();
    })


});