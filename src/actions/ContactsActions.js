import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,
    SORT_CONTACTS_BY_NAME,
    SORT_CONTACTS_BY_EMAIL,
    SEARCH_CONTACTS,
    CREATE_CONTACT,
    CREATE_CONTACT_SUCCESS,
    UPDATE_CONTACT,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_FAILURE,
    DELETE_CONTACTS,
    DELETE_CONTACTS_SUCCESS
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

export const searchContacts = (payload) => ({
    type: SEARCH_CONTACTS,
    payload
});

export const deleteContacts = (ids) => ({
    type: DELETE_CONTACTS,
    payload: ids
});

export const deleteContactsSuccess = (payload) => ({
    type: DELETE_CONTACTS_SUCCESS,
    payload
});
export const createContact = (payload) => ({
    type: CREATE_CONTACT,
    payload
});
export const createContactSuccess = (payload) => ({
    type: CREATE_CONTACT_SUCCESS,
    payload
});
export const updateContact = (payload) => ({
    type: UPDATE_CONTACT,
    payload
});
export const updateContactSuccess = (payload) => ({
    type: UPDATE_CONTACT_SUCCESS,
    payload
});
export const updateContactFailure = (payload) => ({
 type: UPDATE_CONTACT_FAILURE,
 payload
});

