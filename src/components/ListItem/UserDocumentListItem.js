import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

const UserDocumentListItem = (props) => {
    const [showTag, setTagVisibility] = useState(false);

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
                            <div className="flex-row">
                                <div className="flex-auto-width-left">
                                    <div className="flex-column">
                                        <div>
                                            [CREATOR NAME]
                                    </div>
                                        <div>
                                            {props.document.created}
                                        </div>
                                    </div>
                                </div>

                                {showTag && props.selectedDocuments == 0 && <div className="documents-action-btn-right" style={{pointerEvents:'none'}}>
                                    <div className="flex-row flex-row-right flex-vertical-center">
                                        <i class="zmdi zmdi-more-vert" style={{ fontSize: '18px', pointerEvents: 'none' }}></i>
                                    </div>
                                </div>}
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </li>);
};

export default UserDocumentListItem;
