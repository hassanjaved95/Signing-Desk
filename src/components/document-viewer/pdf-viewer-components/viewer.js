import React from 'react';
import { makeStyles } from "@material-ui/styles";

// Components
import Page from './page';


const useStyles = makeStyles({
    pdfPage: {
        margin: "0 auto 2px",
        maxWidth: "800px"
    },
    pdfContainer: {
        height: "calc(100vh - 65px)",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "40px 0"
    }
});

const Viewer = ({ pdf, ...props }) => {
    const classes = useStyles();

    const numPages = pdf ? pdf._pdfInfo.numPages : 0;

    if (pdf) {
        return (
            <div className={`pdf-viewer ${classes.pdfContainer}`}>
                {Array.apply(null, { length: numPages }).map(
                    (v, i) => (
                        <Page
                            pdf={pdf}
                            index={i + 1}
                            key={`document-page-${i}`}
                            classes={classes}
                            {...props}
                        />
                    )
                )}
            </div>
        );
    }

    return null;
};

export default Viewer;