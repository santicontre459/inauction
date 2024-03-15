import {
  GET_EXPERTS,
  GET_ERRORS,
  ADD_EXPERT,
  DELETE_EXPERT,
  CLEAR_EXPERT,
  GET_EXPERT,
  EXPERT_LOADING,
  GET_TASKS,
  DELETE_TASK,
  DELETE_TASK_EXPERT, GET_TASK, UPDATE_TASK, UPDATE_TASK_TWO
} from "./types";
import { clearErrors } from './authActions';
import iNApiFactory from "../../api/services/iNApiFactory";
import { clearTask, setTaskLoading } from "./tasksActions";

// Get Experts
export const getExperts = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/expert`).then(({data}) => {

      dispatch({
        type: GET_EXPERTS,
        payload: data
      });

      dispatch(clearExpert());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'Error Getting Experts!' }
      });
      reject(error);
    });
  });
};

// Add Experts
export const addExpert = (expertData) => async dispatch => {

  dispatch(clearErrors());

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/expert`, expertData).then(({data}) => {
      dispatch({
        type: ADD_EXPERT,
        payload: data.result
      });
      dispatch(clearExpert());
    }, (error) => {
      if(error){
        //todo check for validations error, those don't have error.message
        dispatch({
          type: GET_ERRORS,
          payload: { message: error.message }
        })
      }
      reject(error);
    });
  });
};

// Delete Expert
export const deleteExpert = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.delete(`/expert/${id}`).then(({data}) => {

      dispatch({
        type: DELETE_EXPERT,
        payload: id
      })

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      reject(error);
    });
  });
};

// Get Expert
export const getExpert = (id) => async dispatch => {
  dispatch(setExpertLoading());
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/expert/${id}`).then(({data}) => {

      dispatch({
        type: GET_EXPERT,
        payload: data[0]
      });

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'Error Getting Expert!' }
      });
      reject(error);
    });
  });
};

// Update Expert
export const updateExpert = (id, expertData) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.put(`/expert/${id}`, expertData).then(({data}) => {

      dispatch({
        type: UPDATE_TASK,
        payload: data.task
      });

      dispatch(clearExpert());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.response.data.error.message  }
      });
      reject(error);
    });
  });
};


// Set loading state
export const setExpertLoading = () => {
  return {
    type: EXPERT_LOADING
  };
};

// Clear Expert
export const clearExpert = () => {
  return {
    type: CLEAR_EXPERT
  };
}
