import { GET_EXPERTS, ADD_EXPERT, DELETE_EXPERT, GET_EXPERT, CLEAR_EXPERT, EXPERT_LOADING } from '../actions/types';

const initialState = {
    experts: [],
    expert: {},
    loading: false
};

export default function(state = initialState, action){
    switch (action.type){
        case EXPERT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_EXPERTS:
            return {
                ...state,
                experts: action.payload
            };
        case ADD_EXPERT:
            return {
                ...state,
                experts: [action.payload, ...state.experts],
                expert: action.payload
            }
        case DELETE_EXPERT:
            return {
                ...state,
                experts: state.experts.filter(expert => expert.user_details[0]._id !== action.payload)
            };
        case GET_EXPERT:
            return {
                ...state,
                expert: action.payload,
                loading: false
            };
        case CLEAR_EXPERT:
            return {
                ...state,
                expert: {},
            }
        default:
            return state;
    }
}