import { GET_USER_DETAILS } from '../actions/types';

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
