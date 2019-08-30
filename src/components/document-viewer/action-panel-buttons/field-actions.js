import React from "react";
import { getGuid } from "Helpers/helpers";
import useStyles from "./action-button-css";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';


const FieldActions = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.actionPanelContainer}>
            <div className={classes.actionPanelHeader}>
                <div> Fields </div>
            </div>
            <div className={classes.actionPanelButtonContainer}>
                {
                    props.fieldActionItems.map(item => {
                        return (
                            <div key={getGuid()} className={`${classes.actionPanelButton} ${!item.Text ? classes.actionPanelEmptyBtn : ''}`}  >
                                <div className={classes.btnContentContainer}>
                                    <div className={`${classes.btnContent} ${classes.btnIcon}`}>{item.Icon || <HourglassEmptyIcon />}</div>
                                    <div className={`${classes.btnContent} ${classes.btnText}`}>{item.Text}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FieldActions;