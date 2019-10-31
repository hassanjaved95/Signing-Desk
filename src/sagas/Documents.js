import {
  createDocumentFailure,
  createDocumentSuccess,
  deleteDocumentsSuccess,
  duplicateDocumentsSuccess,
  getDocumentsFailure,
  getDocumentsSuccess,
  moveDocumentsSuccess,
  moveDocumentsFailure,
  updateDocumentFailure,
  updateDocumentSuccess,
  editFolderNameSuccess,
  deleteFolderSuccess,
  deleteFolderFailure,
  addNewFolderSuccess,
  addNewFolderFailure,
  deleteDocumentsFailure,
  duplicateDocumentsFailure,
  editFolderNameFailure,
  getDashboardSuccess,
  getDashboardFailure,
} from "Actions";
import {
  CREATE_DOCUMENT,
  DELETE_DOCUMENTS,
  DUPLICATE_DOCUMENTS,
  GET_DOCUMENTS,
  MOVE_DOCUMENTS,
  UPDATE_DOCUMENT,
  EDIT_FOLDER_NAME,
  DELETE_FOLDER,
  ADD_NEW_FOLDER,
  GET_All_DASHBOARD
} from "Actions/types";
import API from 'Api';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import DocumentUpload, { callBackCreateDocument } from "../routes/documents/components/DocumentUpload";
import UserDocumentsList from "../container/documents/UserDocumentsList";


const getDocumentsRequest = async () => {
  //return documents; 
  //return response;
  // return await Promise.resolve(response.data);
  // console.log('Documents response:', response);

  var response = await API.get('documents/all', { id: 1 });
  return response;
};

const createDocumentRequest = async doc => {
  var response = await API.post('documents/create', doc.payload);
  return response;
};

const updateDocumentRequest = async doc => {
  var response = await API.put('documents/update', doc.payload);
  if (doc.movedDocument) {
    response.movedDocument = doc.movedDocument;
    response.nextFolderID = doc.nextFolderID;
  }
  return response;
};

const addNewFolderRequest = async folderInfo => {
  return await API.post('folders/create', folderInfo);
}

const deleteDocumentsRequest = async (documentId) => {
  return await API.delete(`documents/${documentId}`);
};

const moveDocumentsRequest = () => {
  return true; // response;
};

const duplicateDocumentsRequest = () => {
  return true; // response;
};

const editFolderNameRequest = async (payload) => {
  return await API.put('folders/update', payload);
};

const deleteFolderRequest = async (payload) => {
  return await API.delete(`folders/${payload.folderId}`)
};

const getDashboardRequest = async(payload) => {
  return await API.get('workflows/dashboards/basic-information', { id: 1 });
}

function* addNewFolderOnServer({ payload }) {
  try {
    const response = yield call(addNewFolderRequest, payload);
    if (response && response.status == 200) {
      const obj = { ...payload, id: response.data.folderID };
      yield put(addNewFolderSuccess(obj));
    }
    else {
      yield put(addNewFolderFailure(response));
    }

  } catch (error) {
    console.log('addNewFolderOnServer error: ', error);
  }
}

function* getDocumentsFromServer() {
  try {
    const response = yield call(getDocumentsRequest);
    if (response && response.status == 200) {
      yield put(getDocumentsSuccess(response));

    }
    else {
      yield put(getDocumentsFailure(response));
    }
  } catch (error) {
    yield put(getDocumentsFailure(error));
  }
}

function* createDocumentOnServer(doc) {
  try {
    const response = yield call(createDocumentRequest, doc);
    if (response && response.status == 200) {
      doc.payload.id = response.data.documentID;
      yield put(createDocumentSuccess(response));
      doc.handleClose(function () {
        return "";
      })
    }
    else {
      yield put(createDocumentFailure(response));

    }

  } catch (error) {
    //console.log('createDocumentOnServer error: ', error);
    yield put(createDocumentFailure(error));

  }
}

