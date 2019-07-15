import React, { useState } from 'react';
import { Folder, FolderOpen } from '@material-ui/icons';

const MoveToFolder = (props) => (
    <React.Fragment>
        <div className="menu-content">
            {props.folderItemsToMove}
        </div>
        <div className="flex-row move-folder-footer" style={{marginTop:'40px'}}>
            <div className="flex-split-2-left" style={{ width: '50%' }}>
                <span>Selected folder:  </span> &nbsp; <span style={{fontWeight:'bold'}}> {props.selectedFolderName} </span>
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