import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const SmallDialogTemplate = (props) => {
    var fullWidth = false;
    return (
            <div>
            <Dialog className="flex-container-smalldialog" fullWidth={fullWidth} onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <MuiDialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    <div className="flex-row flex-row-center dlg-header-styles">
                        <div className="flex-split-2-left small-dlg-header-font">
                            {props.title}
                        </div>
                        <div className="flex-split-2-right">
                            <Button onClick={props.onClose}>
                                <i className="zmdi zmdi-close" onClick={props.onClose} style={{ fontSize: '24px' }}></i>
                            </Button>
                        </div>
                    </div>

                </MuiDialogTitle>
                <MuiDialogContent dividers="true" style={{padding: '10px', width:'482px',maxHeight:'calc(100vh - 1rem)'}}>
                    {props.children}
                </MuiDialogContent>
                {/* <MuiDialogActions>
                    <div className="flex-row" style={{ height: '36px', width: '100%' }}>
                        <div className="flex-split-2-left">
                            <div className="header-shadow">
                                <Button onClick={props.onClose} color="default" style={{ borderRadius: '3px' }}>
                                    Close
                            </Button>
                            </div>
                        </div>

                        <div className="flex-split-2-right">
                            {props.buttons.save && (<div className="header-shadow">
                                <Button disabled={props.disabled} onClick={props.buttons.save.onSave} color="primary"
                                    style={{ backgroundColor: '#5D92F4', color: '#FAFAFA', borderRadius: '3px' }}>
                                    {props.buttons.save.text || "Save"}
                                </Button>
                            </div>)}


                        </div>
                    </div>
                </MuiDialogActions> */}
            </Dialog>
        </div>
    );
}

export default SmallDialogTemplate;
