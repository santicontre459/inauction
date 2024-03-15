import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const setError = (errorMessage) => {
    return {
        type: GET_ERRORS,
        payload: errorMessage
    };
}

export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    }
}
