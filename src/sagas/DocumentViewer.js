import {
    getViewingDocumentSuccess,
    getViewingDocumentFailure,
    getCompaniesSuccess,
    getCompaniesFailure,
    getCompanyUsersSuccess,
    getCompanyUsersFailure,
    getContactsAsUsersSuccess,
    getContactsAsUsersFailure
} from "Actions";

import {
    GET_VIEWING_DOCUMENT,
    GET_COMPANIES
} from "Actions/types";


import API from 'Api';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";


const getViewingDocumentRequest = async () => {
    var response = await API.get('view/document', { id: 1 }); // TODO
    return response;
}

const getCompaniesRequest = async () => {
    var response = await API.get('companies/all/' + '4da60049-419a-43ba-9aef-71c05f4b3db0'); // TODO
    return response;
}






function* getViewingDocumentFromServer() {
    try {
        const response = yield call(getViewingDocumentRequest);
        if (response && response.status == 200) {
            yield put(getViewingDocumentSuccess(response));
        }
        else {
            yield put(getViewingDocumentFailure(response));
        }
    } catch (error) {
        yield put(getViewingDocumentFailure(error));
    }
}

function* getCompaniesFromServer() {
    try {
        const response = yield call(getCompaniesRequest);
        if (response && response.status == 200) {
            yield put(getCompaniesSuccess(response));
        }
        else {
            yield put(getCompaniesFailure(response));
        }
    } catch (error) {
        yield put(getCompaniesFailure(error));
    }
}




export function* getViewingDocument() {
    yield takeEvery(GET_VIEWING_DOCUMENT, getViewingDocumentFromServer);
}

export function* getCompanies() {
    yield takeEvery(GET_COMPANIES, getCompaniesFromServer);
}





export default function* rootSaga() {
    yield all([
        fork(getViewingDocument),
        fork(getCompanies)
       
    ]);
}