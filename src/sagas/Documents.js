import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_DOCUMENTS } from "Actions/types";

import { getDocumentsSuccess, getDocumentsFailure } from "Actions";

const response = {
  data: [
    {
      "id": "4640b911-33c3-a60a-6cea0244ea5f",
      "name": "Archive",
      "status": 0,
      "documents": [{
        "id": "a3dcfb1c-77dd-4f59-9499-b118146279fc",
        "name": "My Upload Document Archive",
        "description": "My uploaded document description Archive",
        "hasAttachment": false,
        "hasFormFields": false,
        "status": 0,
        "verificationResult": null,
        "locked": false,
        "isDeleted": false,
        "lastAccessedOn": "2019-07-15T16:47:38",
        "documentFiles": [
          {
            "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
            "size": 3028.0,
            "pages": 2,
            "width": 612.0,
            "height": 792.0,
            "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
            "storageMedia": 0
          }
        ]
      }],
      "subFolders": [
        {
          "id": "A-33c3-a60a-6cea0244ea5f",
          "name": "Sub Folder Archive",
          "status": 0,
          "documents": [{
            "id": "A-77dd-4f59-9499-b118146279fc",
            "name": "My Upload Document Archive Sub",
            "description": "My uploaded document description Archive",
            "hasAttachment": false,
            "hasFormFields": false,
            "status": 0,
            "verificationResult": null,
            "locked": false,
            "isDeleted": false,
            "lastAccessedOn": "2019-07-15T16:47:38",
            "documentFiles": [
              {
                "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
                "size": 3028.0,
                "pages": 2,
                "width": 612.0,
                "height": 792.0,
                "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
                "storageMedia": 0
              }
            ]
          }],
          "subFolders": [

          ]
        }
      ]
    },
    {
      "id": "8e53a257-01d8-4286-af2c-773649b81c0e",
      "name": "Inbox",
      "status": 0,
      "documents": [
        {
          "id": "a3dcfb1c-77dd-4f59-9499-b118146279fc",
          "name": "My Upload Document",
          "description": "My uploaded document description",
          "hasAttachment": false,
          "hasFormFields": false,
          "status": 0,
          "verificationResult": null,
          "locked": false,
          "isDeleted": false,
          "lastAccessedOn": "2019-07-15T16:47:38",
          "documentFiles": [
            {
              "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
              "size": 3028.0,
              "pages": 2,
              "width": 612.0,
              "height": 792.0,
              "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
              "storageMedia": 0
            }
          ]
        },
        {
          "id": "a3dcfb1c-77dd-4f59-9499",
          "name": "My Upload Document2",
          "description": "My uploaded document description2",
          "hasAttachment": false,
          "hasFormFields": false,
          "status": 1,
          "verificationResult": null,
          "locked": false,
          "isDeleted": false,
          "lastAccessedOn": "2019-07-15T16:47:38",
          "documentFiles": [
            {
              "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
              "size": 3028.0,
              "pages": 2,
              "width": 612.0,
              "height": 792.0,
              "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
              "storageMedia": 0
            }
          ]
        }
      ],
      "subFolders": []
    }
  ]
};

const documents = {
  data: [
    {
      id: 1,
      title: 'ReSharper_DefaultKeymap_VSscheme',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: '10 minutes ago'
    },
    {
      id: 2,
      title: 'DegreeAttestationChallanForm',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 05, 2019'
    },
    {
      id: 3,
      title: 'Comsat MSPM - Challan Form',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 15, 2019'
    },
    {
      id: 4,
      title: 'Eat_That_Frog',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 11, 2019'
    },
    {
      id: 5,
      title: 'CourseCompletionCertificate',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'June 21, 2019'
    },
    {
      id: 11,
      title: 'ReSharper_DefaultKeymap_VSscheme',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: '10 minutes ago'
    },
    {
      id: 12,
      title: 'DegreeAttestationChallanForm',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 05, 2019'
    },
    {
      id: 13,
      title: 'Comsat MSPM - Challan Form',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 15, 2019'
    },
    {
      id: 14,
      title: 'Eat_That_Frog',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 11, 2019'
    },
    {
      id: 15,
      title: 'CourseCompletionCertificate',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'June 21, 2019'
    },
    {
      id: 111,
      title: 'ReSharper_DefaultKeymap_VSscheme',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: '10 minutes ago'
    },
    {
      id: 112,
      title: 'DegreeAttestationChallanForm',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 05, 2019'
    },
    {
      id: 113,
      title: 'Comsat MSPM - Challan Form',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 15, 2019'
    },
    {
      id: 114,
      title: 'Eat_That_Frog',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 11, 2019'
    },
    {
      id: 115,
      title: 'CourseCompletionCertificate',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'June 21, 2019'
    },
    {
      id: 211,
      title: 'ReSharper_DefaultKeymap_VSscheme',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: '10 minutes ago'
    },
    {
      id: 212,
      title: 'DegreeAttestationChallanForm',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 05, 2019'
    },
    {
      id: 213,
      title: 'Comsat MSPM - Challan Form',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 15, 2019'
    },
    {
      id: 214,
      title: 'Eat_That_Frog',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'July 11, 2019'
    },
    {
      id: 215,
      title: 'CourseCompletionCertificate',
      status: 'Draft',
      tags: [
        'One',
        'two',
        'three'
      ],
      grandTotal: '$4.00',
      approversRecepients: [
        'Muhammad Qasim',
        'Hassan Javed'
      ],
      created: 'June 21, 2019'
    }
  ]
}

const getDocumentsRequest = () => {
  //return documents; 
  return response;
};

function* getDocumentsFromServer() {
  try {
    const response = yield call(getDocumentsRequest);
    yield put(getDocumentsSuccess(response));
  } catch (error) {
    yield put(getDocumentsFailure(error));
  }
}

// watcher
export function* getDocuments() {
  yield takeEvery(GET_DOCUMENTS, getDocumentsFromServer);
}

export default function* rootSaga() {
  yield all([fork(getDocuments)]);
}
