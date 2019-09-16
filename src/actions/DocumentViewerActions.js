import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE,
    GET_COMPANYUSERS,
    GET_COMPANYUSERS_SUCCESS,
    GET_COMPANYUSERS_FAILURE,
    GET_CONTACTSASUSERS,
    GET_CONTACTSASUSERS_SUCCESS,
    GET_CONTACTSASUSERS_FAILURE
} from "./types";

export const getViewingDocument = () => ({
    type: GET_VIEWING_DOCUMENT
});

export const getViewingDocumentSuccess = response => ({
    type: GET_VIEWING_DOCUMENT_SUCCESS,
    payload: response.data
});

export const getViewingDocumentFailure = error => ({
    type: GET_VIEWING_DOCUMENT_FAILURE,
    payload: error
});

export const getCompanies = () => ({
    type: GET_COMPANIES
});

export const getCompaniesSuccess = response => ({
    type: GET_COMPANIES_SUCCESS,
    payload: response.data
});

export const getCompaniesFailure = error => ({
    type: GET_COMPANIES_FAILURE,
    payload: error
});

export const getCompanyUsers = (payload) => ({
    type: GET_COMPANYUSERS, payload
});

export const getCompanyUsersSuccess = response => ({
    type: GET_COMPANYUSERS_SUCCESS,
    payload: response.data
});

export const getCompanyUsersFailure = error => ({
    type: GET_COMPANYUSERS_FAILURE,
    payload: error
});

export const getContactsAsUsers = () => ({
    type: GET_CONTACTSASUSERS
});

export const getContactsAsUsersSuccess = response => ({
    type: GET_CONTACTSASUSERS_SUCCESS,
    payload: response.data
});

export const getContactsAsUsersFailure = error => ({
    type: GET_CONTACTSASUSERS_FAILURE,
    payload: error
});
