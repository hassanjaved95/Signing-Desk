import React from "react";
import { CreateNewFolder, Edit, Folder,Delete } from '@material-ui/icons';


const ContentMenu = (props) => (
    <React.Fragment>
        <div className="folderbar">
            <Edit className="editicon" />
            <CreateNewFolder className="createnewfoldericon" onClick={props.onCreateNewFolder} />
        </div>
        <div className="menu-content">
            <ul className="foldersList">
                {props.folderListItems}
            </ul>
        </div>
    </React.Fragment>

);

export default ContentMenu;