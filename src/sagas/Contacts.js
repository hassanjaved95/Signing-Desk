import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_CONTACTS, DELETE_CONTACTS } from "Actions/types";

import { getContactsSuccess, getContactsFailure, deleteContactsSuccess } from "Actions/ContactsActions";

const response = {
    data: [
        {
            "email": "mqasim@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e6",
            "name": "Muhammad Qasim"
        },
        {
            "email": "hjaved@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e7",
            "name": "Hassan Javed"
        },
        {
            "email": "mkhan@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e8",
            "name": "Muhammad Saqlain"
        },
        {
            "email": "hahmad@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e9",
            "name": "Hafeez Ahmad"
        },
        {
            "email": "snawaz@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c834310",
            "name": "Sarfaraz Nawaz"
        },
        {
            "email": "sheeda@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c834311",
            "name": "Sheeda Talli"
        }
    ]
};

const getContactsRequest = () => {
    return response;
};

const deleteContactsRequest = (ids) => {
    return true;
}

function* getContactsFromServer() {
    try {
        const response = yield call(getContactsRequest);
        yield put(getContactsSuccess(response));
    } catch (error) {
        yield put(getContactsFailure(error));
    }
}

function* deleteContactsFromServer({ payload }) {
    try {
        debugger;
        const response = yield call(deleteContactsRequest, payload);
        yield put(deleteContactsSuccess(payload));
    } catch (error) {
        // yield put(getContactsFailure(error));
    }
}

// watcher
export function* getContacts() {
    yield takeEvery(GET_CONTACTS, getContactsFromServer);
}

export function* deleteContacts() {
    yield takeEvery(DELETE_CONTACTS, deleteContactsFromServer);
}

export default function* rootSaga() {
    yield all([
        fork(getContacts),
        fork(deleteContacts)
    ]);
}
