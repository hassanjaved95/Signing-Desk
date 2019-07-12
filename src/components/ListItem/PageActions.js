import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const PageActions = (props) => (
    <div className="page-actions-container">
        <div className="page-text">
            {props.selectedContacts > 0 && (props.selectedContacts == 1 ? "1 item is selected" : `${props.selectedContacts} items are selected`)}
            {props.selectedContacts == 0 && !props.search && (props.page || "")}
            {props.selectedContacts == 0 && props.search && (
                <div className="flex-row">
                    <div><i class="zmdi zmdi-search"></i></div>
                    <div> <TextField
                        type="search"
                        placeholder="Search"
                        margin="normal"
                        onChange={props.onChangeSearchValue}
                    /></div>
                </div>
            )}
        </div>
        <div className="action-button">
            <div className="actn-btn-container">
                {props.selectedContacts == 0 && !props.search && (
                    <React.Fragment>
                        <div>
                            <Button variant="contained" color="primary" onClick={props.onNewContact} >
                                <i class="zmdi zmdi-account-add"></i>
                                <span style={{ marginLeft: '5px' }}> NEW CONTACT </span>
                            </Button>
                        </div>
                        <div className="actn-search-container" >
                            <Button variant="contained" color="white" onClick={props.onClickSearch}>
                                <i class="zmdi zmdi-search"></i>
                            </Button>
                        </div>
                    </React.Fragment>
                )}
                {props.selectedContacts == 0 && props.search && (<div className="actn-search-container">
                    <Button variant="contained" color="white" onClick={props.onSearchClose}>
                        <i class="zmdi zmdi-close"></i>
                    </Button>
                </div>)
                }
                {props.selectedContacts > 0 && (
                    <div>
                        <Button variant="contained" color="secondary" onClick={props.onDeleteContacts} >
                            <i class="zmdi zmdi-delete"></i>
                            <span style={{ marginLeft: '5px' }}> DELETE </span>
                        </Button>
                    </div>
                )
                }
            </div>
        </div>
    </div>
);

export default PageActions;
