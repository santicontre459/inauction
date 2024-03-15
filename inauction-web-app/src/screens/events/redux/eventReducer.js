import {
  EVENTS_RECEIVED,
  DRAFT_EVENTS_RECEIVED,
  ADD_DRAFT_EVENT,
  SET_LOADING,
  RESET_LOADING,
  UOMS_RECEIVED,
} from './eventActionTypes';

const INIT_STATE = {
  eventsList: [],
  draftEventsList: [],
  draftEvent: {},
  loading: false,
  uomList: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EVENTS_RECEIVED:
      return {
        ...state,
        eventsList: action.eventsList
      };
    case DRAFT_EVENTS_RECEIVED:
      return {
        ...state,
        draftEventsList: action.eventsList
      };
    case ADD_DRAFT_EVENT:
      return {
        ...state,
        draftEvent: action.payload
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
    case UOMS_RECEIVED:
      return {
        ...state,
        uomList: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
