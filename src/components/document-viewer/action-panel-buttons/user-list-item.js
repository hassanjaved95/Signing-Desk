import React from "react";
import { makeStyles } from "@material-ui/styles";
// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";

const useStyles = makeStyles({
    liStyles: {
        padding: "10px 0",
        position: "relative",
        listStyle: "none",
        cursor: "pointer",
        minHeight: "40px",
        "&:hover": {
            backgroundColor: "#EFEFEF",
            cursor: "pointer"
        }
    },
    rowContainer: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        width: "40px",
        height: "40px",
        fontSize: "16px",
        color: "white",
        backgroundColor: "#b3b4b9",
        letterSpacing: "1px",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "row",
        minWidth: "0px",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "15px"
    },
    colContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "185px",
        fontSize: "13px"
    },
    rightArrowIcon: {
        width: "30px"
    },
    order: {
        color: "#8d8d8d",
        paddingRight: "10px",
        fontSize: "13px"
    }
});

var _el;

function isBefore(el1, el2) {
    var cur;
    if (el2.parentNode === el1.parentNode) {
        for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === el2) return true
        }
    } else return false;
}

function dragOver(e) {
    console.log('dragOver:', e);
    if (isBefore(_el, e.target))
        e.target.parentNode.insertBefore(_el, e.target);
    else
        e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(user, e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", user.id);
    _el = e.target;
}

function dragEnd(e) {
    _el = null;
}

const UserListItem = (props) => {
    const { rowContainer, avatar, colContainer, rightArrowIcon, liStyles, order } = useStyles();
    const { user } = props;

    return (
        <li key={user.id}
            className={liStyles}
            onClick={props.onClickRecipient.bind(null, user)}
            onDragOver={dragOver}
            onDragStart={dragStart.bind(null, user)}
            onDragEnd={dragEnd}
            draggable={props.dragdropEnabled}>
            <div className={rowContainer}>
                {props.dragdropEnabled && <div className={order}> {props.index} </div>}
                <div className={avatar} style={{ background: getRandomColor(user.email) }}>
                    {getNameInitials(user.firstName + ' ' + user.lastName)}
                </div>
                <div className={colContainer}>
                    <div>{user.firstName + ' ' + user.lastName}</div>
                    <div style={{ color: "#8d8d8d" }}>{user.email}</div>
                </div>
                <div className={rightArrowIcon}>
                    {props.children}
                </div>
            </div>
        </li>
    )
}

export default UserListItem;