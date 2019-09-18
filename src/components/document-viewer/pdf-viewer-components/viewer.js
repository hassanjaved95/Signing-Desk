import React from 'react';
import { makeStyles } from "@material-ui/styles";

// Components
import Page from './page';


const useStyles = makeStyles({
    pdfPage: {
        margin: "0 auto",
        maxWidth: "800px",
        position: "relative",
        marginTop: 10
    },
    pdfContainer: {
        height: "calc(100vh - 65px)",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "40px 0",
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
                            setSelectedSign={props.setSelectedSign}
                            selectedSign={props.selectedSign}
                            anchorEl={props.anchorEl}
                            setAnchorEl={props.setAnchorEl}
                        />
                    )
                )}
            </div>
        );
    }

    return null;
};

export default Viewer;