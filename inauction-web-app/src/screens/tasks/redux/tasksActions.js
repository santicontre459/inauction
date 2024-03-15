import iNApiFactory from '../../../api/services/iNApiFactory';
import { 
    GET_TASKS,
    GET_TASKS_NAMES,
    GET_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    TASK_LOADING,
    RESET_LOADING,
    ADD_TASK,
    CLEAR_TASK,
    GET_TASKS_EXPERT,
    DELETE_TASK_EXPERT,
    ADD_TASK_TWO,
    UPDATE_TASK_TWO
} from './tasksActionTypes';
import { setError, clearErrors } from '../../../iNRedux/actions/errorActions';

export const getTasksAll = () => async dispatch => {
  dispatch(setTaskLoading());
  try {
    const result = await iNApiFactory.get(`/task`);
    dispatch({
      type: GET_TASKS,
      payload: result.data
    });
    dispatch(resetLoading());
    dispatch(clearTask());
  } catch (error) {
    dispatch(resetLoading());
    dispatch(setError('Error Getting Tasks!'));
  }
}

export const getTaskNames = () => async dispatch => {
  try {
    const result = await iNApiFactory.get(`task-names`);
    dispatch({
      type: GET_TASKS_NAMES,
      payload: result.data
    });
  } catch (error) {
    dispatch(setError('Error Getting Tasks Names!'));
  }
}

export const getTaskExpert = () => async dispatch => {
  try {
    const result = await iNApiFactory.get(`/expert/task`);
    dispatch({
      type: GET_TASKS_EXPERT,
      payload: result.data
    });
    dispatch(clearTask());
  } catch (error) {
    dispatch(setError('Error Getting Tasks!'));
  }
}

export const addTask = (taskData) => async dispatch => {
  dispatch(clearErrors());
  try {
    const result  = await iNApiFactory.post(`/task`, taskData);
    dispatch({
      type: ADD_TASK,
      payload: result.data
    });
    dispatch(clearTask());
    return 'success';
  } catch (error) {
    console.log(error.message);
    dispatch(setError(error.message));
    return 'error';
  }
}

export const deleteTask = (id, user) => async dispatch => {
  dispatch(setTaskLoading());
  try {
    await iNApiFactory.delete(`/task/${id}`);
    if (user.role.roleName === 'Host') {
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    } else {
      dispatch({
        type: DELETE_TASK_EXPERT,
        payload: id
      });
    }
    dispatch(resetLoading());
  } catch (error) {
    dispatch(resetLoading());
    dispatch(setError(error.message));
  }
}

export const getTask = id => async dispatch => {
  dispatch(setTaskLoading());
  try {
    const result = await iNApiFactory.get(`/task/details/${id}`);
    dispatch({
      type: GET_TASK,
      payload: result.data
    });
    dispatch(resetLoading());
  } catch (error) {
    dispatch(resetLoading());
    dispatch(setError(error.message));
  }
}

export const updateTask = (id, taskData, user) => async dispatch => {
  try {
    const result = await iNApiFactory.put(`/task/${id}`, taskData);
    if(user.type === 'HOST'){
      dispatch({
        type: UPDATE_TASK,
        payload: result.data
      });
    } else {
      dispatch({
        type: UPDATE_TASK_TWO,
        payload: result.data
      });
    }
    dispatch(clearTask());
    return 'success';
  } catch (error) {
    dispatch(setError(error.message));
    return 'error';
  }
}

export const setTaskLoading = () => {
    return {
        type: TASK_LOADING
    };
};

export const resetLoading = () => {
  return {
    type: RESET_LOADING
  };
}

export const clearTask = () => {
    return {
      type: CLEAR_TASK
    };
};
