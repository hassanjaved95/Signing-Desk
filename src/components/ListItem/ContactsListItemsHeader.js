import React from "react";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";
import { fieldToTextField } from "formik-material-ui";

const ContactsListItemHeader = (props) => (
    <li>
        <table className="header-row-container row-container">
            <tbody>
                <tr >
                    <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onSelectAll} /></td>
                    <td>
                        <div className="td-container show-inline" onClick={() => { props.sortContactsBy('name') }}>
                            <div className="split-td split-content-left">
                                Name
                            </div>
                            <div className="split-td split-content-right sort-icon" >
                                {props.sortBy.nameAsc && <i className="zmdi zmdi-caret-up"></i>}
                                {props.sortBy.nameAsc == false && <i className="zmdi zmdi-caret-down"></i>}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="td-container show-inline" onClick={() => { props.sortContactsBy('email') }}>
                            <div className="split-td split-content-left">
                                Email
                            </div>
                            <div className="split-td split-content-right sort-icon">
                                {props.sortBy.emailAsc && <i className="zmdi zmdi-caret-up"></i>}
                                {props.sortBy.emailAsc == false && <i className="zmdi zmdi-caret-down"></i>}
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </li >
);

export default ContactsListItemHeader;
