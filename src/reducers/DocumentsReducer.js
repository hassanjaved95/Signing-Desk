import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE
} from "Actions/types";

const INITIAL_STATE = {
  allDocuments: null,
  documents: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return { ...state, allDocuments: null, documents: null };

    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        allDocuments: action.payload,
        documents: action.payload
      };

    case GET_DOCUMENTS_FAILURE:
      return { ...state, allDocuments: null, documents: null };

    default:
      return { ...state };
  }
};
