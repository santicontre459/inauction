import {
  SUPER_ADMIN_GET_CATEGORIES,
  SUPER_ADMIN_RETRIEVE_CATEGORIES_SUCCESS,
  SUPER_ADMIN_RETRIEVE_CATEGORY_DETAILS_SUCCESS,
  SUPER_ADMIN_CREATE_CATEGORY_SUCCESS,
  SUPER_ADMIN_UPDATE_CATEGORY_SUCCESS,
  SUPER_ADMIN_DELETE_CATEGORY_SUCCESS,
  SUPER_ADMIN_ACTIVATE_CATEGORY_SUCCESS,
  SUPER_ADMIN_DEACTIVATE_CATEGORY_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
  categoriesList: []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SUPER_ADMIN_GET_CATEGORIES: {
      return {
        ...state,
        categoriesList: action.categoriesList,
      }
    }
    case SUPER_ADMIN_RETRIEVE_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoriesList: action.payload,
      }
    }

    default:
      return state;
  }
}
