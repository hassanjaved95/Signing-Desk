/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

// actions
import { collapsedSidebarAction } from 'Actions';

// helpers
import { getAppLayout } from "Helpers/helpers";

// components
import Notifications from './Notifications';
import ChatSidebar from './ChatSidebar';
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay';
import LanguageProvider from './LanguageProvider';
import SearchForm from './SearchForm';
import QuickLinks from './QuickLinks';
import MobileSearchForm from './MobileSearchForm';
import Cart from './Cart';
import Avatar from "@material-ui/core/Avatar";

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Users from '../DashboardOverlay/Users';
import { Dropdown, DropdownToggle, DropdownMenu, Badge } from "reactstrap";
import { logoutUserFromFirebase } from "Actions";
import SupportPage from "../Support/Support";
import { blue } from '@material-ui/core/colors';
import { Transform } from 'stream';
import DashboardFilters from './DashboardFilters';
import DashBoardCaption from './DashboardCaption';

class Header extends Component {

   state = {
      customizer: false,
      isMobileSearchFormVisible: false,
      userDropdownMenu: false,
   }

   // function to change the state of collapsed sidebar
   onToggleNavCollapsed = (event) => {
      const val = !this.props.settings.navCollapsed;
      this.props.collapsedSidebarAction(val);
   }

   // open dashboard overlay
   openDashboardOverlay() {
      $('.dashboard-overlay').toggleClass('d-none');
      $('.dashboard-overlay').toggleClass('show');
      if ($('.dashboard-overlay').hasClass('show')) {
         $('body').css('overflow', 'hidden');
      } else {
         $('body').css('overflow', '');
      }
   }

   // close dashboard overlay
   closeDashboardOverlay() {
      $('.dashboard-overlay').removeClass('show');
      $('.dashboard-overlay').addClass('d-none');
      $('body').css('overflow', '');
   }

   // toggle screen full
   toggleScreenFull() {
      screenfull.toggle();
   }

   // mobile search form
   openMobileSearchForm() {
      this.setState({ isMobileSearchFormVisible: true });
   }

   /**
   * Toggle User Dropdown Menu
   */
   toggleUserDropdownMenu() {
      this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
   }

   /**
   * Logout User
   */
   logoutUser() {
      this.props.logoutUserFromFirebase(this.props.user, this.props.history);
   }

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
      const { isMobileSearchFormVisible } = this.state;
      $('body').click(function () {
         $('.dashboard-overlay').removeClass('show');
         $('.dashboard-overlay').addClass('d-none');
         $('body').css('overflow', '');
      });


      const { horizontalMenu, agencyMenu, location, Users } = this.props;

