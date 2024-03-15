import {
  ADD_COMPANY,
  CLEAR_COMPANY,
  GET_REGISTRATION_MAIN_ACTIVITIES,
  GET_REGISTRATION_USER_POSITIONS

} from "../actions/types";

const initialState = {
    companyRegistrationMainActivities: [],
    bidderRegistrationUserPositions: [],
    company: {},
};

export default function(state = initialState, action){
    switch(action.type){
        case ADD_COMPANY:
            return{
                ...state,
                company: action.payload
            };
        case GET_REGISTRATION_MAIN_ACTIVITIES:
            return {
                ...state,
                companyRegistrationMainActivities: action.payload
            };
        case GET_REGISTRATION_USER_POSITIONS:
            return {
                ...state,
                bidderRegistrationUserPositions: action.payload
            };
        case CLEAR_COMPANY:
            return {
                ...state,
                company: {}
            };
        default:
            return state;
    }
}
