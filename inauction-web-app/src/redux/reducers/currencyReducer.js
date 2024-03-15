import {GET_CURRENCIES, CURRENCIES_RECEIVED} from "./../actions/types";

const INIT_STATE = {
  currencies: [],
};

const reducer = (state = INIT_STATE, action = {type: ""}) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return {...state, loading: true};
    case CURRENCIES_RECEIVED:
      return {...state, currencies: action.list, loading: false};
    default:
      return state;
  }
};

export default reducer;
