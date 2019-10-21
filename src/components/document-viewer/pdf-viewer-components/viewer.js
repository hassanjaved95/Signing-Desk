import React from 'react';
import { makeStyles } from "@material-ui/styles";

// Components
import Page from './page';


const useStyles = makeStyles({
    pdfPage: {
        margin: "15px auto",
        maxWidth: "800px",
        position: "relative"
    },
    pdfContainer: {
        height: "calc(100vh - 64px)",
        overflowX: "hidden",
        overflowY: "auto",
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
                            pageNum={i + 1}
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
                            deleteSelectedSign={props.deleteSelectedSign}
                            duplicateSelectedSign={props.duplicateSelectedSign}
                            setSignDimentions={props.setSignDimentions}
                            marginTop={(i * 35) || 10}
                        />
                    )
                )}
            </div>
        );
    }

    return null;
};

export default Viewer;