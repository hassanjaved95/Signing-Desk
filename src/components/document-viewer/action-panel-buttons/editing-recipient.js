import React from "react";
import { makeStyles } from "@material-ui/styles";
import Edit from "@material-ui/icons/Edit";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import UserListItem from "./user-list-item";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column"
    },
    header: {
        display: "flex",
        borderBottom: "1px solid #E5E5E5"
    },
    text: {
        flexGrow: "3",
        fontSize: "15px",
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        flexGrow: "1"
    },
    userDetail: {
        padding: "20px 0",
        borderBottom: "1px solid #E5E5E5"
    },
    deleteBtn: {
        outline: "1px solid #d9534f",
        color: "#d9534f",
        fontSize: "12px",
        height: "31px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            color: "#ffffff",
            backgroundColor: "#d9534f",
            cursor: "pointer"
        }
    }
});

const EditingRecipient = (props) => {
    const { container, header, text, icon, userDetail, deleteBtn } = useStyles();

    return (
        <div className={container}>

            <div className={header}>
                <div className={icon}> <ArrowBack /></div>
                <div className={text}>
                    <div> Recipient details </div>
                </div>
            </div>
            <div className={userDetail}>
                <UserListItem user={props.editingContact} onClickRecipient={() => console.log('send edit user request from this point')}>
                    <Edit onClick={() => console.log('edit clicked')} />
                </UserListItem>
            </div>
            <div className={deleteBtn}>
                <div> DELETE THIS RECIPIENT </div>
            </div>
        </div>
    );
}

export default EditingRecipient;