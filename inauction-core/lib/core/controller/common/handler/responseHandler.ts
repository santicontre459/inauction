import { StatusCodes, ResponseMessages } from './../resource/Resource';
import { Response } from 'express';
import { response_status_codes } from "../../../models/common/statusCode";

export function successResponse( DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: StatusCodes.success
    });
    res.send();
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: StatusCodes.failure,
        message: message,
        data: DATA
    });
    res.send();
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: StatusCodes.failure,
        message: ResponseMessages.insufficientParams,
        data: {}
    });
    res.send();
}

export function errorResponse(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        status: StatusCodes.failure,
        message:  ResponseMessages.dbError,
        data: err
    });
    res.send();
}