import { getManager, getRepository, In } from "typeorm";
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import { Request, Response } from 'express';

import { QuestionnaireControllerHandler } from './questionnaireControllerHandler';
import { IQuestionnaireRepository } from '../../repository/questionnaire/IQuestionnaireRepository';
import QuestionnaireRepository from '../../repository/questionnaire/QuestionnaireRepository';
import { Questionnaire } from '../../schema/questionnaire';

import { IEventRepository } from '../../repository/event/IEventRepository';
import EventRepository from '../../repository/event/EventRepository';
import { Event } from '../../schema/event';

import { SectionControllerHandler } from '../section/sectionControllerHandler';
import { ISectionRepository } from '../../repository/section/ISectionRepository';
import SectionRepository from '../../repository/section/SectionRepository';
import { Section } from '../../schema/section';

import { QuestionControllerHandler } from '../question/questionControllerHandler';
import { IQuestionRepository } from '../../repository/question/IQuestionRepository';
import QuestionRepository from '../../repository/question/QuestionRepository';
import { Question, QuestionType } from '../../schema/question';

import { QuestionOptionControllerHandler } from '../questionOption/questionOptionControllerHandler';
import { IQuestionOptionRepository } from '../../repository/questionOption/IQuestionOptionRepository';
import QuestionOptionRepository from '../../repository/questionOption/QuestionOptionRepository';
import { QuestionOption } from '../../schema/questionOption';
import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';
import { I2ndQuestionnaire } from '../../models/questionnaire/IQuestionnaire';

export class QuestionnaireController {

