import { combineReducers } from "redux";
import settignsStepReducer from './settings-step/redux/reducer';

const reducers = combineReducers({
    settingsStep: settignsStepReducer,
});

export default reducers;