function* updateDocumentOnServer(doc) {
  try {
    const response = yield call(updateDocumentRequest, doc);
    if (response && response.status == 200) {
      yield put(updateDocumentSuccess(response));
      if (doc.onCloseDlg) {
        doc.onCloseDlg(function () {
          return "";
        });
      }
    }
    else {
      yield put(updateDocumentFailure(response));
    }


  } catch (error) {
    console.log('createDocumentOnServer error: ', error);
    yield put(updateDocumentFailure(error));

  }
}

function* deleteDocumentsFromServer({ payload }) {
  try {
    const response = yield call(deleteDocumentsRequest, payload.documentIds);
    if (response && response.status == 200) {
      if (payload.callback && typeof payload.callback === "function") {
        payload.callback();
      }
      yield put(deleteDocumentsSuccess(payload));
    }
    else {
      yield put(deleteDocumentsFailure(response));
    }

  } catch (error) {
    console.log('deleteDocumentsFromServer error:', error);
    // yield put(getDocumentsFailure(error));
  }
}
function* moveDocumentsOnServer() {
  try {
    const response = yield call(moveDocumentsRequest);
    if (response && response.status == 200) {
      yield put(moveDocumentsSuccess(response));

    }
    else {
      yield put(moveDocumentsFailure(response));

    }
  } catch (error) {
    console.log('moveDocumentsOnServer error:', error);
    yield put(moveDocumentsFailure(error));
  }
}

function* duplicateDocumentsOnServer() {
  try {
    const response = yield call(duplicateDocumentsRequest);
    yield put(duplicateDocumentsSuccess(response));
  } catch (error) {
    // yield put(getDocumentsFailure(error));
  }
}

function* editFolderNameOnServer({ payload }) {
  try {
    const response = yield call(editFolderNameRequest, payload);
    if (response && response.status == 200) {
      yield put(editFolderNameSuccess(payload));

    }
    else {
      yield put(editFolderNameFailure(response));
    }
  } catch (error) {
    console.log('editFolderNameOnServer error:', error);
  }
}

function* deleteFolderOnServer({ payload }) {
  try {
    const response = yield call(deleteFolderRequest, payload);
    if (response && response.status == 200) {
      yield put(deleteFolderSuccess(payload));
    }
    else {
      yield put(deleteFolderFailure(response));
    }

  } catch (error) {
    console.log('deleteFolderOnServer error:', error);
    yield put(deleteFolderFailure(error));
  }
}

function* getDashboardFromServer() {
  try {
    const response = yield call(getDashboardRequest);
    if (response && response.status == 200) {
      yield put(getDashboardSuccess(response));

    }
    else {
      yield put(getDashboardFailure(response));
    }
  } catch (error) {
    yield put(getDashboardFailure(error));
  }
}

// watcher
export function* createDocument() {
  yield takeEvery(CREATE_DOCUMENT, createDocumentOnServer);
}
export function* updateDocument() {
  yield takeEvery(UPDATE_DOCUMENT, updateDocumentOnServer);
}
export function* getDocuments() {
  yield takeEvery(GET_DOCUMENTS, getDocumentsFromServer);
}
export function* deleteDocuments() {
  yield takeEvery(DELETE_DOCUMENTS, deleteDocumentsFromServer);
}
export function* moveDocuments() {
  yield takeEvery(MOVE_DOCUMENTS, moveDocumentsOnServer);
}
export function* duplicateDocuments() {
  yield takeEvery(DUPLICATE_DOCUMENTS, duplicateDocumentsOnServer);
}
export function* editFolderName() {
  yield takeEvery(EDIT_FOLDER_NAME, editFolderNameOnServer);
}
export function* deleteFolder() {
  yield takeEvery(DELETE_FOLDER, deleteFolderOnServer);
}
export function* addNewFolder() {
  yield takeEvery(ADD_NEW_FOLDER, addNewFolderOnServer);
}
export function* getDashboard(){
  yield takeEvery(GET_All_DASHBOARD, getDashboardFromServer);

}

export default function* rootSaga() {
  yield all([
    fork(getDocuments),
    fork(createDocument),
    fork(updateDocument),
    fork(deleteDocuments),
    fork(moveDocuments),
    fork(duplicateDocuments),
    fork(editFolderName),
    fork(deleteFolder),
    fork(addNewFolder),
    fork(getDashboard)
  ]);
}
