import {
  SUPER_ADMIN_RETRIEVE_ACTIVITIES_SUCCESS,
  SUPER_ADMIN_RETRIEVE_ACTIVITY_DETAILS_SUCCESS,
  SUPER_ADMIN_CREATE_ACTIVITY_SUCCESS,
  SUPER_ADMIN_UPDATE_ACTIVITY_SUCCESS,
  SUPER_ADMIN_DELETE_ACTIVITY_SUCCESS,
  SUPER_ADMIN_ACTIVATE_ACTIVITY_SUCCESS,
  SUPER_ADMIN_DEACTIVATE_ACTIVITY_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
  activities: []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case SUPER_ADMIN_RETRIEVE_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        activities: action.payload,
      }
    }

    default:
      return state;
  }
}
