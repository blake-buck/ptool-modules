const dependencyInjector = require('../dependency-injector');
const request = require('supertest');
const express = require('express');

describe('fileUpload route tests', () => {
    const {initializeS3} = require('../initialization');
    initializeS3();
    dependencyInjector.register('fileUploadService', () => require('../services/fileUpload'));
    dependencyInjector.register('fileUploadController', () => require('../controllers/fileUpload'));
    const authRouter = require('./authentication.js');

    const app = express();
    app.use(express.json());
    app.use(authRouter);


    it('GET - /buckets', async (done) => {
        request(app)
            .get()
    })

    it('POST - /bucket', async (done) => {
        request(app)
    })

    it('DELETE - /bucket/:bucketId', async (done) => {
        request(app)
    })


    it('GET - /bucket/:bucketId/objects', async (done) => {
        request(app)
            .get()
    })

    it('DELETE - /bucket/:bucketId/objects', async (done) => {
        request(app)
    })


    it('GET - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
            .get()
    })

    it('PUT - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
    })

    it('DELETE - /bucket/:bucketId/object/:objectKey', async (done) => {
        request(app)
    })


    it('GET - /bucket/:bucketId/object/:objectKey/url/get', async (done) => {
        request(app)
            .get()
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/put', async (done) => {
        request(app)
            .get()
    })

    it('GET - /bucket/:bucketId/object/:objectKey/url/delete', async (done) => {
        request(app)
            .get()
    })
})