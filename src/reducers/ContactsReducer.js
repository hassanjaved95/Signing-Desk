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
    UPDATE_CONTACT_SUCCESS
} from "Actions/types";

const INITIAL_STATE = {
    contacts: null,
    filterdContacts: null
};

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
                filterdContacts: state.contacts.filter(c => (c.firstName || c.FirstName + c.lastName || c.LastName).toLowerCase().indexOf(searchVal) != -1
                    || (c.email || CertEmail).toLowerCase().indexOf(searchVal) != -1)
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
                loading: false,
                contacts: state.contacts.filter(c => deleteIds.indexOf(c.id) == -1),
                filterdContacts: state.filterdContacts.filter(c => deleteIds.indexOf(c.id) == -1)
            };
        }
        case CREATE_CONTACT: {
            return {
                ...state,
                loading: true
            };
        }

        case CREATE_CONTACT_SUCCESS: {
            var newContact = action.payload;
            return {
                ...state,
                contacts: [...state.contacts, newContact],
                loading: false
            };
        }

        default:
            return state;
    }


}
