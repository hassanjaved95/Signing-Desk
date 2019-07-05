import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE
} from "./types";

export const getDocuments = () => ({
  type: GET_DOCUMENTS
});

export const getDocumentsSuccess = response => ({
  type: GET_DOCUMENTS_SUCCESS,
  payload: response.data
});

export const getDocumentsFailure = error => ({
  type: GET_DOCUMENTS_FAILURE,
  payload: error
});
