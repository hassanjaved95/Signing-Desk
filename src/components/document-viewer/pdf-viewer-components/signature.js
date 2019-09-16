import React, { Component } from 'react';
import Brush from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    signature: {
        position: "absolute",
        fontSize: 15,
        backgroundColor: "#c0d7fb",
        color: "#4286f4",
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
    },
    selectedSign: {
        backgroundColor: "antiquewhite",
        color: "lightgrey"
    },
    noevents: {
        pointerEvents: 'none'
    }
});

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var dragItem;

const dragStart = (e) => {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;


    if (e.target.classList.contains('signaturediv')) {
        active = true;
        dragItem = e.target;
    }
}

const dragEnd = (e) => {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

const setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

const drag = (e, pageBoundary) => {
    if (active) {
        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        // if (currentX > pageBoundary.right) {
        //     currentX = pageBoundary.right;
        // } else if (currentX < pageBoundary.left) {
        //     currentX = pageBoundary.left;
        // }

        // if (currentY > pageBoundary.bottom) {
        //     currentY = pageBoundary.bottom;
        // } else if (currentY < pageBoundary.top) {
        //     currentY = pageBoundary.top;
        // }


        console.log('currentX:', currentX);
        console.log('currentY:', currentY);
        console.log('pageBoundary:', pageBoundary);

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

const Signature = (props) => {
    const { sign, signKey, selectedSign, pageBoundary } = props;
    const classes = useStyles();

    return (
        <div
            key={signKey}
            onDragStart={dragStart}
            className={`${classes.signature} signaturediv ${signKey === selectedSign ? classes.selectedSign : ''}`}
            style={{ top: sign.pageY, left: sign.pageX }}
            onMouseUp={(ev) => {
                dragEnd(ev);
                props.setSelectedSign(signKey, ev);
            }}
            onMouseDown={(e) => dragStart(e)}
            onMouseMove={(e) => { drag(e, pageBoundary) }}
        >
            <div className={classes.noevents}> <Brush /> </div> <div className={classes.noevents}> SIGNATURE </div>
        </div>
    );
}

export default Signature;