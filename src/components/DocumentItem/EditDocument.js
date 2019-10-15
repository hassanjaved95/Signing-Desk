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
import $ from 'jquery';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';




function EditDocument(props) {
    const { classes } = props;
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

    const initialState = {
       
        documentName: props.documentToEdit != undefined && props.documentToEdit != null ? props.documentToEdit.name : ""
    };
    // $(".small-dlg-txt-field").parent().css("border-bottom","0px !important");
    return (
        <Formik
            initialValues={initialState}
            onSubmit={(values) => {
                <RctSectionLoader />
                console.log('onsubmit Edit Document:', values);
                props.onSubmit(values);
            }}

            validationSchema={Yup.object().shape({
                documentName: Yup.string()
                    .required('Required')
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
                    <Form onSubmit={handleSubmit}>
                        <div className="flex-row">
                            <div className="flex-split-2-left clearElements" style={{ width: '75%' }}>
                                <TextField
                                    label=""
                                    name="documentName"
                                    value={values.documentName}
                                    className="small-dlg-txt-field"
                                    style={{ width: '100%', border: '1px solid #e2e2e2', borderRadius: '3px' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    placeholder=""
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="flex-split-2-right smallDialog-flex-split-2-right">
                                <div className="header-shadow">
                                    {/* <button id="btnSubmit"  type="submit"  lassName="btn-save-foldername" >
                                        Submit
                                </button> */}
                                    <input type="submit" className="btn-save-foldername" value="save" />
                                </div>
                            </div>
                        </div>

                    </Form>
                );
            }}
        </Formik>
    );
}

export default EditDocument;