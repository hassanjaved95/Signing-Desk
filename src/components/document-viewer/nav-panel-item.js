import React, { Component } from "react";
import useStyles from "./action-panel-buttons/action-button-css";

const NavPanelItem = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.btnContentContainer}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={classes.btnContent}>
                    {props.item.Icon}
                </div>
                <div className={classes.btnContent}>
                    <div> {props.item.Text}</div>
                </div>
            </div>
        </div>
    );
}

export default NavPanelItem;