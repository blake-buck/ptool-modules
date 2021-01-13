const authenticationService = require('./authentication');
const {initializeCognito, aws} = require('../initialization');
const {AWS_USER_POOL_ID} = require('../config');

describe('authentication services testing', () => {
    initializeCognito();
    const ip = '127.0.0.1';
    const headers = {
        'Accept':'application/json',
        'jwt': 'placeholder_string'
    };

    let username='blakemanbuck@gmail.com';
    let password='temporaryPassword1!';
    let refresh;

    it('register() is functional', async (done) => {
        const result = await authenticationService.register(username, password);
        expect(result.body.CodeDeliveryDetails).toBeTruthy();

        await aws.cognito.adminConfirmSignUp({
            UserPoolId:AWS_USER_POOL_ID,
            Username:username
        }).promise();

        done();
    });

    it('login() is functional', async (done) => {
        const result = await authenticationService.login(username, password, {ip, headers});
        expect(result.body.AuthenticationResult).toBeTruthy();
        headers.jwt = result.body.AuthenticationResult.AccessToken;
        refresh = result.body.AuthenticationResult.RefreshToken;
        done();
    });

    it('refreshToken() is functional', async (done) => {
        const result = await authenticationService.refreshToken({refresh, headers, ip});
        expect(result.body.AuthenticationResult).toBeTruthy();
        done();
    });

    it('changePassword() is functional', async (done) => {
        const previousPassword = password;
        const proposedPassword = 'temporaryPassword@2';
        const result = await authenticationService.changePassword({previousPassword, proposedPassword}, headers.jwt);
        expect(result.body).toBeTruthy();
        done();
    });

    it('forgotPassword() is functional', async (done) => {
        const result = await authenticationService.forgotPassword(username);
        expect(result.body.CodeDeliveryDetails).toBeTruthy();
        done();
    });

    it('deleteAccount() is functional', async (done) => {
        const auth = await authenticationService.login(username, 'temporaryPassword@2', {ip, headers});
        const result = await authenticationService.deleteAccount(auth.body.AuthenticationResult.AccessToken);
        expect(result.body).toBeTruthy();
        done();
    });

})