import React from "react";
import { CreateNewFolder, Edit, Folder, Delete } from '@material-ui/icons';


const createDocumentItem = (props, document) => (
    <li className="foldersList" key={document.id}>
        <div className="liContainer" data-item={document.id}>
            {props.inEditModeFolderList ?
                (<Edit className="listItemIconsLeft editicon" onClick={props.onCreateNewFolder} />) :
                (<Folder className="listItemIconsLeft hild-featured" />)
            }
            <div className="child-featured">{document.name}</div>
            {props.inEditModeFolderList && <Delete className="listItemIconsRight hild-featured" />}
        </div>
    </li>
)

const ContentMenu = (props) => (
    <React.Fragment>
        <div className="folderbar">
            {props.inEditModeFolderList ?
                (<div className="folder-bar-edit-button" onClick={props.onEditFolderList}> Done </div>) :
                (<Edit className="editicon" onClick={props.onEditFolderList} />)
            }
            <CreateNewFolder className="createnewfoldericon" onClick={props.onCreateNewFolder} />
        </div>
        <div className="menu-content">
            <ul className="foldersList">
                {props.documents.map(createDocumentItem.bind(this, props))}
            </ul>
        </div>
    </React.Fragment>

);

export default ContentMenu;