import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getViewingDocument } from "Actions";
import { makeStyles } from '@material-ui/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PeopleIcon from '@material-ui/icons/People';
import BrushIcon from '@material-ui/icons/Brush';

import NavPanel from "Components/document-viewer/nav-panel";
import ActionPanel from "Components/document-viewer/action-panel";
import PDFViewer from "Container/documents/pdf-viewer";
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

const useStyles = makeStyles({
    documentViewerContainer: {
        height: "calc(100vh - 83px)",
        background: "white",
        display: "flex",
        flexDirection: 'row'
    },
    documentActionPanel: {
        width: '300px',
        overflowY: "auto"
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
        Id: 1,
        Icon: <WidgetsIcon />,
        Text: "Fields"
    },
    {
        Id: 2,
        Icon: <PeopleIcon />,
        Text: "Recipients"
    }
];

const fieldActions = [
    { Id: 1, Icon: <BrushIcon />, Text: "SIGNATURE" },
    { Id: 2, Icon: '', Text: '' },
    { Id: 3, Icon: '', Text: '' },
    { Id: 4, Icon: '', Text: '' },
    { Id: 5, Icon: '', Text: '' },
    { Id: 6, Icon: '', Text: '' },
    { Id: 7, Icon: '', Text: '' },
    { Id: 8, Icon: '', Text: '' },
    { Id: 9, Icon: '', Text: '' },
];

const DocumentViewerLayout = function (props) {
    console.log('DocumentViewerLayout props:', props);
    const classes = useStyles();

    return (
        <div className={classes.documentViewerContainer}>
            <div className={classes.documentViewer}>
                <PDFViewer />
            </div>
            <div className={classes.documentActionPanel}>
                <ActionPanel actionType={props.actionType} fieldActionItems={fieldActions} />
            </div>
            <div className={classes.documentNavPanel}>
                <NavPanel navPanelItems={navPanelItems}
                    onNavPanelItemClick={props.onNavPanelItemClick}
                    onClickSend={props.onClickSend}
                    actionType={props.actionType}
                />
            </div>
        </div>
    );
}

class UserDocumentViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNavPanelItem: 'Fields'
        }
    }

    onNavPanelItemClick = (item) => {
        console.log('clicked item:', item);
        this.setState({
            selectedNavPanelItem: item.Text
        });
    }

    onClickSend = () => {
        console.log('send clicked');
    }

    componentDidMount() {
        // this.props.getViewingDocument();
    }

    render() {

        const { selectedDocument, loading } = this.props;
        console.log('viewingDocument:', selectedDocument);
        // if (loading) {
        //     return (
        //         <RctSectionLoader />
        //     )
        // }

        return (
            <DocumentViewerLayout {...this.props}
                actionType={this.state.selectedNavPanelItem}
                onNavPanelItemClick={this.onNavPanelItemClick}
                onClickSend={this.onClickSend}
            />
        )
    }
}

const mapStateToProps = ({ documents }) => {
    const { selectedDocument } = documents;
    return { selectedDocument };
}

export default withRouter(
    connect(mapStateToProps)(UserDocumentViewer));