const dependencyInjector = require('../dependency-injector');
const request = require('supertest');
const express = require('express');

describe('fileUpload route tests', () => {
    const {initializeS3} = require('../initialization');
    initializeS3();
    dependencyInjector.register('fileUploadService', () => require('../services/fileUpload'));
    dependencyInjector.register('fileUploadController', () => require('../controllers/fileUpload'));
    const authRouter = require('./authentication.js');

    const fileUploadService = dependencyInjector.inject('fileUploadService');

    const app = express();
    app.use(express.json());
    app.use(authRouter);

    const bucketName = `super${Math.random().toFixed(5)}random${Math.random().toFixed(5)}`;
    const objectKey = 'textDocument.txt';
    const base64 = '';

    it('GET - /buckets', async (done) => {
        request(app)
            .get('/api/v1/upload/bucket')
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('POST - /bucket', async (done) => {
        request(app)
            .post('/api/v1/upload/bucket')
            .set('Accept', 'application/json')
            .send({
                bucketId: bucketName,
                region: 'us-east-2'
            })
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('DELETE - /bucket/:bucketId', async (done) => {
        request(app)
            .delete(`/api/v1/upload/bucket/${bucketName}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async () => {
                await fileUploadService.createBucket({
                    bucketId:bucketName,
                    location:'us-east-2'
                })
                done();
            });
    })


    it('GET - /bucket/:bucketId/objects', async (done) => {
        request(app)
            .get(`/api/v1/upload/bucket/${bucketName}/objects`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('DELETE - /bucket/:bucketId/objects', async (done) => {
        request(app)
            .delete(`/api/v1/upload/bucket/${bucketName}/objects`)
            .set('Accept', 'application/json')
            .send({objectKeysToDelete:[]})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('PUT - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .put(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({base64})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .get(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('DELETE - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .delete(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async () => {
                await fileUploadService.putObject({
                    bucketId: bucketName,
                    objectKey,
                    base64
                })
            });
    })


    it('GET - /bucket/:bucketId/object/:objectKey/url/get', async (done) => {
        request(app)
            .get(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/put', async (done) => {
        request(app)
            .get(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/delete', async (done) => {
        request(app)
            .get(`/api/v1/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})