import { NotificationManager } from "react-notifications";

import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
} from "Actions/types";

const INITIAL_STATE = {
    viewingDocument: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_VIEWING_DOCUMENT:
            return { ...state, loading: true };

        case GET_VIEWING_DOCUMENT_SUCCESS: {
            const doc = action.payload;
            return {
                ...state,
                loading: false,
                viewingDocument: doc,
            };
        }
        case GET_VIEWING_DOCUMENT_FAILURE:
            NotificationManager.error("Error occured while fetching document details.")
            return {
                ...state,
                loading: false,
                viewingDocument: null,
            };
        default:
            return { ...state };
    }
};
