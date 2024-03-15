import isEmpty from '../../util/isEmpty';

import {
  GET_LOGIN,
  ADD_USER,
  RESEND_EMAIL,
  EMAIL_ALREADY_VERIFIED,
  EMAIL_VERIFIED, HOST_REGISTRATION_FORM
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  registered: false,
  emailResent: false,
  emailAlreadyVerified: false,
  emailVerified: false,
  hostRegistrationFormSent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        registered: false
      };
    case ADD_USER:
      return {
        ...state,
        registered: true,
      };
    case RESEND_EMAIL:
      return {
        ...state,
        emailResent: true,
      };
    case EMAIL_ALREADY_VERIFIED:
      return {
        ...state,
        emailAlreadyVerified: true,
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        emailVerified: true,
      };
    case HOST_REGISTRATION_FORM:
      return {
        ...state,
        hostRegistrationFormSent: true,
      };
    default:
      return state;
  }
}
