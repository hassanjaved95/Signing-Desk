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
import { GET_COMPANYUSERS, GET_CONTACTSASUSERS } from "../actions/types";

const getViewingDocumentRequest = async () => {
    var response = await API.get('view/document', { id: 1 }); // TODO
    return response;
}

const getCompaniesRequest = async () => {
    var response = await API.get('companies/all/' + '4da60049-419a-43ba-9aef-71c05f4b3db0'); // TODO
    return response;
}

const getCompanyUsersRequest = async (payload) => {
    
    var response = await API.get('companies/user/all-users-by-company-updated/'+payload.companyId); // TODO
    return response;
}

const getContactsRequest = async () => {
    var response = await API.get('contacts/all', { id: 1 }); // TODO
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

function* getCompaniesFromServer() {
    try {
        const response = yield call(getCompaniesRequest);
        yield put(getCompaniesSuccess(response));
    } catch (error) {
        yield put(getCompaniesFailure(error));
    }
}

function* getCompanyUsersFromServer({payload}) {
    try {
        const response = yield call(getCompanyUsersRequest, payload);
        yield put(getCompanyUsersSuccess(response));
    } catch (error) {
        yield put(getCompanyUsersFailure(error));
    }
}

function* getContactsFromServer() {
    try {
        const response = yield call(getContactsRequest);
        yield put(getContactsAsUsersSuccess(response));
    } catch (error) {
        yield put(getContactsAsUsersFailure(error));
    }
}

export function* getViewingDocument() {
    yield takeEvery(GET_VIEWING_DOCUMENT, getViewingDocumentFromServer);
}

export function* getCompanies() {
    yield takeEvery(GET_COMPANIES, getCompaniesFromServer);
}

export function* getCompanyUsers() {
    yield takeEvery(GET_COMPANYUSERS, getCompanyUsersFromServer);
}

export function* getContacts() {
    yield takeEvery(GET_CONTACTSASUSERS, getContactsFromServer);
}

export default function* rootSaga() {
    yield all([
        fork(getViewingDocument),
        fork(getCompanies),
        fork(getCompanyUsers),
        fork(getContacts)
    ]);
}