const dependencyInjector = require('../dependency-injector');
const request = require('supertest');
const express = require('express');

const {initializeS3} = require('../initialization');
initializeS3();
dependencyInjector.register('fileUploadService', () => require('../services/fileUpload'));
dependencyInjector.register('fileUploadController', () => require('../controllers/fileUpload'));
const fileUploadRouter = require('./fileUpload.js');

const bucketName = `super${Math.random().toFixed(5)}random${Math.random().toFixed(5)}`;
const objectKey = 'textDocument.txt';
const base64 = 'YmxhaA==';

afterAll(async () => {
    const fileUploadService = dependencyInjector.inject('fileUploadService');
    await fileUploadService.deleteBucket(bucketName);
});

describe('fileUpload route tests', () => {
    const app = express();
    app.use(express.json());
    app.use(fileUploadRouter);

    it('GET - /buckets', async (done) => {
        request(app)
            .get('/upload/buckets')
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) console.log(err);
                console.log(response.body)
                done();
            })
    })

    it('POST - /bucket', async (done) => {
        request(app)
            .post('/upload/bucket')
            .set('Accept', 'application/json')
            .send({
                bucketId: bucketName,
                location: 'us-east-2'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) console.log(err);
                console.log(response.body)
                done();
            })
    })

    it('DELETE - /bucket/:bucketId', async (done) => {
        request(app)
            .delete(`/upload/bucket/${bucketName}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, response) => {
                if(err) console.log(err);
                console.log(response.body)

                console.log(dependencyInjector)
                await dependencyInjector.dependencies.fileUploadService.createBucket({
                    bucketId:bucketName,
                    location:'us-east-2'
                })
                done();
            });
    })


    it('GET - /bucket/:bucketId/objects', async (done) => {
        request(app)
            .get(`/upload/bucket/${bucketName}/objects`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('PUT - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .put(`/upload/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({base64})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) console.log(err);
                console.log(response.body)
                done();
            });
    })

    it('GET - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .get(`/upload/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) console.log(err);
                console.log(response.body)
                done();
            });
    })


    it('GET - /bucket/:bucketId/object/:objectKey/url/get', async (done) => {
        request(app)
            .get(`/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/put', async (done) => {
        request(app)
            .get(`/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/delete', async (done) => {
        request(app)
            .get(`/upload/bucket/${bucketName}/object/${objectKey}/url/get`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done);
    })


    it('DELETE - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .delete(`/bucket/${bucketName}/object/${objectKey}`)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, response) => {
                if(err) console.log(err);
                console.log(response.body)

                await dependencyInjector.dependencies.fileUploadService.putObject({
                    bucketId: bucketName,
                    objectKey,
                    base64
                })

                done();
            })
    })

    it('DELETE - /bucket/:bucketId/objects', async (done) => {
        request(app)
            .delete(`/upload/bucket/${bucketName}/objects`)
            .set('Accept', 'application/json')
            .send({objectKeysToDelete:[ objectKey ]})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) console.log(err);
                console.log(response.body)
                done();
            });
    })
})