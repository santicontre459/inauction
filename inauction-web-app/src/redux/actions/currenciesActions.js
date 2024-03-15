import {
  GET_CURRENCIES,
  CURRENCIES_RECEIVED,
  GET_ERRORS,
} from "./types";
import iNApiFactory from "../../api/services/iNApiFactory";

/**
 *
 * @returns {function(*=): Promise<unknown>}
 * Get All Currencies
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 * 2. Type -  HOST (Admin / Experts)
 */
export const getCurrencies = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: GET_CURRENCIES
    });
    iNApiFactory.get(`/console/currencies`).then(({data}) => {
      dispatch({
        type: CURRENCIES_RECEIVED,
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
