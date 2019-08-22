import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getViewingDocument } from "Actions";
import { makeStyles } from '@material-ui/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PeopleIcon from '@material-ui/icons/People';

import NavPanel from "Components/document-viewer/nav-panel";
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

const useStyles = makeStyles({
    documentViewerContainer: {
        height: "calc(100vh - 83px)",
        background: "white",
        display: "flex",
        flexDirection: 'row'
    },
    documentActionPanel: {
        width: '300px'
    },
    documentNavPanel: {
        width: '76px',
        backgroundColor: '#F9F9F9'
    },
    documentViewer: {
        width: "calc(100% - 376px)",
        backgroundColor: '#F9F9F9'
    }
});

const navPanelItems = [
    {
        Icon: <WidgetsIcon />,
        Text: "Content"
    },
    {
        Icon: <PeopleIcon />,
        Text: "Recipients"
    }
];

const DocumentViewerLayout = function (props) {
    console.log('DocumentViewerLayout props:', props);
    const classes = useStyles();

    return (
        <div className={classes.documentViewerContainer}>
            <div className={classes.documentViewer}>
                <h3>documentViewer</h3>
            </div>
            <div className={classes.documentActionPanel}>
                <h3>documentActionPanel</h3>
            </div>
            <div className={classes.documentNavPanel}>
                <NavPanel navPanelItems={navPanelItems}
                    onNavPanelItemClick={props.onNavPanelItemClick}
                    onClickSend={props.onClickSend}
                />
            </div>
        </div>
    )
}

class UserDocumentViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onNavPanelItemClick = (item) => {
        console.log('clicked item:', item);
    }

    onClickSend = () => {
        console.log('send clicked');
    }

    componentDidMount() {
        // this.props.getViewingDocument();
    }

    render() {

        const { viewingDocument, loading } = this.props;
        console.log('viewingDocument:', viewingDocument);
        // if (loading) {
        //     return (
        //         <RctSectionLoader />
        //     )
        // }

        return (
            <DocumentViewerLayout {...this.props}
                onNavPanelItemClick={this.onNavPanelItemClick}
                onClickSend={this.onClickSend}
            />
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