import React, { Component } from 'react';
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DocumentViewerUsers from "./document-viewer-users";
import SelectedUsers from "./selected-users";
import EditingRecipient from "./editing-recipient";
import ContactSummary from "./contact-summary";

import Switch from 'react-toggle-switch';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderColor: "#E5E5E5",
    })
    
}

// const switchStyle ={
//     option: (provided, state) => ({
//         ...provided,
//         backgroundColor:'#5D92F4'
//     })
    
// }


function onChangeRecipient(val) {
    console.log(val);
}



const Recipients = (props) => {
    const [addContact, setAddContact] = React.useState(false);

    return (
        <div style={{ padding: "20px 20px 0" }}>
            
            <div style={{fontSize:'12px'}} >
            <Switch className="toggleUsers" onClick={props.onClickToggleUsers} on={props.isUsers} />
                <span>Company / Personal Users</span></div> <br/>
            {!props.editingContact &&
                <React.Fragment>
                    {addContact &&
                        <React.Fragment>
                            <ContactSummary editingContact={props.editingContact} onSubmitForm={props.onSubmitForm} onCloseContact={() => {
                                setAddContact(false);
                            }} />
                            <hr />
                        </React.Fragment>
                    }
                    {!props.isUsers &&
                        <React.Fragment>
                            <div style={{ fontSize: "12px" }}>COMPANY<span style={{ position: "absolute", fontSize: "10px", color: "red" }}>(*)</span></div>
                            <Select options={props.companies} value={props.selectedCompany} styles={customStyles} onChange={(obj) => { props.onSelectCompany(obj) }} />
                       <br/>
                        </React.Fragment>
                    }

                        <React.Fragment>
                            {props.selectedCompany &&

                                <DocumentViewerUsers users={props.users} isUsers={props.isUsers} onSelectUser={props.onSelectUser} addContact={addContact} setAddContact={() => {
                                    setAddContact(true);

                                }} />}
                        </React.Fragment>
                    <br />
                    {props.selectedUsers && props.currentUser && <SelectedUsers selectedUsers={props.selectedUsers} onClickRecipient={props.onClickRecipient} />}
                </React.Fragment>
            }

            {props.editingContact && <EditingRecipient editingContact={props.editingContact} clearEditing={props.clearEditing} onSubmitForm={props.onSubmitForm} deleteContact={props.deleteContact} setAddContact={() => {
                                    setAddContact(true);

                                }} />}
        </div>
    );
}

export default Recipients;