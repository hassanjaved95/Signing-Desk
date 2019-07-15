/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserDocumentsList from "Container/documents/UserDocumentsList";

const Documents = ({ match }) => (
 
  <div className="content-wrapper">
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
      <Route path={`${match.url}/`} component={UserDocumentsList} />
    </Switch>
  </div>
);

export default Documents;
