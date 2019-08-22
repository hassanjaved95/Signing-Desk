import React, { Component } from "react";
import { makeStyles } from '@material-ui/styles';
import { getGuid } from "Helpers/helpers";
import NavPanelItem from "./nav-panel-item";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
    navPanelContainer: {
        display: "flex",
        flexDirection: "column",
    },
    navPanelItem: {
        height: "66px",
        cursor: "pointer",
        margin: 0,
        padding: 0,
        textAlign: "center",
        alignContent: "center",
        "&:hover": {
            backgroundColor: '#F1F1F1'
        }
    },
    sendBtn: {
        backgroundColor: "#007bff", 
        color: "#ffffff",
        height: "52px",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        opacity: 0.9,
        "&:hover": {
            backgroundColor: "#007bff", 
            opacity: 1,
        }
    },
    sendIcon: {
        transform: "rotate(-45deg) skew(20deg, 15deg)"
    },
    sendText: {
        margin: "-5px"
    }
});

const NavPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.navPanelContainer}>
            {
                props.navPanelItems.map(item => {
                    return (
                        <div key={getGuid()} className={classes.navPanelItem} onClick={props.onNavPanelItemClick.bind(null, item)}>
                            <NavPanelItem item={item} />
                        </div>
                    )
                })
            }

            <div className={`${classes.navPanelItem} ${classes.sendBtn}`} onClick={props.onClickSend}>
                <div> <SendIcon className={classes.sendIcon} /> </div>
                <div className={classes.sendText}> <span>Send</span></div>
            </div>
        </div>
    );
}

export default NavPanel;