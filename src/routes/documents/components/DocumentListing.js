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
import { CreateNewFolder, Edit, Folder, Delete } from '@material-ui/icons';
import ContentMenu from 'Components/RctCRMLayout/ContentMenu';
import $ from 'jquery';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import SmallDialogTemplate from "Components/Dialogs/SmallDialogTemplate";
import NewFolder from 'Components/FolderItem/NewFolder';



class DocumentListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderListControl: true,
      folderCreationDialog: false,
      folderList: ['New Folder', 'New Folder 1', 'New Folder 2'],
      inEditModeFolderList: false
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
        <div className="liContainer">

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
        {/* {
          this.state.folderCreationDialog &&
          (<DialogTemplate
            title="New Folder"
            open={this.state.folderCreationDialog}
            buttons={this.dlgButtons}
            onClose={this.onCloseDlg}

          >
            <NewFolder />
          </DialogTemplate>)
        } */}
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
