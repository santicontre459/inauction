import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {fetchCategoriesSuccess} from '../actions/Categories';
import {database} from '../../firebase/firebase';
import {SUPER_ADMIN_GET_CATEGORIES} from '../../constants/ActionTypes';
import {fetchError} from "../actions/Common";

const getCategories = async () =>
  await database.ref('notes').once('value')
    .then((snapshot) => {
      const notess = [];
      snapshot.forEach((rawData) => {
        notess.push(rawData.val());
      });
      return notess;
    })
    .catch(error => error);


function* fetchCategoriesRequest() {
  try {
    const fetchedCategories = yield call(getCategories);
    console.log('fetchedCategories', fetchedCategories)
    yield put(fetchCategoriesSuccess(fetchedCategories));
  } catch (error) {
    yield put(fetchError(error));
  }
}

export function* fetchCategories() {
  yield takeEvery(SUPER_ADMIN_GET_CATEGORIES, fetchCategoriesRequest);
}


export default function* rootSaga() {
  // yield all(fork(fetchCategories));
}
