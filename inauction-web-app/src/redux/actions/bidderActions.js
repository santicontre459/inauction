import iNApiFactory from '../../api/services/iNApiFactory';
import {
  SET_BIDDERS_LOADING,
  INVITE_BIDDER,
  GET_ERRORS,
  CLEAR_BIDDER_INVITATION,
  BIDDERS_INVITATIONS_RECEIVED,
  All_BIDDERS_RECEIVED,
  CATEGORY_BIDDERS_RECEIVED
} from "./types";
import { clearErrors } from './authActions';
import { NotificationManager } from "react-notifications";

// Get Bidders Invitations
export const getBiddersInvitations = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: SET_BIDDERS_LOADING,
      payload: true
    });
    iNApiFactory.get(`/invite-bidder`).then(({ data }) => {
      dispatch({
        type: BIDDERS_INVITATIONS_RECEIVED,
        biddersInvitations: data
      });

    }, (error) => {
      dispatch({
        type: SET_BIDDERS_LOADING,
        payload: false
      });
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};


// Invite Bidder
export const inviteBidder = (bidderData) => async dispatch => {

  dispatch(clearErrors());

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/invite-bidder`, bidderData).then(({ data }) => {
      dispatch({
        type: INVITE_BIDDER,
        payload: data.result
      });
      NotificationManager.success("Success", data.message);
      dispatch(clearBidder());
    }, (error) => {
      if (error) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: error.message }
        });
        NotificationManager.error("Ops", error.message);
      }
      reject(error);
    });
  });
};

export const clearBidder = () => {
  return {
    type: CLEAR_BIDDER_INVITATION
  }
};


// Get All Bidders
export const getBidders = () => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: SET_BIDDERS_LOADING,
      payload: true
    });
    iNApiFactory.get(`/bidder`).then(({ data }) => {
      dispatch({
        type: All_BIDDERS_RECEIVED,
        payload: data.data
      });
      resolve(data.data);
    }, (error) => {
      dispatch({
        type: SET_BIDDERS_LOADING,
        payload: false
      });
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};


// Get Category related Bidders
export const getCategoryBidders = (activity_id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: SET_BIDDERS_LOADING,
      payload: true
    });
    iNApiFactory.get(`/bidders/category/${activity_id}`).then(({ data }) => {
      dispatch({
        type: CATEGORY_BIDDERS_RECEIVED,
        payload: data.data
      });
      resolve(data.data);
    }, (error) => {
      dispatch({
        type: SET_BIDDERS_LOADING,
        payload: false
      });
      dispatch({
        type: GET_ERRORS,
        payload: { message: error.message }
      });
      reject(error);
    });
  });
};