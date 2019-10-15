import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MenuList from "Components/MenuList/MenuList";
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import { getGuid } from "Helpers/helpers";
import { Search } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { DocumentStatus } from "Constants/app-enums";

const loadAddTagButton = (props) => (
    <div className={props.writtenTags == "" ? "add-tag-button-Inactive" : "add-tag-button"}>
        <span className="btn-span" onClick={props.onAddTags}>+ Add Tag</span> <span className="text-span">{props.writtenTags}</span>
    </div>
)

const loadTagsInColumn = (props, document, tag) => (
    tag != "" &&
    <div className="flex-row">{tag}</div>
)

const loadTagsInput = (props) => (
    <div className="tagsInput">
        <Search />
        <TextField style={{ borderBottom: '0px' }}
            className="tag-text"
            placeholder="Add a Tag"
            onChange={props.onTagsInputChange}
            onClick={props.onTagInputClick}
        />
    </div>
)
const loadTags = (props, document, tag) => (
    tag != "" &&
    <span key={getGuid()}>
        {tag}
        <span className="remove-tag" tagval={tag} onClick={props.onRemoveTags}>X</span>
    </span>
)

const loadContextMenu = (props) => (
    <div className="row-context-menu-content">
        <ul>
            <li onClick={props.onEditDocument.bind(null, props.document)}>
                <div className="flex-row flex-vertical-center">
                    <div className="documents-inline-actions-icons"> <i className="zmdi zmdi-edit"></i></div>
                    <div style={{ marginLeft: '5px' }}>Edit</div>
                </div>
            </li>
            <li onClick={props.onSingleMoveDocument.bind(null, props.document)}>
                <div className="flex-row flex-vertical-center">
                    <div className="documents-inline-actions-icons"> <i className="zmdi zmdi-folder-star"></i></div>
                    <div>Move</div>
                </div>
            </li>
            {/* <li>
                <div className="flex-row flex-vertical-center">
                    <div className="flex-row-left"> <i className="zmdi zmdi-edit icon-size"></i></div>
                    <div style={{ marginLeft: '5px' }}>Rename</div>
                </div>
            </li> */}
            <li onClick={props.onDeleteDocument.bind(null, props.document)}>
                <div className="flex-row flex-vertical-center">
                    <div className="documents-inline-actions-icons">   <i className="zmdi zmdi-delete"></i></div>
                    <div>Delete</div>
                </div>
            </li>
        </ul>
    </div>
)


const UserDocumentListItem = (props) => {
    const [showTag, setTagVisibility] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // function onClickMoreVert(e) {
    //    // setAnchorEl(e.currentTarget);
    // }


    return (
        <li>
            <div className="flex-row"></div>
            <table className="row-container">
                <tbody>
                    <tr onMouseOver={() => { setTagVisibility(true) }} onMouseOut={() => { setTagVisibility(false) }}>
                        <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onCheckSingleDocument} /></td>
                        <td onClick={props.onClickDocumentItem} >
                            {props.document.name}
                        </td>
                        <td onClick={props.onClickDocumentItem} >
                            <i className="zmdi zmdi-circle" style={{ color: '#607d8b', fontSize: '10px', marginRight: '5px' }}></i>
                            {DocumentStatus[props.document.status]}
                        </td>
                        <td   >
                            <div className="searchTagIcon" onClick={props.onClickTagIcon}>

                                <div className="flex-row tags-in-colums">
                                    {props.arrTags && props.arrTags.length > 0 &&
                                        props.arrTags.map(loadTagsInColumn.bind(this, props, props.document))
                                    }
                                </div>

                                <div className="flex-row icon-M-1lY">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" className="Icon">
                                        <path style={{ fillRule: 'evenodd' }} d="M19.976 11.421l-1.074-6.322-6.323-1.075a1.69 1.69 0 0 0-1.482.474l-6.599 6.61a1.694 1.694 0 0 0-.004 2.396l6.002 6.003c.66.66 1.735.656 2.397-.005l6.609-6.6c.403-.4.563-.96.474-1.481zM17 9.499a2.501 2.501 0 0 1-5 0 2.5 2.5 0 0 1 5 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-row tags-container">
                                {
                                    props.ShowSearchTags &&

                                    <div className="search-tag-ul" onMouseLeave={props.onCloseTagIcon}>
                                        {loadTagsInput(props)}
                                        <div className="ul">
                                            {
                                                props.arrTags && props.arrTags.length > 0 &&
                                                props.arrTags.map(loadTags.bind(this, props, props.document))}
                                        </div>
                                        {
                                            loadAddTagButton(props)
                                        }

                                    </div>
                                }
                            </div>
                            {/* {showTag && !props.checked && <i className="zmdi zmdi-label" style={
                                    {
                                        transform: 'rotate(90deg)',
                                        fontSize: '18px',
                                        pointerEvents: 'none',
                                        marginLeft: '5px'
                                    }
                                }></i>} 
                                </div> */}
                        </td>
                        <td onClick={props.onClickDocumentItem}>
                            {props.document.description}
                        </td>
                        <td onClick={props.onClickDocumentItem}>
                            {props.document.approversRecipients}
                        </td>
                        <td onClick={props.onClickDocumentItem} >
                            <div className="flex-column">
                                <div>
                                    {props.document.createdBy}
                                </div>
                                <div>
                                    {props.document.createdOn}
                                </div>
                            </div>
                        </td>
                        <td style={{ width: '40px' }}>
                            {props.selectedDocuments == 0 &&
                                <div className="documents-action-btn-right" onClick={props.onClickMoreVert} >
                                    {/*  <MenuList anchorEl={anchorEl} setAnchor={() => { setAnchorEl(false) }} items={props.options} /> */}
                                    <IconButton aria-label="MoreVert" >
                                        <MoreVert />
                                    </IconButton>

                                </div>}
                            {
                                props.showRowContextMenu &&
                                <div className="row-context-menu" onMouseLeave={props.closeContextMenu}>
                                    {loadContextMenu(props)}
                                </div>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>);
};

export default UserDocumentListItem;
