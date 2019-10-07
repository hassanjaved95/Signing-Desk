/**
 * User Profile Page
 */
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
// Components
import Profile from "./component/Profile";
import EmailPrefrences from "./component/EmailPrefrences";
import Signature from "./component/Signature";
import General from "./component/General";
import Messages from "./component/Messages";
import Address from "./component/Address";
import UserBlock from "./component/UserBlock";

// rct card box
import { RctCard } from "Components/RctCard";

// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// intl messages
import IntlMessages from "Util/IntlMessages";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";

// For Tab Content
function TabContainer(props) {
  return (
    <Typography component="div" className="ProfileContainer" style={{ padding: 8 * 3,  overflowY:'scroll' }}>
      {props.children}
    </Typography>
  );
}

export default class UserProfile extends Component {
  state = {
    activeTab: this.props.location.state
      ? this.props.location.state.activeTab
      : 0
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="userProfile-wrapper">
        <Helmet>
          <title>User Profile</title>
          <meta name="description" content="User Profile" />
        </Helmet>
        {/* <PageTitleBar title={<IntlMessages id="sidebar.userProfile" />} match={this.props.match} /> */}
        <RctCard>
          <UserBlock />
          <div className="rct-tabs">
            <AppBar position="static">
              <Tabs
                value={activeTab}
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons="off"
                indicatorColor="primary"
              >
                <Tab label="Profile" icon={<AccountBoxIcon />} />
                <Tab label="Signature" icon={<EditIcon />} />
                <Tab label="General" icon={<SettingsIcon />} />
                {/* <Tab
                  icon={<i className="ti-email" />}
                  label={<IntlMessages id="components.emailPrefrences" />}
                />
                <Tab
                  icon={<i className="ti-comment-alt" />}
                  label={<IntlMessages id="widgets.messages" />}
                />
                <Tab
                  icon={<i className="ti-home" />}
                  label={<IntlMessages id="components.address" />}
                /> */}
              </Tabs>
            </AppBar>
            {activeTab === 0 && (
              <TabContainer>
                <Profile />
              </TabContainer>
            )}
            {activeTab === 1 && (
              <TabContainer>
                <Signature />
              </TabContainer>
            )}
            {activeTab === 2 && (
              <TabContainer>
                <General />
              </TabContainer>
            )}
            {/* {activeTab === 3 && (
              <TabContainer>
                <Address />
              </TabContainer>
            )} */}
          </div>
        </RctCard>
      </div>
    );
  }
}
