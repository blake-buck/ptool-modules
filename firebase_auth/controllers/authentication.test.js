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

const improperEmail = 'notAnEmail';
const improperPassword = 'improperPassword';

const properEmail = 'temporaryUsername@notarealaddressihope.com';
const properPassword = 'temporaryPassword1!';

describe('authentication controller tests', () => {
    it('improper email should fail register validation', async (done) => {
        try{
            await authenticationControllers.register(
                {
                    body: {
                        email: improperEmail,
                        password: properPassword
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper password should fail register validation', async (done) => {
        try{
            await authenticationControllers.register(
                {
                    body: {
                        email: properEmail,
                        password: improperPassword
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper email should fail login validation', async (done) => {
        try{
            await authenticationControllers.login(
                {
                    body: {
                        email: improperEmail,
                        password: properPassword
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper password should fail login validation', async (done) => {
        try{
            await authenticationControllers.login(
                {
                    body: {
                        email: properEmail,
                        password: improperPassword
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('headers without JWT should fail changePassword validation', async (done) => {
        try{
            await authenticationControllers.changePassword(
                {
                    body: {
                        email: properEmail,
                        previousPassword: properPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    })

    it('improper email should fail changePassword validation', async (done) => {
        try{
            await authenticationControllers.changePassword(
                {
                    body: {
                        email: improperEmail,
                        previousPassword: properPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper previousPassword should fail changePassword validation', async (done) => {
        try{
            await authenticationControllers.changePassword(
                {
                    body: {
                        email: properEmail,
                        previousPassword: improperPassword,
                        proposedPassword: properPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper proposedPassword should fail changePassword validation', async (done) => {
        try{
            await authenticationControllers.changePassword(
                {
                    body: {
                        email: properEmail,
                        previousPassword: properPassword,
                        proposedPassword: improperPassword
                    },
                    headers: {
                        jwt:'aaaaaa'
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('improper email should fail forgotPassword validation', async (done) => {
        try{
            await authenticationControllers.forgotPassword(
                {
                    body: {
                        email: improperEmail
                    }
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

    it('headers without jwt should fail deleteAccount validation', async (done) => {
        try{
            await authenticationControllers.deleteAccount(
                {
                    body:{},
                    headers:{}
                },
                mockResponse()
            )
        }
        catch(e){
            expect(true).toBe(true);
            done();
        }
    });

});