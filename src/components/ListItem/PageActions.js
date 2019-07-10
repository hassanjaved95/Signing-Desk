import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";

const PageActions = (props) => (
    <div className="page-actions-container">
        <div className="page-text">
            {props.page || ""}
        </div>
        <div className="action-button">
            <div className="actn-btn-container">
                <div>
                    <Button variant="contained" color="primary" onClick={props.onNewContact} >
                        <i class="zmdi zmdi-account-add"></i>
                        <span style={{ marginLeft: '5px' }}> NEW CONTACT </span>
                    </Button>
                </div>
                <div className="actn-search-container">
                    <Button variant="contained" color="white" >
                        <i class="zmdi zmdi-search"></i>
                    </Button>
                </div>

            </div>
        </div>
    </div>
);

export default PageActions;
