import React from "react";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";
import { fieldToTextField } from "formik-material-ui";

const ContactsListItemHeader = (props) => (
    <li onClick={props.onClickContact}>
        <table className="row-container">
            <tbody>
                <tr >
                    <td className="selectable"><Checkbox color="primary" /></td>
                    <td>
                    <div className="td-container show-inline">
                            <div className="split-td split-content-left">
                                Name
                            </div>
                            {/* <div className="split-td split-content-right">
                                <i class="zmdi zmdi-caret-down"></i>
                            </div> */}
                        </div>
                    </td>
                    <td>
                        <div className="td-container show-inline">
                            <div className="split-td split-content-left">
                                Email
                            </div>
                            <div className="split-td split-content-right sort-icon">
                                <i class="zmdi zmdi-caret-down"></i>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </li >
);

export default ContactsListItemHeader;
