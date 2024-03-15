import {
    SET_FIELDS,
    CURRENCIES_RECEIVED,
    SET_LOADING,
    RESET_LOADING,
} from './actionTypes';

const initState = {
    name: null,
    description: null,
    currency: null,
    number_of_experts: null,
    define_budget: false,
    total_budget: null,
    has_questionnaire: false,
    event_type: 2,
    questionnaires: [],
    rfq_request: null,
    oa_request: null,

    currencies: [],
    loading: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_FIELDS:
            return {
                ...state,
                name: action.payload.name,
                description: action.payload.description,
                currency: action.payload.currency,
                number_of_experts: action.payload.number_of_experts,
                define_budget: action.payload.define_budget,
                total_budget: action.payload.total_budget,
                has_questionnaire: action.payload.has_questionnaire,
                event_type: action.payload.event_type,
                questionnaires: action.payload.questionnaires,
                rfq_request: action.payload.rfq_request,
                oa_request: action.payload.oa_request
            };
        case CURRENCIES_RECEIVED:
            return {
                ...state,
                currencies: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case RESET_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;
