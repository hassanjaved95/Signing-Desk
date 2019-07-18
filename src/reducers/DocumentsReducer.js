import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE,
  SEARCH_DOCUMENTS,
  SELECTED_FOLDER
} from "Actions/types";

const INITIAL_STATE = {
  documents: null,
  selectedFolder: null,
  searchedDocuments: null
};

function searchFolders(folder, searchVal) {
  if (!folder || folder.length == 0) return;

  var filteredObjs = folder.filter((obj) => {
    return obj.documents.some(doc => {
      return (
        doc.name.toLowerCase().indexOf(searchVal) != -1 ||
        doc.description.toLowerCase().indexOf(searchVal) != -1
      );
    }).length !=0;
  });
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return { ...state, documents: null };

    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload
      };

    case GET_DOCUMENTS_FAILURE:
      return { ...state, documents: null };

    case SEARCH_DOCUMENTS: {
      return {
        ...state,
        searchedDocuments: state.documents
      }
    }
    default:
      return { ...state };
  }
};
