import {
  GET_EVENTS,
  EVENTS_RECEIVED,
  ADD_DRAFT_EVENT,
  GET_ERRORS,
  ADD_EVENT,
  CLEAR_EVENT
} from "./types";
import iNApiFactory from "../../api/services/iNApiFactory";
import {clearErrors} from "./authActions";
import {NotificationContainer, NotificationManager} from "react-notifications";

/**
 *
 * @param customerId
 * @returns {function(*=): Promise<unknown>}
 * Get All Events
 * Events can be retrieved by a user based on these definitions
 * 1. Role - Always CUSTOMER
 * 2. SubRole -  ADMIN or Expert
 * 3. Type -  HOST or Customer
 */
export const getEvents = (customerId) => async dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: GET_EVENTS
    });
    iNApiFactory.get(`/events/${customerId}/retrieve`).then(({data}) => {
      dispatch({
        type: EVENTS_RECEIVED,
        eventsList: data.result
      });
      //@todo Ask Shabani
      //dispatch(clearEvent());
    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      reject(error);
    });
  });
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
export const addEvent = (eventData) => async dispatch => {
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
  return new Promise(async (resolve, reject) => {
    iNApiFactory.post(`/events`, dataToSend).then(({data}) => {
      dispatch({
        type: ADD_DRAFT_EVENT,
        payload: data.result
      });
      NotificationManager.success("Success", "Event has been added");
      //dispatch(clearEvent());
    }, (error) => {
      dispatch({
        type: GET_ERRORS,
        payload: {message: error.message}
      });
      NotificationManager.error("Ops", error.message);
      reject(error);
    });
  });
};

// Clear Event
export const clearEvent = () => {
  return {
    type: CLEAR_EVENT
  };
};

export const getEventDetails = (event_id) => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/event-details/${event_id}`).then(({data}) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}

export const getQuestionairDetails = (questionair_id) => {
  return new Promise(async (resolve, reject) => {
    iNApiFactory.get(`/questionair-details/${questionair_id}`).then(({data}) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}