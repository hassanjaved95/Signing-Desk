import { NotificationManager } from "react-notifications";

import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,
    SORT_CONTACTS_BY_NAME,
    SORT_CONTACTS_BY_EMAIL,
    SEARCH_CONTACTS,
    DELETE_CONTACTS,
    DELETE_CONTACTS_SUCCESS,
    CREATE_CONTACT,
    CREATE_CONTACT_SUCCESS,
    UPDATE_CONTACT,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_FAILURE,
    GET_COMPANYUSERS,
    GET_COMPANYUSERS_SUCCESS,
    GET_COMPANYUSERS_FAILURE,

    GET_CONTACTSASUSERS,
    GET_CONTACTSASUSERS_SUCCESS,
    GET_CONTACTSASUSERS_FAILURE,
} from "Actions/types";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const INITIAL_STATE = {
    contacts: null,
    filterdContacts: null
};

function makeDataCompatibleToOptionsCompanyUsers(data) {
    if (data && data.length) {
        data.forEach(function (item) {
            item.value = item.companyUserBridgeID;
            item.label = item.username;
            item.email = item.certEmail == null ? '' : item.certEmail;
            item.firstName = item.username;
            item.lastName = '';
            item.id = item.companyUserBridgeID;
            if(item.certificateType === 1){
                item.certTypeValue = "Qualified";
            }
            else if(item.certificateType === 2){
                item.certTypeValue = "Advanced";
            }
            else if(item.certificateType === 4){
                item.certTypeValue = "Biometric";
            }
            else{
                item.certTypeValue = "";
            }
        })

    }
    else {
        data.value = data.companyUserBridgeID;
        data.label = data.username;
        data.email = data.certEmail == null ? '' : data.certEmail;
        data.firstName = data.username;
        data.lastName = '';
        data.id = data.companyUserBridgeID;
        if(data.certificateType === 1){
            data.certTypeValue = "Qualified";
        }
        else if(data.certificateType === 2){
            data.certTypeValue = "Advanced";
        }
        else if(data.certificateType === 4){
            data.certTypeValue = "Biometric";
        }
        else{
            data.certTypeValue = "";
        }
        
    }

    return data;
}

function makeDataCompatibleToOptionsUsers(data) {
    if (data && data.length) {
        data.forEach(function (item) {
            item.value = item.id;
            item.label = item.firstName + ' ' + item.lastName;
        })

    }
    else {
        data.value = data.id;
        data.label = data.firstName + ' ' + data.lastName;
    }

    return data;
}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return { ...state, contacts: null, loading: true };

        case GET_CONTACTS_SUCCESS:

            return {
                ...state,
                contacts: action.payload,
                filterdContacts: action.payload,
                loading: false
            };

        case GET_CONTACTS_FAILURE:
            NotificationManager.error(action.payload);
            return {
                ...state,
                contacts: null,
                filterdContacts: null,
                loading: false
            };

        case SORT_CONTACTS_BY_NAME: {
            return {
                ...state,
                contacts: [...state.contacts.sort((a, b) => {
                    if (action.payload)
                        return a.name.localeCompare(b.name);
                    return b.name.localeCompare(a.name);
                })],
                filterdContacts: [...state.filterdContacts.sort((a, b) => {
                    if (action.payload)
                        return a.name.localeCompare(b.name);
                    return b.name.localeCompare(a.name);
                })]
            };
        }
        case SORT_CONTACTS_BY_EMAIL:
            return {
                ...state,
                contacts: [...state.contacts.sort((a, b) => {
                    if (action.payload)
                        return a.email.localeCompare(b.email);
                    return b.email.localeCompare(a.email);
                })],
                filterdContacts: [...state.filterdContacts.sort((a, b) => {
                    if (action.payload)
                        return a.email.localeCompare(b.email);
                    return b.email.localeCompare(a.email);
                })]
            };

        case SEARCH_CONTACTS: {
            var searchVal = action.payload;
            return {
                ...state,
                filterdContacts: state.contacts.filter(c => (c.firstName + c.lastName).toLowerCase().indexOf(searchVal) != -1
                    || (c.email).toLowerCase().indexOf(searchVal) != -1)
            };
        }

        case DELETE_CONTACTS: {
            var deleteIds = action.payload;
            return {
                ...state,
                loading: true
            };
        }

        case DELETE_CONTACTS_SUCCESS: {
            var deleteIds = action.payload.ContactIDs;
            return {
                ...state,
                contacts: [...state.contacts.filter(c => deleteIds.indexOf(c.id) == -1)],
                filterdContacts: [...state.filterdContacts.filter(c => deleteIds.indexOf(c.id) == -1)],
                loading: false,
            };
        }
        case CREATE_CONTACT: {
            return {
                ...state,
                loading: true
            };
        }

        case CREATE_CONTACT_SUCCESS: {
            NotificationManager.success("Contact Created successfully");
            var newContact = makeDataCompatibleToOptionsUsers(action.payload);
            return {
                ...state,
                contacts: [...state.contacts, newContact],
                loading: false
            };
        }

        case UPDATE_CONTACT: {
            return {
                ...state,
                loading: true
            }
        }

        case UPDATE_CONTACT_SUCCESS: {
            NotificationManager.success("Contact updated successfully");
            var updContact = makeDataCompatibleToOptionsUsers(JSON.parse(action.payload.config.data));

            return {
                ...state,
                contacts: [...state.contacts.filter(c => updContact.id != c.id),
                      updContact], 
                loading: false
            }
        }
        case UPDATE_CONTACT_FAILURE: {
            NotificationManager.error(action.payload);
            return {
                ...state,
                loading: false
            }
        }
        case GET_COMPANYUSERS:
            return { ...state, loading: true };

        case GET_COMPANYUSERS_SUCCESS: {
            const compUsers = makeDataCompatibleToOptionsCompanyUsers(action.payload);
            return {
                ...state,
                loading: false,
                companyUsers: compUsers,
            };
        }

        case GET_COMPANYUSERS_FAILURE:
            NotificationManager.error(action.payload);
            return {
                ...state,
                loading: false,
                companyUsers: null,
            };


        case GET_CONTACTSASUSERS:
            return { ...state, loading: true };

        case GET_CONTACTSASUSERS_SUCCESS: {
            const cont = makeDataCompatibleToOptionsUsers(action.payload);
            return {
                ...state,
                loading: false,
                contacts: cont,
            };
        }

        case GET_CONTACTSASUSERS_FAILURE:
            NotificationManager.error(action.payload);
            return {
                ...state,
                loading: false,
                contacts: null,
            };

        default:
            return state;
    }


}
