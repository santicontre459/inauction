import setAuthToken from '../../util/setAuthToken';
import {
  GET_ERRORS,
  GET_LOGIN,
  CLEAR_ERRORS,
  GET_USER_DETAILS,
  CLEAR_REGISTER,
  RESEND_EMAIL,
  EMAIL_ALREADY_VERIFIED,
  EMAIL_VERIFIED,
  HOST_REGISTRATION_FORM,
} from "./types";
import iNApiFactory from "../../api/services/iNApiFactory";
import { clearBidder } from "./bidderActions";

//1 - User Login
export const loginUser = (userData) => async dispatch => {

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/auth/login`, userData).then(({data}) => {
      localStorage.setItem('jwtUser', JSON.stringify(data.data));
      localStorage.setItem('jwtToken', JSON.stringify(data.token));
      iNApiFactory.defaults.headers.Authorization = 'Bearer ' + data.token;
      dispatch(setCurrentUser(data.data));
    }).catch(error => {
      dispatch({type: CLEAR_ERRORS});
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
};

export const verifyEmail = (email, token, callback=null) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/auth/bidder/verification`, {
        email: email,
        token: token,
    }).then(({data}) => {
      if (data.message && data.message === 'Email Already Verified!'){
        dispatch({
          type: EMAIL_ALREADY_VERIFIED,
          payload: data
        });
      }
      else {

        localStorage.setItem('jwtUser', JSON.stringify(data.data));
        localStorage.setItem('jwtToken', JSON.stringify(data.token));
        // Set token to Auth header
        setAuthToken(data.token);
        dispatch(setCurrentUser(data.data));
        dispatch({
          type: EMAIL_VERIFIED,
          payload: data
        });
      }
    }).catch(error => {
      dispatch({type: CLEAR_ERRORS});
      dispatch({
          type: GET_ERRORS,
          payload: {message: error.message}
      });
      reject(error);
    });
  });
};

export const resendEmail = (userId) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/auth/bidder/verification/resend`, {user_id: userId}, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}`
      }
    }).then(({data}) => {

    dispatch({
      type: RESEND_EMAIL,
      payload: data
    });

    }).catch(error => {
      dispatch({type: CLEAR_ERRORS});
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
};

//2 - Get User By Id
export const getUser = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/users/${id}`).then(({data}) => {

      dispatch({
        type: GET_USER_DETAILS,
        payload: data.result
      });
      dispatch(clearBidder());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
};

//3 - User Register
export const registerUser = (userData) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/auth/bidder/register`, userData).then(({data}) => {

      // Set user to ls
      localStorage.setItem('jwtUser', JSON.stringify(data.data));
      localStorage.setItem('jwtToken', JSON.stringify(data.token));

      // Set token to Auth header
      setAuthToken(data.token);
      dispatch(setCurrentUser(data.data));
    }, (error) => {
      dispatch({type: CLEAR_ERRORS});
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

//4 - Host Registration Form
export const addHostRegistrationForm = (hostFormData) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/host-registration-form`, hostFormData).then(({data}) => {
      dispatch({
        type: HOST_REGISTRATION_FORM,
        payload: data
      });
    }, (error) => {
      dispatch({type: CLEAR_ERRORS});
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

// Set Current user
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: GET_LOGIN,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtUser');
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//4 - User Delete
export const deleteUser = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.delete(`/user` + id).then(({}) => {
        dispatch(logoutUser());
    }, (error) => {
        dispatch({
            type: GET_ERRORS,
            payload: {message: error.message}
        });
        reject(error);
    });
  });
};

// Clear Errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
};

// Clear Register
export const clearRegister = () => {
  return {
    type: CLEAR_REGISTER
  }
};


export const updateUserDetails = (userData) => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/auth/update-user`, userData).then(({data}) => {
      let updateData = {
        ...getState().authNew.user,
        ...data.data
      } 

      localStorage.setItem('jwtUser', JSON.stringify(updateData));
      dispatch(setCurrentUser(updateData));
      resolve(updateData);
    }, (error) => {
      dispatch({type: CLEAR_ERRORS});
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
