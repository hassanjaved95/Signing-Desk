import React from "react";
import { getGuid } from "Helpers/helpers";
import useStyles from "./action-button-css";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SignatureSettings from "./signature-settings";

const dragStart = (item, ev) => {
    console.log('dragstart:', ev.target);
    ev.dataTransfer.setData("text/plain", item.Text);
    ev.dataTransfer.dropEffect = "move";
}

const FieldActions = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {
                !props.selectedSign &&
                <div className={classes.actionPanelContainer}>
                    <div className={classes.actionPanelHeader}>
                        <div> Fields </div>
                    </div>
                    <div className={classes.actionPanelButtonContainer}>
                        {
                            props.fieldActionItems.map(item => {
                                return (
                                    <div key={getGuid()} draggable={item.Disabled ? "false" : "true"} disabled={item.Disabled} onDragStart={dragStart.bind(null, item)} className={`${classes.actionPanelButton} ${!item.Text ? classes.actionPanelEmptyBtn : ''} ${item.Disabled ? classes.actionPanelBtnDisabled : ''}`}  >
                                        <div className={classes.btnContentContainer}>
                                            <div className={`${classes.btnContent} ${classes.btnIcon}`}>{item.Icon}</div>
                                            <div className={`${classes.btnContent} ${classes.btnText}`}>{item.Text}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            }
            {
                props.selectedSign &&
                <SignatureSettings
                    closeSignatureSettings={props.closeSignatureSettings}
                    signature={props.selectedSign}
                    removeRecipient={props.removeRecipient}
                    recipientsList={props.selectedUsers}
                    onSelectRecipient={props.onSelectRecipient}
                    deleteSignature={props.deleteSignature}
                />
            }
        </React.Fragment>
    );
}

export default FieldActions;