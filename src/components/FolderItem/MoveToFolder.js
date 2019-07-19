import React, { useState } from 'react';
import { Folder, FolderOpen } from '@material-ui/icons';


const unfoldSubFolders = (props, document) => (
    <li className={document.id === props.clickedMovedToFolderID ? 
    "MoveFolderListItem childListItem folderChildVisible ActivefoldersListMoveFolder" :
    "MoveFolderListItem childListItem folderChildVisible"}  data-id={document.id} onClick={props.MoveFolderItems.bind(this,document.name,document.id)}>
        <div className="liContainer">
            <Folder className="listItemIconsLeftt" />
            <div className="child-featured">{document.name}</div>
        </div>
    </li>
)


const MoveToFolder = (props) => (
    <React.Fragment>
        <div className="menu-content">
            <ul className="foldersListMoveFolder">
                <li data-id="0" className= {"0" === props.clickedMovedToFolderID ? "MoveFolderListItem parentListItem ActivefoldersListMoveFolder" : "MoveFolderListItem parentListItem"} onClick={props.MoveFolderItems.bind(this,"Documents","0")}>
                    <div className="liContainer">
                        {props.moveDocumentsListOpen ?
                            <FolderOpen className="listItemIconsLeftt" /> :
                            <Folder className="listItemIconsLeftt" />
                        }   Documents
              </div>
                </li>
                {props.documents.map(unfoldSubFolders.bind(this, props))}
            </ul>
        </div>
        <div className="flex-row move-folder-footer" style={{ marginTop: '40px' }}>
            <div className="flex-split-2-left" style={{ width: '50%' }}>
                <span>Selected folder:  </span> &nbsp; <span style={{ fontWeight: 'bold' }}> {props.selectedFolderName} </span>
            </div>
            <div className="flex-split-2-right" style={{ width: '50%' }}>
                <div className="header-shadow">
                    <input type="submit" className="btn-save-foldername" value="move" />
                </div>
            </div>
        </div>

    </React.Fragment>

);

export default MoveToFolder;