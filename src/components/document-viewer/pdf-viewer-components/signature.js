import React from 'react';
import Brush from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/styles";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button";

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
        boxShadow: '0 2px 4px rgba(0, 0, 0, .2), 0 0 30px rgba(0, 0, 0, .08)',
        '& :hover': {
            color: '#4286f4'
        }
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
                    className={`${classes.signature} signaturediv`}
                    style={{ top: sign.pageY, left: sign.pageX }}
                >
                    <div className={classes.noevents}>
                        <Brush />
                    </div>
                    <div className={classes.noevents}>
                        SIGNATURE
                    </div>
                </div>
            </Draggable>
            <div
                className={`${classes.moreHoriIcon}`}
                style={{ top: sign.pageY, left: sign.pageX + 130 }}
            >
                <MoreHorizIcon style={{ position: 'absolute' }} />
            </div>
        </React.Fragment>
    );
}

export default Signature;