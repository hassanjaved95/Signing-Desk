import React from "react";
import { makeStyles } from "@material-ui/styles";
// helpers functions
import { getNameInitials, getRandomColor } from "Helpers/helpers";

const useStyles = makeStyles({
    liStyles: {
        paddingBottom: "10px",
        position: "relative",
        listStyle: "none",
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
    }
});

const UserListItem = (props) => {
    const { rowContainer, avatar, colContainer, rightArrowIcon, liStyles } = useStyles();
    const { user } = props;

    return (
        <li key={user.id} className={liStyles} onClick={props.onClickRecipient.bind(null, user)}>
            <div className={rowContainer}>
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