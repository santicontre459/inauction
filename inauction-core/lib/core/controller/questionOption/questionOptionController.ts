import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';
import { QuestionOptionControllerHandler } from './questionOptionControllerHandler';
import { IQuestionOptionRepository } from '../../repository/questionOption/IQuestionOptionRepository';
import QuestionOptionRepository from './../../repository/questionOption/QuestionOptionRepository';

import { IQuestionRepository } from '../../repository/question/IQuestionRepository';
import QuestionRepository from '../../repository/question/QuestionRepository';

import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';
import { QuestionOption } from '../../schema/questionOption';


export class QuestionOptionController{   

    public static async create_question_option(req: Request, res: Response) {
        let  questionOptionRepository: IQuestionOptionRepository = new QuestionOptionRepository(QuestionOption);
        let questionRepository: IQuestionRepository = new QuestionRepository(Event);
        const userId = AuthorizationCheck.getCurrentUser(req);
        var handler = QuestionOptionControllerHandler.checkQuestionOptionCreationModel(req);
        const question = await {...questionRepository.findById(req.body.questionid)};

        if(handler && question) {
            let questionOption: QuestionOption = new QuestionOption();
            questionOption.question = question;
            questionOption.option = handler.option;
            questionOption.score = handler.score;
            questionOption.fail = handler.fail;
            questionOption.max_char = handler.max_char;

            let timestamp: Date = new Date(Date.now());
            questionOption.createdAt = timestamp;
            questionOption.modifiedAt = timestamp;
            questionOption.isDeleted = false;
            questionOption.modifiedBy = userId;
            var response = await  questionOptionRepository.create(questionOption);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_question_option(req: Request, res: Response) {
        let  questionOptionRepository: IQuestionOptionRepository = new QuestionOptionRepository(QuestionOption);
        if (req.params.id) {
            const questionOption_filter = { id: req.params.id };
            
           await questionOptionRepository.filterQuestionOption(questionOption_filter).then(data => {
            if(data){
                res.send(data);
            }else{
                failureResponse(ResponseMessages.questionOptionDoesNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_question_options(req: Request, res: Response) {
        let  questionOptionRepository: IQuestionOptionRepository = new QuestionOptionRepository(QuestionOption);
        var questionOptions = await questionOptionRepository.getAll();

        if (questionOptions.length > 0)
            res.send(questionOptions);
        else
            res.send([]);
    }

    public static async update_question_options(req: Request, res: Response) {
        let questionOptionRepository: IQuestionOptionRepository = new QuestionOptionRepository(QuestionOption);
        const userId = AuthorizationCheck.getCurrentUser(req);
        let questionRepository: IQuestionRepository = new QuestionRepository(Event);
        var handler = QuestionOptionControllerHandler.checkQuestionOptionCreationModel(req);

        if(handler && req.params.id && event) {
            const questionOption_filter = { id: req.params.id };
            let questionOption = await  questionOptionRepository.filterQuestionOption(questionOption_filter);

            const question = await {...questionRepository.findById(req.body.questionid)};

            if(questionOption_filter && question){
                questionOption.question = question;
                questionOption.option = handler.option;
                questionOption.score = handler.score;
                questionOption.fail = handler.fail;
                questionOption.max_char = handler.max_char;
                questionOption.modifiedAt = new Date(Date.now());
                questionOption.modifiedBy = userId;

                var response = await questionOptionRepository.updateQuestionOption(req.params.id, questionOption);
                res.send(response);

            }else{
                failureResponse(ResponseMessages.questionOptionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public static async delete_questionOption(req: Request, res: Response) {
        let questionOptionRepository: IQuestionOptionRepository = new QuestionOptionRepository(QuestionOption);
        const userId = AuthorizationCheck.getCurrentUser(req);
        if(req.params.id) {
            const question_option_filter = { id: req.params.id };
            let questionOption = await  questionOptionRepository.filterQuestionOption(question_option_filter);
            if(questionOption){
                questionOption.isDeleted = true;
                questionOption.modifiedAt = new Date(Date.now());
                questionOption.modifiedBy = userId;

                var response = await questionOptionRepository.updateQuestionOption(req.params.id, questionOption);
                res.send(response);

            }else{
                failureResponse(ResponseMessages.questionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }    
    }
}