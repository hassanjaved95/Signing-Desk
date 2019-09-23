import React from "react";
import Cancel from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/styles";

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

const SignatureSettings = (props) => {
    const { signature } = this.props;
    const { container, header, text, icon, userDetail, deleteBtn } = useStyles();
    return (
        <div className={container}>
            <div className={header}>
                <div className={icon}> <ArrowBack onClick={props.closeSignatureSettings} /></div>
                <div className={text}>
                    <div> Signature Settings </div>
                </div>
            </div>
            <div className={userDetail}>
                {
                    signature.recipient &&
                    <UserListItem user={signature.recipient}>
                        <Cancel style={{ fontSize: "20px", cursor: 'pointer', color: 'red' }} onClick={props.removeRecipient} />
                    </UserListItem>
                }
                {
                    !signature.recipient &&
                    <div style={{ fontSize: "13px" }}>
                        <Select options={props.recipientsList} value={''} placeholder="Name or Email" onChange={(user) => props.onSelectRecipient(user)} />
                    </div>
                }
            </div>
            <div className={deleteBtn}>
                <div onClick={props.deleteSignature}> DELETE FIELD </div>
            </div>
        </div>

    );
}

export default SignatureSettings;