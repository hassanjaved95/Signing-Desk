import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { getGuid } from 'Helpers/helpers';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function MenuList(props) {

    function handleClick(item) {
        props.setAnchor();
        item.handleClick();
    }

    function getStyledMenuItem(item) {
        return (
            <StyledMenuItem key={getGuid().replace('-','')} onClick={handleClick.bind(null, item)}>
                {item.icon && <ListItemIcon>
                    {item.icon}
                </ListItemIcon>}
                <ListItemText primary={item.text} />
            </StyledMenuItem>
        )
    }

    return (
        <div>
            <StyledMenu
                id="customized-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
            >
                {props.items.map((item) => {
                    getStyledMenuItem(item)
                })
                }
            </StyledMenu>
        </div>
    );
}
