import React from 'react';
import { makeStyles } from "@material-ui/styles";

// Components
import Page from './page';


const useStyles = makeStyles({
    pdfPage: {
        margin: "0 auto 2px",
        maxWidth: "800px",
        position: "relative"
    },
    pdfContainer: {
        height: "calc(100vh - 65px)",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "40px 0",
    },
    signature: {
        position: "absolute",
        fontSize: 15,
        backgroundColor: "antiquewhite",
        color: "lightgrey",
        display: "flex",
        width: 120,
        height: 50,
        border: "3px solid #4286f4",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        opacity: "0.5"
    }
});

const Viewer = (props) => {
    const classes = useStyles();

    const numPages = props.pdf ? props.pdf._pdfInfo.numPages : 0;

    if (props.pdf) {
        return (
            <div className={`pdf-viewer ${classes.pdfContainer}`}>
                {Array.apply(null, { length: numPages }).map(
                    (v, i) => (
                        <Page
                            pdf={props.pdf}
                            index={i + 1}
                            key={`document-page-${i}`}
                            pageId={`document-page-${i}`}
                            classes={classes}
                            docSigns={props.signs}
                            scale={props.scale}
                            onDropSign={props.onDropSign}
                        />
                    )
                )}
            </div>
        );
    }

    return null;
};

export default Viewer;