import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getViewingDocument } from "Actions";
import { makeStyles } from '@material-ui/styles';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PeopleIcon from '@material-ui/icons/People';
import BrushIcon from '@material-ui/icons/Brush';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import DateRangeIcon from '@material-ui/icons/DateRange';

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
        backgroundColor: '#dee2e6'
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
    { Id: 1, Icon: <BrushIcon />, Text: "SIGNATURE", Disabled: false },
    { Id: 2, Icon: <TextFieldsIcon />, Text: 'TEXTFIELD', Disabled: true },
    { Id: 3, Icon: <DateRangeIcon />, Text: 'DATE', Disabled: true }
];

const DocumentViewerLayout = function (props) {
    console.log('DocumentViewerLayout props:', props);
    const classes = useStyles();

    return (
        <div className={classes.documentViewerContainer}>
            <div className={classes.documentViewer}>
                <PDFViewer
                    onDropSign={props.onDropSign}
                    setSelectedSign={props.setSelectedSign}
                    selectedSign={props.selectedSign}
                    anchorEl={props.anchorEl}
                    setAnchorEl={props.setAnchorEl}
                    deleteSelectedSign={props.deleteSelectedSign}
                    duplicateSelectedSign={props.duplicateSelectedSign}
                    signs={props.signs}
                    handleMouseDown={props.handleMouseDown}
                    selectedUsers={props.selectedUsers}
                    onSelectUser={props.onSelectUser}
                />
            </div>
            <div className={classes.documentActionPanel}>
                <ActionPanel
                    actionType={props.actionType}
                    fieldActionItems={fieldActions}
                    onSelectUser={props.onSelectUser}
                    selectedUsers={props.selectedUsers}
                    selectedSign={props.selectedSign}
                    onSelectRecipient={props.onSelectRecipient}
                    deleteSignature={props.deleteSelectedSign}
                    removeRecipient={props.removeRecipient}
                    closeSignatureSettings={props.handleMouseDown}
                />
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
            selectedNavPanelItem: 'Fields',
            signs: [],
            selectedSign: null,
            anchorEl: null,
            selectedUsers: []
        }
    }

    onSelectUser = (user) => {
        if (this.state.selectedUsers.indexOf(user) !== -1) return;

        this.setState({
            selectedUsers: [...this.state.selectedUsers, user]
        });
    }

    onDropSign = (signature) => {
        var newState = [...this.state.signs, signature];
        this.setState({
            signs: newState,
            selectedSign: null
        })
    }

    handleMouseDown = (e) => {
        this.setState({
            selectedSign: null,
            anchorEl: null
        });
    }

    setAnchorEl = (e, el) => {
        if (e) e.stopPropagation();
        this.setState({
            anchorEl: el
        });
    }

    setSelectedSign = (sign, ev) => {
        if (ev) ev.stopPropagation();

        this.setState({
            selectedSign: sign,
            selectedNavPanelItem: 'Fields'
        });
    }

    deleteSelectedSign = (sign) => {
        this.setState({
            signs: this.state.signs.filter(s => s != sign),
            selectedSign: null
        });
    }

    duplicateSelectedSign = (sign) => {
        this.setState({
            signs: [...this.state.signs, sign]
        });
    }

    onClickSignature = () => {
        this.setState({
            selectedNavPanelItem: 'Fields'
        });
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

    onSelectRecipient = (user, sign) => {
        this.setState({
            selectedSign: { ...this.state.selectedSign, recipient: user },
            signs: this.state.signs.filter(s => {
                if (s == sign) {
                    s.recipient = user;
                }
                return true;
            })
        });
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
                onDropSign={this.onDropSign}
                signs={this.state.signs}
                setSelectedSign={this.setSelectedSign}
                selectedSign={this.state.selectedSign}
                anchorEl={this.state.anchorEl}
                setAnchorEl={this.setAnchorEl}
                deleteSelectedSign={this.deleteSelectedSign}
                duplicateSelectedSign={this.duplicateSelectedSign}
                handleMouseDown={this.handleMouseDown}
                onSelectUser={this.onSelectUser}
                selectedUsers={this.state.selectedUsers}
                onSelectRecipient={this.onSelectRecipient}
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