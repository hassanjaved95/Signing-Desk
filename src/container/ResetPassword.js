import React, { Component } from "react";
import { connect } from "react-redux";

import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withSnackbar } from "notistack";

import QueueAnim from "rc-queue-anim";

import AppConfig from "Constants/AppConfig";
import axios from "axios";

import { signinUserSuccess } from "Actions";

class ResetPassword extends Component {
  state = {
    loading: false,
    showPassword: false,
    showConfirmPassword: false
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({
      showConfirmPassword: !state.showConfirmPassword
    }));
  };

  handleSubmit = async (values, { setSubmitting }) => {
    this.setState({ loading: true });

    let decodedParams = JSON.parse(atob(this.props.match.params.encodedParams));

    try {
      const user = await axios.post(
        AppConfig.apiBaseUrl + "/users/reset-password",
        {
          email: decodedParams.email,
          newPassword: values.newPassword
        },
        {
          headers: { Authorization: `Bearer ${decodedParams.token}` }
        }
      );

      this.setState({ loading: false });
      setSubmitting(false);

      this.props.enqueueSnackbar(`Your password has been successfully reset.`, {
        variant: "success"
      });

      setTimeout(() => {
        this.props.history.push("/");
      }, 2000);
    } catch (error) {
      this.setState({ loading: false });
      setSubmitting(false);

      this.props.enqueueSnackbar(error.message, {
        variant: "error"
      });
    }
  };

  onUserSignIn() {
    this.props.history.push("/signin");
  }

  render() {
    const passwordResetSchema = Yup.object().shape({
      newPassword: Yup.string()
        .min(6, "Your password must be at least six characters long.")
        .required("Please provide your new password."),
      confirmPassword: Yup.string()
        .required("Please confirm your new password.")
        .when("newPassword", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Passwords do not match."
          )
        })
    });

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
                    <h2>Reset Password</h2>
                    <p className="mb-0">Please enter your new password</p>
                  </div>
                  <Formik
                    validateOnBlur={false}
                    initialValues={{ newPassword: "", confirmPassword: "" }}
                    validationSchema={passwordResetSchema}
                    onSubmit={this.handleSubmit}
                    render={({
                      submitForm,
                      isSubmitting,
                      resetForm,
                      values
                    }) => (
                      <Form>
                        <Field
                          name="newPassword"
                          type={this.state.showPassword ? "text" : "password"}
                          label="New Password"
                          component={TextField}
                          autoFocus
                          margin="dense"
                          fullWidth
                          disabled={isSubmitting}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />

                        <Field
                          name="confirmPassword"
                          type={
                            this.state.showConfirmPassword ? "text" : "password"
                          }
                          label="Confirm Password"
                          component={TextField}
                          margin="dense"
                          fullWidth
                          disabled={isSubmitting}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowConfirmPassword}
                                >
                                  {this.state.showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            className="btn-block"
                            variant="contained"
                            size="large"
                            style={{ marginTop: "24px", marginBottom: "24px" }}
                          >
                            Reset Password
                          </Button>
                        </div>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                      </Form>
                    )}
                  />
                  <div>
                    Already have an account?{" "}
                    <a className="mr-15" onClick={() => this.onUserSignIn()}>
                      Sign in
                    </a>
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

const mapDispatchToProps = {
  signinUserSuccess: signinUserSuccess
};

export default withSnackbar(
  connect(
    null,
    mapDispatchToProps
  )(ResetPassword)
);
