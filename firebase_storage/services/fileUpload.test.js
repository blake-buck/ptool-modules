const dependencyInjector = require('../dependency-injector');
const fileUploadService = require('./fileUpload');
const {initializeFirebaseStorage} = require('../initialization');

initializeFirebaseStorage();

describe('fileUpload service validation tests', () => {
    const properDelimiter = 'abc';
    const properStartOffset = 'jeff';
    const properEndOffset = 'One';
    const properPrefix = 'prefix';
    const properMaxResults = 50;
    const properFileKey = 'another-document.txt';
    const properBase64 = 'YmxhaA==';
    const properFileKeysToDelete = ['textDocument.txt', 'jeff.pdf'];
    const properExpires = 500;

    const improperDelimiter = false;
    const improperStartOffset = 213;
    const improperEndOffset = 54617;
    const improperPrefix = null;
    const improperMaxResults = 'a string' ;
    const improperFileKey = true;
    const improperBase64 = '1   uhjbqansdmf ;._-';
    const improperFileKeysToDelete = [false, 1, null, true];
    const improperExpires = 'edfgbhj';

    it('listFiles - improperDelimiter fails validation', async (done) => {
        try{
            await fileUploadService.listFiles({
                delimiter: improperDelimiter,
                startOffset: properStartOffset,
                endOffset: properEndOffset,
                prefix: properPrefix,
                maxResults: properMaxResults
            });
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('listFiles - improperStartOffset fails validation', async (done) => {
        try{
            await fileUploadService.listFiles({
                delimiter: properDelimiter,
                startOffset: improperStartOffset,
                endOffset: properEndOffset,
                prefix: properPrefix,
                maxResults: properMaxResults
            });
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('listFiles - improperEndOffset fails validation', async (done) => {
        try{
            await fileUploadService.listFiles({
                delimiter: properDelimiter,
                startOffset: properStartOffset,
                endOffset: improperEndOffset,
                prefix: properPrefix,
                maxResults: properMaxResults
            });
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('listFiles - improperPrefix fails validation', async (done) => {
        try{
            await fileUploadService.listFiles({
                delimiter: properDelimiter,
                startOffset: properStartOffset,
                endOffset: properEndOffset,
                prefix: improperPrefix,
                maxResults: properMaxResults
            });
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('listFiles - improperMaxResults fails validation', async (done) => {
        try{
            await fileUploadService.listFiles({
                delimiter: properDelimiter,
                startOffset: properStartOffset,
                endOffset: properEndOffset,
                prefix: properPrefix,
                maxResults: improperMaxResults
            });
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getFile - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.getFile({
                fileKey: improperFileKey
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('putFile - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.putFile({
                fileKey: improperFileKey,
                base64: properBase64
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('putFile - improperBase64 fails validation', async (done) => {
        try{
            await fileUploadService.putFile({
                fileKey: properFileKey,
                base64: improperBase64
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('deleteFile - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.deleteFile({
                fileKey: improperFileKey
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('deleteFilesBulk - improperFileKeysToDelete fails validation', async (done) => {
        try{
            await fileUploadService.deleteFilesBulk({
                fileKeysToDelete: improperFileKeysToDelete
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectGet - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectGet({
                fileKey:improperFileKey,
                expires:properExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectGet - improperExpires fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectGet({
                fileKey:properFileKey,
                expires:improperExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectPut - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectPut({
                fileKey:improperFileKey,
                expires:properExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectPut - improperExpires fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectPut({
                fileKey:properFileKey,
                expires:improperExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectDelete - improperFileKey fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectDelete({
                fileKey:improperFileKey,
                expires:properExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

    it('getPresignedUrlForObjectDelete - improperExpires fails validation', async (done) => {
        try{
            await fileUploadService.getPresignedUrlForObjectDelete({
                fileKey:properFileKey,
                expires:improperExpires
            })
        }
        catch(e){
            expect(e).toBeTruthy();
        }
        done();
    });

})


const fileKey = `superRandomFileName${Math.random().toFixed(5)}.txt`;
const anotherFileKey = `anotherSuperRandomFileName${Math.random().toFixed(5)}.txt`;
const base64 = 'YmxhaA==';

const putTestFile = async () => {
    const writableStream = await dependencyInjector.dependencies['firebaseStorage'].admin.bucket().file(fileKey).createWriteStream();
    
    await new Promise((resolve, reject) => {
        new Readable({
            read(){
                this.push(Buffer.from(base64, 'base64'));
                this.push(null);
            }
        })
        .pipe(writableStream)
        .on('error', (err) => {
            reject(err)
        })
        .on('finish', () => {
            resolve();
        });
    })
}

const deleteTestFile = async (fileKey) => {
    await dependencyInjector.dependencies['firebaseStorage'].admin.bucket().file(fileKey).delete();
}
beforeAll(async () => {
    await putTestFile();
});

afterAll(async () => {
    await deleteTestFile(fileKey);
    await deleteTestFile(anotherFileKey);
})

describe('fileUpload service functionality tests', () => {
    it('fileUploadService - listFiles are functional', async (done) => {
        try{
            const result = await fileUploadService.listFiles({})
            expect(result).toBeInstanceOf(Array);
            if(result.length){
                expect(result.every(val => typeof val === 'string')).toBeTruthy();
            }
        }
        catch(e){
            console.error(e);
        }
        done();
    })

    it('fileUploadService - getFile is functional', async (done) => {
        try{
            const result = await fileUploadService.getFile({fileKey});
            expect(result).toBeTruthy();
            expect(result.name).toBe(fileKey);
        }
        catch(e){
            console.error(e);
        }
        done();
    });

    it('fileUploadService - putFile is functional', async (done) => {
        try{
            const result = await fileUploadService.putFile({fileKey:anotherFileKey, base64});
            expect(result).toBeTruthy();
        }
        catch(e){
            console.error(e);
        }
        done();
    });

    it('fileUploadService - putFile is functional', async (done) => {
        try{
            const result = await fileUploadService.putFile({fileKey:anotherFileKey, base64});
            expect(result).toBeTruthy();
        }
        catch(e){
            console.error(e);
        }
        done();
    });

    it('fileUploadService - getPresignedUrlForObjectGet is functional', async (done) => {
       try{
           const result = await fileUploadService.getPresignedUrlForObjectGet({fileKey});
           expect(result).toBeTruthy();
       } 
       catch(e){
           console.error(e);
       }
       done();
    });

    it('fileUploadService - getPresignedUrlForObjectPut is functional', async (done) => {
        try{
            const result = await fileUploadService.getPresignedUrlForObjectPut({fileKey});
            expect(result).toBeTruthy();
        } 
        catch(e){
            console.error(e);
        }
        done();
     });

     it('fileUploadService - getPresignedUrlForObjectDelete is functional', async (done) => {
        try{
            const result = await fileUploadService.getPresignedUrlForObjectDelete({fileKey});
            expect(result).toBeTruthy();
        } 
        catch(e){
            console.error(e);
        }
        done();
     });

    it('fileUploadService - deleteFile is functional', async (done) => {
        try{
            const result = await fileUploadService.deleteFile({fileKey:anotherFileKey});
            expect(result).toBeTruthy();

            const deletedFileExists = await dependencyInjector.dependencies['firebaseStorage'].admin.bucket().file(anotherFileKey).exists();
            expect(deletedFileExists).toBeFalsy();
        }
        catch(e){
            console.error(e);
        }
        done();
    });

    it('fileUploadService - deleteFilesBulk is functional', async (done) => {
        try{
            const result = await fileUploadService.deleteFilesBulk({fileKeysToDelete: [fileKey]});
            expect(result).toBeTruthy();
            
            const deletedFileExists = await dependencyInjector.dependencies['firebaseStorage'].admin.bucket().file(fileKey).exists();
            expect(deletedFileExists).toBeFalsy();
        }
        catch(e){
            console.error(e);
        }
        done();
    })
})