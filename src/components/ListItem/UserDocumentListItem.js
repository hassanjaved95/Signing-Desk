import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MenuList from "Components/MenuList/MenuList";
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

const UserDocumentListItem = (props) => {
    const [showTag, setTagVisibility] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    function onClickMoreVert(e) {
        setAnchorEl(e.currentTarget);
    }


    return (
        <li>
            <table className="row-container">
                <tbody>
                    <tr  onMouseOver={() => { setTagVisibility(true) }} onMouseOut={() => { setTagVisibility(false) }}>
                        <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onCheckSingleDocument} /></td>
                        <td onClick={props.onClickDocumentItem}>
                            {props.document.name}
                        </td>
                        <td onClick={props.onClickDocumentItem}>
                            <i class="zmdi zmdi-circle" style={{ color: '#607d8b', fontSize: '10px', marginRight: '5px' }}></i>
                            {props.document.status}
                        </td>
                        <td onClick={props.onClickDocumentItem} >
                            <div className="flex-row tags-container">
                                {/* {props.document.tags &&
                                    props.document.tags.map((tag, index) => (
                                        < div className="tag-div" >
                                            <span key={'' + getGuid()} className="tag-span">
                                                {tag}
                                            </span>
                                        </div>
                                    ))} */}
                                {showTag && !props.checked && <i class="zmdi zmdi-label" style={
                                    {
                                        transform: 'rotate(90deg)',
                                        fontSize: '18px',
                                        pointerEvents: 'none',
                                        marginLeft: '5px'
                                    }
                                }></i>}
                            </div>
                        </td>
                        <td onClick={props.onClickDocumentItem}>
                            {props.document.grandTotal}
                        </td>
                        <td onClick={props.onClickDocumentItem}>
                            {props.document.approversRecipients}
                        </td>
                        <td onClick={props.onClickDocumentItem}>
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
