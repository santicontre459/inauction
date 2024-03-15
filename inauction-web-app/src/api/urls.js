export const v1 = 'v1';
export const v2 = 'v2';

export const version = v1;

export const BASE_URL = 'http://localhost:3000/api';
export const getAPI_URL = `${BASE_URL}/${version}`;

// SuperAdmin Panel - API Calls

// Categories
export const GetCategoriesUrl = `${getAPI_URL}/categories`;
export const GetCategoryDetailsUrl = (categoryId) =>  `${getAPI_URL}/categories/${categoryId}`;