    public static async updateQuestionnaireOnEventStep3(req: Request, res: Response) {
        const userId = AuthorizationCheck.getCurrentUser(req);
        // start transaction
        return await getManager().transaction(async transactionalEntityManager => {
            let questionOptionRepository: IQuestionOptionRepository = transactionalEntityManager.getCustomRepository(QuestionOptionRepository);
            let questionRepository: IQuestionRepository = transactionalEntityManager.getCustomRepository(QuestionRepository);
            let sectionRepository: ISectionRepository = transactionalEntityManager.getCustomRepository(SectionRepository)
            let questionnaireRepository: IQuestionnaireRepository = transactionalEntityManager.getCustomRepository(QuestionnaireRepository);
            let eventRepository: IEventRepository = transactionalEntityManager.getCustomRepository(EventRepository)

            const event = await eventRepository.findById(req.body.eventid);
            if (!event && event.host.id !== userId) {
                return failureResponse(ResponseMessages.eventDoesNotExist, null, res);
            }

            var handler = QuestionnaireControllerHandler.checkDraftQuestionnaire2ndModel(req);
            if (handler) {
                let timestamp: Date = new Date(Date.now());
                let questionnaire: Questionnaire = await questionnaireRepository.findById(handler.id);

                questionnaire.title = handler.title;
                questionnaire.deadline = handler.deadline;
                questionnaire.isPrequalification = handler.isPrequalification;
                questionnaire.modifiedAt = timestamp;
                questionnaire.modifiedBy = userId;

                await questionnaireRepository.updateQuestionnaire(questionnaire.id, questionnaire);

                if (handler.sections.length < 1) {
                    return failureResponse(ResponseMessages.sectionsRequired, null, res);
                }
                for (let s = 0; s < handler.sections.length; s++) {
                    var sectionHandler = SectionControllerHandler.checkSectionDraftModel(handler.sections[s]);
                    if (sectionHandler) {

                        let section: Section = new Section();
                        section.title = sectionHandler.title;
                        section.description = sectionHandler.description;
                        section.weighting = sectionHandler.weighting;
                        section.event = event;
                        section.questionnaire = questionnaire;
                        section.createdAt = timestamp;
                        section.isDeleted = false;
                        section.modifiedAt = timestamp;
                        section.modifiedBy = userId;

                        //var sectionCreated: Section = await sectionRepository.create(section);
                        await transactionalEntityManager.save(section);

                        if (sectionHandler.questions.length < 1) {
                            return failureResponse(ResponseMessages.questionsRequired, null, res);
                        }

                        for (let q = 0; q < sectionHandler.questions.length; q++) {
                            var questionHandler = QuestionControllerHandler.checkQuestionDraftModel(sectionHandler.questions[q]);

                            if (questionHandler) {
                                let question: Question = new Question();
                                question.title = questionHandler.title;
                                question.description = questionHandler.description,
                                question.is_mandatory = questionHandler.is_mandatory,
                                question.scoring = questionHandler.scoring,
                                question.weighting = questionHandler.weighting,
                                question.type = questionHandler.type,
                                question.scoring_criteria = questionHandler.scoring_criteria,
                                question.max_char = questionHandler.max_char;
                                question.event = event;
                                question.questionnaire = questionnaire;
                                question.section = section;
                                
                                question.createdAt = timestamp;
                                question.isDeleted = false;
                                question.modifiedAt = timestamp;
                                question.modifiedBy = userId;

                                //await questionRepository.create(question);
                                await transactionalEntityManager.save(question);

                                if (question.type != QuestionType.DOCUMENT_UPLOAD &&
                                    question.type != QuestionType.PARAGRAPH_TEXT && 
                                    questionHandler.questionOption.length < 1) {
                                    return failureResponse(ResponseMessages.questionOptionsRequired, null, res);
                                }

                                for (let o = 0; o < questionHandler.questionOption.length; o++) {
                                    var questionOptionHandler = QuestionOptionControllerHandler.checkQuestionOptionDraftModel(questionHandler.questionOption[o]);
                                    if (questionOptionHandler) {
                                        let questionOption: QuestionOption = new QuestionOption();
                                        questionOption.option = questionOptionHandler.option;
                                        questionOption.score = questionOptionHandler.score;
                                        questionOption.fail = questionOptionHandler.fail;
                                        questionOption.max_char = questionOptionHandler.max_char;

                                        questionOption.event = event;
                                        questionOption.questionnaire = questionnaire;
                                        questionOption.section = section;
                                        questionOption.question = question;

                                        questionOption.createdAt = timestamp;
                                        questionOption.isDeleted = false;
                                        questionOption.modifiedAt = timestamp;
                                        questionOption.modifiedBy = userId;
                                        // await questionOptionRepository.create(questionOption);
                                        await transactionalEntityManager.save(questionOption);
                                        console.log('questionOption', questionOption);

                                    } else {
                                        return failureResponse(ResponseMessages.questionOptionInvalid, null, res);
                                    }
                                }
                            } else {
                                return failureResponse(ResponseMessages.questionInvalid, null, res);
                            }
                        }
                    } else {
                        return failureResponse(ResponseMessages.sectionInvalid, null, res);
                    }
                }

                res.send(questionnaire);
            } else {
                return insufficientParameters(res);
            }
        });
    }

    
    //  Retrieve questionair details
    public static async getQuestionairDetails(req: Request, res: Response) {
        let questionairRepository = getRepository(Questionnaire);
        let sectionRepository = getRepository(Section);
        let questionRepository = getRepository(Question);
        let optionRepository = getRepository(QuestionOption);
        if (req.params.questionair_id) {

            let questionaires = await questionairRepository.find({
                where: { id: req.params.questionair_id },
                relations: ['event', 'sections']
            });

            if (questionaires && questionaires.length > 0) {
                let questionaire = questionaires[0];
                if (questionaire.sections) {
                    let section_ids = questionaire.sections.map(s => s.id);
                    let sections = await sectionRepository.find({
                        where : {id : In(section_ids || [])},
                        relations: ['questions']
                    });

                    for(let i = 0; i < sections.length; i ++) {
                        if (sections[i].questions) {
                            let question_ids = sections[i].questions.map(q => q.id);
                            let questions = await questionRepository.find({
                                where : {id : In(question_ids || [])},
                                relations: ['question_options']
                            });
                            sections[i].questions = questions;
                        }
                    }

                    questionaire.sections = sections;
                }

                res.send(questionaire);
            } else {
                failureResponse(ResponseMessages.questionnaireDoesNotExist, null, res);
            }
        }
        else {
            insufficientParameters(res);
        }
    }
}