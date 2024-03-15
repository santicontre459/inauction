import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import notesSagas from "./Notes";
import categoriesSagas from "./Categories";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    notesSagas(),
    categoriesSagas()
  ]);
}
