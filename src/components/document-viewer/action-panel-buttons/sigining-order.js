import React from "react";
import Dehaze from "@material-ui/icons/Dehaze";
import UserListItem from "./user-list-item";

const SigningOrder = (props) => {
    return (
        <div style={{ marginTop: "20px", padding: "10px 20px" }}>
            <ul>
                {
                    props.selectedUsers.map((user, index) => (
                        <UserListItem key={user.id} user={user} onClickRecipient={props.onClickRecipient} dragdropEnabled="true" index={index + 1}>
                            <Dehaze />
                        </UserListItem>
                    ))
                }
            </ul>
        </div>
    );
}

export default SigningOrder;