import React, { Component } from "react";
import Close from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';
import NewContact from "Components/ListItem/NewContact";
import Button from '@material-ui/core/Button';
import DialogTemplate from "Components/Dialogs/DialogTemplate";
import $ from "jquery";



import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';


const initialState = {
    firstName: '',
    lastName: '',
    email: ''
};



const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please provide a valid email")
        .required('Email is required')
});

class ContactSummary extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        const createContact = props.createContact;
        const updateContact = props.updateContact;
        this.state = {
            showDetailedContact: false,
            address: false,
            activateAddContactBtn: true
        }
    }

    toggleAddressFieldSet = () => {
        this.setState({
            address: !this.state.address
        });
    }

    onSubmitForm = (obj) => {
    }

    dlgButtons = {
        save: {
            onSave: () => {
                console.log('save new contact')
                console.log('onSaveDlg-Ref:', this.ref.current);
                $(this.ref.current).click();
            },
            text: "ADD CONTACT"
        }
    }

    render() {
        const receivedState = this.props.initialState || {};
        const mergedInitialState = { ...initialState, ...receivedState }
        return (
            <Formik
                initialValues={mergedInitialState}
                onSubmit={(values) => {
                    console.log('values:', values);
                    this.props.onSubmitForm(values);
                    this.props.setAddContact(false);
                }}
                validationSchema={validationSchema}
            >
                {({ values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} >
                            {
                                this.state.showDetailedContact && (<DialogTemplate
                                    title="New contact"
                                    open={this.state.showDetailedContact}
                                    onClose={() => { this.setState({ showDetailedContact: false }) }}
                                    buttons={this.dlgButtons}
                                >
                                    <NewContact
                                        toggleAddressFields={this.toggleAddressFieldSet}
                                        showAddressFields={this.state.address}
                                        onSubmit={this.props.onSubmitForm}
                                        initialState={values}
                                        ref={this.ref}
                                    />
                                </DialogTemplate>)
                            }
                            <div style={{ float: "right" }}>
                                <Button onClick={this.props.onCloseContact}>
                                    <Close />
                                </Button>

                            </div>
                            <div style={styels.fieldStyle}>
                                <TextField
                                    label="FIRST NAME"
                                    name="firstName"
                                    value={values.firstName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.firstName && touched.firstName) && errors.firstName}
                                    placeholder="Enter first name"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div style={styels.fieldStyle}>
                                <TextField
                                    label="LAST NAME"
                                    name="lastName"
                                    value={values.lastName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.lastName && touched.lastName) && errors.lastName}
                                    placeholder="Enter last name"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div style={styels.fieldStyle}>
                                <TextField
                                    error={errors.email && touched.email}
                                    label="EMAIL *"
                                    name="email"
                                    value={values.email}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.email && touched.email) && errors.email}
                                    placeholder="Enter email address"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <a onClick={() => { this.setState({ showDetailedContact: true }) }} style={styels.contactLink}>Show additional fields</a>
                            <div style={{ marginTop: 10 }}>
                                <Button style={styels.submitBtn} variant="contained" type="submit" color="primary">
                                    ADD
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

const styels = {
    fieldStyle: {
        flex: 1
    },
    submitBtn: {
        width: "100%",
        height: 31,
        borderRadius: 5
    },
    contactLink: {
        padding: "10px 0 0",
        marginBottom: "10px",
        display: "block",
        color: "#5D92F4",
        fontSize: 14
    }
}

export default ContactSummary;