import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MenuList from "Components/MenuList/MenuList";
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import { getGuid } from "Helpers/helpers";
import {Search} from '@material-ui/icons';


const lodTags = (props, document, tag) => (
    <span key={getGuid()}>
        {tag}
    </span>
)

const UserDocumentListItem = (props) => {
    const [showTag, setTagVisibility] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    function onClickMoreVert(e) {
        setAnchorEl(e.currentTarget);
    }


    return (
        <li>
            <div className="flex-row"></div>
            <table className="row-container">
                <tbody>
                    <tr onMouseOver={() => { setTagVisibility(true) }} onMouseOut={() => { setTagVisibility(false) }}>
                        <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onCheckSingleDocument} /></td>
                        <td /* onClick={props.onClickDocumentItem} */>
                            {props.document.name}
                        </td>
                        <td /* onClick={props.onClickDocumentItem} */>
                            <i class="zmdi zmdi-circle" style={{ color: '#607d8b', fontSize: '10px', marginRight: '5px' }}></i>
                            {props.document.status}
                        </td>
                        <td   >
                            <div className="searchTagIcon" onClick={props.onClickTagIcon}
                                menuRelationKey={props.document.id}>
                                <span class="icon-M-1lY">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" class="Icon">
                                        <path fill-rule="evenodd" d="M19.976 11.421l-1.074-6.322-6.323-1.075a1.69 1.69 0 0 0-1.482.474l-6.599 6.61a1.694 1.694 0 0 0-.004 2.396l6.002 6.003c.66.66 1.735.656 2.397-.005l6.609-6.6c.403-.4.563-.96.474-1.481zM17 9.499a2.501 2.501 0 0 1-5 0 2.5 2.5 0 0 1 5 0z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                            <div className="flex-row tags-container">
                                {
                                    props.ShowSearchTags &&

                                    <div className="search-tag-ul" onMouseLeave={props.onCloseTagIcon}>
                                        <div className="tagsInput">
                                        <Search />   <input type="text" value="" />
                                        </div>
                                        <div className="ul">
                                            {props.document.tags.map(lodTags.bind(this, props, props.document))}
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* {showTag && !props.checked && <i class="zmdi zmdi-label" style={
                                    {
                                        transform: 'rotate(90deg)',
                                        fontSize: '18px',
                                        pointerEvents: 'none',
                                        marginLeft: '5px'
                                    }
                                }></i>} 
                                </div> */}
                        </td>
                        <td /* onClick={props.onClickDocumentItem} */>
                            {props.document.grandTotal}
                        </td>
                        <td /* onClick={props.onClickDocumentItem} */>
                            {props.document.approversRecipients}
                        </td>
                        <td /* onClick={props.onClickDocumentItem} */>
                            <div className="flex-column">
                                <div>
                                    [CREATOR NAME]
                                    </div>
                                <div>
                                    {props.document.created}
                                </div>
                            </div>
                        </td>
                        <td style={{ width: '40px' }}>
                            {showTag && props.selectedDocuments == 0 && <div className="documents-action-btn-right" >
                                {/* <MenuList anchorEl={anchorEl} setAnchor={() => { setAnchorEl(false) }} items={props.options} /> */}
                                <IconButton aria-label="MoreVert" onClick={onClickMoreVert}>
                                    <MoreVert />
                                </IconButton>

                            </div>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>);
};

export default UserDocumentListItem;
