import React from "react";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";
import { fieldToTextField } from "formik-material-ui";

const UserDocumentListItemHeader = (props) => (
    <li>
        <table className="header-row-container row-container">
            <tbody>
                <tr >
                    <td className="selectable"><Checkbox color="primary" checked={props.checked} onChange={props.onSelectAll} /></td>
                    <td>
                        Title
                    </td>
                    <td>
                        Status
                    </td>
                    <td>
                        Tags
                    </td>
                    <td>
                        Grand Total
                    </td>
                    <td>
                        Approvers / Recipients
                    </td>
                    <td>
                        Created
                    </td>
                </tr>
            </tbody>
        </table>
    </li >
);

export default UserDocumentListItemHeader;
