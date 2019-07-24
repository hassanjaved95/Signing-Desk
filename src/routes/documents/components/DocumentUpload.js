/**
 * Form Dialog
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FileUpload, ArrowDropDown, Add, Description } from '@material-ui/icons';
import DropzoneComponent from 'react-dropzone-component';
import $ from 'jquery';

import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const initialState = {
    FileName: '',
    FileDescription: ''

};

const validationSchema = Yup.object().shape({
    FileName: Yup.string()
        .required('File Name is required')
});


export default class DocumentUpload extends React.Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "application/pdf"
        };

        this.componentConfig = {
            iconFiletypes: ['.pdf'],
            showFiletypeIcon: true,
            postUrl: '/'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        // this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // // Simple callbacks work too, of course
        // this.callback = () => console.log('Hello!');

        // this.success = file => console.log('uploaded', file);

        // this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        $(".headerMenuOpener").last().find("ul").css("padding", "2px 0px 2px 0px");

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }

        return (

            < Formik
                initialValues={initialState}
                onSubmit={(values, actions) => {
                    props.onSubmit(values, actions);
                }
                }
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
                        <form ref="" action="#">


                            <div>
                                <div onClick={this.handleClickOpen}> <FileUpload className="fileUploadIcon" /> Upload Document </div>
                                {/* <Button variant="contained" className="btn-info text-white btn-block" onClick={this.handleClickOpen}>Open form dialog</Button> */}
                                <Dialog maxWidth={'lg'} width={'900px'} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title" style={{ borderBottom: '0.5px solid #d5caca', paddingBottom: '2px' }}>Upload <span className="popupCloser" onClick={this.handleClose}> X </span> </DialogTitle>

                                    <DialogContent width={'900px'} height={'550px'}>
                                        <div className="dropzoneForm">

                                            <div className="flex-row">
                                                <div className="flex-split-2-left" style={{ width: '30%', marginRight: '10%' }}>
                                                    <TextField
                                                        label="File Name"
                                                        name="fileName"
                                                        value={values.FileName}
                                                        className="small-dlg-txt-field"
                                                        style={{ width: '100%', border: '1px solid #e2e2e2', borderRadius: '3px' }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.FileName && touched.FileName) && errors.FileName}
                                                        placeholder="Enter File Name"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />

                                                </div>
                                                <div className="flex-split-2-right" style={{ width: '60%' }}>
                                                    <TextField
                                                        label="File Description"
                                                        name="fileDescription"
                                                        value={values.FileDescription}
                                                        className="small-dlg-txt-field"
                                                        style={{ width: '100%', border: '1px solid #e2e2e2', borderRadius: '3px' }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.FileDescription && touched.FileDescription) && errors.FileDescription}
                                                        placeholder="Enter file description"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>
                                            </div>


                                        </div>
                                        <div className="dropZoner">
                                            <DropzoneComponent
                                                config={config}
                                                eventHandlers={eventHandlers}
                                                djsConfig={djsConfig}
                                                className="dropZonee"

                                            />
                                            <div className="footerNote">You can only upload PDF documents, content would'nt be editable</div>
                                        </div>
                                        <div style={{ color: 'blue', marginTop: '15px', textAlign: 'center' }}><Description className="DocumentIcon" /><FileUpload className="DocumentIcon fileSaveIcon" /></div>

                                    </DialogContent>
                                    <DialogActions>
                                        {/* <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
            		</Button> */}
                                        {/* <Button variant="contained" onClick={this.handleClose} className="btn-info text-white">
                            Subscribe
            		</Button> */}
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </form>
                    );
                }}
            </Formik >
        );
    }
}
