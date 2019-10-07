import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { collapsedSidebarAction } from 'Actions';
import MenuIcon from '@material-ui/icons/Menu';
import CustomMenu from './CustomeMenu';


import $ from 'jquery';


class DashboardFilters extends Component {

    /*
   *DashBoard Main Filter Reset Filters
   */
    resetDashBoardMainFilters() {
        $(".DBFM0").removeClass("dashBoardMainFiltersActive");
        $(".DBFM1").removeClass("dashBoardMainFiltersActive");
        $(".DBFM2").removeClass("dashBoardMainFiltersActive");
        $(".DBFM3").removeClass("dashBoardMainFiltersActive");
    }
    /*
    *DashBoard Main Filter Click Logic
    */
    getDocumentStatsByMainFilter(num) {
        this.resetDashBoardMainFilters();
        $(".DBFM" + num).addClass("dashBoardMainFiltersActive");
    }

    render() {
        var currentPathName = this.props.location.pathname.split("/")[this.props.location.pathname.split("/").length - 1];
        var isDashboard = true;
        isDashboard = currentPathName == "dashboard" ? true : false;
        return (
            <React.Fragment>
                {currentPathName == "dashboard" ?
                    <li className="list-inline-item" style={{ color: 'black' }}>
                        <div className="list-inline-item">
                            <div className="list-inline-item" style={{ marginRight: '10px' }}>
                                {/* <span className="DBFM0 dashBoardMainFilters" onClick={() => this.getDocumentStatsByMainFilter(0)}> 1 Week </span>
                                <span className="DBFM1 dashBoardMainFilters" onClick={() => this.getDocumentStatsByMainFilter(1)}>1 Month </span>
                                <span className="DBFM2 dashBoardMainFilters" onClick={() => this.getDocumentStatsByMainFilter(2)}>3 Months </span>
                                <span className="DBFM3 dashBoardMainFilters" onClick={() => this.getDocumentStatsByMainFilter(3)}>1 Year </span> */}
                            </div>
                            <div className="list-inline-item" style={{marginRight: '10px', marginRight: '10px'}}>
                               
                                <CustomMenu  />
                            </div>
                        </div>

                    </li> :
                    <li className="list-inline-item" style={{ color: 'black' }}>
                         <div className="list-inline-item" style={{marginRight: '10px', marginRight: '10px'}}>
                               
                               <CustomMenu  />
                           </div>
                    </li>
                }
            </React.Fragment>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser, settings, sidebar }) => {
    const { user } = authUser;
    return { user, settings, sidebar };
};

export default withRouter(connect(mapStateToProps, {
    collapsedSidebarAction
})(DashboardFilters));