import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_CONTACTS } from "Actions/types";

import { getContactsSuccess, getContactsFailure } from "Actions/ContactsActions";

const response = {
    data: [
        {
            "email": "teste1@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e6",
            "name": "DigitalSign Pakistan 1"
        },
        {
            "email": "teste2@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e7",
            "name": "DigitalSign Pakistan 2"
        },
        {
            "email": "teste3@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e8",
            "name": "DigitalSign Pakistan 3"
        },
        {
            "email": "teste4@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c8343e9",
            "name": "DigitalSign Pakistan 4"
        },
        {
            "email": "teste5@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c834310",
            "name": "DigitalSign Pakistan 5"
        },
        {
            "email": "teste6@signingdesk.com",
            "corporatesID": "d1da11e6-286b-445f-9930-922f3c834311",
            "name": "DigitalSign Pakistan 6"
        }
    ]
};

const getContactsRequest = () => {
    return response;
};

function* getContactsFromServer() {
    try {
        const response = yield call(getContactsRequest);
        yield put(getContactsSuccess(response));
    } catch (error) {
        yield put(getContactsFailure(error));
    }
}

// watcher
export function* getContacts() {
    yield takeEvery(GET_CONTACTS, getContactsFromServer);
}

export default function* rootSaga() {
    yield all([fork(getContacts)]);
}
