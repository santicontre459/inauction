const gc = require('../configs/gcStorageConfigs');
const bidderRegistrationBucket = gc.bucket('inauction-bidder-registration-files');

/**
 *
 * @description
 * - readFile function does the uploading of files into iNegotio Google Cloud Bucket Storage
 * - readFile function requires a name to retrieve the file.
 */
const readFile = async (name) => new Promise(async (resolve, reject) => {

    async function generateV4ReadSignedUrl() {
        // These options will allow temporary read access to the file
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 55 * 60 * 1000, // 55 minutes
        };

        // Get a v4 signed URL for reading the file
        const [url] = await bidderRegistrationBucket.file(name).getSignedUrl(options);
        resolve(url)
    }

    generateV4ReadSignedUrl().catch(console.error);
});

module.exports = readFile;