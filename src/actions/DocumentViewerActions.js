import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE
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


