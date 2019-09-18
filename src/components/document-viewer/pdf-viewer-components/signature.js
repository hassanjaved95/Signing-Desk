import React from 'react';
import Brush from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/styles";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    signature: props => ({
        position: "absolute",
        fontSize: 15,
        backgroundColor: props.selectedSignStyle ? "antiquewhite" : "#c0d7fb",
        color: props.selectedSignStyle ? "lightgrey" : "#4286f4",
        display: "flex",
        width: 120,
        height: 50,
        border: "1px dotted #4286f4",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        opacity: "0.5",
        cursor: "move"
    }),
    noevents: {
        pointerEvents: 'none'
    },
    moreHoriIcon: {
        position: 'absolute',
        height: 22,
        width: 22,
        maxWidth: 22,
        padding: 0,
        fontSize: 11,
        fontFamily: 'Graphik, -apple - system, system - ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans - serif',
        lineHeight: 20,
        borderRadius: 2,
        background: '#fff',
        color: '#6d6f7a',
        transition: '.05s',
        userSelect: 'none',
        right: '-30px',
        top: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, .2), 0 0 30px rgba(0, 0, 0, .08)',
        '& :hover': {
            color: '#4286f4'
        }
    },
    rightArrow: {
        width: 0,
        height: 0,
        borderTop: '9px solid transparent',
        borderLeft: '18px solid #555',
        borderBottom: '9px solid transparent'
    },
    nameSection: {
        width: 'auto',
        height: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#555'
    },
    assigneeContainer: {
        display: 'flex',
        position: 'absolute',
        zIndex: 15,
        right: '100%',
        fontSize: 10,
        color: 'white',
        fontWeight: 700,
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        verticalAlign: 'bottom',
        cursor: 'help',
        borderRadius: 2,
    }
});

const Signature = (props) => {
    const { sign, signKey, selectedSign } = props;
    const classes = useStyles({ selectedSignStyle: signKey === selectedSign });

    return (
        <React.Fragment>
            <Draggable
                bounds='parent'
                onMouseDown={(ev) => {
                    props.setSelectedSign(signKey, ev);
                }}
            >
                <div
                    id={signKey}
                    className={`${classes.signature} signaturediv`}
                    style={{ top: sign.pageY, left: sign.pageX }}
                >

                    <div className={classes.assigneeContainer}>
                        <div className={classes.nameSection}>HG</div>
                        <div className={classes.rightArrow}></div>

                    </div>
                    <div className={classes.noevents}>
                        <Brush />
                    </div>
                    <div className={classes.noevents}>
                        SIGNATURE
                    </div>

                    <div
                        className={`${classes.moreHoriIcon}`}
                    >
                        <MoreHorizIcon style={{ position: 'absolute' }} onMouseDown={(e) => { props.setAnchorEl(e, e.currentTarget) }} />
                    </div>

                    <div>
                        <Menu anchorEl={props.anchorEl} open={Boolean(props.anchorEl)}>
                            <MenuItem onClick={() => { console.log('Duplicate Sign') }}> Duplicate </MenuItem>
                            <MenuItem onClick={() => { console.log('Delete Sign') }}> Delete </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Draggable>

        </React.Fragment>
    );
}

export default Signature;