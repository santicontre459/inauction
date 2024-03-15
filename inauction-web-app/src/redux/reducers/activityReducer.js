import {
    ACT_CATEGORIES_RECEIVED,
    ACT_ACTIVITIES_RECEIVED,
    ACT_COMPANY_ACTIVITIES_RECEIVED,
    SET_LOADING,
    RESET_LOADING,
} from '../actions/types';

const initSate = {
    categories: [],
    activities: [],
    company_activities : [],
    loading: false,
};

const reducer = (state = initSate, action) => {
    switch (action.type) {
        case ACT_CATEGORIES_RECEIVED:
            return {
                ...state,
                categories: action.payload || []
            };
        case ACT_ACTIVITIES_RECEIVED:
            return {
                ...state,
                activities: action.payload || []
            };
        case ACT_COMPANY_ACTIVITIES_RECEIVED:
            return {
                ...state,
                company_activities: action.payload || []
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
