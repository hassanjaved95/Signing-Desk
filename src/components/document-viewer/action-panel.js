import React from "react";
import RecipientActions from "./action-panel-buttons/recipients-actions";
import FieldActions from "./action-panel-buttons/field-actions";
import WorkflowSettings from "./action-panel-buttons/workflow-settings";

const ActionPanel = (props) => {
    console.log('action panel props:', props);
    return (
        <React.Fragment>
            {props.actionType === "Fields" && <FieldActions {...props} />}
            {props.actionType === "Recipients" && <RecipientActions {...props} />}
            {props.actionType === "Settings" && <WorkflowSettings {...props} />}
        </React.Fragment>
    );
};

export default ActionPanel;