import { IQuestion, IDraftQuestion } from "core/models/question/IQuestion";
import { QuestionType } from "../../schema/question";
import { Request, Response } from 'express';

export class QuestionControllerHandler {
    public static checkQuestionCreationModel(req: Request) : IQuestion | false   {
        if( req.body.title
            && req.body.description
            && req.body.scoring_criteria
            && req.body.is_mandatory
            && req.body.scoring
            && req.body.weighting
            && req.body.type    
            && req.body.eventid
            && req.body.questionnaireid
            && req.body.sectionid
        ){
            const qstType = req.body.type as keyof typeof QuestionType;
            var question : IQuestion = {
                title: req.body.title,
                description: req.body.description,
                scoring_criteria: req.body.scoring_criteria,
                is_mandatory: req.body.is_mandatory,
                scoring: req.body.scoring,
                weighting: req.body.weighting,
                type: QuestionType[qstType],
                eventid: req.body.eventid,
                questionnaireid: req.body.questionnaireid,
                sectionid: req.body.sectionid,
            }
            return question;
        } else 
            return false;
    }

    public static checkQuestionDraftModel(body: any) : IDraftQuestion | false   {
        const qstType = body.value.type as keyof typeof QuestionType;

        console.log('checkQuestionDraftModel================================================', qstType, body)
        if( body.name
            && body.description 
            && (body.weighting  != null) 
            && body.value 
            && typeof QuestionType[qstType]  === 'number'
            && Array.isArray(body.value.options)
        ){
            var question : IDraftQuestion = {
                title: body.name,
                description: body.description,
                is_mandatory: body.is_mandatory || false,
                scoring: body.scoring,
                weighting: body.weighting,
                type: QuestionType[qstType],
                scoring_criteria: body.scoring_criteria,
                questionOption: body.value.options,
                max_char : body.value.maxNumberOfCharacters
            }
            return question;
        } else 
            return false;
    }
}
