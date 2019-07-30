import React from "react";
import { CreateNewFolder, Edit, Folder, Delete, ArrowBack } from '@material-ui/icons';


const createDocumentItem = (props, folder) => {
    return (<li className="foldersList" key={folder.id} onClick={props.onClickShowFolderDocuments.bind(this, folder)} style={{ cursor: 'pointer' }}>
        <div className="liContainer">
            {props.inEditModeFolderList ?
                (<Edit className="listItemIconsLeft editicon" onClick={(e) => { props.onCreateNewFolder(e, folder.id) }} />) :
                (<Folder className="listItemIconsLeft hild-featured" />)}
            <div className="child-featured">{folder.name}</div>
            {props.inEditModeFolderList && <Delete className="listItemIconsRight hild-featured" onClick={(e) => { props.onDeleteFolder(e, folder.id, folder.name) }} />}
        </div>
    </li>);
}

const ContentMenu = (props) => (
    <React.Fragment>

        <div className="folderbar">
            {props.folderLevel != 0 && (<div className="flex-split-2-left">
                <div className="flex-row cursor-pointer" onClick={props.onClickBack}>
                    <ArrowBack /> Back
                </div>
            </div>)}
            <div className="flex-split-2-right">
                {props.inEditModeFolderList ?
                    (<div className="folder-bar-edit-button" onClick={props.onEditFolderList}> Done </div>) :
                    (<Edit className="editicon" onClick={props.onEditFolderList} />)
                }
                <CreateNewFolder className="createnewfoldericon" onClick={(e) => { props.onCreateNewFolder(e, null) }} />
            </div>
        </div>
        <div className="menu-content">
            <ul className="foldersList">
                {
                    //props.selectedForlders && props.selectedForlders[0] &&
                    // props.selectedForlders.map(createDocumentItem.bind(this, props))

                    props.selectedForlder &&
                    props.selectedForlder.children &&
                    props.selectedForlder.children.length > 0 &&
                    props.selectedForlder.children.map(createDocumentItem.bind(this, props))
                }
            </ul>
        </div>
    </React.Fragment>

);

export default ContentMenu;