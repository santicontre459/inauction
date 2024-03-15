import {
    SET_FIELDS,
    CURRENCIES_RECEIVED,
    SET_LOADING,
    RESET_LOADING,
} from "./actionTypes";
import { setError } from "../../../../../iNRedux/actions/errorActions";
import iNApiFactory from "../../../../../api/services/iNApiFactory";

/**
 *
 * @returns {function(*=): Promise<unknown>}
 * Get All Currencies
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 * 2. Type -  HOST (Admin / Experts)
 */
export const getCurrencies = () => async dispatch => {
    dispatch({ type: SET_LOADING });
    try {
        const result = await iNApiFactory.get(`/currency/host`);
        dispatch({
            type: CURRENCIES_RECEIVED,
            payload: result.data
        });
    } catch (error) {
        dispatch(setError(error.message));
    }
    dispatch({ type: RESET_LOADING });
}

export const draftEvent = (categoryStep, fields, eventType, questionnaires, rfq, oa) => async dispatch => {
    if (questionnaires.length === 0 && rfq == null && oa == null) return;
    const allFields = getFields(categoryStep, fields, questionnaires, eventType, rfq, oa);

    return new Promise(async (resolve, reject) => {
        iNApiFactory.post('/event/draft', allFields).then(({ data }) => {
           console.log('draftEvent ', data);
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

const getFields = (categoryStep, fields, questionnaires, eventType, rfq, oa) => {
    const result = {
        event_category: categoryStep.category,
        activity: categoryStep.activity,
        name: fields.name,
        description: fields.description,
        currency: fields.currency,
        number_of_experts: fields.number_of_experts,
        define_budget: fields.define_budget,
        total_budget: fields.total_budget,
        has_questionnaire: questionnaires?.length > 0,
        event_type: eventType,
    }
    if (questionnaires.length > 0) result['questionnaires'] = getQuestionnaire(questionnaires, rfq, oa);
    if (rfq) result['rfq_request'] = getRfqRequest(rfq);
    if (oa) result['oa_request'] = getOaRequest(oa);
    return result;
}
const getQuestionnaire = (questionnaires, rfq, oa) => {
    let result = [];
    questionnaires.forEach(item => {
        result.push({
            deadline: item.deadline,
            has_scoring: item.has_scoring,
            has_weighting: item.has_weighting,
            in_event_result_calculation: getInEventResultCalculation(item, rfq, oa),
            pre_qualification: item.pre_qualification,
            title: item.title,
            weighting_type: item.weighting_type,
            weighting: item.weighting ?? 100,
        });
    });
    return result;
}
const getInEventResultCalculation = (questionnaire, rfq, oa) => {
    if (questionnaire.questionnaireId === rfq?.questionnaire) return true;
    if (questionnaire.questionnaireId === oa?.questionnaire) return true;
    return false;
}
const getRfqRequest = rfq => ({
    bid_direction: rfq.bid_direction,
    bid_deadline: rfq.bid_deadline,
    has_questionnaire_in_score: (rfq.questionnaire != null),
    seal_result_type: rfq.seal_result_type,
    weighting: rfq.price_weighting ?? 100,
});
const getOaRequest = oa => ({
    bid_direction: oa.bid_direction,
    competition_info: oa.competition_info,
    deadline: oa.start_time,
    dynamic_close_period: oa.dynamic_close_period,
    has_questionnaire_in_score: (oa.questionnaire != null),
    max_bid_change: +oa.max_bid_change,
    min_bid_change: +oa.min_bid_change,
    min_duration: oa.min_duration,
    start_time: oa.start_time,
    weighting: oa.price_weighting ?? 100,
});
