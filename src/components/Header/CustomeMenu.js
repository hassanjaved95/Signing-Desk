import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FileUpload, ArrowDropDown, Add } from '@material-ui/icons';
import ReactDOM from 'react-dom';
import DocumentUpload from 'Routes/documents/components/DocumentUpload';

var val = "";
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        marginTop: '5px;'
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        height: 10,

        //},
    },
}))(MenuItem);

// const StyledButton = withStyles({
//     root: {
//         backgroundColor: '#585f78',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height:30,
//         boxShadow: '0 3px 5px 2px rgba(88, 95, 120, 1)',
//     },
//     label: {
//         textTransform: 'capitalize',
//     },
// })(Button);

var state = {
    showDialog: false,
};
export default function CustomizedMenus(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);



    function handleClick(event) {
        setAnchorEl(event.currentTarget);
        state.showDialog = true;
    }

    function handleClose() {
        setAnchorEl(null);
    }


    function evaluatePathName() {
        var currentPathName = location.pathname.split("/")[location.pathname.split("/").length - 1];
        switch (currentPathName) {
            case 'dashboard':
                currentPathName = "NEW DOCUMENTS";
                break;
            case 'documents':
                currentPathName = "CREATE";
                break;
            default:
                currentPathName = "NEW DOCUMENTS";
                break
        }
        //currentPathName = currentPathName == "dashboard" ? "DOCUENTS" : currentPathName;
        return currentPathName;
    }

    function isDocument() {
        var currentPathName = location.pathname.split("/")[location.pathname.split("/").length - 1];
        return currentPathName == "dashboard" || currentPathName == "documents" ? true : false;
    }
    function isContacts() {
        var currentPathName = location.pathname.split("/")[location.pathname.split("/").length - 1];
        return currentPathName == "contacts" ? true : false;
    }

    //if (isDocument()) {
        return (

            <div>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    style={{ textTransform: 'uppercase' }}
                >
                    {evaluatePathName()} <ArrowDropDown />
                </Button>
                <StyledMenu className="headerMenuOpener"
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={handleClose}>

                        {/* <ListItemIcon>
                            <FileUpload />
                        </ListItemIcon> */}
                        {/* <ListItemText primary="Upload Document"  /> */}
                        <DocumentUpload open={state.showDialog} />
                    </StyledMenuItem>
                    {/*<StyledMenuItem>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </StyledMenuItem> */}
                </StyledMenu>
            </div>

        );

   // }
    // else if (isContacts()) {
    //     return (
    //         <div>
    //             <Button
    //                 aria-controls="customized-menu"
    //                 aria-haspopup="true"
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={handleClick}
    //                 style={{ textTransform: 'uppercase' }}
    //             >
    //                 {evaluatePathName()} <ArrowDropDown />
    //             </Button>
    //             <StyledMenu className="headerMenuOpener"
    //                 id="customized-menu"
    //                 anchorEl={anchorEl}
    //                 keepMounted
    //                 open={Boolean(anchorEl)}
    //                 onClose={handleClose}
    //             >
    //                 <StyledMenuItem>
    //                     <ListItemIcon>
    //                         <Add />
    //                     </ListItemIcon>
    //                     <ListItemText primary="Create" />
    //                 </StyledMenuItem>
    //                 {/* <StyledMenuItem>
    //           <ListItemIcon>
    //             <DraftsIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Drafts" />
    //         </StyledMenuItem>
    //         <StyledMenuItem>
    //           <ListItemIcon>
    //             <InboxIcon />
    //           </ListItemIcon>
    //           <ListItemText primary="Inbox" />
    //         </StyledMenuItem> */}
    //             </StyledMenu>
    //         </div>

    //     );

    // }
    // else {
    //     return (
    //         <div></div>
    //     );
    // }


}

