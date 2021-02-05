async function intitializeS3(){
    const { S3Client } = require("@aws-sdk/client-s3");
    const {AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID} = require('./config');

    const s3 = new S3Client({
        region: AWS_REGION,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS_ACCESS_KEY_ID
    });
    dependencyInjector.register('s3Client', () => s3);
}

module.exports.intitializeS3 = intitializeS3;