const dependencyInjector = require('../depndency-injector');

describe('fileUpload service tests', () => {
    const {initializeS3} = require('../initialization');
    initializeS3();
    const fileUploadService = require('./fileUpload');

    it('listBuckets() is functional', async (done) => {
        const result = await fileUploadService.listBuckets();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    });

    it('createBucket() is functional', async (done) => {
        fileUploadService.createBucket();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })

    it('deleteBucket() is functional', async (done) => {
        fileUploadService.deleteBucket();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('listObjectsInBucket() is functional', async (done) => {
        fileUploadService.listObjectsInBucket();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })

    it('getObject() is functional', async (done) => {
        fileUploadService.getObject();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })
    
    it('getPresignedUrlForObjectGet() is functional', async (done) => {
        fileUploadService.getPresignedUrlForObjectGet();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })

    it('putObject() is functional', async (done) => {
        fileUploadService.putObject();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('getPresignedUrlForObjectPut() is functional', async (done) => {
        fileUploadService.getPresignedUrlForObjectPut();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })
    
    it('deleteObject() is functional', async (done) => {
        fileUploadService.deleteObject();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('deleteObjectsBulk() is functional', async (done) => {
        fileUploadService.deleteObjectsBulk();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('getPresignedUrlForObjectDelete() is functional', async (done) => {
        fileUploadService.getPresignedUrlForObjectDelete();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })

})