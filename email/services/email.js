const dependencyInjector = require('../dependency-injector');
const emailTransport = dependencyInjector.inject('emailTransport');

async function sendEmail(){

}

module.exports = {
    sendEmail
}