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


export const onGetCategories = (categoriesList) => {
  return {
    type: SUPER_ADMIN_GET_CATEGORIES,
    categoriesList
  };
};

export const fetchCategoriesSuccess = (categoriesList) => {
  return {
    type: SUPER_ADMIN_RETRIEVE_CATEGORIES_SUCCESS,
    payload: categoriesList
  };
};
