const express = require('express');
const request = require('supertest');
const {Readable} = require('stream');

const dependencyInjector = require('../dependency-injector.js');

const {initializeFirebaseStorage, initializeStandardMiddleware} = require('../initialization');

initializeFirebaseStorage();
dependencyInjector.register('fileUploadService', () => require('../services/fileUpload.js'));
dependencyInjector.register('fileUploadController', () => require('../controllers/fileUpload.js'));

const fileKey = `superRandomFileName.txt`;
const anotherFileKey = `anotherSuperRandomFileName.txt`;
const base64 = 'YmxhaA==';
const deleteTestFile = async (fileKey) => {
    const file = await dependencyInjector.dependencies['firebaseStorage'].admin.bucket().file(fileKey)
    if((await file.exists())[0]){
        await file.delete();
    }
}
const putTestFile = async (fileKey) => {
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
beforeAll(async () => {
    await putTestFile(fileKey);
});

afterAll(async () => {
    await deleteTestFile(fileKey);
    await deleteTestFile(anotherFileKey);
})

const fileUploadRouter = require('./fileUpload');

const app = express();
initializeStandardMiddleware(app);
app.use(fileUploadRouter);

describe('fileUpload route tests', () => {
    it('GET - /upload/files', async (done) => {
        request(app)
            .get('/upload/files')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }
                const result = res.body;
                expect(result).toBeInstanceOf(Array);
                if(result.length){
                    expect(result.every(val => typeof val === 'string')).toBeTruthy();
                }
                done();
            })
    })

    it('GET - /upload/file/:fileKey', async (done) => {
        request(app)
            .get('/upload/file/superRandomFileName.txt')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }
                const result = res.body;
                expect(result).toBeTruthy();

                done();
            })
    })

    it('GET - /upload/file/:fileKey/url/get', async (done) => {
        request(app)
            .get('/upload/file/superRandomFileName.txt/url/get')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }

                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.url).toBeTruthy();

                done();
            })
    })

    it('GET - /upload/file/:fileKey/url/put', async (done) => {
        request(app)
            .get('/upload/file/superRandomFileName.txt/url/put')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }

                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.url).toBeTruthy();

                done();
            })
    })

    it('GET - /upload/file/:fileKey/url/delete', async (done) => {
        request(app)
            .get('/upload/file/superRandomFileName.txt/url/delete')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }

                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.url).toBeTruthy();

                done();
            })
    })

    it('PUT - /upload/file/:fileKey', async (done) => {
        request(app)
            .put('/upload/file/superRandomFileName.txt')
            .set('Accept', 'application/json')
            .send({
                fileKey: anotherFileKey,
                base64
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }
                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.message).toBeTruthy();

                done()
            })
    })

    it('DELETE - /upload/files', async (done) => {
        request(app)
            .delete('/upload/files')
            .set('Accept', 'application/json')
            .send({
                fileKeysToDelete:[
                    anotherFileKey
                ]
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }

                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.message).toBeTruthy();

                done()
            })
    })

    it('DELETE - /upload/file/:fileKey', async (done) => {
        request(app)
            .delete('/upload/file/superRandomFileName.txt')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.log(err);
                    done();
                }

                const result = res.body;
                expect(result).toBeTruthy();
                expect(result.message).toBeTruthy();

                done()
            })
    })
})