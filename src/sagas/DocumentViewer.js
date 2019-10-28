import {
    getViewingDocumentSuccess,
    getViewingDocumentFailure,
    getCompaniesSuccess,
    getCompaniesFailure,
    getCompanyUsersSuccess,
    getCompanyUsersFailure,
    getContactsAsUsersSuccess,
    getContactsAsUsersFailure,
    createWorkFlowSuccess,
    createWorkFlowFailure,
    restoreWorkFlowSuccess,
    restoreWorkFlowFailure,

} from "Actions";

import {
    GET_VIEWING_DOCUMENT,
    GET_COMPANIES,
    CREATE_COMPOSITE_WORKFLOW,
    RESTORE_COMPOSITE_WORKFLOW
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

const createWorkFlowRequest = async (requestObj) => {
    var response = await API.post('workflows/create-composite', requestObj.payload);
    return response;
}

const restoreWorkFlowRequest = async (requestObj) => {
    var response = await API.get('workflows/by-document/', requestObj.payload.documentId);
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

function* createCompositeWorkflowOnServer(data) {
    try {
        const response = yield call(createWorkFlowRequest, data);
        if (response && response.status == 200) {
            const workflowID = response.data.workflowID;
            data.payload.workflowID = workflowID;
            data.callback(workflowID); // response should have workflow id so that we can start workflow
            yield put(createWorkFlowSuccess(data));
        } else {
            yield put(createWorkFlowFailure(response));
        }
    } catch (error) {
        yield put(createWorkFlowFailure(error));
    }
}

function* restoreCompositeWorkflowOnServer(data) {
    try {
        const response = yield call(restoreWorkFlowRequest, data);
        if (response && response.status == 200) {
            yield put(restoreWorkFlowSuccess(response));
        } else {
            yield put(restoreWorkFlowFailure(response));
        }
    } catch (error) {
        yield put(restoreWorkFlowFailure(error));
    }
}

export function* getViewingDocument() {
    yield takeEvery(GET_VIEWING_DOCUMENT, getViewingDocumentFromServer);
}

export function* createWorkFlow() {
    yield takeEvery(CREATE_COMPOSITE_WORKFLOW, createCompositeWorkflowOnServer);
}

export function* restoreWorkFlow() {
    yield takeEvery(RESTORE_COMPOSITE_WORKFLOW, restoreCompositeWorkflowOnServer);
}

export function* getCompanies() {
    yield takeEvery(GET_COMPANIES, getCompaniesFromServer);
}

export default function* rootSaga() {
    yield all([
        fork(getViewingDocument),
        fork(getCompanies),
        fork(createWorkFlow),
        fork(restoreWorkFlow)
    ]);
}