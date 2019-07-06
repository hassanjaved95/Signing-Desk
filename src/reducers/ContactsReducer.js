import {
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE
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

        default:
            return { ...state };
    }
};
