/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/**
 * Sign Up With Firebase
 */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { FormGroup, Input, FormFeedback, Row, Col } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import { Fab } from "@material-ui/core";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import $ from 'jquery';

// components
import { SessionSlider } from "Components/Widgets";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import {
  signupUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter
} from "Actions";

class SignupFirebase extends Component {
  state = {
    value: 0,
    jobTitles: [],
    industries: [],
    email: "",
    password: ""
  };

  /**
   * On User Sign In
   */
  onUserSignIn() {
    this.props.history.push("/signin");
  }

  componentDidMount() {
    console.log('signup called');
    this.attachBlurEvents();
    axios
      .get(AppConfig.apiBaseUrl + "/industries/all")
      .then(response => {
        this.setState({
          industries: response.data
        });
      })
      .catch(error => error);

    axios
      .get(AppConfig.apiBaseUrl + "/jobtitles/all")
      .then(response => {
        this.setState({
          jobTitles: response.data
        });
      })
      .catch(error => error);
  }

  componentDidUpdate() {
    this.setSlickSliderHeight();
  }

  attachBlurEvents = () => {
    $('#email, #password').focusout(() => {
      console.log('blur called');
      this.setSlickSliderHeight();
    });
  }

  setSlickSliderHeight = () => {

    var loginPageHeight = $('.row.row-eq-height .col-sm-5.col-md-5.col-lg-4').height();
    console.log('loginPageHeight (login page):', loginPageHeight);
    $('.slick-track').height(loginPageHeight);
  }

  firstStepSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Your password must be at least six characters long.")
      .required("Please enter a password."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter an email address.")
  });

  secondStepSchema = Yup.object().shape({
    fname: Yup.string().required("Please enter your first name."),
    lname: Yup.string().required("Please enter your last name."),
    phone: Yup.string().required("Please enter your phone number."),
    company: Yup.string().required("Please enter a company name.")
  });

  handleSecondStepSubmit = async (values, actions) => {
    // process form submission here
    const { email, password } = this.state;
    const { fname, lname, phone, company, jobTitle, industry } = values;
    this.props.signupUserInFirebase(
      { email, password, fname, lname, phone, company, jobTitle, industry },
      this.props.history
    );

    //done submitting, set submitting to false
    actions.setSubmitting(false);
  };

  handleFirstStepSubmit = async (values, actions) => {
    try {
      let response = await axios.post(AppConfig.apiBaseUrl + "/users/exists", {
        email: values.email
      });
      if (response.data.exists) {
        actions.setSubmitting(false);
        actions.setFieldError(
          "email",
          "A user with that email already exists."
        );
        return;
      }

      actions.setSubmitting(false);
      this.setState({ email: values.email, password: values.password });
      this.setState({ value: 1 });
    } catch (error) {
      actions.setSubmitting(false);
      actions.setFieldError("email", error);
    }
  };

  render() {
    const { value } = this.state;
    console.log('renderd');
    const FormikSelect = ({
      field,
      form: { isSubmitting, touched, errors },
      disabled = false,
      ...props
    }) => {
      let error = errors[field.name];
      let touch = touched[field.name];

      return (
        <FormGroup>
          <Input
            {...field}
            {...props}
            invalid={Boolean(touched[field.name] && errors[field.name])}
          >
            <option value="">{props.inputprops.defaultOption}</option>
            {props.inputprops.options.map((option, index) => {
              if (option.name)
                return (
                  <option value={option.id} key={index}>
                    {option.name}
                  </option>
                );
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </Input>
          {touch && error && (
            <FormFeedback className="text-left">{error}</FormFeedback>
          )}
        </FormGroup>
      );
    };

    const FormikInput = ({ field, form: { touched, errors }, ...props }) => {
      
      return (

        <div>
          <Input
            invalid={!!(touched[field.name] && errors[field.name])}
            {...field}
            {...props}
            onBlur={this.setSlickSliderHeight}
          />
          {touched[field.name] && errors[field.name] && (
            <FormFeedback className="text-left">
              {errors[field.name]}
            </FormFeedback>
          )}
        </div>
      )
    };

    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  {/* <div className="session-logo">
                    <Link to="/">
                      <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" height="35" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/signin" className="mr-15 text-white">Already have an account?</Link>
                    <Button component={Link} to="/signin" variant="contained" className="btn-light">
                      Sign In
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
                    <div className="session-head mb-15">
                      <h2>Get started with {AppConfig.brandName}</h2>
                      <p className="mb-0">Most powerful signing application</p>
                    </div>
                    {value === 0 && (
                      <Formik
                        initialValues={{
                          email: "",
                          password: ""
                        }}
                        validationSchema={this.firstStepSchema}
                        onSubmit={this.handleFirstStepSubmit}
                        render={(formProps: FormikProps) => (
                          <div>
                            <Form>
                              <FormGroup className="has-wrapper">
                                <Field
                                  type="mail"
                                  name="email"
                                  id="email"
                                  className="has-input input-lg"
                                  placeholder="Email"
                                  onBlur={this.setSlickSliderHeight}
                                  component={FormikInput}
                                />
                                <span className="has-icon">
                                  <i className="ti-email" />
                                </span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                <Field
                                  type="Password"
                                  name="password"
                                  id="password"
                                  className="has-input input-lg"
                                  placeholder="Password"
                                  onBlur={this.setSlickSliderHeight}
                                  component={FormikInput}
                                />
                                <span className="has-icon">
                                  <i className="ti-lock" />
                                </span>
                              </FormGroup>
                              <FormGroup className="mb-15">
                                <Button
                                  className="btn-info text-white btn-block w-100"
                                  variant="contained"
                                  size="large"
                                  type="submit"
                                  disabled={formProps.isSubmitting}
                                >
                                  Next
                                </Button>
                              </FormGroup>
                              {/* <pre>{JSON.stringify(formProps.values, null, 2)}</pre> */}
                            </Form>
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
                          </div>
                        )}
                      />
                    )}
                    {value === 1 && (
                      <Formik
                        initialValues={{
                          fname: "",
                          lname: "",
                          company: "",
                          industry: "",
                          phone: ""
                        }}
                        validationSchema={this.secondStepSchema}
                        onSubmit={this.handleSecondStepSubmit}
                        render={(formProps: FormikProps) => (
                          <Form>
                            <Row form>
                              <Col md={6}>
                                <FormGroup className="has-wrapper">
                                  <Field
                                    type="text"
                                    name="fname"
                                    id="fname"
                                    className="has-input input-lg"
                                    placeholder="First name"
                                    component={FormikInput}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup className="has-wrapper">
                                  <Field
                                    type="text"
                                    name="lname"
                                    id="lname"
                                    className="has-input input-lg"
                                    placeholder="Last name"
                                    component={FormikInput}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup className="has-wrapper">
                              <Field
                                type="text"
                                name="company"
                                id="company"
                                className="has-input input-lg"
                                placeholder="Company"
                                component={FormikInput}
                              />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                              <Field
                                type="select"
                                name="jobTitle"
                                id="jobTitle"
                                placeholder="Job Title"
                                className="has-input input-lg"
                                component={FormikSelect}
                                inputprops={{
                                  options: this.state.jobTitles,
                                  defaultOption: "Job title"
                                }}
                              />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                              <Field
                                type="select"
                                name="industry"
                                id="industry"
                                placeholder="Industry"
                                className="has-input input-lg"
                                component={FormikSelect}
                                inputprops={{
                                  options: this.state.industries,
                                  defaultOption: "Industry"
                                }}
                              />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                              <Field
                                type="text"
                                name="phone"
                                id="phone"
                                className="has-input input-lg"
                                placeholder="Phone"
                                component={FormikInput}
                              />
                            </FormGroup>
                            <FormGroup className="mb-15">
                              <Button
                                className="btn-info text-white btn-block w-100"
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={formProps.isSubmitting}
                              >
                                Sign Up
                              </Button>
                            </FormGroup>
                          </Form>
                        )}
                      />
                    )}
                    <p className="text-muted">
                      By signing up you agree to{" "}
                      <Link to="/terms-condition" className="text-muted">
                        Terms of Service
                      </Link>
                    </p>
                    <div>
                      Already have an account?{" "}
                      <a className="mr-15" onClick={() => this.onUserSignIn()}>
                        Sign in
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
  const { loading } = authUser;
  return { loading };
};

export default connect(
  mapStateToProps,
  {
    signupUserInFirebase,
    signinUserWithFacebook,
    signinUserWithGoogle,
    signinUserWithGithub,
    signinUserWithTwitter
  }
)(SignupFirebase);
