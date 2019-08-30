import React from "react";
import RecipientActions from "./action-panel-buttons/recipients-actions";
import FieldActions from "./action-panel-buttons/field-actions";

const ActionPanel = (props) => {
    console.log('action panel props:', props);
    return (
        <React.Fragment>
            {props.actionType === "Fields" && <FieldActions {...props} />}
            {props.actionType === "Recipients" && <RecipientActions {...props} />}
        </React.Fragment>
    );
};

export default ActionPanel;