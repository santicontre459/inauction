import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';
import { QuestionControllerHandler } from './questionControllerHandler';
import { IQuestionRepository } from '../../repository/question/IQuestionRepository';
import { ISectionRepository } from '../../repository/section/ISectionRepository';
import { IEventRepository } from '../../repository/event/IEventRepository';
import { IQuestionnaireRepository } from '../../repository/questionnaire/IQuestionnaireRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import QuestionRepository from '../../repository/question/QuestionRepository';
import SectionRepository from '../../repository/section/SectionRepository';
import EventRepository from '../../repository/event/EventRepository';
import QuestionnaireRepository from '../../repository/questionnaire/QuestionnaireRepository';
import { Request, Response } from 'express';
import { Question } from '../../schema/question';
import { Section } from '../../schema/section';
import { Event } from '../../schema/event';
import { Questionnaire } from '../../schema/questionnaire';


export class QuestionController{   

    public static async create_question(req: Request, res: Response) {
        let questionRepository: IQuestionRepository = new QuestionRepository(Question);
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        let eventRepository: IEventRepository = new EventRepository(Event);
        let questionnaireRepository: IQuestionnaireRepository = new QuestionnaireRepository(Questionnaire);
        var handler = QuestionControllerHandler.checkQuestionCreationModel(req);
        const event = await {...eventRepository.findById(req.body.eventid)};
        const questionnaire = await {...questionnaireRepository.findById(req.body.questionnaireid)};
        const section = await {...sectionRepository.findById(req.body.sectionid)};
        const userId = AuthorizationCheck.getCurrentUser(req);

        if(handler && event && questionnaire && section) {
            let question: Question = new Question();

            question.title = handler.title;
            question.description = handler.description;
            question.scoring_criteria = handler.scoring_criteria;
            question.is_mandatory = handler.is_mandatory;
            question.scoring = handler.scoring;
            question.weighting = handler.weighting;
            question.type = handler.type;    
            question.event = event;
            question.questionnaire = questionnaire;
            question.section = section;

            let timestamp: Date = new Date(Date.now());
            question.createdAt = timestamp;
            question.modifiedAt = timestamp;
            question.isDeleted = false;
            question.modifiedBy = userId;
            var response = await  questionRepository.create(question);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_question(req: Request, res: Response) {
        let questionRepository: IQuestionRepository = new QuestionRepository(Question);
        if (req.params.id) {
            const question_filter = { id: req.params.id };
            
           await questionRepository.filterQuestion(question_filter).then(data => {
            if(data){
                res.send(data);
            }else{
                failureResponse(ResponseMessages.questionDoesNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_questions(req: Request, res: Response) {
        let questionRepository: IQuestionRepository = new QuestionRepository(Question);
        var questions = await questionRepository.getAll();

        if (questions.length > 0)
            res.send(questions);
        else
            res.send([]);
    }

    public static async update_question(req: Request, res: Response) {
        let questionRepository: IQuestionRepository = new QuestionRepository(Question);
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        let questionnaireRepository: IQuestionnaireRepository = new QuestionnaireRepository(Questionnaire);
        let eventRepository: IEventRepository = new EventRepository(Event);
        const userId = AuthorizationCheck.getCurrentUser(req);

        var handler = QuestionControllerHandler.checkQuestionCreationModel(req);
        const event = await {...eventRepository.findById(req.body.eventid)};
        const questionnaire = await {...questionnaireRepository.findById(req.body.questionnaireid)};
        const section = await {...sectionRepository.findById(req.body.sectionid)};

        if(handler && req.params.id && event && questionnaire && section) {
            const question_filter = { id: req.params.id };
            let question = await  questionRepository.filterQuestion(question_filter);
            if(question){
                question.title = handler.title;
                question.description = handler.description;
                question.scoring_criteria = handler.scoring_criteria;
                question.is_mandatory = handler.is_mandatory;
                question.scoring = handler.scoring;
                question.weighting = handler.weighting;
                question.type = handler.type;    
                question.event = event;
                question.questionnaire = questionnaire;
                question.section = section;

                question.modifiedAt = new Date(Date.now());
                question.modifiedBy = userId;

                var response = await questionRepository.updateQuestion(req.params.id, question);
                res.send(response);
            }else{
                failureResponse(ResponseMessages.questionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public static async delete_question(req: Request, res: Response) {
        let questionRepository: IQuestionRepository = new QuestionRepository(Question);
        const userId = AuthorizationCheck.getCurrentUser(req);
        if(req.params.id) {
            const question_filter = { id: req.params.id };
            let question = await  questionRepository.filterQuestion(question_filter);
            if(question){
                question.isDeleted = true;
                question.modifiedAt = new Date(Date.now());
                question.modifiedBy = userId;

                var response = await questionRepository.updateQuestion(req.params.id, question);
                res.send(response);
            }else{
                failureResponse(ResponseMessages.questionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }    
    }
}