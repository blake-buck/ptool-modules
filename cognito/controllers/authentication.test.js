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
        try{
            authenticationControllers.register(
                {
                    body: {
                        username: improperUsername,
                        password: properPassword
                    },
                    headers:{}
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    });

    it('register => improper password should fail validation', async (done) => {
        try{
            authenticationControllers.register(
                {
                    body: {
                        username: properUsername,
                        password: improperPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);

        }
        
        done();
    });

    it('register => improper username and password should fail validation', async (done) => {
        try{
            authenticationControllers.register(
                {
                    body: {
                        username: improperUsername,
                        password: improperPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
    
        }
        catch(e){
            expect(true).toBe(true);
        }
        done();
    });



    it('login => non-email username should fail validation', async (done) => {
        try{
            authenticationControllers.login(
                {
                    body: {
                        username: improperUsername,
                        password: properPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    });

    it('login => improper password should fail validation', async (done) => {
        try{
            authenticationControllers.login(
                {
                    body: {
                        username: properUsername,
                        password: improperPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    });

    it('login => improper username and password should fail validation', async (done) => {
        try{
            authenticationControllers.login(
                {
                    body: {
                        username: improperUsername,
                        password: improperPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    });



    it('refreshToken => non-string refresh token should fail validation', async (done) => {
        try{
            authenticationControllers.refreshToken(
                {
                    body: {
                        refresh: false
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    });



    it('changePassword => request without jwt in header should fail validation', async (done) => {
        try{
            authenticationControllers.changePassword(
                {
                    body: {
                        previousPassword: improperPassword,
                        proposedPassword: properPassword
                    },
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('changePassword => improper previousPassword should fail validation', async (done) => {
        try{
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
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('changePassword => improper proposedPassword should fail validation', async (done) => {
        try{
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
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('changePassword => improper previousPassword and proposedPassword should fail validation', async (done) => {
        try{
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
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })



    it('forgotPassword => improper username should fail validation', async (done) => {
        try{
            authenticationControllers.changePassword(
                {
                    body: {
                        username: improperUsername
                    },
                    headers:{}
                },
                mockResponse()
            );
    
        }
        catch(e){
            expect(true).toBe(true);
        }
        done();
    })



    it('confirmForgotPassword => improper confirmation code should fail validation', async (done) => {
        try{
            authenticationControllers.changePassword(
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
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('confirmForgotPassword => improper username should fail validation', async (done) => {
        try{
            authenticationControllers.changePassword(
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
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('confirmForgotPassword => improper password should fail validation', async (done) => {
        try{
            authenticationControllers.changePassword(
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
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })

    it('deleteAccount => header without jwt should fail validation', async (done) => {
        try{
            authenticationControllers.deleteAccount(
                {
                    body: {},
                    headers:{}
                },
                mockResponse()
            );
        }
        catch(e){
            expect(true).toBe(true);
        }

        done();
    })
});