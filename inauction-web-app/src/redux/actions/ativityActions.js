import {
  ACT_CATEGORIES_RECEIVED,
  ACT_ACTIVITIES_RECEIVED,
  ACT_COMPANY_ACTIVITIES_RECEIVED,
  SET_LOADING,
  RESET_LOADING,
} from './types';
import { setError } from "../../iNRedux/actions/errorActions";
import iNApiFactory from "../../api/services/iNApiFactory";
import { NotificationManager } from "react-notifications";

export const getCategories = () => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    const result = await iNApiFactory.get(`/event-category/host`);
    dispatch({
      type: ACT_CATEGORIES_RECEIVED,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  }
  dispatch({ type: RESET_LOADING });
}

export const getActivities = () => async dispatch => {
  try {
    const result = await iNApiFactory.get(`/activity/customer`);
    dispatch({
      type: ACT_ACTIVITIES_RECEIVED,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  }
}

export const addCompanyActivity = (activity_id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/activity/company`, { activity_id: activity_id }).then(({ data }) => {
      console.log('addCompanyActivity ', data)
      resolve(data);
    }, (error) => {
      dispatch(setError(error.message));
      reject(error);
    });
  });
};

export const getCompanyActivities = (company_id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/activity/company/${company_id}`).then(({ data }) => {
      console.log('getCompanyActivities ', data)
      dispatch({
        type: ACT_COMPANY_ACTIVITIES_RECEIVED,
        payload: data
      });
      resolve(data);
    }, (error) => {
      console.log(error);
      dispatch(setError(error.message));
      reject(error);
    });
  });
}


export const deleteCompanyActivity = id => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.delete(`/activity/company/${id}`).then(({ data }) => {
      resolve(data);
    }, (error) => {
      console.log(error);
      dispatch(setError(error.message));
      reject(error);
    });
  });
}