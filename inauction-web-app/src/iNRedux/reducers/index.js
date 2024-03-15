import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Notes from "./Notes";
import Categories from "./Categories";
import Contact from "./Contact";
import Common from "./Common";
import errorReducer from "./errorReducer";
import eventReducer from "../../screens/events/redux/eventReducer";
import createEventReducer from "../../screens/events/create-event/combinedReducers";
import currencyReducer from '../../redux/reducers/currencyReducer';
import companyActivityReducer from '../../redux/reducers/companyActivityReducer';
import authReducer from '../../redux/reducers/authReducer';
//import expertsReducer from '../../redux/reducers/expertsReducer';
import expertsReducer from "../../screens/experts/redux/expertsReducer";
import userReducer from "../../redux/reducers/userReducer";
//import taskReducer from "../../redux/reducers/taskReducer";
import taskReducer from "../../screens/tasks/redux/taskReducer";
import bidderReducer from "../../redux/reducers/bidderReducer";
import companyReducer from "../../redux/reducers/companyReducer";
import activityReducer from '../../redux/reducers/activityReducer';
import appNotificationsReducer from '../../redux/reducers/appNotificationsReducer';

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  notes: Notes,
  categories: Categories,
  contact: Contact,
  common: Common,
  authNew: authReducer,
  errors: errorReducer,
  experts: expertsReducer,
  user: userReducer,
  tasks: taskReducer,
  bidders: bidderReducer,
  companyData: companyReducer,
  events: eventReducer,
  createEvent: createEventReducer,
  currencies: currencyReducer,
  companyActivities: companyActivityReducer,
  systemActivities: companyActivityReducer,
  activityReducer : activityReducer,
  appNotifications : appNotificationsReducer
});

export default reducers;
