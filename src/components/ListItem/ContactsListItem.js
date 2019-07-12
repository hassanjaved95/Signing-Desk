import React from "react";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";

const ContactsListItem = (props) => (
    <li >
        <table className="row-container">
            <tbody>
                <tr >
                    <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onCheckSingleContact} /></td>
                    <td onClick={props.onClickContactItem}>
                        <div className="td-container">
                            <div className="bg-initials bg-initials-2 initials-margin" style={{ background: getRandomColor(props.contact.email) }}>
                                {getNameInitials(props.contact.name)}
                            </div>
                            <div className="name-company">
                                {props.contact.name}
                            </div>
                        </div>
                    </td>
                    <td onClick={props.onClickContactItem}>{props.contact.email}</td>
                </tr>
            </tbody>
        </table>
    </li>
);

export default ContactsListItem;
