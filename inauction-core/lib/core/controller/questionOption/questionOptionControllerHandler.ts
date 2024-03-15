import { IQuestionOption, IQuestionDraftOption } from "core/models/questionOption/IQuestionOption";
import { Request, Response } from 'express';

export class QuestionOptionControllerHandler {
    public static checkQuestionOptionCreationModel(req: Request) : IQuestionOption | false   {
        if( req.body.questionid 
            // && req.body.option 
            && req.body.score 
            && typeof req.body.fail ==='boolean'
            // && req.body.max_char
        ){
            var questionnaire : IQuestionOption = {
                questionid: req.body.questionid,
                option: req.body.option,
                score: req.body.score,
                fail: req.body.fail,
                max_char: req.body.max_char,
            }
            return questionnaire;
        } else 
            return false;
    }

    public static checkQuestionOptionDraftModel(body: any) : IQuestionDraftOption | false   {
        if(  body.score != null
            && typeof body.fail ==='boolean'
            // && body.label
            // && body.maxNumberOfCharacters
        ){
            var questionnaire : IQuestionDraftOption = {
                option: body.label,
                score: body.score,
                fail: body.fail,
                max_char: body.maxNumberOfCharacters,
            }
            return questionnaire;
        } else 
            return false;
    }
}
