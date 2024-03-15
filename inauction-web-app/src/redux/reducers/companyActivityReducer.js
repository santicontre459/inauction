import {GET_COMPANY_ACTIVITIES, COMPANY_ACTIVITIES_RECEIVED, COMPANY_ACTIVITIES_RESET_LOADING, GET_SYSTEM_ACTIVITIES, SYSTEM_ACTIVITIES_RECEIVED} from "./../actions/types";

const INIT_STATE = {
  categories: [],
  activities: [],
  loading: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_ACTIVITIES:
      return {
        ...state,
        loading: true
      };
    case GET_SYSTEM_ACTIVITIES:
      return {
        ...state,
        loading: true
      };
    case COMPANY_ACTIVITIES_RECEIVED:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case SYSTEM_ACTIVITIES_RECEIVED:
      return {
        ...state,
        activities: action.payload,
        loading: false
      };
    case COMPANY_ACTIVITIES_RESET_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
