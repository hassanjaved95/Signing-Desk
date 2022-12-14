/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// sagas
import authSagas from "./Auth";
import emailSagas from "./Email";
import documentsSagas from "./Documents";
import DocumentViewerSagas from "./DocumentViewer";
import contactsSagas from "./Contacts";
import todoSagas from "./Todo";
import feedbacksSagas from "./Feedbacks";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    emailSagas(),
    documentsSagas(),
    DocumentViewerSagas(),
    contactsSagas(),
    todoSagas(),
    feedbacksSagas()
  ]);
}
