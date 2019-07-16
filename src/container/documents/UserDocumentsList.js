/**
 * Email Listing
 */
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { readEmail, onSelectEmail, markAsStarEmail } from "Actions";
import UserDocumentListItem from "Components/ListItem/UserDocumentListItem";
import UserDocumentListItemHeader from "Components/ListItem/UserDocumentListItemHeader";
import IntlMessages from "Util/IntlMessages";
import { getDocuments } from "Actions";
import { CreateNewFolder, Edit, Folder, Delete } from '@material-ui/icons';
import ContentMenu from 'Components/RctCRMLayout/ContentMenu';
import $ from 'jquery';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import NewFolder from 'Components/FolderItem/NewFolder';
import PageActions from "Components/ListItem/PageActions";
import { getGuid } from "Helpers/helpers";

class UserDocumentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            selectedDocuments: [],
            allDocumentsAreSelected: false,
            actions: ["Duplicate", "Move", "Rename", "Delete"],
            
        }
    }
    componentDidMount() {
        this.props.getDocuments();
    }

    onChangeSearchValue = (searchVal) => {
        console.log('Search By:', searchVal);
    }

    selectAllContacts = (event, checked) => {
        event.stopPropagation();

        const { documents } = this.props;
        if (!documents) return;

        var ids = [];
        if (checked) {
            ids = documents.reduce((arr, currObj) => {
                arr.push(currObj.id);
                return arr;
            }, []);
        }

        this.setState({
            selectedDocuments: ids,
            allDocumentsAreSelected: checked
        })
    }

    onClickDocumentItem = (document, e) => {
        console.log('Document Row Clicked');
    }

    onCheckSingleDocument = (document, event, checked) => {
        event.stopPropagation();
        var selectedDocuments = this.state.selectedDocuments.filter(c => c != document.id);

        if (checked) {
            selectedDocuments.push(document.id)
        }

        var allDocumentsAreSelected = this.props.documents &&
            this.props.documents.length == selectedDocuments.length;

        this.setState({
            selectedDocuments: selectedDocuments,
            allDocumentsAreSelected
        });
    }

    getListItemCheckState = (document) => {
        var state = this.state.selectedDocuments.find(c => c == document.id) ? true : false;
        return state;
    }

    handleRowAction = () => {
        console.log('Arguments', arguments);
    }

    render() {
        const { documents } = this.props;
        return (
            <div className="documents-page">
                <div className="documents-folders">
                    {/* FOLDERS COMPONENT TO BE INSERTED HERE BY HJ */}
                </div>
                <div className="documents-area">
                    <div className="page-content">
                        <div className="page-actions">
                            <PageActions page="Documents"
                                onChangeSearchValue={this.onChangeSearchValue}
                                search={this.state.search}
                                selectedDocuments={this.state.selectedDocuments.length}
                                onClickSearch={() => { this.setState({ search: true }) }}
                                onSearchClose={() => { this.setState({ search: false }) }}
                            />
                        </div>
                        <div className="content-area">
                            <div className="content-head header-shadow head-container">
                                <ul className="list-unstyled m-0">
                                    <UserDocumentListItemHeader
                                        onSelectAll={this.selectAllContacts}
                                        checked={this.state.allDocumentsAreSelected}
                                    />
                                </ul>
                            </div>
                            <div className="content-detail">
                                <ul className="list-unstyled m-0">
                                    {
                                        documents && documents.length > 0 && documents !== null ? (
                                            documents.map((document, index) => (
                                                <UserDocumentListItem
                                                    key={getGuid()}
                                                    document={document}
                                                    checked={this.getListItemCheckState(document)}
                                                    onClickDocumentItem={this.onClickDocumentItem.bind(this, document)}
                                                    onCheckSingleDocument={this.onCheckSingleDocument.bind(this, document)}
                                                    selectedDocuments={this.state.selectedDocuments.length}
                                                    options={this.state.actions}
                                                    onClickAction={this.handleRowAction}
                                                    onSelectAction={() => { console.log('onSelectAction called with args:', arguments) }}
                                                />
                                            ))
                                        ) : (
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>No documents found</h4>
                                                </div>
                                            )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ documents }) => {
    return documents;
};

export default withRouter(
    connect(mapStateToProps,
        {
            getDocuments
        }
    )(UserDocumentsList)
);
