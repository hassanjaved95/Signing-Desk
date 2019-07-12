import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,
    SORT_CONTACTS_BY_NAME,
    SORT_CONTACTS_BY_EMAIL
} from "Actions/types";

const INITIAL_STATE = {
    contacts: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return { ...state, contacts: null };

        case GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload
            };

        case GET_CONTACTS_FAILURE:
            return {
                ...state,
                contacts: null
            };

        case SORT_CONTACTS_BY_NAME: {
            return {
                ...state,
                contacts: [...state.contacts.sort((a, b) => {
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
                })]
            };
        default:
            return { ...state };
    }
};
