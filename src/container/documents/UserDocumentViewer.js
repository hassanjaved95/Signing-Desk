import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UserDocumentViewer extends Component {

}

const mapStateToProps = ({ documents }) => {
    return documents;
}

export default withRouter(
    connect(mapStateToProps, {

    })(UserDocumentViewer));