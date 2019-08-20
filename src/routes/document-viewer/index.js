/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserDocumentViewer from "Container/documents/UserDocumentViewer";

const DocumentViewer = ({ match }) => (

    <div className="content-wrapper">
        <Switch>
            {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/`} /> */}
            <Route path={`${match.url}/`} component={UserDocumentViewer} />
        </Switch>
    </div>
);

export default DocumentViewer;
