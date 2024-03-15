import {
  SET_BIDDERS_LOADING,
  BIDDERS_INVITATIONS_RECEIVED,
  INVITE_BIDDER,
  CLEAR_BIDDER_INVITATION,
  All_BIDDERS_RECEIVED,
  CATEGORY_BIDDERS_RECEIVED
} from '../actions/types';

const initialState = {
  bidderList: [],
  categoryBidderList: [],
  biddersInvitations: [],
  bidder: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BIDDERS_LOADING:
      return {
        ...state,
        loading: action.payload || false
      };
    case BIDDERS_INVITATIONS_RECEIVED:
      return {
        ...state,
        biddersInvitations: action.biddersInvitations,
        loading: false
      };
    case All_BIDDERS_RECEIVED:
      return {
        ...state,
        bidderList: action.payload || [],
        loading: false
      };
    case CATEGORY_BIDDERS_RECEIVED:
      return {
        ...state,
        categoryBidderList: action.payload || [],
        loading: false
      };
    case INVITE_BIDDER:
      return {
        ...state,
        bidder: action.payload
      };
    case CLEAR_BIDDER_INVITATION:
      return {
        ...state,
        bidder: {}
      };
    default:
      return state;
  }
}
