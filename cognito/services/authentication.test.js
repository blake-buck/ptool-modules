const authenticationService = require('./authentication');
const aws = require('../initialization');

describe('authentication services testing', () => {
    const ip = 'localhost';
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

        await aws.cognito.adminConfirmSignup({
            UserPoolId:'',
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
        const result = await authenticationService.changePassword({previousPassword, proposedPassword});
        expect(result.body).toBeTruthy();
        done();
    });

    it('forgotPassword() is functional', async (done) => {
        const result = await authenticationService.forgotPassword(username);
        expect(result.body.CodeDeliveryDetails).toBeTruthy();
        done();
    });

    it('deleteAccount() is functional', async (done) => {
        const result = await authenticationService.deleteAccount(jwt);
        expect(result.body).toBeTruthy();
        done();
    });

})