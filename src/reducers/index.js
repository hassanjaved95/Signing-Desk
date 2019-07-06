/**
 * App Reducers
 */
import { combineReducers } from "redux";
import settings from "./settings";
import chatAppReducer from "./ChatAppReducer";
import emailAppReducer from "./EmailAppReducer";
import sidebarReducer from "./SidebarReducer";
import todoAppReducer from "./TodoAppReducer";
import authUserReducer from "./AuthUserReducer";
import feedbacksReducer from "./FeedbacksReducer";
import ecommerceReducer from "./EcommerceReducer";
import CrmReducer from "./CrmReducer";
import DocumentsReducer from "./DocumentsReducer";
import ContactsReducer from "./ContactsReducer";

const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  documents: DocumentsReducer,
  contacts: ContactsReducer,
  sidebar: sidebarReducer,
  todoApp: todoAppReducer,
  authUser: authUserReducer,
  feedback: feedbacksReducer,
  ecommerce: ecommerceReducer,
  CrmReducer: CrmReducer
});

export default reducers;
