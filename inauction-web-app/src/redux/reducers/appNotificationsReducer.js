import {
    APP_NOTIFICATIONS_RECEIVED,
    SET_APP_NOTIFICATIONS_LOADING,
    RESET_APP_NOTIFICATIONS_LOADING,
} from '../actions/types';

const initSate = {
    notifications: [],
    loading: false,
};

const reducer = (state = initSate, action) => {
    switch (action.type) {
        case APP_NOTIFICATIONS_RECEIVED:
            return {
                ...state,
                notifications: action.payload || []
            };
        case SET_APP_NOTIFICATIONS_LOADING:
            return {
                ...state,
                loading: true
            };
        case RESET_APP_NOTIFICATIONS_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;
