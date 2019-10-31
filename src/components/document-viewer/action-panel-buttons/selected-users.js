import React from "react";
import { makeStyles } from "@material-ui/styles";
import ChevronRight from "@material-ui/icons/ChevronRight";
import UserListItem from "./user-list-item";


const SelectedUsers = (props) => {
    return (
        <ul>
            {
                props.selectedUsers.map(user => (
                    <UserListItem key={user.id} user={user} showCertType={true} onClickRecipient={props.onClickRecipient}>
                        <ChevronRight />
                    </UserListItem>
                ))
            }
        </ul>
    );
}

export default SelectedUsers;