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
import { getDocuments } from "Actions";
import { CreateNewFolder, Edit, Folder, Delete, FolderOpen } from '@material-ui/icons';
import ContentMenu from 'Components/RctCRMLayout/ContentMenu';
import $ from 'jquery';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import NewFolder from 'Components/FolderItem/NewFolder';
import MoveToFolder from "Components/FolderItem/MoveToFolder";
import PageActions from "Components/ListItem/PageActions";
import { getGuid } from "Helpers/helpers";
import SmallDialogTemplate from "Components/Dialogs/SmallDialogTemplate";


class UserDocumentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            selectedDocuments: [],
            allDocumentsAreSelected: false,
            actions: ["Duplicate", "Move", "Rename", "Delete"],
            folderListControl: true,
            folderCreationDialog: false,
            folderList: ['New Folder', 'New Folder 1', 'New Folder 2'],
            inEditModeFolderList: false,
            moveDocumentsToFolder: false,
            moveDocumentsListOpen: true,
            selectedFolderName: "Documents",
        }
    }

    actions = [
        {
            text: 'Duplicate',
            icon: '<i class="zmdi zmdi-copy"></i>',
            handleClick: this.onDuplicateDocuments
        },
        {
            text: 'Move',
            icon: '<i class="zmdi zmdi-folder-star"></i>',
            handleClick: this.onMoveDocumentsToFolder
        },
        {
            text: 'Rename',
            icon: '<i class="zmdi zmdi-edit"></i>',
            handleClick: this.onRenameDocument
        },
        {
            text: 'Delete',
            icon: '<i class="zmdi zmdi-delete"></i>',
            handleClick: this.onDeleteDocuments
        }
    ];

    componentDidMount() {
        this.props.getDocuments();
        if (!this.state.folderListControl)
            $(".folderbar").hide();
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

    folderBarItems() {
        return (
            <React.Fragment>
                {this.state.inEditModeFolderList ? <div className="folder-bar-edit-button" onClick={this.onEditFolderList}> Done </div> : <Edit className="editicon" onClick={this.onEditFolderList} />}
                <CreateNewFolder className="createnewfoldericon" onClick={this.onCreateNewFolder} />
            </React.Fragment>
        );
    }

    folderCollection() {
        this.items = this.state.folderList.map((item) =>
            <li className="foldersList">
                <div className="liContainer" data-item={item}>

                    {this.state.inEditModeFolderList ? <Edit className="listItemIconsLeft editicon" onClick={this.onCreateNewFolder} /> : <Folder className="listItemIconsLeft hild-featured" />}
                    <div className="child-featured">{item}</div>
                    {this.state.inEditModeFolderList && <Delete className="listItemIconsRight hild-featured" />}
                </div>
            </li>
        );
        return (
            <ul className="foldersList">
                {this.items}
            </ul>
        );
    }

    folderCollectionMoveFolders() {
        this.items = this.state.folderList.map((item) =>
            <li className="MoveFolderListItem childListItem folderChildVisible" data-sat="1" onClick={(e) => this.onClickMoveFolderItems(e, e.target)}>
                <div className="liContainer" data-item={item}>
                    <Folder className="listItemIconsLeftt" />
                    <div className="child-featured">{item}</div>
                </div>
            </li>
        );
        return (
            <ul className="foldersListMoveFolder">
                <li className="MoveFolderListItem parentListItem ActivefoldersListMoveFolder" onClick={(e) => this.onClickMoveFolderItems(e, e.target)}>
                    <div className="liContainer">
                        {this.state.moveDocumentsListOpen ?
                            <FolderOpen className="listItemIconsLeftt" /> :
                            <Folder className="listItemIconsLeftt" />
                        }   Documents
              </div>
                </li>
                {this.items}
            </ul>
        );
    }

    onClickMoveFolderItems = (e, obj) => {
        if (!obj.classList.contains("foldersListMoveFolder")) {
            this.setState({
                selectedFolderName: obj.textContent
            });
            if (obj.parentElement.classList.contains("parentListItem")) {
                if ($(".folderChildVisible").attr("data-sat") == "1") {
                    $(".folderChildVisible").hide();
                    $(".folderChildVisible").attr("data-sat", "0");
                    this.setState({
                        moveDocumentsListOpen: false
                    });
                } else {
                    $(".folderChildVisible").show();
                    $(".folderChildVisible").attr("data-sat", "1");
                    this.setState({
                        moveDocumentsListOpen: true
                    });
                }
                $(".MoveFolderListItem").removeClass("ActivefoldersListMoveFolder");
                obj.parentElement.classList.add("ActivefoldersListMoveFolder");

            } else {
                $(".MoveFolderListItem").removeClass("ActivefoldersListMoveFolder");
                obj.parentElement.parentElement.classList.add("ActivefoldersListMoveFolder");
            }

        }
    }

    oncloseList = (e) => {
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

    render() {
        const { documents } = this.props;
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
                        <MoveToFolder folderItemsToMove={this.folderCollectionMoveFolders()} selectedFolderName={this.state.selectedFolderName} />
                    </SmallDialogTemplate>
                }
                <div className="documents-folders">
                    <ContentMenu
                        onCreateNewFolder={this.onCreateNewFolder}
                        oncloseList={(e) => this.oncloseList(e)}
                        folderListItems={this.folderCollection()}
                        folderBarItems={this.folderBarItems()} />
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
                                                    options={this.actions}
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
