/**
 * User Block
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

import { updateProfile } from "Actions";
import LinearProgress from "@material-ui/core/LinearProgress";


class UserBlock extends Component {
  state = {
    avatar: this.props.user.profile.info.avatar,
    saving: false,
    dirty: false,
    loading: false,
  };
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  handleAvatarChange = (event) => {
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
      };
      info.avatar = reader.result;
      var signature = {
        ...this.props.user.profile.signature
      }
      var general = {
        ...this.props.user.profile.general
      }

      const profile = {
        profile: {
          info,
          signature,
          general
        }
      }

      // const profile = {
        
      //     info,
      //     signature,
      //     general
        
      // }

      this.props.updateProfile(profile);
    };
    reader.readAsDataURL(files[0]);
  };

  handleAvatarClick = () => {
    this.fileUpload.current.click();
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props;
    const { loading } = this.props;

    return (
      <React.Fragment>
        <div className="profile-top" style={{ height: '175px', marginBottom: '0px !important' }} >
          <img
            src={require("Assets/img/profile-bg.jpg")}
            alt="profile banner"
            className="img-fluid"
            width="1920"

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
              <div onClick={this.handleAvatarClick}>
                <Avatar
                  alt={`${this.props.user.profile.info.firstName} ${this.props.user.profile.info.lastName}`}
                  src={this.state.avatar}
                  className="mr-30 bordered"
                  style={{ width: "140px", height: "140px", cursor: "pointer" }}

                />

              </div>

              <div className="media-body pt-25">
                <div className="mb-20">
                  <h2>{`${this.props.user.profile.info.firstName} ${this.props.user.profile.info.lastName}`}</h2>
                  <p>{this.props.user.profile.info.email}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div>
          {loading && <LinearProgress />}
        </div>
      </React.Fragment>


    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    updateProfile
  }
)(UserBlock);
