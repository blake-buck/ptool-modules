const { describe } = require('joi');
const authenticationControllers = require('./authentication');

const mockResponse = () => {
    const res = {};
    res.status = (passedInStatus) => {
        res.status = passedInStatus
        return res;
    };
    res.json = (passedInBody) => {
        res.body = passedInBody;
        return res;
    }

    return res;
};

const improperUsername = 'notAnEmail';
const improperPassword = 'improperPassword';

const properUsername = 'temporaryUsername@notarealaddressihope.com';
const properPassword = 'temporaryPassword1!';

describe('authentication controller tests', () => {
    it('register => non-email username should fail validation', async (done) => {
        const result = await authenticationControllers.register(
            {
                body: {
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });

    it('register => improper password should fail validation', async (done) => {
        const result = await authenticationControllers.register(
            {
                body: {
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });

    it('register => improper username and password should fail validation', async (done) => {
        const result = await authenticationControllers.register(
            {
                body: {
                    username: improperUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });



    it('login => non-email username should fail validation', async (done) => {
        const result = await authenticationControllers.login(
            {
                body: {
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });

    it('login => improper password should fail validation', async (done) => {
        const result = await authenticationControllers.login(
            {
                body: {
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });

    it('login => improper username and password should fail validation', async (done) => {
        const result = await authenticationControllers.login(
            {
                body: {
                    username: improperUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });



    it('refreshToken => non-string refresh token should fail validation', async (done) => {
        const result = await authenticationControllers.refreshToken(
            {
                body: {
                    refresh: false
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    });



    it('changePassword => request without jwt in header should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: properPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('changePassword => improper previousPassword should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: properPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('changePassword => improper proposedPassword should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: properPassword,
                    proposedPassword: improperPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('changePassword => improper previousPassword and proposedPassword should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: improperPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })



    it('forgotPassword => improper username should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    username: improperUsername
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })



    it('confirmForgotPassword => improper confirmation code should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:false,
                    username: properUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('confirmForgotPassword => improper username should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:'123456',
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('confirmForgotPassword => improper password should fail validation', async (done) => {
        const result = await authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:'123455',
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })

    it('deleteAccount => header without jwt should fail validation', async (done) => {
        const result = await authenticationControllers.deleteAccount(
            {
                body: {},
                headers:{}
            },
            mockResponse()
        );

        expect(result.status).toBe(400);
        done();
    })
});