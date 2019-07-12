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



function NewFolder(props) {
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
        folderName: ''
    };

    return (
        <Formik
            initialValues={initialState}
            onSubmit={(values) => {
                props.onSubmit
            }}

            validationSchema={Yup.object().shape({
                name: Yup.string()
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex-row">
                            <div className="flex-split-2-left">
                                <TextField
                                    label="Folder Name"
                                    name="folderName"
                                    value={values.folderName}
                                    className="dlg-txt-field"
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    placeholder="Enter folder name"
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

export default NewFolder;