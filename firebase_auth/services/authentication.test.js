const {initializeFirebaseAuth, firebase} = require('../initialization');
const authenticationService = require('./authentication');

describe('Firebase authentication tests', () => {
    const email = 'blake.buck@hey.com';
    const password = 'temporaryPassword@1';
    const newPassword = 'temporaryPassword@2';

    initializeFirebaseAuth();

    it('register should work', async (done) => {
        const {status, body} = await authenticationService.register(email, password);
        expect(status).toBe(200);
        expect(body.message).toBeTruthy();

        // need to manually verify users while running unit tests
        const {uid} = await firebase.admin.getUserByEmail(email);
        await firebase.admin.updateUser(uid, {emailVerified: true});

        done();
    });

    it('login should work', async (done) => {
        const {status, body} = await authenticationService.login(email, password);
        expect(status).toBe(200);
        expect(body.jwt).toBeTruthy();

        done();
    });

    it('change password should work', async (done) => {
        const {status, body} = await authenticationService.changePassword(password, newPassword);
        expect(status).toBe(200);
        expect(body.message).toBeTruthy();

        done();
    });

    it('forgot password should work', async (done) => {
        const {status, body} = await authenticationService.forgotPassword(email);
        expect(status).toBe(200);
        expect(body.message).toBeTruthy();

        done();
    })

    it('delete account should work', async (done) => {
        const authResult = await authenticationService.login(email, newPassword);

        const {status, body} = await authenticationService.deleteAccount(authResult.body.jwt);
        expect(status).toBe(200);
        expect(body.message).toBeTruthy();
        
        done();
    });

})