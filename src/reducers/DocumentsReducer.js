import { NotificationManager } from "react-notifications";

import {
  CREATE_DOCUMENTS,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENTS,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILURE,
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAILURE,
  SEARCH_DOCUMENTS,
  SELECTED_FOLDER,
  EDIT_FOLDER_NAME,
  EDIT_FOLDER_NAME_SUCCESS,
  EDIT_FOLDER_NAME_FAILURE,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILURE,
  MOVE_DOCUMENTS,
  MOVE_DOCUMENTS_SUCCESS,
  MOVE_DOCUMENTS_FAILURE,
  ADD_NEW_FOLDER,
  ADD_NEW_FOLDER_SUCCESS,
  ADD_NEW_FOLDER_FAILURE,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_SUCCESS,
  DELETE_DOCUMENTS_FAILURE,
  SET_SELECTED_DOCUMENT
} from "Actions/types";



const INITIAL_STATE = {
  documents: null,
  selectedFolder: null,
  folderLevel: [],
  selectedFolderDocs: null,
  selectedDocument: null
};

function setSelectedFolder(state, folderId, levelUp) {
  if (levelUp && state.folderLevel.length) {
    const selectedFolder = state.folderLevel.pop();
    return {
      ...state,
      selectedFolder,
      selectedFolderDocs: JSON.parse(JSON.stringify(selectedFolder.documents))
    }
  } else if (levelUp == false) {
    const selectedFolder = state.selectedFolder.children.find(sf => sf.id === folderId);
    return {
      ...state,
      folderLevel: state.folderLevel.concat(state.selectedFolder),
      selectedFolder,
      selectedFolderDocs: JSON.parse(JSON.stringify(selectedFolder.documents))
    }
  } else {
    return { ...state }
  }
}

function addNewFolder(list, parentFolderId, newFolderId, newFolderName) {
  return list.map(folder => {
    if (folder.id === parentFolderId) {
      folder.children = [...folder.children, {
        id: newFolderId,
        name: newFolderName,
        status: 0,
        documents: [],
        children: []
      }]
    } else if (folder.children && folder.children.length > 0) {
      folder.children = addNewFolder(folder.children, parentFolderId, newFolderId, newFolderName)
    }

    return folder;
  });
}

function deleteFolder(list, folderId) {
  return list.filter(folder => {
    if (folder.children && folder.children.length > 0) {
      folder.children = deleteFolder(folder.children, folderId);
    }
    return folder.id != folderId;
  });
}

function renameInFolderObj(obj, folderId, name) {
  if (obj.id != folderId) return { ...obj };
  return {
    ...obj,
    name
  }
}

function renameInFoldersList(list, folderId, name) {
  return list.map(folder => {
    const folderExists = folder.id == folderId;
    if (folderExists) {
      folder = renameInFolderObj(folder, folderId, name);
    } else if (folder.children.length > 0) {
      folder.children = renameInFoldersList(folder.children, folderId, name);
    }
    return folder;
  });
}

