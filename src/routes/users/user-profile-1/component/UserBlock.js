/**
 * User Block
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

import { updateProfile } from "Actions";

class UserBlock extends Component {
  state = {
    avatar: this.props.user.profile.info.avatar,
    saving: false,
    dirty: false
  };
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  handleAvatarChange = event => {
    let files;
    if (event.dataTransfer) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      files = event.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        dirty: true,
        avatar: reader.result
      });
      const info = {
        ...this.props.user.profile.info,
        avatar: reader.result
      };
      
      const profile = {
        ...this.props.user.profile,
       info
      }
     // this.props.updateProfile(profile);
    };
    reader.readAsDataURL(files[0]);
  };

  handleAvatarClick = () => {
    this.fileUpload.current.click();
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props;
    return (
      <div className="profile-top mb-20">
        <img
          src={require("Assets/img/profile-bg.jpg")}
          alt="profile banner"
          className="img-fluid"
          width="1920"
          height="345"
        />
        <div className="profile-content">
          <div className="media">
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              style={{ display: "none" }}
              ref={this.fileUpload}
              onChange={this.handleAvatarChange}
            />
            <Avatar
              alt={`${this.props.user.profile.info.firstName} ${this.props.user.profile.info.lastName}`}
              src={this.props.user.profile.info.avatar}
              className="mr-30 bordered"
              style={{ width: "140px", height: "140px", cursor: "pointer" }}
              onClick={this.handleAvatarClick}
            />
            <div className="media-body pt-25">
              <div className="mb-20">
                <h2>{`${this.props.user.profile.info.firstName} ${this.props.user.profile.info.lastName}`}</h2>
                <p>{this.props.user.profile.info.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  debugger;
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    updateProfile
  }
)(UserBlock);
