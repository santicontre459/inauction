import util from 'util';
const gc = require('../configs/gcStorageConfigs');
const bidderRegistrationBucket = gc.bucket('inauction-bidder-registration-files');
const { format } = util;

/**
 *
 * @description
 * - uploadFile function does the uploading of files into iNegotio Google Cloud Bucket Storage
 * - uploadFile function accepts an object as an argument with the "originalname" and "buffer" as keys
 * @param file
 */
const uploadFile = async (file) => new Promise((resolve, reject) => {
    const { originalname } = file;
    const myBuffer = Buffer.from(file.buffer.split(',')[1], 'base64');

    let newFileName = Date.now() + "____" + originalname;

    const blob = bidderRegistrationBucket.file(newFileName.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
            contentType: file.mimetype,
        },
    });

    blobStream.on('finish', () => {
        const publicUrl = format(
            `https://storage.googleapis.com/${bidderRegistrationBucket.name}/${blob.name}`
        );
        resolve(publicUrl);
    })
    .on('error', (e) => {
        reject(e)
    })
    .end(myBuffer)
});

module.exports = uploadFile;