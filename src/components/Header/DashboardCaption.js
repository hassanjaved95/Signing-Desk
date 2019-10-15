import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { collapsedSidebarAction } from 'Actions';

class DashboardCaption extends Component {

    render() {
        var currentPathName = this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1];
        const { selectedDocument } = this.props;
        if (currentPathName == 'document-viewer' && selectedDocument) {
            currentPathName = selectedDocument.name;
        }

        return (
            <React.Fragment>
                <li className="list-inline-item" style={{ color: 'black' }}>
                    <span style={{ textTransform: 'capitalize' }}>{currentPathName}</span>

                </li>
            </React.Fragment>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser, settings, sidebar, documents }) => {
    const { user } = authUser;
    const { selectedDocument } = documents;
    return { user, settings, sidebar, selectedDocument };
};

export default withRouter(connect(mapStateToProps, {
    collapsedSidebarAction
})(DashboardCaption));