import React, { useState } from 'react';
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

    const initialState = {
        FirstName: '',
        LastName: '',
        email: '',
        PhoneNumber: '',
        Company: '',
        jobTitle: '',
        Notes: '',
        StreetAddress: '',
        City: '',
        PostalCode: '',
        country: '',
        StateOrRegion: '',
        CertEmail: '',
        CertPassword: '',
        CertAlias: '',
        CertFriendlyName: '',
        CertPEM: ''
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
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = formikProps;
                return (

                    <form ref={ref} action="#">
                        <div className="flex-row">
                            <div className="flex-split-2-left">
                                <TextField
                                    label="FIRST NAME"
                                    name="FirstName"
                                    value={values.FirstName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.FirstName && touched.FirstName) && errors.FirstName}
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
                                    name="LastName"
                                    value={values.LastName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.LastName && touched.LastName) && errors.LastName}
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
                                    name="PhoneNumber"
                                    value={values.PhoneNumber}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.PhoneNumber && touched.PhoneNumber) && errors.PhoneNumber}
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
                                    label="COMPANY"
                                    name="Company"
                                    value={values.Company}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.Company && touched.Company) && errors.Company}
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
                                label="NOTES"
                                name="Notes"
                                value={values.Notes}
                                className="dlg-txt-field"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.Notes && touched.Notes) && errors.Notes}
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
                                        name="StreetAddress"
                                        value={values.StreetAddress}
                                        className="dlg-txt-field"
                                        style={{ width: '100%' }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.StreetAddress && touched.StreetAddress) && errors.StreetAddress}
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
                                            label="CITY"
                                            name="City"
                                            value={values.City}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.City && touched.City) && errors.City}
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
                                            name="PostalCode"
                                            value={values.PostalCode}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.PostalCode && touched.PostalCode) && errors.PostalCode}
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
                                            name="StateOrRegion"
                                            value={values.StateOrRegion}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.StateOrRegion && touched.StateOrRegion) && errors.StateOrRegion}
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
                                        name="CertPM"
                                        value={values.CertPM}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="flex-row">
                                    <div className="flex-split-2-left">
                                        <TextField
                                            label="CERTIFICATE EMAIL"
                                            name="CertEmail"
                                            value={values.CertEmail}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.CertEmail && touched.CertEmail) && errors.CertEmail}
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
                                            name="CertPassword"
                                            type="password"
                                            value={values.CertPassword}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.CertPassword && touched.CertPassword) && errors.CertPassword}
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
                                            name="CertAlias"
                                            value={values.CertAlias}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.CertAlias && touched.CertAlias) && errors.CertAlias}
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
                                            name="CertFriendlyName"
                                            value={values.CertFriendlyName}
                                            className="dlg-txt-field"
                                            style={{ width: '95%' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.CertFriendlyName && touched.CertFriendlyName) && errors.CertFriendlyName}
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

                    </form>
                );
            }}
        </Formik>
    );
}

const NewContact = React.forwardRef(fwdRefContact);
export default NewContact;