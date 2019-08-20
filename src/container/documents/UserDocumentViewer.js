import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getViewingDocument } from "Actions";
import { makeStyles } from '@material-ui/styles';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

const useStyles = makeStyles({
    documentViewerContainer: {
        height: "calc(100vh - 83px)",
        background: "white",
        display: "flex",
        flexDirection: 'row'
    },
    documentActionPanel: {
        width: '300px'
    },
    documentNavPanel: {
        width: '76px'
    },
    documentViewer: {
        width: "calc(100% - 376px)",
        backgroundColor: '#F9F9F9'
    }
});



const DocumentViewerLayout = function (props) {
    console.log('DocumentViewerLayout props:', props);
    const classes = useStyles();

    return (
        <div className={classes.documentViewerContainer}>
            <div className={classes.documentViewer}>

            </div>
            <div className={classes.documentActionPanel}>

            </div>
            <div className={classes.documentNavPanel}>

            </div>
        </div>
    )
}

class UserDocumentViewer extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        // this.props.getViewingDocument();
    }

    render() {

        const { viewingDocument, loading } = this.props;
        console.log('viewingDocument:', viewingDocument);
        // if (loading) {
        //     return (
        //         <RctSectionLoader />
        //     )
        // }

        return (
            <DocumentViewerLayout {...this.props} />
        )
    }
}

const mapStateToProps = ({ documentViewer }) => {
    return documentViewer;
}

export default withRouter(
    connect(mapStateToProps, {
        getViewingDocument
    })(UserDocumentViewer));