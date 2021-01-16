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

const improperEmail = 'notAnEmail';
const improperPassword = 'improperPassword';

const properEmail = 'temporaryUsername@notarealaddressihope.com';
const properPassword = 'temporaryPassword1!';

describe('authentication controller tests', () => {
    it('improper email should fail register validation', () => {
        authenticationControllers.register(
            {
                body: {
                    username: improperEmail,
                    password: properPassword
                }
            },
            mockResponse(),
            mockNext
        )
        
    });

    it('improper password should fail register validation',  () => {
        authenticationControllers.register(
            {
                body: {
                    username: properEmail,
                    password: improperPassword
                }
            },
            mockResponse(),
            mockNext
        )
    });

    it('improper email should fail login validation',  () => {
            authenticationControllers.login(
                {
                    body: {
                        username: improperEmail,
                        password: properPassword
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('improper password should fail login validation',  () => {
            authenticationControllers.login(
                {
                    body: {
                        username: properEmail,
                        password: improperPassword
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('headers without JWT should fail changePassword validation',  () => {
            authenticationControllers.changePassword(
                {
                    body: {
                        username: properEmail,
                        previousPassword: properPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        
                    }
                },
                mockResponse(),
                mockNext
            )
        
    })

    it('improper email should fail changePassword validation',  () => {
            authenticationControllers.changePassword(
                {
                    body: {
                        username: improperEmail,
                        previousPassword: properPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('improper previousPassword should fail changePassword validation',  () => {
            authenticationControllers.changePassword(
                {
                    body: {
                        username: properEmail,
                        previousPassword: improperPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('improper proposedPassword should fail changePassword validation',  () => {
            authenticationControllers.changePassword(
                {
                    body: {
                        username: properEmail,
                        previousPassword: properPassword,
                        proposedPassword: improperPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('improper email should fail forgotPassword validation',  () => {
            authenticationControllers.forgotPassword(
                {
                    body: {
                        email: improperEmail
                    }
                },
                mockResponse(),
                mockNext
            )
        
    });

    it('headers without jwt should fail deleteAccount validation',  () => {
            authenticationControllers.deleteAccount(
                {
                    body:{},
                    headers:{}
                },
                mockResponse(),
                mockNext
            )
        
    });

});