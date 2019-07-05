/* eslint-disable react/prop-types */
/**
 * User Block Component
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Dropdown, DropdownToggle, DropdownMenu, Badge } from "reactstrap";
import { NotificationManager } from "react-notifications";
import Avatar from "@material-ui/core/Avatar";

import SupportPage from "../Support/Support";
import { logoutUserFromFirebase } from "Actions";
import IntlMessages from "Util/IntlMessages";

class UserBlock extends Component {
  state = {
    userDropdownMenu: false,
    isSupportModal: false
  };

  /**
   * Logout User
   */
  logoutUser() {
    this.props.logoutUserFromFirebase(this.props.user, this.props.history);
  }

  /**
   * Toggle User Dropdown Menu
   */
  toggleUserDropdownMenu() {
    this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
  }

  /**
   * Open Support Modal
   */
  openSupportModal() {
    this.setState({ isSupportModal: true });
  }

  /**
   * On Close Support Page
   */
  onCloseSupportPage() {
    this.setState({ isSupportModal: false });
  }

  /**
   * On Submit Support Page
   */
  onSubmitSupport() {
    this.setState({ isSupportModal: false });
    NotificationManager.success("Message has been sent successfully!");
  }

  render() {
    return (
      <div className="top-sidebar">
        <div className="sidebar-user-block">
          <Dropdown
            isOpen={this.state.userDropdownMenu}
            toggle={() => this.toggleUserDropdownMenu()}
            className="rct-dropdown"
          >
            <DropdownToggle tag="div" className="d-flex align-items-center">
              <div className="user-profile">
                {/* <Avatar className="size-40 bg-info rounded-circle">
                  {this.props.user.profile.info.firstName.charAt(0) +
                    this.props.user.profile.info.lastName.charAt(0)}
                </Avatar> */}
                {/* <img
                  src={this.props.user.profile.info.avatar}
                  alt="user profile"
                  className="img-fluid rounded-circle"
                  width="50"
                  height="100"
                /> */}
                <Avatar
                  alt={`${this.props.user.profile.info.firstName} ${
                    this.props.user.profile.info.lastName
                  }`}
                  src={this.props.user.profile.info.avatar}
                  className="rounded-circle"
                />
              </div>
              <div className="user-info">
                <span className="user-name ml-4">
                  {this.props.user.profile.info.firstName + " " + this.props.user.profile.info.lastName}
                </span>
                <i className="zmdi zmdi-chevron-down dropdown-icon mx-4" />
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
                  <Link
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
                  <a
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
        <SupportPage
          isOpen={this.state.isSupportModal}
          onCloseSupportPage={() => this.onCloseSupportPage()}
          onSubmit={() => this.onSubmitSupport()}
        />
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser, settings }) => {
  const { user } = authUser;
  return { user, settings };
};

export default connect(
  mapStateToProps,
  {
    logoutUserFromFirebase
  }
)(UserBlock);
