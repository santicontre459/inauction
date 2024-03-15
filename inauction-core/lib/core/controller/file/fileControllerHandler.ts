import { IFile } from "core/models/file/IFile";
import { InauctionType, Type } from '../../schema/file';
const uploadFile = require('../../../helpers/uploadFile');

export class FileControllerHandler {

    public static async checkFileForRegistrationCreationModel(req): Promise<IFile | false> {

        if (req.body.file.length !== 0
            && req.body.user_id
            && req.body.company_id
            && (parseInt(req.body.type) === 1 || parseInt(req.body.type) === 0)
        ) {

            const uploadedFileType = req.body.file.mimetype;
            const uploadedFile = req.body.file;
            const uploadedFileName = req.body.file.originalname;
            let typeType;

            // Allow only PDF for Business Certificate
            if (parseInt(req.body.type) === 0) {
                if (uploadedFileType !== 'application/pdf') { return false; }
                else { typeType = 0; }
            }
            // Allow PDF or Image for ID Passport
            else if (parseInt(req.body.type) === 1) {
                if (
                    uploadedFileType === 'application/pdf'
                ) {
                    typeType = 0;
                }
                else if (
                    uploadedFileType === 'image/png' ||
                    uploadedFileType === 'image/jpeg'
                ) {
                    typeType = 1;
                }

                else { return false; }
            }
            // block uploading
            else { return false; }

            let filePath = null;
            await uploadFile(uploadedFile)
                .then((res) => {
                    filePath = res;
                }).catch((e) => { filePath = e });

            const file: IFile = {
                name: parseInt(req.body.type),
                fileName: uploadedFileName,
                type: typeType,
                path: filePath,
                company: null,
                event: null,
                uploadedBy: null,
                inauctionType: InauctionType.BIDDER_REGISTRATION,
            };
            return file;
        } else
            return false;
    }

    public static async checkFilesModel(req): Promise<Array<IFile> | false> {

        if (req.body.files.length > 0) {
            let files = [];
            for (let i = 0; i < req.body.files.length; i++) {
                const uploadedFileType = req.body.files[i].mimetype;
                const uploadedFile = req.body.files[i];
                const uploadedFileName = req.body.files[i].originalname;

                let typeType = Type.OTHER;
                if (uploadedFileType == 'application/pdf') {
                    typeType = Type.PDF;
                }
                else if (uploadedFileType === 'image/png' || uploadedFileType === 'image/jpeg') {
                    typeType = Type.IMAGE;
                }
                else if (uploadedFileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    typeType = Type.WORD;
                }
                else if (uploadedFileType == 'application/vnd.ms-excel' ||
                    uploadedFileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                    typeType = Type.EXCEL;
                }

                let filePath = null;
                await uploadFile(uploadedFile)
                    .then((res) => {
                        filePath = res;
                    }).catch((e) => {
                        console.log('upload file ', e)
                    });

                if (filePath) {
                    const file: IFile = {
                        name: 2, // Other
                        fileName: uploadedFileName,
                        type: typeType,
                        path: filePath,
                        company: null,
                        event: null,
                        uploadedBy: null,
                        inauctionType: InauctionType.EVENT_CREATE,
                    };

                    files.push(file);
                }
            }

            return files;
        } else
            return false;
    }
}