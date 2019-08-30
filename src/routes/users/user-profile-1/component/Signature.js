/**
 * Profile Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import { updateProfile } from "Actions";

class Signature extends Component {
  state = {
    signatureImage: this.props.user.profile.signature.signatureImage,
    saving: false,
    dirty: false
  };

  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  handleSignatureImageChange = event => {
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
        signatureImage: reader.result
      });
    };
    reader.readAsDataURL(files[0]);
  };

  handleSignatureImageClick = () => {
    this.fileUpload.current.click();
  };

  onSave = async () => {
    this.setState({ saving: true });
  
    var info = {
      ...this.props.user.profile.info,
    };
    var signature = {
      ...this.props.user.profile.signature,
    }
    signature.signatureImage= this.state.signatureImage;

    let profile = {
      ...this.props.user.profile,
      info,
      signature
    }

    // let newUser = {
    //   ...this.props.user.profile.info,
    //   ...this.props.user.profile.user,
    //   ...this.props.user.profile.signature,
    //   signatureImage: this.state.signatureImage,
    //   token: this.props.user.profile.user.token
    // };

    this.props.updateProfile(profile);
    this.setState({ saving: false, dirty: false });
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">Appearance</h2>
        <input
          type="file"
          name="signatureImage"
          id="signatureImage"
          style={{ display: "none" }}
          ref={this.fileUpload}
          onChange={this.handleSignatureImageChange}
        />
        <div
          style={{
            border: "3px dotted black",
            cursor: "pointer",
            width: "400px",
            height: "200px"
          }}
          onClick={this.handleSignatureImageClick}
        >
          <img
            src={this.state.signatureImage}
            alt="signature appearance"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          // className="mx-auto d-block"
          />
        </div>
        <br />
        {/* {loading && <LinearProgress />} */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="text-white"
          style={{ marginTop: "24px" }}
          disabled={!this.state.dirty || this.state.saving}
          onClick={this.onSave}
        >
          Save
        </Button>
        <hr />
      </div>
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
)(Signature);
