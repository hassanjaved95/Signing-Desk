import React from "react";
import { CreateNewFolder, Edit, Folder, Delete } from '@material-ui/icons';


const ContentMenu = (props) => (
    <React.Fragment>
        <div className="folderbar">
            {props.folderBarItems}
        </div>
        <div className="menu-content">
            {props.folderListItems}
        </div>
    </React.Fragment>

);

export default ContentMenu;