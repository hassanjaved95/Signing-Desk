import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE,
  SEARCH_DOCUMENTS,
  SELECTED_FOLDER,
  CREATE_DOCUMENT,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILURE,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_SUCCESS,
  DELETE_DOCUMENTS_FAILURE,
  MOVE_DOCUMENTS,
  MOVE_DOCUMENTS_SUCCESS,
  MOVE_DOCUMENTS_FAILURE,
  DUPLICATE_DOCUMENTS,
  DUPLICATE_DOCUMENTS_SUCCESS,
  DUPLICATE_DOCUMENTS_FAILURE,
  EDIT_FOLDER_NAME,
  EDIT_FOLDER_NAME_SUCCESS,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILURE,
  ADD_NEW_FOLDER,
  ADD_NEW_FOLDER_SUCCESS,
  SET_SELECTED_DOCUMENT,
  ADD_NEW_FOLDER_FAILURE,
  EDIT_FOLDER_NAME_FAILURE,
  GET_All_DASHBOARD,
  GET_All_DASHBOARD_SUCCESS,
  GET_All_DASHBOARD_FAILURE
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

export const createDocument = (payload, handleClose) => ({
  type: CREATE_DOCUMENT,
  payload, handleClose
});
export const createDocumentSuccess = (payload) => ({
  type: CREATE_DOCUMENT_SUCCESS,
  payload
});

export const createDocumentFailure = error => ({
  type: CREATE_DOCUMENT_FAILURE,
  payload: error
});

export const updateDocument = (payload, onCloseDlg, movedDocument, nextFolderID) => ({
  type: UPDATE_DOCUMENT,
  payload, onCloseDlg, movedDocument, nextFolderID
});
export const updateDocumentSuccess = (payload) => ({
  type: UPDATE_DOCUMENT_SUCCESS,
  payload
});

export const updateDocumentFailure = error => ({
  type: UPDATE_DOCUMENT_FAILURE,
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
export const deleteDocumentsFailure = (payload) => ({
  type: DELETE_DOCUMENTS_FAILURE,
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

export const moveDocumentsFailure = (payload) => ({
  type: MOVE_DOCUMENTS_FAILURE,
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
export const duplicateDocumentsFailure = (payload) => ({
  type: DUPLICATE_DOCUMENTS_FAILURE,
  payload
});
export const editFolderName = (payload) => ({
  type: EDIT_FOLDER_NAME,
  payload
});

export const editFolderNameSuccess = (payload) => ({
  type: EDIT_FOLDER_NAME_SUCCESS,
  payload
});
export const editFolderNameFailure = (payload) => ({
  type: EDIT_FOLDER_NAME_FAILURE,
  payload
});
export const deleteFolder = (payload) => ({
  type: DELETE_FOLDER,
  payload
});

export const deleteFolderSuccess = (payload) => ({
  type: DELETE_FOLDER_SUCCESS,
  payload
});

export const deleteFolderFailure = (payload) => ({
  type: DELETE_FOLDER_FAILURE,
  payload
});

export const addNewFolder = (payload) => ({
  type: ADD_NEW_FOLDER,
  payload
});
export const addNewFolderSuccess = (payload) => ({
  type: ADD_NEW_FOLDER_SUCCESS,
  payload
});
export const addNewFolderFailure = (payload) => ({
  type: ADD_NEW_FOLDER_FAILURE,
  payload
});


export const setSelectedDocument = (document, callback) => ({
  type: SET_SELECTED_DOCUMENT,
  payload: {
    document,
    callback
  }
});

export const getDashboard = () => ({
  type: GET_All_DASHBOARD
});


export const getDashboardSuccess = response => ({
  type: GET_All_DASHBOARD_SUCCESS,
  payload: response.data
});

export const getDashboardFailure = error => ({
  type: GET_All_DASHBOARD_FAILURE,
  payload: error
});

