import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE,
  SEARCH_DOCUMENTS,
  SELECTED_FOLDER,
  CREATE_DOCUMENT,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_SUCCESS,
  MOVE_DOCUMENTS,
  MOVE_DOCUMENTS_SUCCESS,
  DUPLICATE_DOCUMENTS,
  DUPLICATE_DOCUMENTS_SUCCESS
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

export const searchDocuments = (payload) => ({
  type: SEARCH_DOCUMENTS,
  payload
});

export const setSelectedFolder = (payload) => ({
  type: SELECTED_FOLDER,
  payload
});

export const createDocument = (payload) => ({
  type: CREATE_DOCUMENT,
  payload
});
export const createDocumentSuccess = (payload) => ({
  type: CREATE_DOCUMENT_SUCCESS,
  payload
});

export const createDocumentFailure = error => ({
  type: CREATE_DOCUMENT_FAILURE,
  payload: error
});

export const deleteDocuments = (payload) => ({
  type: DELETE_DOCUMENTS,
  payload
});

export const deleteDocumentsSuccess = (payload) => ({
  type: DELETE_DOCUMENTS_SUCCESS,
  payload
});
export const moveDocuments = (payload) => ({
  type: MOVE_DOCUMENTS,
  payload
});

export const moveDocumentsSuccess = (payload) => ({
  type: MOVE_DOCUMENTS_SUCCESS,
  payload
});
export const duplicateDocuments = (payload) => ({
  type: DUPLICATE_DOCUMENTS,
  payload
});

export const duplicateDocumentsSuccess = (payload) => ({
  type: DUPLICATE_DOCUMENTS_SUCCESS,
  payload
});
