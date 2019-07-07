import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE
} from "./types";

export const getContacts = () => ({
    type: GET_CONTACTS
});

export const getContactsSuccess = response => ({
    type: GET_CONTACTS_SUCCESS,
    payload: response.data
});

export const getContactsFailure = error => ({
    type: GET_CONTACTS_FAILURE,
    payload: error
});
