import React from "react";
import useStyles from "./action-button-css";
import { getGuid } from "Helpers/helpers";

const RecipientActions = (props) => {
    const classes = useStyles();
    console.log('fieldaction props:', props);
    return (
        <div className={classes.actionPanelContainer}>
            <h4>Recipient Actions</h4>
        </div>
    );
}

export default RecipientActions;