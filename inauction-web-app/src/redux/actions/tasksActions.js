import iNApiFactory from '../../api/services/iNApiFactory';
import { 
    GET_TASKS,
    GET_TASKS_TYPES,
    GET_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    TASK_LOADING,
    ADD_TASK,
    CLEAR_TASK,
    GET_ERRORS,
    GET_TASKS_EXPERT,
    DELETE_TASK_EXPERT,
    ADD_TASK_TWO,
    UPDATE_TASK_TWO
} from './types';
import { clearErrors } from './authActions';
import { getExperts } from './expertsActions';

// Get Tasks
export const getTasksAll = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/task`).then(({data}) => {
      dispatch({
        type: GET_TASKS,
        payload: data
      });
      dispatch(getExperts(id));
      dispatch(clearTask());
    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'Error Getting Tasks!' }
      });
      reject(error);
    });
  });
};

// Get Tasks Types
export const getTasksTypes = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`tasks/types`).then(({data}) => {

      dispatch({
        type: GET_TASKS_TYPES,
        payload: data.result
      });

      dispatch(clearTask());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'Error Getting Tasks Types!' }
      });
      reject(error);
    });
  });
};


// Get Task by Expert
export const getTaskExpert = (id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/tasks/${id}/retrieveExpert`).then(({data}) => {

      dispatch({
        type: GET_TASKS_EXPERT,
        payload: data
      });
      dispatch(clearTask());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: 'Error Getting Tasks!' }
      });
      reject(error);
    });
  });
};

// Add Task
export const addTask = (taskData, user) => async dispatch => {

  dispatch(clearErrors());

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/tasks`, taskData).then(({data}) => {

      dispatch({
        type: ADD_TASK,
        payload: data.result
      });
      dispatch(clearTask());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};

// Delete Task
export const deleteTask = (id, user) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.delete(`/tasks/${id}`).then(({data}) => {

      if(user.user.type === 'HOST'){
        dispatch({
          type: DELETE_TASK,
          payload: id
        })
      } else {
        dispatch({
          type: DELETE_TASK_EXPERT,
          payload: id
        })
      }

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      reject(error);
    });
  });
};

// Get Task
export const getTask = (id) => async dispatch => {
  dispatch(setTaskLoading());
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/tasks/${id}`).then(({data}) => {

      dispatch({
        type: GET_TASK,
        payload: data.result
      });
      dispatch(getExperts(id));
      dispatch(clearTask());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};


// Update Task
export const updateTask = (id, taskData, user) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.put(`/tasks/${id}`, taskData).then(({data}) => {

      if(user.type === 'HOST'){
        dispatch({
          type: UPDATE_TASK,
          payload: data.task
        })
      } else {
        dispatch({
          type: UPDATE_TASK_TWO,
          payload: data.task
        })
      }

      dispatch(clearTask());

    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};

// Set loading state
export const setTaskLoading = () => {
    return {
        type: TASK_LOADING
    };
};

// Clear Task
export const clearTask = () => {
    return {
      type: CLEAR_TASK
    };
};