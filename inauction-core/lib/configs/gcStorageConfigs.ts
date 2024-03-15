import { Storage } from '@google-cloud/storage'

export const gcStorage = new Storage({
    keyFilename: 'lib/configs/inauction-prod-1bac77d4dbb3.json',
    projectId: 'inauction-prod',
});

module.exports = gcStorage;