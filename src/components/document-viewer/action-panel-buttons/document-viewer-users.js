import React from "react";
import Select from 'react-select';
import AddBox from "@material-ui/icons/AddBox";
import useStyles from "./action-button-css";



const DocumentViewerUsers = (props) => {
    const { rowContainer, half, flexLeft, flexRight } = useStyles();

    return (
        <React.Fragment>
            <div className={rowContainer}>
                <div className={`${half} ${flexLeft}`} style={{ fontSize: "12px" }}>USERS</div>
                <div className={`${half} ${flexRight}`}><AddBox style={{ color: "#5D92F4", fontSize: "17px", cursor: "pointer" }} /></div>
            </div>
            <div style={{ fontSize: "13px" }}>
                <Select options={props.users} value={''} placeholder="Name or Email" onChange={(user) => props.onSelectUser(user)} />
            </div>
        </React.Fragment>
    )
}

export default DocumentViewerUsers;