import React, { Component } from 'react';
import Brush from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/styles";

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
var dragItemBoundary;
var maxLeft, maxRight, maxTop, maxBottom;

const dragStart = (e, pageBoundary) => {
    if (e.target.classList.contains('signaturediv')) {
        active = true;
        dragItem = e.target;
        dragItemBoundary = e.target.getBoundingClientRect();

        maxLeft = pageBoundary.left - dragItemBoundary.left;
        maxRight = pageBoundary.right - dragItemBoundary.right;
        maxTop = pageBoundary.top - dragItemBoundary.top;
        maxBottom = pageBoundary.bottom - dragItemBoundary.bottom;

        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        console.log('dragItemBoundary:', dragItemBoundary);
        console.log('pageBoundary:', pageBoundary);

        console.log('maxLeft:', maxLeft);
        console.log('maxRight:', maxRight);
        console.log('maxTop:', maxTop);
        console.log('maxBottom:', maxBottom);

        console.log('initialX:', initialX);
        console.log('initialY:', initialY);
    }
}

const dragEnd = (e) => {
    initialX = currentX;
    initialY = currentY;

    dragItemBoundary = e.target.getBoundingClientRect();
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



        if (currentX > maxRight) {
            currentX = maxRight;
        } else if (currentX < maxLeft) {
            currentX = maxLeft;
        }

        if (currentY > maxBottom) {
            currentY = maxBottom;
        } else if (currentY < maxTop) {
            currentY = maxTop;
        }


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
    const classes = useStyles({ selectedSignStyle: signKey === selectedSign });

    return (
        <div
            onDragStart={dragStart}
            className={`${classes.signature} signaturediv`}
            style={{ top: sign.pageY, left: sign.pageX }}
            onMouseUp={(ev) => {
                dragEnd(ev);
                sign.pageX = dragItemBoundary.left - pageBoundary.left;
                sign.pageY = dragItemBoundary.top - pageBoundary.top;
            }}
            onMouseDown={(ev) => {
                props.setSelectedSign(signKey, ev);
                dragStart(ev, pageBoundary);
            }}
            onMouseMove={(ev) => { drag(ev, pageBoundary) }}
        >
            <div className={classes.noevents}> <Brush /> </div> <div className={classes.noevents}> SIGNATURE </div>
        </div>
    );
}

const styles = {
    selectedSign: {
        backgroundColor: "antiquewhite !important",
        color: "lightgrey  !important"
    }
}

export default Signature;