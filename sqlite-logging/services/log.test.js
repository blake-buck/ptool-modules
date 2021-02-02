
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('logModel', {
        getLogs: () => [{id: 1}, {id: 2}],
        getSpecificLog: () => ({id: 1}),
        postLog: () => ({id: 1}),
        updateLogs: () => true,
        updateSpecificLog: () => true,
        patchLogs: () => true,
        patchSpecificLog: () => true,
        deleteLogs : () => true,
        deleteSpecificLog: () => true
    });
    const logServices = require('./log');


    describe('log service tests', () => {
        it('getLogs should return status 200 and two records', async (done) => {
            let response = await logServices.getLogs({value: {limit:10, offset: 0, fields:'id,name,hostName,pid,level,message,fullBody,time,version'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificLog should return status 200 and a singular record', async (done) => {
            let response = await logServices.getSpecificLog(1,'id,name,hostName,pid,level,message,fullBody,time,version');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });
        
    })
    