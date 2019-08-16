import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE
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

