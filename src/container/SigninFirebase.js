/* eslint-disable react/prop-types */
/**
 * Signin Firebase
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import $ from "jquery";

// components
import { SessionSlider } from "Components/Widgets";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
} from "Actions";

import { Fab } from "@material-ui/core";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

class Signin extends Component {
  container = null;
  slickTrack = null;

  state = {
    showForgotPasswordDlg: false
  };

  componentDidMount() {
    console.log('signin called');
    this.onChangeValue();
    this.attachBlurEvents();
  }

  attachBlurEvents = () => {
    $('#email, #password').focusout(() => {
      console.log('blur called');
      this.setSlickSliderHeight();
    });
  }

  setSlickSliderHeight = () => {
    var loginPageHeight = $('.row.row-eq-height .col-sm-5.col-md-5.col-lg-4').height();
    $('.slick-track').height(loginPageHeight);
  }

  handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    this.props.signinUserInFirebase(
      { email: values.email, password: values.password },
      this.props.history
    );
  };

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push("/signup");
  }

  onForgotPasswordOpen = () => {
    this.setState({ showForgotPasswordDlg: true });
  };

  onForgotPasswordClose = () => {
    this.setState({ showForgotPasswordDlg: false });
  };


  onChangeValue(value) {
    this.setSlickSliderHeight();
    return true;
  }

  alignItems() {
    if (this.slickTrack && this.container) {
      this.slickTrack.height = this.container.height;
    }
  }

  render() {
    const signinSchema = Yup.object().shape({
      password: Yup.string().required("Please provide your password."),
      email: Yup.string()
        .email("Please provide a valid email address.")
        .required("Please provide an email address.")
    });

    const FormikInput = ({ field, form: { touched, errors }, ...props }) => (
      <div>
        <Input
          invalid={!!(touched[field.name] && errors[field.name])}
          {...field}
          {...props}
        />

        {touched[field.name] && errors[field.name] && (
          <FormFeedback className="text-left">
            {errors[field.name]}
          </FormFeedback>
        )}
      </div>
    );

    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <ForgotPasswordDialog
          open={this.state.showForgotPasswordDlg}
          onClose={this.onForgotPasswordClose}
        />
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  {/* <div className="session-logo">
                    <Link to="/">
                      <img
                        src={AppConfig.appLogo}
                        alt="session-logo"
                        className="img-fluid"
                        height="35"
                      />
                    </Link>
                    <Link className="mx-1" to="/">
                      <img
                        src={require("Assets/img/canvas.png")}
                        alt="session-logo"
                        className="img-fluid"
                        height="35"
                      />
                    </Link>
                  </div>
                  <div>
                    <a className="mr-15" onClick={() => this.onUserSignUp()}>
                      Create New account?
                    </a>
                    <Button
                      variant="contained"
                      className="btn-light"
                      onClick={() => this.onUserSignUp()}
                    >
                      Sign Up
                    </Button>
                  </div> */}
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-sm-5 col-md-5 col-lg-4">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2 className="font-weight-bold">
                        Sign in to {AppConfig.brandName}
                      </h2>
                      <p className="mb-0">Most powerful signing application</p>
                    </div>
                    <Formik
                      initialValues={{
                        email: "",
                        password: ""
                      }}
                      validationSchema={signinSchema}
                      onSubmit={this.handleSubmit}
                      render={(formProps: FormikProps) => (
                        <Form>
                          <FormGroup className="has-wrapper">
                            <Field
                              type="mail"
                              name="email"
                              id="email"
                              className="has-input input-lg"
                              placeholder="Email"
                              component={FormikInput}
                            />
                            <span className="has-icon">
                              <i className="ti-email" />
                            </span>
                          </FormGroup>
                          <FormGroup className="has-wrapper">
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className="has-input input-lg"
                              placeholder="Password"
                              component={FormikInput}
                            />
                            <span className="has-icon">
                              <i className="ti-lock" />
                            </span>
                          </FormGroup>
                          <FormGroup className="has-wrapper">
                            <Link
                              to="#"
                              onClick={this.onForgotPasswordOpen}
                              className="text-muted"
                            >
                              Forgot Password?
                            </Link>
                          </FormGroup>
                          <FormGroup className="mb-15">
                            <Button
                              type="submit"
                              color="primary"
                              className="btn-block text-white w-100"
                              variant="contained"
                              size="large"
                            >
                              Sign in
                            </Button>
                          </FormGroup>
                        </Form>
                      )}
                    />
                    <p className="mb-20">or sign in with</p>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-facebook mr-15 mb-20 text-white"
                    >
                      <i className="zmdi zmdi-facebook" />
                    </Fab>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-google mr-15 mb-20 text-white"
                    >
                      <i className="zmdi zmdi-google" />
                    </Fab>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-twitter mr-15 mb-20 text-white"
                    >
                      <i className="zmdi zmdi-twitter" />
                    </Fab>
                    <Fab
                      variant="round"
                      size="small"
                      className="btn-linkedin mr-15 mb-20 text-white"
                    >
                      <i className="zmdi zmdi-linkedin" />
                    </Fab>
                    <div>
                      Don't have an account?
                      <a className="mr-15" onClick={() => this.onUserSignUp()}>
                        <span>&nbsp;</span>Sign up
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7 col-md-7 col-lg-8">
                  <SessionSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    signinUserInFirebase,
    signinUserWithFacebook,
    signinUserWithGoogle,
    signinUserWithGithub,
    signinUserWithTwitter
  }
)(Signin);
