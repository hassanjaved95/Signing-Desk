import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,
    SORT_CONTACTS_BY_NAME,
    SORT_CONTACTS_BY_EMAIL
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

export const sortContactsByEmail = (asc) => ({
    type: SORT_CONTACTS_BY_EMAIL,
    payload: asc
});

export const sortContactsByName = (asc) => ({
    type: SORT_CONTACTS_BY_NAME,
    payload: asc
});
