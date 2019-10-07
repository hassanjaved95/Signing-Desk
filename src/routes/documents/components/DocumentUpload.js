/**
 * Form Dialog
 */
import React, { Component, useRef } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FileUpload, ArrowDropDown, Add, Description } from '@material-ui/icons';
import DropzoneComponent from 'react-dropzone-component';
import $ from 'jquery'
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { toBase64 } from "Helpers/helpers";
import { createDocument, getDocuments } from "Actions";




class DocumentUpload extends React.Component {
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
            postUrl: 'no-url'
        };

        this.ref = React.createRef();

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        // this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // // Simple callbacks work too, of course
        //  this.callback = () => {
        //     this.element.children[2].children[6].innerText = "X";
        //     return;
        //  }
        //console.log('Hello!');

        // this.success = file => console.log('uploaded', file);

        // this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    initialState = {
        FileName: '',
        FileDescription: ''

    };

    validationSchema = Yup.object().shape({
        FileName: Yup.string()
            .required('File Name is required')
    });



    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        // this.props.getDocuments();
    };

    onSaveDocuments = () => {
        document.getElementById("btnSubmit").click();
    }

    onSubmit = (values) => {
        var arr = [];
        var filesConvertedToBase64 = [];
        var folderID = this.props.selectedFolder.id;
        this.dropzone.files.forEach(function (item) {
            filesConvertedToBase64.push({
                'fileName': item.name,
                'storageMedia': 0,
                'base64PdfContents': ''
            })
            arr.push(toBase64(item))
        });
        Promise.all(arr).then(vals => {
            var doc = "";
            vals.forEach(function (val, idx) {
                filesConvertedToBase64[idx].base64PdfContents = val.replace("data:application/pdf;base64,", "");
            });

            var doc = {
                'folderID': folderID,
                'name': values.FileName,
                'description': values.FileDescription,
                'tags': "",
                'uploadedFiles': filesConvertedToBase64
            }
            this.props.createDocument(doc, this.handleClose);

        })



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

            <Formik
                initialValues={this.initialState}
                onSubmit={(values) => {
                    console.log('onFormikSubmit called:', values);
                    this.onSubmit(values);
                }
                }
            validate={(values) => { props.validateOnChange(values) }}
            validationSchema={this.validationSchema}
            >
                {(formikProps) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        } = formikProps;


                    return (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <button id="btnSubmit" type="submit" style={{ opacity: 0, display: 'none' }} >
                                    Submit
                                </button>
                                <div className="flex-row" onClick={this.handleClickOpen}> <FileUpload className="fileUploadIcon" /> Upload Document </div>
                                {/* <Button variant="contained" className="btn-info text-white btn-block" onClick={this.handleClickOpen}>Open form dialog</Button> */}
                                <Dialog maxWidth={'lg'} width={'900px'} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title" style={{ borderBottom: '0.5px solid #d5caca', paddingBottom: '2px' }}>Upload <span className="popupCloser" onClick={this.handleClose}> X </span> </DialogTitle>

                                    <DialogContent width={'900px'} height={'550px'}>
                                        <div className="dropzoneForm">
                                    
                                            <div className="flex-row">
                                                <div className="flex-split-2-left" style={{ width: '30%', marginRight: '10%' }}>
                                                   
                                                    <TextField
                                                        label="Document Name"
                                                        tabIndex="0"
                                                        name="FileName"
                                                        value={values.FileName}
                                                        className="dlg-txt-field dlg-txt-field-FileUpload"
                                                        style={{ width: '100%', fontSize: '3rem' }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.FileName && touched.FileName) && errors.FileName}
                                                        placeholder="Enter document name"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        autoFocus
                                                    />

                                                </div>
                                                <div className="flex-split-2-right" style={{ width: '60%' }}>
                                                    <TextField
                                                        label="Document Description"
                                                        name="FileDescription"
                                                        value={values.FileDescription}
                                                        className="dlg-txt-field dlg-txt-field-FileUpload"
                                                        style={{ width: '100%' }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.FileDescription && touched.FileDescription) && errors.FileDescription}
                                                        placeholder="Enter document description"
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
                                        <div className="file-upload-footer">

                                            <div style={{ flexGrow: 1 }}>
                                                {/* <Description className="DocumentIcon" style={{ float: 'right' }} /> */}
                                            </div>
                                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row-reverse' }}>
                                                <Button variant="contained" color="primary" onClick={this.onSaveDocuments} >
                                                    <FileUpload />
                                                    <span style={{ marginLeft: '5px' }}> UPLOAD </span>
                                                </Button>

                                                {/* <FileUpload onClick={this.onSaveDocuments} className="DocumentIcon fileSaveIcon" /> */}
                                            </div>

                                        </div>

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

                        </Form>
                    );
                }}
            </Formik >
        );
    }
}

const mapStateToProps = ({ documents }) => {
    console.log('documents store:', documents);
    return documents;
};
export default withRouter(
    connect(mapStateToProps,
        {
            getDocuments,
            createDocument
        }
    )(DocumentUpload)
);