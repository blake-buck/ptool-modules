
        const dependencyInjector = require('../dependency-injector.js');
        dependencyInjector.register(
            'logService', 
            () => ({
                getLogs: () => true,
                getSpecificLog: () => true,
                postLog: () => true,
                updateLogs: () => true,
                updateSpecificLog: () => true,
                patchLogs: () => true,
                patchSpecificLog: () => true,
                deleteLogs: () => true,
                deleteSpecificLog: () => true
            })
        );
        const logControllers = require('./log');

        const properValues = {"id":1,"name":"string","hostName":"string","pid":0,"level":0,"message":"string","fullBody":"string","time":"string","version":0};
        const patchSpecificProperValues = {"name":"string","hostName":"string","pid":0,"level":0,"message":"string","fullBody":"string","time":"string","version":0}

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

        describe('log controller tests', () => {
            
    it('getLogs - improper offset fails validation', () => {
        logControllers.getLogs(
            {
                query:{
                    offset: "string",
                    limit: 10,
                    fields: "string,string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getLogs - improper limit fails validation', () => {
        logControllers.getLogs(
            {
                query:{
                    offset: 0,
                    limit: "string",
                    fields: "string,string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getLogs - improper fields fails validation', () => {
        logControllers.getLogs(
            {
                query:{
                    offset: 0,
                    limit: 10,
                    fields: false
                }
            },
            mockResponse(),
            mockNext
        );
    })

    it('getSpecificLog - improper id fails validation', () => {
        logControllers.getLogs(
            {
                query:{
                    fields: "string,string"
                },
                param:{
                    id: "string"
                }
            },
            mockResponse(),
            mockNext
        );
    })
    it('getSpecificLog - improper fields fails validation', () => {
        logControllers.getLogs(
            {
                query:{
                    fields: false
                },
                param:{
                    id: 1
                }
            },
            mockResponse(),
            mockNext
        );
    })

})
    