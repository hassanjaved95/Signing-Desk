import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE,
    CREATE_COMPOSITE_WORKFLOW,
    CREATE_COMPOSITE_WORKFLOW_FAILURE,
    CREATE_COMPOSITE_WORKFLOW_SUCCESS,
    RESTORE_COMPOSITE_WORKFLOW,
    RESTORE_COMPOSITE_WORKFLOW_FAILURE,
    RESTORE_COMPOSITE_WORKFLOW_SUCCESS
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

export const createWorkFlow = (payload, callback) => ({
    type: CREATE_COMPOSITE_WORKFLOW,
    payload,
    callback
});

export const createWorkFlowSuccess = (data) => ({
    type: CREATE_COMPOSITE_WORKFLOW_SUCCESS,
    data
});

export const createWorkFlowFailure = (error) => ({
    type: CREATE_COMPOSITE_WORKFLOW_FAILURE,
    data: error
});

export const restoreWorkFlow = (payload) => ({
    type: RESTORE_COMPOSITE_WORKFLOW,
    payload
});

export const restoreWorkFlowSuccess = (data) => ({
    type: RESTORE_COMPOSITE_WORKFLOW_SUCCESS,
    data
});

export const restoreWorkFlowFailure = (error) => ({
    type: RESTORE_COMPOSITE_WORKFLOW_FAILURE,
    data: error
});

