import {
  HOST_RETRIEVE_EVENTS_SUCCESS,
  HOST_RETRIEVE_EVENT_DETAILS_SUCCESS,
  HOST_UPDATE_EVENT_SUCCESS,
  HOST_PUBLISH_EVENT_SUCCESS,
  HOST_DELETE_EVENT_SUCCESS,
  HOST_CREATE_EVENT_SUCCESS,
  HOST_CANCEL_EVENT_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
  eventsList: []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case HOST_RETRIEVE_EVENTS_SUCCESS: {
      return {
        ...state,
        eventsList: action.payload,
      }
    }

    default:
      return state;
  }
}
