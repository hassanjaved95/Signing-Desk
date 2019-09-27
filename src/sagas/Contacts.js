import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

import {GET_CONTACTS, DELETE_CONTACTS, CREATE_CONTACT, UPDATE_CONTACT } from "Actions/types";

import { getContactsSuccess, getContactsFailure, deleteContactsSuccess, createContactSuccess, updateContactSuccess, updateContactFailure } from "Actions/ContactsActions";
import API from 'Api';

import {
    getCompanyUsersSuccess,
    getCompanyUsersFailure,
    getContactsAsUsersSuccess,
    getContactsAsUsersFailure
} from "Actions";
import { GET_COMPANYUSERS, GET_CONTACTSASUSERS } from "../actions/types";


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
    return response;
}

const updateContactRequest = async (data) => {
    var response = await API.put('contacts/update', data)
    return response;
}

const deleteContactsRequest = async (ids) => {
    var response = await API.delete('contacts/delete-multiple', ids)
    console.log('deleteContactsRequest response:', response);
    return response;
}

const getCompanyUsersRequest = async (payload) => {

    var response = await API.get('companies/user/all-users-by-company-updated/' + payload.companyId); // TODO
    return response;
}

const getContactUsersRequest = async () => {
    var response = await API.get('contacts/all', { id: 1 }); // TODO
    return response;
}

function* getContactsFromServer() {
    try {
        const response = yield call(getContactsRequest);
        if (response && response.status == 200) {
            yield put(getContactsSuccess(response));
        }
        else {
            yield put(getContactsFailure(response));
        }
    } catch (error) {
        yield put(getContactsFailure(error));
    }
}

function* createContactOnServer({ payload }) {
    try {
        const response = yield call(createContactRequest, payload);

        if (response.status == 200) {
            payload.id = response.data.contactID;
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
        const response = yield call(updateContactRequest, payload);
        if (response && response.status == 200) {
            yield put(updateContactSuccess(response));
        }
        else {
            yield put(updateContactFailure(response.message));
        }
    } catch (error) {
        console.log('updateContactOnServer api error:', error);
        yield put(updateContactFailure(response));
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

function* getCompanyUsersFromServer({ payload }) {
    try {
        const response = yield call(getCompanyUsersRequest, payload);
        if (response && response.status == 200) {
            yield put(getCompanyUsersSuccess(response));
        }
        else {
            yield put(getCompanyUsersFailure(response));
        }
    } catch (error) {
        yield put(getCompanyUsersFailure(error));
    }
}


function* getContactUsersFromServer() {
    try {
        const response = yield call(getContactUsersRequest);
        if (response && response.status == 200) {
            yield put(getContactsAsUsersSuccess(response));
        }
        else {
            yield put(getContactsAsUsersFailure(response));
        }
    } catch (error) {
        yield put(getContactsAsUsersFailure(error));
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

export function* getCompanyUsers() {
    yield takeEvery(GET_COMPANYUSERS, getCompanyUsersFromServer);
}

export function* getContactUsers() {
    yield takeEvery(GET_CONTACTSASUSERS, getContactUsersFromServer);
}

export default function* rootSaga() {
    yield all([
        fork(getContacts),
        fork(createContact),
        fork(updateContact),
        fork(deleteContacts),
        fork(getContactUsers),
        fork(getCompanyUsers)
    ]);
}
