import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withSnackbar } from "notistack";

import QueueAnim from "rc-queue-anim";

import AppConfig from "Constants/AppConfig";
import axios from "axios";

class Activate extends Component {
  state = {
    loading: false
  };

  activate = async () => {
    this.setState({ loading: true });

    try {
      await axios.get(
        `${AppConfig.apiBaseUrl}/users/activate/${
          this.props.match.params.token
        }`
      );

      this.setState({ loading: false });
      this.props.enqueueSnackbar(
        `Your email address has been successfully verified.`,
        {
          variant: "success"
        }
      );

      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    } catch (error) {
      this.setState({ loading: false });

      this.props.enqueueSnackbar(error.message, {
        variant: "error"
      });
    }
  };

  componentDidMount() {
    this.activate();
  }

  render() {
    const { loading } = this.state;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper" key="1">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  {/* <div className="session-logo">
                                        <Link to="/">
                                            <img src={require('Assets/img/site-logo.png')} alt="session-logo" className="img-fluid" width="110" height="35" />
                                        </Link>
                                    </div>
                                    <div className="session-social-icon">
                                        <IconButton className="text-white" aria-label="facebook">
                                            <i className="zmdi zmdi-facebook"></i>
                                        </IconButton>
                                        <IconButton className="text-white" aria-label="twitter">
                                            <i className="zmdi zmdi-twitter"></i>
                                        </IconButton>
                                        <IconButton className="text-white" aria-label="google">
                                            <i className="zmdi zmdi-google"></i>
                                        </IconButton>
                                    </div> */}
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper p-4 h-100 p-md-0">
            <div className="row">
              <div className="col-sm-8 col-lg-4 mx-auto">
                <div className="session-body text-center">
                  <div className="session-head mb-30">
                    <h2>Verify Email</h2>
                    <p className="mb-0">
                      Please wait while we verify your email address...
                    </p>
                    <p className="mb-0">
                      Once your email address is successfully verified, you will
                      be redirected to sign in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

export default withSnackbar(Activate);
