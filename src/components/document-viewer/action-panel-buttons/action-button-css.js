import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        "flexGrow": "1",
        "width": "100%",
        "backgroundColor": "#E5E5E5",
    },
    actionPanelContainer: {
        display: "flex",
        flexDirection: "column"
    },
    actionPanelHeader: {
        height: "50px",
        display: "flex",
        borderBottom: "1px solid #E5E5E5",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    actionPanelButtonContainer: {
        padding: "0 20px",
        margin: "20px 0",
    },
    actionPanelButton: {
        display: "inline-block",
        position: "relative",
        margin: "0 0 6px 6px",
        width: "80px",
        height: "64px",
        padding: 0,
        cursor: "move",
        border: "1px solid #e5e5e5",
        background: "#dee2e6",
        color: "#000",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "1.42857143",
        textAlign: "center",
        verticalAlign: "middle",
        borderRadius: "3px",
        whiteSpace: "nowrap",
    },
    actionPanelEmptyBtn: {
        borderStyle: "dashed",
        borderColor: "#000",
        background: "#fff",
        cursor: 'default'
    },
    actionPanelBtnDisabled: {
        cursor: 'default',
        background: "#f4f4f4",
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '--ms-user-select': 'none',
        'user-select': 'none',
    },
    btnContentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        height: "100%",
        width: "100%",
        padding: "10px 0"
    },
    btnContent: {

    },
    btnText: {
        fontSize: "10px",
        color: "#8d8d8d"
    },
    btnIcon: {

    },
    selectedTab: {
        borderColor: "#EBEDF2 #EBEDF2 #195bff #F4F7FA",
        borderWidth: "2px"
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row"
    },
    half: {
        width: "50%"
    },
    flexLeft: {
        display: "flex",
        alignItems: "start",
    },
    flexRight: {
        display: "flex",
        justifyContent: "flex-end"
    }
});

export default useStyles;