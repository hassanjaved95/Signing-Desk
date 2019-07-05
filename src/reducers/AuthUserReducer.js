/**
 * Auth User Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from "Actions/types";

/**
 * initial auth user
 */
const INIT_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, loading: true };

    case UPDATE_PROFILE_SUCCESS:
      NotificationManager.success("User profile updated successfully");
      return { ...state, loading: false, user: action.payload };

    case UPDATE_PROFILE_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false };

    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      // NotificationManager.success("User Logged In");
      return { ...state, loading: false, user: action.payload };

    case LOGIN_USER_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false };

    case LOGOUT_USER:
      return { ...state };

    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null };

    case LOGOUT_USER_FAILURE:
      return { ...state };

    case SIGNUP_USER:
      return { ...state, loading: true };

    case SIGNUP_USER_SUCCESS:
      NotificationManager.success("Account Created");
      return { ...state, loading: false, user: action.payload.uid };

    case SIGNUP_USER_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
