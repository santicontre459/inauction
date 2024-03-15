import iNApiFactory from "../../api/services/iNApiFactory";
import {
  GET_LOGIN,
  ADD_COMPANY,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_REGISTRATION_MAIN_ACTIVITIES,
  GET_REGISTRATION_USER_POSITIONS
} from "./types";
import setAuthToken from '../../util/setAuthToken';
import { setCurrentUser } from './authActions';

// Get Main Activities
export const getMainActivities = () => async dispatch => {
  return new Promise(async (resolve, reject) => {

    iNApiFactory.get(`/business-operation/customer`).then(({ data }) => {
      dispatch({
        type: GET_REGISTRATION_MAIN_ACTIVITIES,
        payload: data
      });

    }, (error) => {
      if (error.message) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: error.message }
        });
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: 'An error occurred. Please try again by refreshing the page or if problem persist contact iNegotio at support@inegotio.com!'
          }
        });
      }
      reject(error);
    });
  });
};

// Get User Positions
export const getUserPositions = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/positions`).then(({ data }) => {
      dispatch({
        type: GET_REGISTRATION_USER_POSITIONS,
        payload: data
      });

    }, (error) => {
      if (error.message) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: error.message }
        });
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: 'An error occurred. Please try again by refreshing the page or if problem persist contact iNegotio at support@inegotio.com!'
          }
        });
      }
      reject(error);
    });
  });
};


// Add Company
export const addCompany = (companyData) =>
  async dispatch => {
    const onSuccess = ({ data }) => {

      dispatch(uploadCompanyDocs(companyData.business_certificate, data.data.company.id, 0));
      dispatch(uploadCompanyDocs(companyData.identity_document, data.data.company.id, 1));

      dispatch({
        type: ADD_COMPANY,
        payload: data
      });
      localStorage.setItem('jwtUser', JSON.stringify(data.data));
      localStorage.setItem('jwtToken', JSON.stringify(data.token));
      setAuthToken(data.token);
      dispatch(setCurrentUser(data.data));
      return data;
    };

    const onError = (error) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch(dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      }));
      return error;
    };

    try {
      const response = await iNApiFactory.post(
        `/auth/bidder/company-register`,
        companyData,
        { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}` } }
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

// Upload Company Doc
export const uploadCompanyDocs = (file, company_id, type) => async dispatch => {

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/bidder/company/add-file`, {
      "file": file,
      "user_id": JSON.parse(localStorage.jwtUser)?.id,
      "company_id": company_id,
      "type": type
    },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}`,
        }
      }).then(({ data }) => {

        // do nothing

      }).catch(error => {
        dispatch({ type: CLEAR_ERRORS });
        if (error.message) {
          dispatch({
            type: GET_ERRORS,
            payload: { message: error.message }
          });
        }
        else {
          dispatch({
            type: GET_ERRORS,
            payload: {
              message: 'An error occurred. Please try again by refreshing the page or if problem persist contact iNegotio at support@inegotio.com!'
            }
          });
        }
        reject(error);
      });
  });
};


// Upload Company Doc
export const updateCompanyDetails = (company_id, data) => async (dispatch, getState) => {

  return new Promise(async (resolve, reject) => {
    iNApiFactory.put(`/company/${company_id}`, data,
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}`,
        }
      }).then(({ data }) => {
        dispatch({
          type: GET_LOGIN,
          payload: data.user
        });
        localStorage.setItem('jwtUser', JSON.stringify(data.user));
        resolve(data);
      }).catch(error => {
        console.log('updateCompanyDetails ', error)
        dispatch({ type: CLEAR_ERRORS });
        if (error.message) {
          dispatch({
            type: GET_ERRORS,
            payload: { message: error.message }
          });
        }
        else {
          dispatch({
            type: GET_ERRORS,
            payload: {
              message: 'An error occurred. Please try again by refreshing the page or if problem persist contact iNegotio at support@inegotio.com!'
            }
          });
        }
        reject(error);
      });
  });
};


// Upload Company Doc
export const updateAddress = (data) => async (dispatch, getState) => {

  return new Promise(async (resolve, reject) => {
    iNApiFactory.put(`/company/address`, data,
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}`,
        }
      }).then(({ data }) => {
        dispatch({
          type: GET_LOGIN,
          payload: data.user
        });
        localStorage.setItem('jwtUser', JSON.stringify(data.user));
        resolve(data);
      }).catch(error => {
        console.log('updateAddress ', error)
        dispatch({ type: CLEAR_ERRORS });
        if (error.message) {
          dispatch({
            type: GET_ERRORS,
            payload: { message: error.message }
          });
        }
        else {
          dispatch({
            type: GET_ERRORS,
            payload: {
              message: 'An error occurred. Please try again by refreshing the page or if problem persist contact iNegotio at support@inegotio.com!'
            }
          });
        }
        reject(error);
      });
  });
};
