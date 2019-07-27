/**
 * Email Listing
 */
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { readEmail, onSelectEmail, markAsStarEmail } from "Actions";
import { Scrollbars } from "react-custom-scrollbars";
import UserDocumentListItem from "Components/ListItem/UserDocumentListItem";
import UserDocumentListItemHeader from "Components/ListItem/UserDocumentListItemHeader";
import IntlMessages from "Util/IntlMessages";
import { getDocuments, setSelectedFolder, updateDocument } from "Actions";
import { CreateNewFolder, Edit, Folder, Delete, FolderOpen } from '@material-ui/icons';
import ContentMenu from 'Components/RctCRMLayout/ContentMenu';
import $ from 'jquery';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import NewFolder from 'Components/FolderItem/NewFolder';
import MoveToFolder from "Components/FolderItem/MoveToFolder";
import PageActions from "Components/ListItem/PageActions";
import { getGuid } from "Helpers/helpers";
import SmallDialogTemplate from "Components/Dialogs/SmallDialogTemplate";
import FolderMenu from 'Components/FolderMenu/FolderMenu';



class UserDocumentsList extends Component {
    searchTimerId = null;
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            selectedDocuments: [],
            allDocumentsAreSelected: false,
            actions: ["Duplicate", "Move", "Rename", "Delete"],
            folderListControl: true,
            folderCreationDialog: false,
            folderListPath: "",
            folderList: ['Apple', 'Bananna', 'Orange'],
            inEditModeFolderList: false,
            moveDocumentsToFolder: false,
            moveDocumentsListOpen: true,
            selectedFolderName: "Documents",
            folderBarItems: [],
            folderContainerItems: [],
            clickedMovedToFolderID: "0",
            showSearchTags: false,
            clickedSearchTagKey: "",
            clickedRowContextMenuKey: "",
            showTagAddButton: false,
            writtenTags: "",

        }
    }

    actions = [
        {
            text: 'Duplicate',
            icon: '<i className="zmdi zmdi-copy"></i>',
            handleClick: this.onDuplicateDocuments
        },
        {
            text: 'Move',
            icon: '<i className="zmdi zmdi-folder-star"></i>',
            handleClick: this.onMoveDocumentsToFolder
        },
        {
            text: 'Rename',
            icon: '<i className="zmdi zmdi-edit"></i>',
            handleClick: this.onRenameDocument
        },
        {
            text: 'Delete',
            icon: '<i className="zmdi zmdi-delete"></i>',
            handleClick: this.onDeleteDocuments
        }
    ];

    componentDidMount() {
        this.props.getDocuments();
    }

    onChangeSearchValue = (searchVal) => {
        console.log('Search By:', searchVal);
    }

    selectAllDocuments = (event, checked) => {
        event.stopPropagation();

        const { documents } = this.props;
        if (!documents) return;

        var ids = [];
        if (checked) {
            documents.forEach(folder => {
                folder.documents.reduce((arr, currObj) => {
                    arr.push(currObj.id);
                    return arr;
                }, ids);
            })
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

        var totalDocs = 0;
        if (this.props.documents && this.props.documents.length > 0) {
            this.props.documents.forEach(folder => { totalDocs += folder.documents.length });
        }
        var allDocumentsAreSelected = totalDocs == selectedDocuments.length;

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

    /* All methods related to Folders */

    onCloseFolderListControl = () => {
        this.setState({
            folderListControl: false
        });
    }

    onCreateNewFolder = () => {
        this.setState({
            folderCreationDialog: true
        });
    }

    onMoveDocumentsToFolder = () => {
        this.setState({
            moveDocumentsToFolder: true
        });
    }

    onEditFolderList = () => {
        this.setState({
            inEditModeFolderList: !this.state.inEditModeFolderList
        });
    }

    MoveFolderItems = (documentName, documentId, obj) => {
        this.setState({
            selectedFolderName: documentName
        });
        this.setState({
            clickedMovedToFolderID: documentId
        });


    }

    onCloseList = (e) => {
        this.setState({
            folderListControl: false
        });
    };

    onCloseDlg = () => {
        this.setState({
            folderCreationDialog: false
        });
    }

    onCloseDlgMoveDocuments = () => {
        this.setState({
            moveDocumentsToFolder: false
        });
    }

    onClickShowFolderDocuments = (folder) => {
        this.props.setSelectedFolder({ folderId: folder.id, levelUp: false });
    }

    /* End All Methods related to folders */

    getScrollBarStyle() {
        return {
            height: "calc(100vh - 50px)"
        };
    }

    onDuplicateDocuments = (doc) => {
        console.log('onDuplicateDocuments');
    }

    onMoveDocuments = (doc) => {
        console.log('onMoveDocuments');
    }

    onDeleteDocuments = (doc) => {
        console.log('onDeleteDocuments');
    }

    onRenameDocument = (doc) => {
        console.log('onRenameDocument');
    }

    /*Search Tag Methods */

    onCloseTagIcon = (e) => {
        this.setState({
            showSearchTags: false,
            clickedSearchTagKey: "0"
        });
    }

    onClickTagIcon = (document, e) => {
        this.setState({
            showSearchTags: true,
            clickedSearchTagKey: document.id
        });
    }

    handleTagInputChange = (e) => {
        e.preventDefault();
        if (this.searchTimerId) {
            clearTimeout(this.searchTimerId);
        }

        var tagVal = e.target.value;
        this.searchTimerId = setTimeout(() => {
            console.log('handleTagInputChange:', tagVal);
            this.setState({
                showAddTagButton: true,
                writtenTags: tagVal
            });
        }, 1000);
    }

    onTagInputClick = (e) => {
        e.target.value = this.state.writtenTags;
    }

    onClickRemoveTag = (document, e) => {
        console.log("remove tag");
        var valueToSplice = e.target.attributes.tagval.nodeValue;
        document.tags.splice(document.tags.indexOf(valueToSplice),1);
        this.props.updateDocument({
            "id": document.id,
            "name": document.name,
            "description": document.description,
            "tags": document.tags,
            "folderID": document.folderId
        });
    }

    onClickAddTag = (document,e)=>{
        console.log("Add Tag");
        debugger;

        document.tags.push(this.state.writtenTags);
        this.props.updateDocument({
            "id": document.id,
            "name": document.name,
            "description": document.description,
            "tags": document.tags,
            "folderID": document.folderId
        });
    }

    /* End search Tag Methods */

    /* Start Methods row context menu */

    onCloseRowContextMenu = (e) => {
        this.setState({
            showSearchTags: false,
            clickedRowContextMenuKey: "0"
        });
    }

    onClickMoreVert = (document, e) => {
        console.log('context menu clicked ' + document.id);
        this.setState({
            showSearchTags: true,
            clickedRowContextMenuKey: document.id
        });
    }
    /* End methods row context menu */

    render() {

        const { documents, selectedFolder } = this.props;

        return (
            <div className="documents-page">

                {
                    this.state.folderCreationDialog &&
                    <SmallDialogTemplate
                        title="New Folder"
                        open={this.state.folderCreationDialog}
                        onClose={this.onCloseDlg}
                    >
                        <NewFolder />
                    </SmallDialogTemplate>
                }

                {
                    this.state.moveDocumentsToFolder &&
                    <SmallDialogTemplate
                        title="Move documents to folder"
                        open={this.state.moveDocumentsToFolder}
                        onClose={this.onCloseDlgMoveDocuments}

                    >
                        {/* <MoveToFolder
                            moveDocumentsListOpen={this.state.moveDocumentsListOpen}
                            documents={documents}
                            MoveFolderItems={this.MoveFolderItems}
                            selectedFolderName={this.state.selectedFolderName}
                            clickedMovedToFolderID={this.state.clickedMovedToFolderID}
                            
                        /> */}
                        <FolderMenu data={documents} currentFolderID={selectedFolder[0].id}
                            currentFolderName={selectedFolder[0].name} />
                    </SmallDialogTemplate>
                }
                <div className="documents-folders">
                    {
                        documents &&
                        <ContentMenu
                            onCreateNewFolder={this.onCreateNewFolder}
                            oncloseList={this.onCloseList}
                            inEditModeFolderList={this.state.inEditModeFolderList}
                            onEditFolderList={this.onEditFolderList}
                            selectedForlders={selectedFolder}
                            onCreateNewFolder={this.onCreateNewFolder}
                            onClickShowFolderDocuments={this.onClickShowFolderDocuments}
                        />
                    }
                </div>
                <div className="documents-area">
                    <div className="page-content">
                        <div className="page-actions">
                            <PageActions page="Documents"
                                onMoveDocuments={this.onMoveDocumentsToFolder}
                                onChangeSearchValue={this.onChangeSearchValue}
                                onDuplicateDocuments={this.onDuplicateDocuments}
                                onDeleteDocuments={this.onDeleteDocuments}
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
                                        onSelectAll={this.selectAllDocuments}
                                        checked={this.state.allDocumentsAreSelected}
                                    />
                                </ul>
                            </div>

                            <div className="content-detail">
                                <ul className="list-unstyled m-0">
                                    {
                                        documents && documents.length > 0 && documents !== null ? (
                                            documents.map((document, index) => (
                                                document.documents.length > 0 &&
                                                document.documents.map((doc, index) => (
                                                    <UserDocumentListItem
                                                        key={getGuid()}
                                                        document={doc}
                                                        checked={this.getListItemCheckState(doc)}
                                                        onClickDocumentItem={this.onClickDocumentItem.bind(this, doc)}
                                                        onCheckSingleDocument={this.onCheckSingleDocument.bind(this, doc)}
                                                        selectedDocuments={this.state.selectedDocuments.length}
                                                        options={this.state.actions}
                                                        onClickAction={this.handleRowAction}
                                                        onSelectAction={() => { console.log('onSelectAction called with args:', arguments) }}
                                                        menuRelationKey={doc.id}
                                                        clickedSearchTagID={this.state.clickedSearchTagKey}
                                                        ShowSearchTags={this.state.clickedSearchTagKey == doc.id}
                                                        onRemoveTags={this.onClickRemoveTag.bind(this, doc)}
                                                        onAddTags={this.onClickAddTag.bind(this,doc)}
                                                        onClickTagIcon={this.onClickTagIcon.bind(this, doc)}
                                                        onCloseTagIcon={this.onCloseTagIcon.bind(this)}
                                                        onTagsInputChange={this.handleTagInputChange.bind(this)}
                                                        showAddTagButton={this.state.showTagAddButton}
                                                        writtenTags={this.state.writtenTags}
                                                        onTagInputClick={this.onTagInputClick.bind(this)}
                                                        showRowContextMenu={this.state.clickedRowContextMenuKey == doc.id}
                                                        onClickMoreVert={this.onClickMoreVert.bind(this, doc)}
                                                        closeContextMenu={this.onCloseRowContextMenu.bind(this)}
                                                    />
                                                ))
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
    console.log('documents store:', documents);
    return documents;
};

export default withRouter(
    connect(mapStateToProps,
        {
            getDocuments,
            setSelectedFolder,
            updateDocument
        }
    )(UserDocumentsList)
);
