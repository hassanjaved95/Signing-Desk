import React from "react";
import { makeStyles } from "@material-ui/styles";
import Edit from "@material-ui/icons/Edit";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import UserListItem from "./user-list-item";
import ContactSummary from "./contact-summary";




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
        borderBottom: "1px solid #E5E5E5",
        "& li": {
            padding: "0"
        }
    },
    deleteBtn: {
        outline: "1px solid #d9534f",
        marginTop: "10px",
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
    const [addContact, setAddContact] = React.useState(true);
    return (
        <div className={container}>
            {
                props.editingContact && props.editingContact.id && addContact &&
                <ContactSummary initialState={props.editingContact} onSubmitForm={props.onSubmitForm}  onCloseContact={() => {
                    setAddContact(false);
                }} />
            }
            <div className={header}>
                <div className={icon}> <ArrowBack onClick={props.clearEditing} /></div>
                <div className={text}>
                    <div> Recipient details </div>
                </div>
            </div>
            <div className={userDetail}>
                <UserListItem user={props.editingContact} onClickRecipient={() => console.log('send edit user request from this point')}>
                    <Edit  style={{ fontSize: "20px" }} />
                </UserListItem>
            </div>
            <div className={deleteBtn}>
                <div onClick={props.deleteContact}> DELETE THIS RECIPIENT </div>
            </div>
        </div>
    );
}

export default EditingRecipient;