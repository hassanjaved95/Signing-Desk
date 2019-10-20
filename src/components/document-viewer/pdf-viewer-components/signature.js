import React from 'react';
import Brush from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/styles";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getNameInitials, getRandomColor } from "Helpers/helpers";

const useStyles = makeStyles({
    signature: props => ({
        position: "absolute",
        fontSize: 15,
        backgroundColor: props.selectedSignStyle ? "antiquewhite" : "#c0d7fb",
        color: props.selectedSignStyle ? "lightgrey" : "#4286f4",
        display: "flex",
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
    rightArrow: props => ({
        width: 0,
        height: 0,
        borderTop: '9px solid transparent',
        borderLeft: `10px solid ${props.userNameColor}`,
        borderBottom: '9px solid transparent'
    }),
    nameSection: props => ({
        width: 'auto',
        height: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: props.userNameColor,
        padding: '0 5px',
        borderRadius: 2
    }),
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
        borderRadius: 2
    },
    menuStyle: {
        marginTop: 40,
        "& ul": {
            margin: 0,
            padding: 0,
        },
        "& li": {
            fontSize: 13
        }
    }
});

const Signature = (props) => {
    const { sign, signKey, selectedSign, pageBoundary } = props;
    const userName = sign.recipient ? (sign.recipient.firstName + ' ' + sign.recipient.lastName) : '';
    const userEmail = sign.recipient ? sign.recipient.email : '';
    const userNameColor = getRandomColor(userEmail);
    const classes = useStyles({ selectedSignStyle: sign == selectedSign, userNameColor });
    const shortName = sign.recipient ? getNameInitials(userName) : '';
    const fullName = sign.recipient ? userName : '';
    const [name, setName] = React.useState(shortName);
    const [width, setWidth] = React.useState(sign.width || 120);
    const [height, setHeight] = React.useState(sign.height || 50);
    const [anchorEl, setAnchorEl] = React.useState(null);


    console.log('sign == selectedSign:', selectedSign);

    function setUserName(n) {
        console.log('setUserName:', n);
        setName(n);
    }

    function getCurrentPosition(e) {
        const elementPos = e.target.getBoundingClientRect();
        const pageX = Math.abs(pageBoundary.left - elementPos.left);
        const pageY = Math.abs(pageBoundary.top - elementPos.top);

        return { pageX, pageY, width: elementPos.width, height: elementPos.height }
    }

    function onDragSignatureStop(e, d) {
        const elementPos = e.target.getBoundingClientRect();
        const pageX = Math.abs(pageBoundary.left - elementPos.left);
        const pageY = Math.abs(pageBoundary.top - elementPos.top);

        // sign.pageX = pageX;
        // sign.pageY = pageY;
    }


    return (
        <React.Fragment>
            <Draggable
                bounds='parent'
                onDrag={() => { setAnchorEl(null) }}
                onStop={onDragSignatureStop}
                onMouseDown={(ev) => {
                    props.setSelectedSign(sign, ev);
                }}
            >
                <div style={{ position: 'absolute', top: sign.pageY, left: sign.pageX }}>
                    <Resizable
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            const dim = ref.getBoundingClientRect();
                            sign.width = dim.width;
                            sign.height = dim.height;

                            setHeight(dim.height);
                            setWidth(dim.width);
                        }}
                        onResizeStart={(e) => {
                            // console.log('width at start', width);
                            // console.log('height at start', height);
                            e.stopPropagation();
                        }}
                        enable={{ top: false, right: false, bottom: false, left: false, topRight: false, bottomRight: true, bottomLeft: false, topLeft: false }}
                    >
                        <div
                            id={signKey}
                            className={`${classes.signature} signaturediv`}
                            style={{ width: '100%', height: '100%' }}
                            onMouseOver={() => {
                                setUserName(fullName)
                            }}
                            onMouseOut={() => {
                                setUserName(shortName)
                            }}
                        >
                            {
                                sign.recipient &&
                                <div className={classes.assigneeContainer}>
                                    <div className={classes.nameSection}>
                                        {name || shortName}
                                    </div>
                                    <div className={classes.rightArrow}></div>

                                </div>

                            }
                            <div className={classes.noevents}>
                                <Brush />
                            </div>
                            <div className={classes.noevents}>
                                SIGNATURE
                    </div>

                            <div
                                className={`${classes.moreHoriIcon}`}
                            >
                                <MoreHorizIcon style={{ position: 'absolute' }} onMouseDown={(e) => { setAnchorEl(e.currentTarget) }} />
                            </div>

                        </div>
                    </Resizable>
                </div>
            </Draggable>

            <div>
                <ClickAwayListener onMouseDown={() => { setAnchorEl(null) }}>
                    <Menu className={classes.menuStyle} anchorEl={anchorEl} open={Boolean(anchorEl) && sign == selectedSign}>
                        <MenuItem onClick={(e) => {
                            var elementPos = getCurrentPosition(e);
                            console.log('elementPos:', elementPos);
                            props.duplicateSelectedSign({ ...sign, pageY: (elementPos.pageY - (height * 0.5)) + 10, pageX: (elementPos.pageX - width) + 10 })
                        }}> Duplicate </MenuItem>
                        <MenuItem style={{ color: 'red' }} onClick={() => { props.deleteSelectedSign(sign) }}> Delete </MenuItem>
                    </Menu>
                </ClickAwayListener>
            </div>
        </React.Fragment>
    );
}

export default Signature;