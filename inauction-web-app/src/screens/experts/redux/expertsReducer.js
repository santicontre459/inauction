import {
    GET_EXPERTS,
    ADD_EXPERT,
    DELETE_EXPERT,
    GET_EXPERT,
    GET_EXPERT_POSITIONS,
    CLEAR_EXPERT,
    EXPERT_LOADING,
    RESET_LOADING,
} from './expertsActionTypes';

const initialState = {
    experts: [],
    expert: {},
    expertPositions: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case EXPERT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_EXPERTS:
            return {
                ...state,
                experts: action.payload,
            };
        case ADD_EXPERT:
            return {
                ...state,
                expert: action.payload
            }
        case DELETE_EXPERT:
            return {
                ...state,
                experts: state.experts.filter(expert => expert.id !== action.payload),
            };
        case GET_EXPERT:
            return {
                ...state,
                expert: action.payload,
            };
        case GET_EXPERT_POSITIONS:
            return {
                ...state,
                expertPositions: action.payload,
            };
        case CLEAR_EXPERT:
            return {
                ...state,
                expert: {},
            };
        case RESET_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
