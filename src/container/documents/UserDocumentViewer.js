import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getViewingDocument } from "Actions";

class UserDocumentViewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getViewingDocument();
    }

    render() {
        const { viewingDocument, loading } = this.props;
        console.log('viewingDocument:', viewingDocument);
        if (loading) {
            return (
                <RctSectionLoader />
            )
        }

        return (
            <h3>User document Viewer</h3>
        )
    }
}

const mapStateToProps = ({ documentViewer }) => {
    return documentViewer;
}

export default withRouter(
    connect(mapStateToProps, {
        getViewingDocument
    })(UserDocumentViewer));