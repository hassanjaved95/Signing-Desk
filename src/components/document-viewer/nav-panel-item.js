import React, { Component } from "react";


const NavPanelItem = (props) => {
    return (
        <React.Fragment>
            {props.item.Icon}
            <span>{props.item.Text}</span>
        </React.Fragment>
    );
}

export default NavPanelItem;