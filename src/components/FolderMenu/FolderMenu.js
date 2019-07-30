import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDocuments, updateDocument } from "Actions";

import { Treebeard, decorators } from 'react-treebeard';
import { CreateNewFolder, Edit, Folder, Delete, FolderOpen } from '@material-ui/icons';


const deco = {
  Loading: (props) => {
    return (
      <div style={props.style}>
        loading...
          </div>
    );
  },
  // Toggle: (props) => {
  //     return (
  //         <div style={props.style}>
  //             <svg height={'20px'} width={props.width}>
  //                 // Vector Toggle Here
  //             </svg>
  //         </div>
  //     );
  // },
  Header: (props) => {
    return (
      <div style={props.style}>
        {props.node.name}
      </div>
    );
  },
  Container: (props) => {
    return (
      <div data-id={props.node.id} className={props.node.toggled ? "treebeard-node treebeard-node-active" : "treebeard-node"} style={{ cursor: 'pointer' }} onClick={props.onClick}>
        {props.node.toggled ? <FolderOpen /> : <Folder />}
        {props.node.name}
      </div>
    );
  }
};

class FolderMenu extends PureComponent {

  constructor(props) {
    super(props);

    props.data[0].toggled = true;
    this.state = {
      data: props.data[0],
      currentFolderName: props.currentFolderName
    };
    this.onToggle = this.onToggle.bind(this);
    this.currentFolderID = props.currentFolderID;

  }

  clickedFolderId = this.props.data[0].id;

  //: props.data
  onToggle(node, toggled) {
    const { cursor, data } = this.state;
    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
    }
    node.active = true;
    //node.className = 'Node NodeActive'
    this.clickedFolderId = node.id;
    if (node.children) {
      node.toggled = toggled;
    }
    // if(node.id == this.currentFolderID){
    //   node.name = node.name + " (current folder)";
    // }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data), currentFolderName: node.name, clickedFolderId: node.id }));
  }

  render() {
    const { data } = this.state;
    return (

      <React.Fragment>
        <div className="content">
          <Treebeard
            data={data}
            onToggle={this.onToggle}
            className="tree"
            decorators={deco}

          />
        </div>
        <div className="flex-row move-folder-footer" style={{ marginTop: '40px' }}>
          <div className="flex-split-2-left" style={{ width: '50%' }}>
            <span>Selected folder:  </span> &nbsp; <span style={{ fontWeight: 'bold' }}> {this.state.currentFolderName} </span>
          </div>
          <div className="flex-split-2-right" style={{ width: '50%' }}>
            <div className="header-shadow">
              <input type="button" className="btn-save-foldername" value="move" onClick={() => {this.props.onSelectNewFolder(this, this.clickedFolderId)}}  />
            </div>
          </div>
        </div>
      </React.Fragment>




    );
  }
}

const mapStateToProps = ({ documents }) => {
  console.log('documents store:', documents);
  return documents;
};

export default withRouter(
  connect(mapStateToProps,
    {
      getDocuments,
      updateDocument,
    }
  )(FolderMenu)
);