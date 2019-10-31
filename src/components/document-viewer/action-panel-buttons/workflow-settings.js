import React from "react";
import { getGuid } from "Helpers/helpers";
import useStyles from "./action-button-css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { makeStyles } from "@material-ui/styles";
import $ from 'jquery';
import moment from 'moment';

const DateLoaded = (date) =>{
   document.getElementById("expirtyDate").value = date;
}

const WorkflowSettings = (props) => {

    const classes = useStyles();
    const jsxStyle = makeStyles({
        saveBtn: {
            outline: "1px solid #5D92F4",
            marginTop: "10px",
            color: "#5D92F4",
            fontSize: "12px",
            height: "31px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
                color: "#ffffff",
                backgroundColor: "#5D92F4",
                cursor: "pointer"
            }
        }
    });
    const { saveBtn } = jsxStyle();
    
    return (

        <React.Fragment>
            <div className={classes.actionPanelContainer}>
                <div className={classes.actionPanelHeader}>
                    <div> Workflow Settings </div>
                </div>
                <div className={classes.actionPanelButtonContainer}>
                    <span> Expiry Date</span>
                    <Input
                        type="date"
                        name="date"
                        id="expirtyDate"
                        
                    />
                </div>
                <div className={classes.actionPanelButtonContainer}>
                    <div className={saveBtn}>
                        <div onClick={()=> {
                            props.onSavingSettings(document.getElementsByName("date")[0].value)}} > SAVE SETTINGS </div>
                    </div>
                </div>
            </div>
        </React.Fragment>



    );
}

export default WorkflowSettings;