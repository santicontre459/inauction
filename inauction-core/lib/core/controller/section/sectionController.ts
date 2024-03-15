import { AuthorizationCheck } from '../../../middlewares/authorizationCheck';
import { SectionControllerHandler } from './sectionControllerHandler';
import { ISectionRepository } from '../../repository/section/ISectionRepository';
import { IEventRepository } from '../../repository/event/IEventRepository';
import { IQuestionnaireRepository } from '../../repository/questionnaire/IQuestionnaireRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import SectionRepository from '../../repository/section/SectionRepository';
import EventRepository from '../../repository/event/EventRepository';
import QuestionnaireRepository from '../../repository/questionnaire/QuestionnaireRepository';
import { Request, Response } from 'express';
import { Section } from '../../schema/section';
import { Event } from '../../schema/event';
import { Questionnaire } from '../../schema/questionnaire';


export class SectionController{   

    public static async create_section(req: Request, res: Response) {
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        let eventRepository: IEventRepository = new EventRepository(Event);
        let questionnaireRepository: IQuestionnaireRepository = new QuestionnaireRepository(Questionnaire);
        const userId = AuthorizationCheck.getCurrentUser(req);
        var handler = SectionControllerHandler.checkSectionCreationModel(req);
        const event = await {...eventRepository.findById(req.body.eventid)};
        const questionnaire = await {...questionnaireRepository.findById(req.body.questionnaireid)};

        if(handler && event && questionnaire) {
            let section: Section = new Section();

            section.title= handler.title;
            section.description= handler.description;
            section.weighting= handler.weighting;
            section.event= event;
            section.questionnaire= questionnaire;

            let timestamp: Date = new Date(Date.now());
            section.createdAt = timestamp;
            section.modifiedAt = timestamp;
            section.isDeleted = false;
            section.modifiedBy = userId;
            var response = await  sectionRepository.create(section);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_section(req: Request, res: Response) {
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        if (req.params.id) {
            const section_filter = { id: req.params.id };
            
           await sectionRepository.filterSection(section_filter).then(data => {
            if(data){
                res.send(data);
            }else{
                failureResponse(ResponseMessages.sectionDoesNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });

        } else {
            insufficientParameters(res);
        }
    }

    public static async get_sections(req: Request, res: Response) {
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        var section = await sectionRepository.getAll();

        if (section.length > 0)
            res.send(section);
        else
            res.send([]);
    }

    public static async update_section(req: Request, res: Response) {
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        let questionnaireRepository: IQuestionnaireRepository = new QuestionnaireRepository(Questionnaire);
        let eventRepository: IEventRepository = new EventRepository(Event);
        const userId = AuthorizationCheck.getCurrentUser(req);
        var handler = SectionControllerHandler.checkSectionCreationModel(req);
        const event = await {...eventRepository.findById(req.body.eventid)};
        const questionnaire = await {...questionnaireRepository.findById(req.body.questionnaireid)};

        if(handler && req.params.id && event && questionnaire) {
            const section_filter = { id: req.params.id };
            let section = await  sectionRepository.filterSection(section_filter);
            if(section){
                section.title= handler.title;
                section.description= handler.description;
                section.weighting= handler.weighting;
                section.event= event;
                section.questionnaire= questionnaire;
                section.modifiedAt = new Date(Date.now());
                section.modifiedBy = userId;

                var response = await sectionRepository.updateSection(req.params.id, section);
                res.send(response);
            }else{
                failureResponse(ResponseMessages.sectionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    public static async delete_section(req: Request, res: Response) {
        let sectionRepository: ISectionRepository = new SectionRepository(Section);
        const userId = AuthorizationCheck.getCurrentUser(req);
        if(req.params.id) {
            const section_filter = { id: req.params.id };
            let section = await  sectionRepository.filterSection(section_filter);
            if(section){
                section.isDeleted = true;
                section.modifiedAt = new Date(Date.now());
                section.modifiedBy = userId;

                var response = await sectionRepository.updateSection(req.params.id, section);
                res.send(response);

            }else{
                failureResponse(ResponseMessages.sectionDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }    
    }
}