import {
    insufficientParameters,
    errorResponse,
    failureResponse
} from '../common/handler/responseHandler';
import { Request, Response } from 'express';
import { File } from '../../schema/file';
import { Event } from '../../schema/event';
import { FileControllerHandler } from "./fileControllerHandler";
import { IFileRepository } from "../../repository/file/IFileRepository";
import FileRepository from "../../repository/file/FileRepository";
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";
import { Company } from "../../schema/company";
import { ResponseMessages } from "../common/resource/Resource";
import { getRepository } from "typeorm";
import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
}

export class FileController {

    // Add File
    public static async fileAdd(req: Request & { file: MulterFile[] }, res: Response) {

        let fileRepository: IFileRepository = new FileRepository(File);
        let companyRepository = getRepository(Company);
        const handler = await FileControllerHandler.checkFileForRegistrationCreationModel(req);

        // check for company exists
        let company = new Company();
        await companyRepository.findOne({ where: { id: req.body.company_id } })
            .then((company_data: Company) => {
                // if company_data blocked or deleted
                if (company_data.verificationStatus === 2 || company_data.isDeleted === true) {
                    company_data = null;
                }
                else {
                    company = company_data;
                }
            }).catch(() => { company = null; });

        // check if company exists
        if (!company) {
            failureResponse(ResponseMessages.companyDoesNotExist, null, res);
            return false;
        }

        // create a handle for files creation
        if (handler) {

            try {

                // file create
                let fileEntity: File = new File();
                fileEntity.name = handler.name;
                fileEntity.fileName = handler.fileName;
                fileEntity.type = handler.type;
                fileEntity.path = handler.path;
                fileEntity.company = company;
                fileEntity.event = handler.event;
                fileEntity.uploadedBy = AuthorizationCheck.getCurrentUser(req);
                fileEntity.inauctionType = handler.inauctionType;
                fileEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);
                fileEntity.createdAt = new Date(Date.now());
                fileEntity.modifiedAt = new Date(Date.now());

                await fileRepository.create(fileEntity);

                res.status(200).send({
                    message: 'File has been uploaded successfully!',
                });

            } catch (err) {
                errorResponse(err, res);
            }


        } else {
            insufficientParameters(res);
        }

    }


    // Add File
    public static async uploadFilesForEvent(req: Request, res: Response) {

        let fileRepository: IFileRepository = new FileRepository(File);
        const fileModels = await FileControllerHandler.checkFilesModel(req);
        let eventRepository: IEventRepository = new EventRepository(Event);

        // create a handle for files creation
        if (fileModels && req.body.event_id) {
            try {
                let event = await eventRepository.findOne(req.body.event_id);
                if (!event) {
                    failureResponse(ResponseMessages.eventDoesNotExist, null, res);
                }

                let createdFiles = [];
                for (let i = 0; i < fileModels.length; i++) {
                    // file create
                    let fileEntity: File = new File();
                    fileEntity.name = fileModels[i].name;
                    fileEntity.fileName = fileModels[i].fileName;
                    fileEntity.type = fileModels[i].type;
                    fileEntity.path = fileModels[i].path;
                    fileEntity.event = event;
                    fileEntity.uploadedBy = AuthorizationCheck.getCurrentUser(req);
                    fileEntity.inauctionType = fileModels[i].inauctionType;
                    fileEntity.modifiedBy = AuthorizationCheck.getCurrentUser(req);
                    fileEntity.createdAt = new Date(Date.now());
                    fileEntity.modifiedAt = new Date(Date.now());

                    let fileCreated = await fileRepository.create(fileEntity);
                    createdFiles.push(fileCreated);
                }

                res.status(200).send({
                    message: 'File has been uploaded successfully!',
                    data : createdFiles
                });

            } catch (err) {
                errorResponse(err, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}