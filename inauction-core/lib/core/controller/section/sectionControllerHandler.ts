import { ISection, IDraftSection } from "core/models/section/ISection";
import { Request, Response } from 'express';

export class SectionControllerHandler {
    public static checkSectionCreationModel(req: Request) : ISection | false   {
        if( req.body.title
            && req.body.description
            && req.body.weighting
            && req.body.eventid
            && req.body.questionnaireid
        ){
            var section : ISection = {
                title: req.body.title,
                description: req.body.description,
                weighting: req.body.weighting,
                eventid: req.body.eventid,
                questionnaireid: req.body.questionnaireid
            }
            return section;
        } else 
            return false;
    }

    public static checkSectionDraftModel(body: any) : IDraftSection | false   {
        if( body.sectionName
            && body.sectionDescription
            && (body.weighting != null)
            && Array.isArray(body.questions)
        ){
            var section : IDraftSection = {
                title: body.sectionName,
                description: body.sectionDescription,
                weighting: body.weighting,
                questions: body.questions
            }
            return section;
        } else 
            return false;
    }
}
