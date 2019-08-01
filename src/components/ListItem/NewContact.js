import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import RaisedButton from '@material-ui/core/RaisedButton';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';



function fwdRefContact(props, ref) {
    console.log('fwdRefContact-props:', props);
    console.log('fwdRefContact-ref:', ref);
    const { classes } = props;
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
    const [isAddressVisible, setAddressVisibility] = useState(false);
    const [isCertVisible, setCertVisibility] = useState(false);
    const certFileInput = useRef(null);

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
        notes: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: '',
        stateOrRegion: '',
        certEmail: '',
        certPassword: '',
        certAlias: '',
        certFriendlyName: '',
        certPEM: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please provide a valid email")
            .required('Email is required')
    });

    var validateEmail = () => {

    }

    return (
        <Formik
            initialValues={initialState}
            onSubmit={(values, actions) => {
                console.log('values', values);
                props.onSubmit(values, actions);
            }}

            validate={(values) => { props.validateOnChange(values) }}
            validationSchema={validationSchema}
        >
            {(formikProps) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                } = formikProps;
                return (

                    <Form onSubmit={handleSubmit}>
                        <div className="flex-row">
                            <div className="flex-split-2-left">
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
                            <div className="flex-split-2-right">
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
                        </div>

                        <div className="flex-row">
                            <div className="flex-split-2-left">
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
                            <div className="flex-split-2-right">
                                <TextField
                                    label="PHONE"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber}
                                    placeholder="Enter a phone number"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex-row">
                            <div className="flex-split-2-left">
                                <TextField
                                    label="company"
                                    name="company"
                                    value={values.company}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.company && touched.company) && errors.company}
                                    placeholder="Enter a company name"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="flex-split-2-right">
                                <TextField
                                    label="JOB TITLE"
                                    name="jobTitle"
                                    value={values.jobTitle}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.jobTitle && touched.jobTitle) && errors.jobTitle}
                                    placeholder="Enter a job title"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex-row">
                            <TextField
                                label="notes"
                                name="notes"
                                value={values.notes}
                                className="dlg-txt-field"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.notes && touched.notes) && errors.notes}
                                placeholder="Enter any notes"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="dlg-new-contact-address" onClick={() => { setAddressVisibility(!isAddressVisible) }}>
                            <div className="flex-row flex-row-center">
                                Address {isAddressVisible && <i className="zmdi zmdi-caret-up" style={{ fontSize: '24px', marginLeft: '10px' }}></i>}
                                {!isAddressVisible && <i className="zmdi zmdi-caret-down" style={{ fontSize: '24px', marginLeft: '10px' }}></i>}
                            </div>
                        </div>

                        {isAddressVisible && (
                            <React.Fragment>
                                <div className="flex-row">
                                    <TextField
                                        label="STREET ADDRESS"
                                        name="streetAddress"
                                        value={values.streetAddress}
                                        className="dlg-txt-field"
                                        style={{ width: '100%' }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.streetAddress && touched.streetAddress) && errors.streetAddress}
                                        placeholder="Street, apt, suite, bldg"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                <div className="flex-row">
                                    <div className="flex-split-2-left">
                                        <TextField
                                            label="city"
                                            name="city"
                                            value={values.city}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.city && touched.city) && errors.city}
                                            placeholder="Enter a city"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="flex-split-2-right">
                                        <TextField
                                            label="POSTAL CODE"
                                            name="postalCode"
                                            value={values.postalCode}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.postalCode && touched.postalCode) && errors.postalCode}
                                            placeholder="Enter a postal code"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-row">
                                    <div className="flex-split-2-left">
                                        <TextField
                                            label="COUNTRY"
                                            name="country"
                                            value={values.country}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.country && touched.country) && errors.country}
                                            placeholder="Enter a country"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="flex-split-2-right">
                                        <TextField
                                            label="STATE/REGION"
                                            name="stateOrRegion"
                                            value={values.stateOrRegion}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.stateOrRegion && touched.stateOrRegion) && errors.stateOrRegion}
                                            placeholder="Enter a state or region"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        )}

                        <div className="dlg-new-contact-address" onClick={() => { setCertVisibility(!isCertVisible) }}>
                            <div className="flex-row flex-row-center">
                                Certificate {isCertVisible && <i className="zmdi zmdi-caret-up" style={{ fontSize: '24px', marginLeft: '10px' }}></i>}
                                {!isCertVisible && <i className="zmdi zmdi-caret-down" style={{ fontSize: '24px', marginLeft: '10px' }}></i>}
                            </div>
                        </div>

                        {isCertVisible && (
                            <React.Fragment>
                                <div className="flex-row">
                                    <input
                                        accept=".cer"
                                        type="file"
                                        name="certPEM"
                                        ref={certFileInput}
                                        value={values.certPEM}
                                        onChange={(event) => { setFieldValue("file", event.currentTarget.files[0]) }}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="flex-row">
                                    <div className="flex-split-2-left">
                                        <TextField
                                            label="CERTIFICATE EMAIL"
                                            name="certEmail"
                                            value={values.certEmail}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.certEmail && touched.certEmail) && errors.certEmail}
                                            placeholder="Enter certificate email"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="flex-split-2-right">
                                        <TextField
                                            label="CERTIFICATE PASSWORD"
                                            name="certPassword"
                                            type="password"
                                            value={values.certPassword}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.certPassword && touched.certPassword) && errors.certPassword}
                                            placeholder="Enter certificate password"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-row">
                                    <div className="flex-split-2-left">
                                        <TextField
                                            label="CERTIFICATE ALIAS"
                                            name="certAlias"
                                            value={values.certAlias}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.certAlias && touched.certAlias) && errors.certAlias}
                                            placeholder="Enter certificate alias"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="flex-split-2-right">
                                        <TextField
                                            label="CERTIFICATE FRIENDLY NAME"
                                            name="certFriendlyName"
                                            value={values.certFriendlyName}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.certFriendlyName && touched.certFriendlyName) && errors.certFriendlyName}
                                            placeholder="Enter certificate friendly name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        )}

                        <button ref={ref} type="submit" style={{ opacity: 0 }}>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

const NewContact = React.forwardRef(fwdRefContact);
export default NewContact;