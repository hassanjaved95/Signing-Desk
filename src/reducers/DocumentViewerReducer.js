import { NotificationManager } from "react-notifications";

import {
    GET_VIEWING_DOCUMENT,
    GET_VIEWING_DOCUMENT_SUCCESS,
    GET_VIEWING_DOCUMENT_FAILURE,
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE,

    GET_COMPANYUSERS,
    GET_COMPANYUSERS_SUCCESS,
    GET_COMPANYUSERS_FAILURE,

    GET_CONTACTSASUSERS,
    GET_CONTACTSASUSERS_SUCCESS,
    GET_CONTACTSASUSERS_FAILURE,
} from "Actions/types";

const INITIAL_STATE = {
    viewingDocument: null,
    companies: null,
    companyUsers:null,
    contacts:null
};

function makeDataCompatibleToOptionsCompanies(data){
  if(data){
    data.forEach(function(item){
        item.value = item.id;
        item.label = item.name;
    })
    return data;
  }
}

function makeDataCompatibleToOptionsCompanyUsers(data){
    if(data){
         data.forEach(function(item){
             item.value = item.companyUserBridgeID;
             item.label = item.username;
         })
         return data;
    }
 }

function makeDataCompatibleToOptionsUsers(data){
   if(data){
        data.forEach(function(item){
            item.value = item.id;
            item.label = item.firstName + ' ' + item.lastName;;
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
            NotificationManager.error("Error occured while fetching document details.")
            return {
                ...state,
                loading: false,
                viewingDocument: null,
            };

        case GET_COMPANIES:
          return{...state, loading:true};
        
        case GET_COMPANIES_SUCCESS:{
            const lstCompanies = makeDataCompatibleToOptionsCompanies(action.payload);
            return {
                ...state,
                loading: false,
                companies: lstCompanies,
            };
        }
            
        
        case GET_COMPANIES_FAILURE:
            NotificationManager.error("Error occured while fetching company details.")
            return {
                ...state,
                loading: false,
                lstCompanies: null,
            };

            //////////////
        case GET_COMPANYUSERS:
          return{...state, loading:true};
        
        case GET_COMPANYUSERS_SUCCESS:{
            const compUsers = makeDataCompatibleToOptionsCompanyUsers(action.payload);
            return {
                ...state,
                loading: false,
                companyUsers: compUsers,
            };
        }
                  
        case GET_COMPANYUSERS_FAILURE:
            NotificationManager.error("Error occured while fetching company user details.")
            return {
                ...state,
                loading: false,
                companyUsers: null,
            };


            case GET_CONTACTSASUSERS:
          return{...state, loading:true};
        
        case GET_CONTACTSASUSERS_SUCCESS:{
            const cont = makeDataCompatibleToOptionsUsers(action.payload);
            return {
                ...state,
                loading: false,
                contacts: cont,
            };
        }
                  
        case GET_CONTACTSASUSERS_FAILURE:
            NotificationManager.error("Error occured while fetching contact details.")
            return {
                ...state,
                loading: false,
                contacts: null,
            };
        
        default:
            return { ...state };
    }
};
