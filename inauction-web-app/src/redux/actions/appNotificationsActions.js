import {
  APP_NOTIFICATIONS_RECEIVED,
  SET_APP_NOTIFICATIONS_LOADING,
  RESET_APP_NOTIFICATIONS_LOADING,
} from './types';
import { setError } from "../../iNRedux/actions/errorActions";
import iNApiFactory from "../../api/services/iNApiFactory";
import {NotificationContainer, NotificationManager} from "react-notifications";

export const getAppNotifications = () => async dispatch => {
  dispatch({ type: SET_APP_NOTIFICATIONS_LOADING });
  try {
    const result = await iNApiFactory.get(`/app-notifications`);
    console.log('getAppNotifications ', result.data)
    dispatch({
      type: APP_NOTIFICATIONS_RECEIVED,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  }
  dispatch({ type: RESET_APP_NOTIFICATIONS_LOADING });
}

export const markReadNotification = (noti_id) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/markread-notification`, { noti_id: noti_id }).then(({ data }) => {
      NotificationManager.success("Success", "");
      resolve(data);
    }, (error) => {
      dispatch(setError(error.message));
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
};
