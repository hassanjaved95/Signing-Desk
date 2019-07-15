/**
 * Email Listing
 */
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { readEmail, onSelectEmail, markAsStarEmail } from "Actions";
import DocumentListItem from "./DocumentListItem";
import IntlMessages from "Util/IntlMessages";
import { getDocuments } from "Actions";
import { CreateNewFolder, Edit, Folder, Delete, FolderOpen, NoEncryption } from '@material-ui/icons';
import ContentMenu from 'Components/RctCRMLayout/ContentMenu';
import $ from 'jquery';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import SmallDialogTemplate from "Components/Dialogs/SmallDialogTemplate";
import NewFolder from 'Components/FolderItem/NewFolder';
import MoveToFolder from "../../../components/FolderItem/MoveToFolder";
import SearchTags from "Components/ListItem/SearchTags";


class DocumentListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderListControl: true,
      folderCreationDialog: false,
      folderList: ['New Folder', 'New Folder 1', 'New Folder 2'],
      inEditModeFolderList: false,
      moveDocumentsToFolder: false,
      moveDocumentsListOpen: true,
      selectedFolderName: "Documents",
      showSearchTags: false,
    }
  }
  componentDidMount() {
    this.props.getDocuments();
    if (!this.state.folderListControl)
      $(".folderbar").hide();
  }

  readEmail(email) {
    const { match, history } = this.props;
    this.props.readEmail(email);
    history.push(`${match.url}/${email.id}`);
  }

  onSelectEmail(e, email) {
    e.stopPropagation();
    this.props.onSelectEmail(email);
  }

  handleMarkAsStar(e, email) {
    e.stopPropagation();
    this.props.markAsStarEmail(email);
  }



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

  // onCloseList = (e,document) => {
  //   Console.log("i am called");
  // }
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

  onSaveDlg = () => {
    console.log('onSaveDlg');
    this.onCloseDlg();
  }

  dlgButtons = {
    save: {
      onSave: this.onSaveDlg,
      text: "Save"
    }
  }

  loadSearchTags() {

    return (
      this.state.showSearchTags == false ? "" :

        <div className="search-tag-ul" onMouseLeave={(e) => this.onCloseSearchTags(e)}>
          <ul onMouseOver={this.onShowSearchTags}>
            <li onMouseOver={this.onShowSearchTags}>test</li>
            <li onMouseOver={this.onShowSearchTags}>test2</li>
          </ul>
        </div>

    );
  }

  onCloseSearchTags = (e) => {
      this.setState({
        showSearchTags: false
      });
  }

  onShowSearchTags = () => {
    this.setState({
      showSearchTags: true
    });
  }

  /**
   * Function to return task label name
   */
  getTaskLabelNames = taskLabels => {
    let elements = [];
    const { labels } = this.props;
    for (const taskLabel of taskLabels) {
      for (const label of labels) {
        if (label.value === taskLabel) {
          let ele = (
            <span
              key={label.value}
              className={classnames("badge badge-pill", {
                "badge-success": label.value === 1,
                "badge-primary": label.value === 2,
                "badge-info": label.value === 3,
                "badge-danger": label.value === 4
              })}
            >
              <IntlMessages id={label.name} />
            </span>
          );
          elements.push(ele);
        }
      }
    }
    return elements;
  };

  render() {
    const { documents } = this.props;
    return (
      <div className="page-content">
        <div style={{ border: "1px solid #3b5999", cursor: "pointer" }} onClick={this.onMoveDocumentsToFolder}>Click Me to Move</div>
        <div style={{ border: "1px solid #3b5999", cursor: "pointer", paddingLeft: "200px" }} >
          <SearchTags children={this.loadSearchTags()} ShowSearchTags={this.onShowSearchTags} />
        </div>

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

        <div className="floder-bar-documents" >
          <div className="item-a">
            <ContentMenu
              onCreateNewFolder={this.onCreateNewFolder}
              oncloseList={(e) => this.oncloseList(e)}
              folderListItems={this.folderCollection()}
              folderBarItems={this.folderBarItems()} />

          </div>
          <div className="item-b">
            <ul className="list-unstyled m-0">
              {documents && documents.length > 0 && documents !== null ? (
                documents.map((document, key) => (
                  <DocumentListItem
                    document={document}
                    handleMarkAsStar={e => this.handleMarkAsStar(e, document)}
                    key={key}
                    getTaskLabelNames={() =>
                      this.getTaskLabelNames(document.email_labels)
                    }
                  />
                ))
              ) : (
                  <div className="d-flex justify-content-center align-items-center py-50">
                    <h4>No Documents Found In Selected Folder</h4>
                  </div>
                )}
            </ul>
          </div>
        </div >
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
      getDocuments,
      readEmail,
      onSelectEmail,
      markAsStarEmail
    }
  )(DocumentListing)
);
