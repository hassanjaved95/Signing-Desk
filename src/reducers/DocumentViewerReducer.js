import { NotificationManager } from "react-notifications";

import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE

   
} from "Actions/types";

const INITIAL_STATE = {
    viewingDocument: null,
    companies: null,
    companyUsers: null,
    contacts: null
};

function makeDataCompatibleToOptionsCompanies(data) {
    if (data) {
        data.forEach(function (item) {
            item.value = item.id;
            item.label = item.name;
        })
        return data;
    }
}


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
            NotificationManager.error(action.payload);
            return {
                ...state,
                loading: false,
                viewingDocument: null,
            };

        case GET_COMPANIES:
            return { ...state, loading: true };

        case GET_COMPANIES_SUCCESS: {
            const lstCompanies = makeDataCompatibleToOptionsCompanies(action.payload);
            return {
                ...state,
                loading: false,
                companies: lstCompanies,
            };
        }


        case GET_COMPANIES_FAILURE:
            NotificationManager.error(action.payload);
            return {
                ...state,
                loading: false,
                lstCompanies: null,
            };

        //////////////
        

        default:
            return { ...state };
    }
};
