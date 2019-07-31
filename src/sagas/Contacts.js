import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

import { GET_CONTACTS, DELETE_CONTACTS, CREATE_CONTACT, UPDATE_CONTACT } from "Actions/types";

import { getContactsSuccess, getContactsFailure, deleteContactsSuccess, createContactSuccess, updateContactSuccess } from "Actions/ContactsActions";
import API from 'Api';

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

const getContactsRequest = async () => {
    var response = await API.get('contacts/all', { id: 1 });
    console.log('Contacts response:', response);

    return response;
    // return response;
};

const createContactRequest = async (data) => {
    var response = await API.post('contacts/create', data)
    console.log('createContactRequest response:', response);
    return response;
}

const updateContactRequest = async (data) => {
    var response = await API.post('contacts/update', data)
    console.log('updateContactRequest response:', response);
    return response;
}

const deleteContactsRequest = async (ids) => {
    var response = await API.delete('contacts/delete-multiple', ids)
    console.log('deleteContactsRequest response:', response);
    return response;
}

function* getContactsFromServer() {
    try {
        const response = yield call(getContactsRequest);
        yield put(getContactsSuccess(response));
    } catch (error) {
        yield put(getContactsFailure(error));
    }
}

function* createContactOnServer({ payload }) {
    try {
        const response = yield call(createContactRequest, payload);

        if (response.status == 200) {
            payload.id= response.data.contactID;
            yield put(createContactSuccess(payload));
        } else {
            console.log('createContactOnServer api error code:', response.status);
        }

    } catch (error) {
        console.log('createContactOnServer api error:', error);
    }
}

function* updateContactOnServer({ payload }) {
    try {
        const response = yield call(updateContactOnServer, payload);
        yield put(updateContactSuccess(response));
    } catch (error) {
        console.log('updateContactOnServer api error:', error);
    }
}

function* deleteContactsFromServer({ payload }) {
    try {
        const response = yield call(deleteContactsRequest, payload);
        yield put(deleteContactsSuccess(payload));
    } catch (error) {
        console.log('deleteContactsFromServer api error:', error);
        // yield put(getContactsFailure(error));
    }
}

// watcher
export function* getContacts() {
    yield takeEvery(GET_CONTACTS, getContactsFromServer);
}

export function* createContact() {
    yield takeLatest(CREATE_CONTACT, createContactOnServer);
}

export function* updateContact() {
    yield takeLatest(UPDATE_CONTACT, updateContactOnServer);
}

export function* deleteContacts() {
    yield takeEvery(DELETE_CONTACTS, deleteContactsFromServer);
}

export default function* rootSaga() {
    yield all([
        fork(getContacts),
        fork(createContact),
        fork(updateContact),
        fork(deleteContacts)
    ]);
}
