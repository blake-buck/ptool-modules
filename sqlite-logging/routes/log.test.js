
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');

    const {initializeLoggingSqlite, initializeStandardMiddleware} = require('../initialization');

    initializeLoggingSqlite(':memory:');
    dependencyInjector.register('logModel', () => require('../models/log'));
    dependencyInjector.register('logService', () => require('../services/log'));
    dependencyInjector.register('logController', () => require('../controllers/log'));

    const logRouter = require('./log');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.loggingSqlite.run('CREATE TABLE log(id INTEGER PRIMARY KEY ASC, name TEXT, hostName TEXT, pid INTEGER, level INTEGER, message TEXT, fullBody TEXT, time TEXT, version INTEGER);', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.loggingSqlite.run('INSERT INTO log(name, hostName, pid, level, message, fullBody, time, version) VALUES("string", "string", 0, 0, "string", "string", "string", 0);', (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            dependencyInjector.dependencies.loggingSqlite.run('INSERT INTO log(name, hostName, pid, level, message, fullBody, time, version) VALUES("string", "string", 0, 0, "string", "string", "string", 0);', (err) => {
                                if(err){
                                    reject(err);
                                }
                                else{
                                    resolve(true);
                                }
                            })
                        }
                    })
                }
            })
        });
    })
    
    afterEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.loggingSqlite.run('DROP TABLE log', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('log routes tests ', () => {
        const app = express();
        initializeStandardMiddleware(app);
        app.use(logRouter);


        it('GET - /api/v1/log', async (done) => {
            request(app)
                .get('/api/v1/log')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(async (err, res) => {
                    if(err){
                        console.error(err);
                        console.log(res.error)
                        done();
                    }
                    expect(res.body).toBeTruthy();
                    done();
                });
        });

        it('GET - /api/v1/log/:id', async (done) => {
            request(app)
                .get('/api/v1/log/1')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(async (err, res) => {
                    if(err){
                        console.error(err);
                        console.log(res.error)
                        done();
                    }
    
                    expect(res.body).toBeTruthy();
    
                    done();
                });
        });

        it('GET - /api/v1/log/count', async (done) => {
            request(app)
                .get('/api/v1/log/count')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(async (err, res) => {
                    if(err){
                        console.error(err);
                        console.log(res.error)
                        done();
                    }
    
                    expect(res.body).toBeTruthy();
                    expect(res.body.count).toBe(2);
    
                    done();
                });
        })
    
    })
    