/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DocumentListing from "./components/DocumentListing";

const Documents = ({ match }) => (
  <div className="content-wrapper">
    <Switch>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
      <Route path={`${match.url}/`} component={DocumentListing} />
    </Switch>
  </div>
);

export default Documents;
