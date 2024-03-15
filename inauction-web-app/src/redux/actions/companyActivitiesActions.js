import {
  GET_COMPANY_ACTIVITIES,
  COMPANY_ACTIVITIES_RECEIVED,
  GET_SYSTEM_ACTIVITIES,
  SYSTEM_ACTIVITIES_RECEIVED,
  COMPANY_ACTIVITIES_RESET_LOADING,
  GET_ERRORS,
} from "./types";
import iNApiFactory from "../../api/services/iNApiFactory";

/**
 *
 * @returns {function(*=): Promise<unknown>}
 * Get Company Activities
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 * 2. Type -  HOST or BIDDER (Admin / Experts)
 */
export const getCategories = () => async dispatch => {
  dispatch({ type: GET_COMPANY_ACTIVITIES });
  try {
    const result = await iNApiFactory.get(`/event-category/host`);
    dispatch({
      type: COMPANY_ACTIVITIES_RECEIVED,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ACTIVITIES_RESET_LOADING });
    dispatch({
      type: GET_ERRORS,
      payload: {message: error.message}
    });
  }
}

export const addCompanyActivity = (companyId, activity_id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/console/company/${companyId}/activities`, {activity_id: activity_id}).then(({data}) => {
      //todo add alert
      //todo refresh state
    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
};
/**
 *
 * @returns {function(*=): Promise<unknown>}
 * Get System Activities
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 */
export const getSystemActivities = (companyId) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: GET_SYSTEM_ACTIVITIES
    });
    iNApiFactory.get(`/console/${companyId}/activities`).then(({data}) => {
      dispatch({
        type: SYSTEM_ACTIVITIES_RECEIVED,
        list: data.result
      });
    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
};