function getDocumentsNameUpdated(state, actionPayload){
  var aPayload = JSON.parse(actionPayload.config.data);
  var docs = state.documents[0].documents;
  if(aPayload.name != undefined){
    for(var i=0; i<docs.length; i++){
      if(docs[i].id == aPayload.id){
        docs[i].name = aPayload.name;
        break;
      }
    }
  }else{
    
  }
  
return state;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_DOCUMENTS:
      return { ...state, loading: true };

    case CREATE_DOCUMENT_SUCCESS:
      NotificationManager.success("Document created successfully");
      var newDocument = JSON.parse(action.payload.config.data);
      newDocument.id = action.payload.data.documentID;
      newDocument.status = 0;
      return {
        ...state,
        selectedFolder: { ...state.selectedFolder, documents: [...state.selectedFolder.documents, newDocument] },
        loading: false
      };
    case GET_DOCUMENTS:
      return { ...state, documents: null, loading: true };
    case CREATE_DOCUMENT_FAILURE:
      NotificationManager.error(action.payload)
      return {
        ...state,
        documents: null,
        selectedFolder: null,
        folderLevel: [],
        selectedFolderDocs: null,
        loading: false
      };

    case DELETE_DOCUMENTS: {
      return {
        ...state
      }
    }
    case DELETE_DOCUMENTS_SUCCESS: {
      NotificationManager.success("Document deleted successfully");
      return {
        ...state,
        selectedFolder: {
          ...state.selectedFolder, documents: state.selectedFolder.documents.filter(doc => {
            return action.payload.documentIds != doc.id;
          })
        }
      }
    }
    case DELETE_DOCUMENTS_FAILURE: {
      NotificationManager.error(action.payload);
      return {
        ...state
      }
    }
    case UPDATE_DOCUMENTS: {
      return { ...state, loading: true };
    }

    case UPDATE_DOCUMENT_SUCCESS: {
      NotificationManager.success("Document updated successfully");
      const docs = action.payload;
      return getDocumentsNameUpdated(state,action.payload);
      // return {
      //   ...state,
      //   loading: false,
      //   documents: { ...state.documents,  }
      // };

      
    }


    case UPDATE_DOCUMENT_FAILURE: {
      NotificationManager.error(action.payload)

      return {
        ...state,
        documents: null,
        selectedFolder: null,
        folderLevel: [],
        selectedFolderDocs: null,
        loading: false
      }
    }


    case GET_DOCUMENTS_SUCCESS: {
      const docs = action.payload;
      const selectedFolder = docs && docs.length > 0 ? docs[0] : docs;
      return {
        ...state,
        loading: false,
        documents: docs && docs.length > 0 ? docs[0] : docs,
        selectedFolder: docs && docs.length > 0 ? docs[0] : docs,
        documents: docs,
        selectedFolder,
        folderLevel: [],
        selectedFolderDocs: JSON.parse(JSON.stringify(selectedFolder.documents))

      };
    }
    case GET_DOCUMENTS_FAILURE:
      NotificationManager.error(action.payload)
      return {
        ...state,
        documents: null,
        selectedFolder: null,
        folderLevel: [],
        selectedFolderDocs: null,
        loading: false
      };

    case SEARCH_DOCUMENTS: {
      var searchVal = action.payload;
      return {
        ...state,
        selectedFolder: { ...state.selectedFolder, documents: state.selectedFolderDocs.filter(c => (c.name + ' ' + c.description + '' + c.tags).toLowerCase().indexOf(searchVal) != -1) }
      };
    }
    case SELECTED_FOLDER: {
      return setSelectedFolder(state, action.payload.folderId, action.payload.levelUp || false);
    }
    case EDIT_FOLDER_NAME: {
      return {
        ...state
      }
    }
    case EDIT_FOLDER_NAME_SUCCESS: {
      return {
        ...state,
        selectedFolder: state.selectedFolder.id == action.payload.folderId ? { ...state.selectedFolder, name: action.payload.name } : state.selectedFolder,
        folderLevel: renameInFoldersList(state.folderLevel, action.payload.folderId, action.payload.name),
        documents: renameInFoldersList(state.documents, action.payload.folderId, action.payload.name)
      }
    }
    case EDIT_FOLDER_NAME_FAILURE: {
      NotificationManager.error(action.payload);
      return {
        ...state
      }
    }
    case MOVE_DOCUMENTS: {
      return { ...state, loading: true }
    }
    case MOVE_DOCUMENTS_SUCCESS: {
      NotificationManager.success("Documents Moved successfully");
      return { ...state, loading: false }

    }
    case CREATE_DOCUMENT_FAILURE: {
      NotificationManager.error(action.payload)
      return { ...state, loading: false }


    }
    case DELETE_FOLDER: {
      return {
        ...state,
        loading: true
      }
    }
    case DELETE_FOLDER_SUCCESS: {
      NotificationManager.success("Folder has been deleted successfully");
      return {
        ...state,
        loading: false,
        selectedFolder: deleteFolder([state.selectedFolder], action.payload.folderId)[0],
        documents: deleteFolder(state.documents, action.payload.folderId)
      }
    }

    case DELETE_FOLDER_FAILURE: {
      NotificationManager.error(action.payload)
      return {
        ...state, loading: false
      }
    }
    case ADD_NEW_FOLDER: {
      return {
        ...state, loading: true
      }
    }
    case ADD_NEW_FOLDER_SUCCESS: {
      NotificationManager.success("New folder has been added successfully");
      return {
        ...state, loading: false,
        documents: addNewFolder(state.documents, action.payload.parentFoldersID, action.payload.id, action.payload.name)
      }
    }
    case ADD_NEW_FOLDER_FAILURE: {
      NotificationManager.error(action.payload);
      return {
        ...state
      }
    }
    case SET_SELECTED_DOCUMENT: {
      return {
        ...state,
        selectedDocument: action.payload.document
      }
    }
    default:
      return { ...state };
  }
};
