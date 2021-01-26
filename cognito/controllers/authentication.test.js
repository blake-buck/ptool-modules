const dependencyInjector = require('../dependency-injector');
dependencyInjector.register('authenticationService', {
    register: () => true,
    login: () => true,
    refreshToken: () => true,
    changePassword: () => true,
    forgotPassword: () => true,
    confirmForgotPassword: () => true,
    deleteAccount: () => true
});
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

const mockNext = (e) => {
    expect(e).toBeTruthy();
}

const improperUsername = 'notAnEmail';
const improperPassword = 'improperPassword';

const properUsername = 'temporaryUsername@notarealaddressihope.com';
const properPassword = 'temporaryPassword1!';

describe('authentication controller tests', () => {
    it('register => non-email username should fail validation', () => {
        authenticationControllers.register(
            {
                body: {
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        )
    });

    it('register => improper password should fail validation', () => {
        authenticationControllers.register(
            {
                body: {
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });

    it('register => improper username and password should fail validation', () => {
        authenticationControllers.register(
            {
                body: {
                    username: improperUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });



    it('login => non-email username should fail validation', () => {
        authenticationControllers.login(
            {
                body: {
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });

    it('login => improper password should fail validation', () => {
        authenticationControllers.login(
            {
                body: {
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });

    it('login => improper username and password should fail validation', () => {
        authenticationControllers.login(
            {
                body: {
                    username: improperUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });



    it('refreshToken => non-string refresh token should fail validation', () => {
        authenticationControllers.refreshToken(
            {
                body: {
                    refresh: false
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    });



    it('changePassword => request without jwt in header should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: properPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('changePassword => improper previousPassword should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: properPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('changePassword => improper proposedPassword should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: properPassword,
                    proposedPassword: improperPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('changePassword => improper previousPassword and proposedPassword should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    previousPassword: improperPassword,
                    proposedPassword: improperPassword
                },
                headers: {
                    jwt: 'string'
                }
            },
            mockResponse(),
            mockNext
        );
    })



    it('forgotPassword => improper username should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    username: improperUsername
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })



    it('confirmForgotPassword => improper confirmation code should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:false,
                    username: properUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('confirmForgotPassword => improper username should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:'123456',
                    username: improperUsername,
                    password: properPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('confirmForgotPassword => improper password should fail validation', () => {
        authenticationControllers.changePassword(
            {
                body: {
                    confirmationCode:'123455',
                    username: properUsername,
                    password: improperPassword
                },
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })

    it('deleteAccount => header without jwt should fail validation', () => {
        authenticationControllers.deleteAccount(
            {
                body: {},
                headers:{}
            },
            mockResponse(),
            mockNext
        );
    })
});