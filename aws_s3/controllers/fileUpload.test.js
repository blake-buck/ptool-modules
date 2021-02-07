const dependencyInjector = require('../dependency-injector');
dependencyInjector.register('fileUploadService', () => ({
    listBuckets: () => true,
    createBucket: () => true,
    deleteBucket: () => true,
    listObjectsInBucket: () => true,
    getObject: () => true,
    getPresignedUrlForObjectGet: () => true,
    putObject: () => true,
    getPresignedUrlForObjectPut: () => true,
    deleteObject: () => true,
    deleteObjectsBulk: () => true,
    getPresignedUrlForObjectDelete: () => true
}));

const fileUploadController = require('./fileUploadController');

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

describe('file upload controller tests', () => {
    const properBucketId = 'bucketId';
    const properLocation = 'us-east-2';
    const properObjectKey = 'objectKey';
    const properBase64 = 'YmxhaA==';
    const properObjectKeysToDelete = ['a', 'b'];
    const properExpiration = 10;
    const properLimit = 10;
    const properStartAfter = 'objectKey'
    const properPrefix = 'objectK';

    const improperBucketId = 423491;
    const improperLocation = 312492;
    const improperObjectKey = 1238;
    const improperBase64 = 'blah plain text';
    const improperObjectKeysToDelete = [false, 1];
    const improperExpiration = 10;
    const improperLimit = -10;
    const improperStartAfter = true
    const improperPrefix = 41234;

    it('createBucket - improper bucketId fails validation', () => {
        fileUploadController.createBucket(
            {
                body: {
                    bucketId: improperBucketId,
                    location: properLocation
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('createBucket - improper location fails validation', () => {
        fileUploadController.createBucket(
            {
                body: {
                    bucketId: properBucketId,
                    location: improperLocation
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('deleteBucket - improperBucketId fails validation', () => {
        fileUploadController.deleteBucket(
            {
                params:{
                    bucketId: improperBucketId
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('listObjectsInBucket - improperBucketId fails validation', () => {
        fileUploadController.listObjectsInBucket(
            {
                params:{
                    bucketId: improperBucketId
                },
                query: {
                    limit: properLimit,
                    startAfter: properStartAfter,
                    prefix: properPrefix
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('listObjectsInBucket - improperLimit fails validation', () => {
        fileUploadController.listObjectsInBucket(
            {
                params:{
                    bucketId: properBucketId
                },
                query: {
                    limit: improperLimit,
                    startAfter: properStartAfter,
                    prefix: properPrefix
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('listObjectsInBucket - improperStartAfter fails validation', () => {
        fileUploadController.listObjectsInBucket(
            {
                params:{
                    bucketId: properBucketId
                },
                query: {
                    limit: properLimit,
                    startAfter: improperStartAfter,
                    prefix: properPrefix
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('listObjectsInBucket - improperPrefix fails validation', () => {
        fileUploadController.listObjectsInBucket(
            {
                params:{
                    bucketId: properBucketId
                },
                query: {
                    limit: properLimit,
                    startAfter: properStartAfter,
                    prefix: improperPrefix
                }
            },
            mockResponse,
            mockNext
        );
    })


    it('getObject - improperBucketId fails validation', () => {
        fileUploadController.getObject(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                }
            },
            mockResponse,
            mockNext
        );
    })

    it('getObject - improperObjectKey fails validation', () => {
        fileUploadController.getObject(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                }
            },
            mockResponse,
            mockNext
        );
    })


    it('putObject - improperBucketId fails validation', () => {
        fileUploadController.putObject(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                },
                body:{
                    base64: properBase64
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('putObject - improperObjectKey fails validation', () => {
        fileUploadController.putObject(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                },
                body:{
                    base64: properBase64
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('putObject - improperBase64 fails validation', () => {
        fileUploadController.putObject(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: properObjectKey
                },
                body:{
                    base64: improperBase64
                }
            },
            mockResponse,
            mockNext
        );
    });


    it('deleteObject - improperBucketId fails validation', () => {
        fileUploadController.deleteObject(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('deleteObject - improperObjectKey fails validation', () => {
        fileUploadController.deleteObject(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                }
            },
            mockResponse,
            mockNext
        );
    });


    it('deleteObjectsBulk - improperBucketId fails validation', () => {
        fileUploadController.deleteObjectsBulk(
            {
                params:{
                    bucketId: improperBucketId
                },
                body:{
                    objectKeysToDelete:properObjectKeysToDelete
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('deleteObjectsBulk - improperObjectKeysToDelete fails validation', () => {
        fileUploadController.deleteObjectsBulk(
            {
                params:{
                    bucketId: properBucketId
                },
                body:{
                    objectKeysToDelete: improperObjectKeysToDelete
                }
            },
            mockResponse,
            mockNext
        );
    });


    it('getPresignedUrlForObjectGet - improperBucketId fails validation', () => {
        fileUploadController.getPresignedUrlForObjectGet(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectGet - improperObjectKey fails validation', () => {
        fileUploadController.getPresignedUrlForObjectGet(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectGet - improperExpiration fails validation', () => {
        fileUploadController.getPresignedUrlForObjectGet(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:improperExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });


    it('getPresignedUrlForObjectPut - improperBucketId fails validation', () => {
        fileUploadController.getPresignedUrlForObjectPut(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectPut - improperObjectKey fails validation', () => {
        fileUploadController.getPresignedUrlForObjectPut(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectPut - improperExpiration fails validation', () => {
        fileUploadController.getPresignedUrlForObjectPut(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:improperExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });


    it('getPresignedUrlForObjectDelete - improperBucketId fails validation', () => {
        fileUploadController.getPresignedUrlForObjectDelete(
            {
                params:{
                    bucketId: improperBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectDelete - improperObjectKey fails validation', () => {
        fileUploadController.getPresignedUrlForObjectDelete(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: improperObjectKey
                },
                params:{
                    expiration:properExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });

    it('getPresignedUrlForObjectDelete - improperExpiration fails validation', () => {
        fileUploadController.getPresignedUrlForObjectDelete(
            {
                params:{
                    bucketId: properBucketId,
                    objectKey: properObjectKey
                },
                params:{
                    expiration:improperExpiration
                }
            },
            mockResponse,
            mockNext
        );
    });
})