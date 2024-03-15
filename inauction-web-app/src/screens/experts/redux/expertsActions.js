import {
  GET_EXPERTS,
  DELETE_EXPERT,
  CLEAR_EXPERT,
  GET_EXPERT,
  GET_EXPERT_POSITIONS,
  EXPERT_LOADING,
  RESET_LOADING,
} from "./expertsActionTypes";
import iNApiFactory from "../../../api/services/iNApiFactory";
import { setError, clearErrors } from '../../../iNRedux/actions/errorActions';

export const getExperts = () => async dispatch => {
  dispatch(setExpertLoading());
  try {
    const result = await iNApiFactory.get(`/expert`);
    dispatch({
      type: GET_EXPERTS,
      payload: result.data
    });
    dispatch(resetExpertLoading());
    dispatch(clearExpert());
  } catch (error) {
    console.log(iNApiFactory.defaults);
    dispatch(resetExpertLoading());
    dispatch(setError(error.message));
  }
};

export const addExpert = expertData => async dispatch => {
  dispatch(clearErrors());
  try {
    await iNApiFactory.post(`/expert`, expertData);
    dispatch(clearExpert());
    return 'success';
  } catch (error) {
    console.log('addExpert err ', error)
    dispatch(setError(error.message));
    return error;
  }
}

export const deleteExpert = id => async dispatch => {
  dispatch(setExpertLoading());
  try {
    await iNApiFactory.delete(`/expert/${id}`);
    dispatch({
      type: DELETE_EXPERT,
      payload: id
    });
    dispatch(resetExpertLoading());
  } catch (error) {
    dispatch(resetExpertLoading());
    dispatch(setError(error.message));
  }
}

export const getExpert = id => async dispatch => {
  dispatch(setExpertLoading());
  try {
    const result = await iNApiFactory.get(`/expert/details/${id}`);
    dispatch({
      type: GET_EXPERT,
      payload: result.data
    });
    dispatch(resetExpertLoading());
  } catch (error) {
    dispatch(setError('Error Getting Expert!'));
  }
}

export const updateExpert = (id, expertData) => async dispatch => {
  try {
    await iNApiFactory.put(`/expert/${id}`, expertData);
    dispatch(clearExpert());
    return 'success';
  } catch (error) {
    dispatch(setError(error.response.data.error.message));
    return error;
  }
}

export const getExpertPositions = () => async dispatch => {
  try {
    const result = await iNApiFactory.get('/positions');
    const expertPositions = result.data?.filter(pos => pos.id === 7 || pos.id === 8);
    dispatch({
      type: GET_EXPERT_POSITIONS,
      payload: expertPositions
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
}

export const setExpertLoading = () => {
  return {
    type: EXPERT_LOADING
  };
}

export const resetExpertLoading = () => {
  return {
    type: RESET_LOADING
  }
}

export const clearExpert = () => {
  return {
    type: CLEAR_EXPERT
  };
}
