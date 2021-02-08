const dependencyInjector = require('../depndency-injector');

describe('fileUpload service tests', () => {
    const {initializeS3} = require('../initialization');
    initializeS3();
    const fileUploadService = require('./fileUpload');

    const bucketId = `super${Math.random().toFixed(5)}random${Math.random().toFixed(5)}`;
    const objectKey = 'textDocument.txt';
    const base64 = '';
    const expiration = 500;

    it('listBuckets() is functional', async (done) => {
        const result = await fileUploadService.listBuckets();
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    });

    it('createBucket() is functional', async (done) => {
        const result = await fileUploadService.createBucket({
            bucketId,
            location: 'us-east-2'
        });
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })

    it('deleteBucket() is functional', async (done) => {
        const result = await fileUploadService.deleteBucket(bucketId);
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();

        await fileUploadService.createBucket({
            bucketId,
            location: 'us-east-2'
        });
        done();
    })
    
    it('listObjectsInBucket() is functional', async (done) => {
        const result = await fileUploadService.listObjectsInBucket({bucketId});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })

    it('putObject() is functional', async (done) => {
        const result = await fileUploadService.putObject({bucketId, objectKey, base64});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })

    it('getObject() is functional', async (done) => {
        const result = await fileUploadService.getObject({bucketId, objectKey});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        done();
    })
    
    it('getPresignedUrlForObjectGet() is functional', async (done) => {
        const result = await fileUploadService.getPresignedUrlForObjectGet({bucketId, objectKey, expiration});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })

    
    
    it('getPresignedUrlForObjectPut() is functional', async (done) => {
        const result = await fileUploadService.getPresignedUrlForObjectPut({bucketId, objectKey, expiration});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })
    
    it('deleteObject() is functional', async (done) => {
        const result = await fileUploadService.deleteObject({bucketId, objectKey});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('deleteObjectsBulk() is functional', async (done) => {
        const result = await fileUploadService.deleteObjectsBulk({bucketId, objectKeysToDelete: [objectKey]});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.message).toBeTruthy();
        done();
    })
    
    it('getPresignedUrlForObjectDelete() is functional', async (done) => {
        const result = await fileUploadService.getPresignedUrlForObjectDelete({bucketId, objectKey, expiration});
        expect(result.status).toBe(200);
        expect(result.body).toBeTruthy();
        expect(result.body.url).toBeTruthy();
        done();
    })

})