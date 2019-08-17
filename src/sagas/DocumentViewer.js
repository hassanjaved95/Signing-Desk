import {
    getViewingDocumentSuccess,
    getViewingDocumentFailure
} from "Actions";

import {
    GET_VIEWING_DOCUMENT
} from "Actions/types";


import API from 'Api';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

const getViewingDocumentRequest = async () => {
    var response = await API.get('view/document', { id: 1 }); // TODO
    return response;
}

function* getViewingDocumentFromServer() {
    try {
        const response = yield call(getViewingDocumentRequest);
        yield put(getViewingDocumentSuccess(response));
    } catch (error) {
        yield put(getViewingDocumentFailure(error));
    }
}

export function* getViewingDocument() {
    yield takeEvery(GET_VIEWING_DOCUMENT, getViewingDocumentFromServer);
}

export default function* rootSaga() {
    yield all([fork(getViewingDocument)])
}