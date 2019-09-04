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
        fontSize: "12px",
        "&:hover": {
            backgroundColor: '#F1F1F1'
        }
    },
    selectedPanelItem: {
        backgroundColor: '#E2E2E2'
    },
    sendBtn: {
        backgroundColor: "#5D92F4",
        color: "#ffffff",
        height: "52px",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        opacity: "0.9",
        margin: "5px",
        paddingTop: "5px",
        "&:hover": {
            backgroundColor: "#5D92F4",
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
                    const selected = item.Text === props.actionType ? classes.selectedPanelItem : '';
                    return (
                        <div key={getGuid()} className={`${classes.navPanelItem} ${selected}`} onClick={props.onNavPanelItemClick.bind(null, item)}>
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