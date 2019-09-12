import React, { Component } from 'react';
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DocumentViewerUsers from "./document-viewer-users";
import SelectedUsers from "./selected-users";
import EditingRecipient from "./editing-recipient";
import ContactSummary from "./contact-summary";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderColor: "#E5E5E5",
    })
    
}



function onChangeRecipient(val) {
    console.log(val);
}



const Recipients = (props) => {
    const [addContact, setAddContact] = React.useState(false);

    return (
        <div style={{ padding: "20px 20px 0" }}>
            <div style={{cursor:'pointer'}} onClick={props.onClickToggleUsers}>Toggle Users</div> <br/>
            {!props.editingContact &&
                <React.Fragment>
                    {addContact &&
                        <React.Fragment>
                            <ContactSummary onCloseContact={() => {
                                setAddContact(false);
                            }} />
                            <hr />
                        </React.Fragment>
                    }
                    {!props.isUsers &&
                        <React.Fragment>
                            <div style={{ fontSize: "12px" }}>COMPANY<span style={{ position: "absolute", fontSize: "10px", color: "red" }}>(*)</span></div>
                            <Select options={props.companies} value={props.selectedCompany} styles={customStyles} onChange={(obj) => { props.onSelectCompany(obj) }} />
                        </React.Fragment>
                    }

                    
                    {
                        props.isUsers &&
                        <React.Fragment>
                            {props.selectedCompany &&

                                <DocumentViewerUsers users={props.users} onSelectUser={props.onSelectUser} addContact={addContact} setAddContact={() => {
                                    setAddContact(true);

                                }} />}
                        </React.Fragment>

                    }

                    <br />
                    {props.selectedUsers && <SelectedUsers selectedUsers={props.selectedUsers} onClickRecipient={props.onClickRecipient} />}
                </React.Fragment>
            }

            {props.editingContact && <EditingRecipient editingContact={props.editingContact} clearEditing={props.clearEditing} />}
        </div>
    );
}

export default Recipients;