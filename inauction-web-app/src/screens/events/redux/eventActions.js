import {
  EVENTS_RECEIVED,
  DRAFT_EVENTS_RECEIVED,
  ADD_DRAFT_EVENT,
  CLEAR_EVENT,
  SET_LOADING,
  RESET_LOADING,
  UOMS_RECEIVED,
  ADD_DRAFT_LOTS
} from "./eventActionTypes";
import { setError } from "../../../iNRedux/actions/errorActions";
import iNApiFactory from "../../../api/services/iNApiFactory";
import { NotificationManager } from "react-notifications";

/**
 *
 * @returns {function(*=): Promise<unknown>}
 * Get All Events
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 * 2. SubRole -  ADMIN or Expert
 * 3. Type -  HOST or Customer
 */
export const getEvents = () => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    //debugger
    const result = await iNApiFactory.get(`/events/all`);
    //debugger
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: EVENTS_RECEIVED,
      eventsList: result.data
    });
    dispatch(clearEvent());
  } catch (error) {
    //debugger
    console.log(error);
    dispatch({ type: RESET_LOADING });
    //dispatch(setError(error.message));
  }
}

export const getDraftEvents = () => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    //debugger
    const result = await iNApiFactory.get(`/events/draft`);
    //debugger
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: DRAFT_EVENTS_RECEIVED,
      eventsList: result.data
    });
    dispatch(clearEvent());
  } catch (error) {
    //debugger
    console.log(error);
    dispatch({ type: RESET_LOADING });
    //dispatch(setError(error.message));
  }
}


export const setDraftEvent = (eventData) => {
  return {
    type: ADD_DRAFT_EVENT,
    payload: eventData
  };
};

/**
 *
 * @param eventData
 * @returns {function(*=): Promise<unknown>}
 * Create Event
 * Event can be created by a user on these definitions
 * 1. Role - Always CUSTOMER
 * 2. SubRole - Always ADMIN
 * 3. Type - Always HOST
 */
export const addEvent = eventData => async dispatch => {
  //dispatch(clearErrors());
  dispatch({
    type: ADD_DRAFT_EVENT,
    payload: eventData
  });

  console.log('here', eventData)
  const dataToSend = {
    "customer_id": eventData.customer_id,
    "company_id": eventData.company_id,
    "activity_id": eventData.activityId,
    "title": eventData.eventName,
    "description": eventData.eventDescription,
    "budget": eventData.totalBudget,
    "nr_of_experts": eventData.numberOfExperts,
    "currency": eventData.currency,
    "has_questionnaire": eventData.questionnaire.length > 0 ? 1 : 0,
    "is_rfq": eventData.eventType === "RFQ" ? 1 : 0,
    "is_oa": eventData.eventType === "onlineAuction" ? 1 : 0,
    "seal_result_type": 1,
    "progress_status": "DRAFT",
    "visibility": "ACCESSIBLE_BY_INVITATION",
    // todo future versions create general created list for visible events
    //"accessible_list_id": "5d8f7930e472ed716976cbe2",
    "rfq": Object.keys(eventData.rfqEventType).length > 0 ? {
      "bid_direction": eventData.rfqEventType.bidDirection,
      "bid_deadline": eventData.rfqEventType.bidDeadline,
      "seal_result_type": eventData.rfqEventType.sealResultType,
      "weighting": eventData.rfqEventType.weighting,
      "priceWeighting": eventData.rfqEventType.priceWeighting,
      "withQuestionnaire": eventData.rfqEventType.withQuestionnaire,
    } : {},
    "online_auction": Object.keys(eventData.onlineAuctionEventType).length > 0 ? {
      "bid_direction": eventData.onlineAuctionEventType.bidDirection,
      "start_time": eventData.onlineAuctionEventType.auctionTime,
      "competition_info": eventData.onlineAuctionEventType.competitionInfo,
      "minimum_duration": eventData.onlineAuctionEventType.minDuration,
      "dynamic_close_period": eventData.onlineAuctionEventType.dynamicClosePeriod,
      "minimum_bid_change": eventData.onlineAuctionEventType.minBidChanges,
      "maximum_bid_change": eventData.onlineAuctionEventType.maxBidChanges,
      "weighting": eventData.onlineAuctionEventType.weighting,
      "priceWeighting": eventData.onlineAuctionEventType.priceWeighting,
      "questionnaire": eventData.onlineAuctionEventType.questionnaire,
    } : {},
    "questionnaires": [
      eventData.questionnaire.length > 0 ?
        eventData.questionnaire.forEach(item => ({
          "title": item.questionnaireName,
          "deadline": item.deadline,
          "has_scoring": item.hasScoring,
          "has_weighting": item.hasWeighting,
          "in_event_rating": 0
        })) : []
    ]
  };
  try {
    const result = await iNApiFactory.post(`/event`, dataToSend)
    dispatch({
      type: ADD_DRAFT_EVENT,
      payload: result.data
    });
    NotificationManager.success("Success", "Event has been added");
    dispatch(clearEvent());
  } catch (error) {
    dispatch(setError(error.message));
    NotificationManager.error("Ops", error.message);
  }
}

export const clearEvent = () => {
  return {
    type: CLEAR_EVENT
  };
};



// Upload Company Doc
export const uploadEventFiles = (files, event_id) => async dispatch => {

  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/event/add-files`, {
      "files": files,
      "event_id": event_id
    },
      {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.jwtToken)}`,
        }
      }).then(({ data }) => {
        NotificationManager.success("Success", "Files has been uploaded");
        resolve(data);
      }).catch(error => {
        dispatch(setError(error.message));
        NotificationManager.error("Ops", error.message);
        reject(error);
      });
  });
};


export const getUOMs = (status) => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    //debugger
    const result = await iNApiFactory.get(`/uom` + (status ? `/${status}` : ''));
    //debugger
    dispatch({ type: RESET_LOADING });
    dispatch({
      type: UOMS_RECEIVED,
      payload: result.data
    });
  } catch (error) {
    //debugger
    console.log(error);
    dispatch({ type: RESET_LOADING });
    //dispatch(setError(error.message));
  }
}

export const addLotsEvent = (eventid, lotType, lots) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/lotDraft`, {
      lotType,
      eventid,
      lots
    }).then(({ data }) => {
      NotificationManager.success("Success", "Lots has been added");
      resolve(data);
    }, (error) => {
      dispatch(setError(error.message));
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
}

export const addInvitationsEvent = (eventid, bidders, eventCategories, emailInvitations) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/eventParticipants`, {
      eventid,
      bidders,
      eventCategories,
      emailInvitations
    }).then(({ data }) => {
      NotificationManager.success("Success", "Invitation sent successfully");
      resolve(data);
    }, (error) => {
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
}


export const publishEvent = (eventid) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/event/publish`, {
      eventid,
    }).then(({ data }) => {
      NotificationManager.success("Success", "Event has been published successfully!");
      resolve(data);
    }, (error) => {
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
}


export const updateQuestionaireData = (questoinaire) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/event/questionnaire/update`, questoinaire).then(({ data }) => {
      NotificationManager.success("Success", "Questionaire has been saved successfully!");
      resolve(data);
    }, (error) => {
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
}
