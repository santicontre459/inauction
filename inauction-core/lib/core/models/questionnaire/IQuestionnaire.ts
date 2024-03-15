import { WeightingType } from '../../schema/questionnaire'
import { Event } from "../../schema/event";
import { Section } from '../../schema/section';

export interface IQuestionnaire {
    id?: String;
    event: Event;
    title: string;
    description?: string;
    deadline: Date;
    isPrequalification: boolean;
    hasScoring: boolean;
    hasWeighting: boolean;
    weightingType: WeightingType;
    weighting?: Number;
    inEventResultCalculation: boolean;
}

export interface IDraftQuestionnaire {
    title: string;
    event?: Event;
    description?: string;
    deadline: Date;
    hasScoring: boolean;
    hasWeighting: boolean;
    weightingType: WeightingType;
    weighting?: Number;
    isPrequalification: boolean;
    inEventResultCalculation: boolean;
}

export interface I2ndQuestionnaire {
    id: string;
    title: string;
    deadline: Date;
    isPrequalification: boolean;
    sections: [];
}