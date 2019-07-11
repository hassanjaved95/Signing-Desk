import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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



function NewContact(props) {
    const { classes } = props;
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

    // const useStyles = makeStyles(theme => ({
    //     container: {
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //     },
    //     textField: {
    //         marginLeft: theme.spacing(1),
    //         marginRight: theme.spacing(1),
    //         width: 200,
    //     },
    //     dense: {
    //         marginTop: 19,
    //     },
    //     menu: {
    //         width: 200,
    //     },
    // }));

    // const classes = useStyles();

    const initialState = {
        fName: '',
        lName: '',
        email: '',
        phNumber: '',
        company: '',
        jobTitle: '',
        notes: '',
        streetAdd: '',
        city: '',
        postalCode: '',
        country: '',
        state: ''
    };

    return (
        <Formik
            initialValues={initialState}
            onSubmit={(values) => {
                props.onSubmit
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required('Required'),
                name: Yup.string()
                    .required('Required'),
                comment: Yup.string()
                    .required('Required'),
            })}
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex-row">
                            <div className="flex-split-2-left">
                                <TextField
                                    label="FIRST NAME"
                                    name="fName"
                                    value={values.fName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
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
                                    name="lName"
                                    value={values.lName}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.lName && touched.lName) && errors.lName}
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
                                    name="phNumber"
                                    value={values.phNumber}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.phNumber && touched.phNumber) && errors.phNumber}
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
                                label="NOTES"
                                name="notes"
                                value={values.notes}
                                className="dlg-txt-field"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.notes && touched.notes) && errors.notes}
                                placeholder="Enter a any notes"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="dlg-new-contact-address" onClick={props.showAddress()}>
                            <div className="flex-row flex-row-center">
                                Address {props.showAddress && <i class="zmdi zmdi-caret-down" style={{fontSize: '24px', marginLeft: '10px'}}></i>}
                                {!props.showAddress && <i class="zmdi zmdi-caret-up" style={{fontSize: '24px', marginLeft: '10px'}}></i>}
                            </div>
                        </div>

                        <div className="flex-row">
                            <TextField
                                label="STREET ADDRESS"
                                name="streetAdd"
                                value={values.streetAdd}
                                className="dlg-txt-field"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.streetAdd && touched.streetAdd) && errors.streetAdd}
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
                                    name="state"
                                    value={values.state}
                                    className="dlg-txt-field"
                                    style={{ width: '95%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.state && touched.state) && errors.state}
                                    placeholder="Enter a state or region"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>

                    </form>
                );
            }}
        </Formik>
    );
}

export default NewContact;