      return (
         <AppBar position="static" className="rct-header">
            <Toolbar className="d-flex justify-content-between w-100 pl-0 header-shadow" >
               <div className="d-flex align-items-center" >
                  {(horizontalMenu || agencyMenu) &&
                     <div className="site-logo">
                        <Link to="/" className="logo-mini">
                           <img src={require('Assets/img/appLogo.png')} className="mr-15" alt="site logo" width="35" height="35" />
                        </Link>
                        <Link to="/" className="logo-normal">
                           <img src={require('Assets/img/appLogoText.png')} className="img-fluid" alt="site-logo" width="67" height="17" />
                        </Link>
                     </div>
                  }
                  {!agencyMenu &&
                     <ul className="list-inline mb-0 navbar-left" >
                        {!horizontalMenu ?
                           <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
                              <Tooltip title="Sidebar Toggle" placement="bottom">
                                 <IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
                                    <MenuIcon />
                                 </IconButton>
                              </Tooltip>


                           </li> :

                           <li className="list-inline-item">
                              <Tooltip title="Sidebar Toggle" placement="bottom">
                                 <IconButton color="inherit" aria-label="Menu" className="humburger p-0" component={Link} to="/">
                                    <i className="ti-layout-sidebar-left"></i>
                                 </IconButton>
                              </Tooltip>
                           </li>

                        }

                        <DashBoardCaption />

                        {/* {!horizontalMenu && <QuickLinks />} <li className="list-inline-item search-icon d-inline-block">
                           <SearchForm />
                           <IconButton mini="true" className="search-icon-btn" onClick={() => this.openMobileSearchForm()}>
                              <i className="zmdi zmdi-search"></i>
                           </IconButton>
                           <MobileSearchForm
                              isOpen={isMobileSearchFormVisible}
                              onClose={() => this.setState({ isMobileSearchFormVisible: false })}
                           />
                        </li> */}
                     </ul>
                  }
               </div>
               <ul className="navbar-right list-inline mb-0">
                  <DashboardFilters />


                  {/* {!horizontalMenu &&
                     <li className="list-inline-item">
                        <Tooltip title="Upgrade" placement="bottom">
                           <Button component={Link} to={`/${getAppLayout(location)}/pages/pricing`} variant="contained" className="upgrade-btn tour-step-4 text-white" color="primary">
                              <IntlMessages id="widgets.upgrade" />
                           </Button>
                        </Tooltip>
                     </li>
                  } */}
                  <li className="list-inline-item setting-icon">
                     <div className="top-sidebar">
                        <div className="sidebar-user-block">
                           <Dropdown
                              isOpen={this.state.userDropdownMenu}
                              toggle={() => this.toggleUserDropdownMenu()}
                              className="rct-dropdown"
                           >
                              <DropdownToggle tag="div" className="d-flex align-items-center">
                                 <div className="user-profile" >
                                    <Avatar
                                       alt={`${this.props.user.profile.info.firstName} ${
                                          this.props.user.profile.info.lastName
                                          }`}
                                       src={this.props.user.profile.info.avatar}
                                       className="rounded-circle"
                                       style={{ display: 'block' }}
                                    />
                                 </div>

                              </DropdownToggle>
                              <DropdownMenu>
                                 <ul className="list-unstyled mb-0">
                                    <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                                       <p className="text-white mb-0 fs-14">
                                          {this.props.user.profile.info.firstName + " " + this.props.user.profile.info.lastName}
                                       </p>
                                       <span className="text-white fs-14">
                                          {this.props.user.email}
                                       </span>
                                    </li>
                                    <li>
                                       <Link style={{ padding: 7, width: '100%' }}
                                          to={{
                                             pathname: "/app/users/user-profile",
                                             state: { activeTab: 0 }
                                          }}
                                       >
                                          <i className="zmdi zmdi-account text-primary mr-3" />
                                          <IntlMessages id="widgets.profile" />
                                       </Link>
                                    </li>
                                    {/* <li>
                  <Link
                    to={{
                      pathname: "/app/users/user-profile-1",
                      state: { activeTab: 2 }
                    }}
                  >
                    <i className="zmdi zmdi-comment-text-alt text-success mr-3" />
                    <IntlMessages id="widgets.messages" />
                    <Badge color="danger" className="pull-right">
                      3
                    </Badge>
                  </Link>
                </li>
                <li>
                  <Link to="/app/pages/feedback">
                    <i className="zmdi zmdi-edit text-warning mr-3" />
                    <IntlMessages id="sidebar.feedback" />
                    <Badge color="info" className="pull-right">
                      1
                    </Badge>
                  </Link>
                </li> */}
                                    <li className="border-top">
                                       <a style={{ padding: 7, width: '100%' }}
                                          href="javascript:void(0)"
                                          onClick={() => this.logoutUser()}
                                       >
                                          <i className="zmdi zmdi-power text-danger mr-3" />
                                          <IntlMessages id="widgets.logOut" />
                                       </a>
                                    </li>
                                 </ul>
                              </DropdownMenu>
                           </Dropdown>
                        </div>
                     </div>
                  </li>

                  {/* <li className="list-inline-item setting-icon">
                     <Tooltip title="Chat" placement="bottom">
                        <IconButton aria-label="settings" onClick={() => this.setState({ customizer: true })}>
                           <i className="zmdi zmdi-comment"></i>
                        </IconButton>
                     </Tooltip>
                  </li>
                  <li className="list-inline-item">
                     <Tooltip title="Full Screen" placement="bottom">
                        <IconButton aria-label="settings" onClick={() => this.toggleScreenFull()}>
                           <i className="zmdi zmdi-crop-free"></i>
                        </IconButton>
                     </Tooltip>
                  </li> */}
                  <li className="list-inline-item summary-icon">
                     <Tooltip title="Summary" placement="bottom">
                        <a style={{ margin: '0px 0 0 10px' }} href="javascript:void(0)" className="header-icon tour-step-3" onClick={() => this.openDashboardOverlay()}>
                           <i className="zmdi zmdi-info-outline"></i>
                        </a>
                     </Tooltip>
                  </li>
               </ul>
               <Drawer
                  anchor={'right'}
                  open={this.state.customizer}
                  onClose={() => this.setState({ customizer: false })}
               >
                  <ChatSidebar />
               </Drawer>
            </Toolbar>
            <DashboardOverlay
               onClose={() => this.closeDashboardOverlay()}
            />
         </AppBar>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser, settings, sidebar }) => {
   const { user } = authUser;
   return { user, settings, sidebar };
};

export default withRouter(connect(mapStateToProps, {
   collapsedSidebarAction,
   logoutUserFromFirebase
})(Header));
