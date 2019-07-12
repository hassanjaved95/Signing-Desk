/**
 * Email Listing
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { readEmail, onSelectEmail, markAsStarEmail } from "Actions";
import DocumentListItem from "./DocumentListItem";
import IntlMessages from "Util/IntlMessages";
import { getDocuments } from "Actions";
import { CreateNewFolder, Edit } from '@material-ui/icons';

class DocumentListing extends Component {
  componentDidMount() {
    this.props.getDocuments();
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

      <div className="floder-bar-documents">
        <div className="item-a">
          <div className="folderbar">
            <Edit className="editicon" />
            <CreateNewFolder className="createnewfoldericon" />
          </div>
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
