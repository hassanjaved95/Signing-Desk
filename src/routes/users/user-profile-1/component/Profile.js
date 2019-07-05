/**
 * Profile Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";

import IntlMessages from "Util/IntlMessages";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import axios from "axios";
import AppConfig from "Constants/AppConfig";

import { updateProfile } from "Actions";
import { withSnackbar } from "notistack";

class Profile extends Component {
  state = {
    loading: false,
    jobTitles: [],
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false
  };

  componentDidMount() {
    axios
      .get(AppConfig.apiBaseUrl + "/jobtitles/all")
      .then(response => {
        let jobTitles = [];
        response.data.map(value => jobTitles.push(value.name));
        this.setState({
          jobTitles: jobTitles
        });
      })
      .catch(error => error);
  }

  handleClickShowCurrentPassword = () => {
    this.setState(state => ({
      showCurrentPassword: !state.showCurrentPassword
    }));
  };

  handleClickShowNewPassword = () => {
    this.setState(state => ({
      showNewPassword: !state.showNewPassword
    }));
  };

  handleClickShowConfirmNewPassword = () => {
    this.setState(state => ({
      showConfirmNewPassword: !state.showConfirmNewPassword
    }));
  };

  handlePersonalDetailsSubmit = async (values, { resetForm }) => {
    let newUser = {
      ...this.props.user.profile.info,
      firstName: values.firstName,
      lastName: values.lastName,
      jobTitle: values.jobTitle,
      company: values.company,
      phoneNumber: values.phoneNumber
    };

    this.props.updateProfile(newUser);
    resetForm({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      jobTitle: newUser.jobTitle,
      company: newUser.company,
      phoneNumber: newUser.phoneNumber
    });
  };

  handleChangePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    // this.setState({ loading: true });

    try {
      await axios.post(
        `${AppConfig.apiBaseUrl}/users/change-password`,
        {
          email: this.props.user.profile.user.email,
          password: values.currentPassword,
          newPassword: values.newPassword
        },
        {
          headers: { Authorization: `Bearer ${this.props.user.profile.user.token}` }
        }
      );

      // this.setState({ loading: false });
      resetForm();

      this.props.enqueueSnackbar(
        `Your password has been successfully changed.`,
        {
          variant: "success"
        }
      );
    } catch (error) {
      // this.setState({ loading: false });
      setSubmitting(false);

      let message;
      if (error.response) {
        message = error.response.data.message;
      } else {
        message = error.message;
      }

      this.props.enqueueSnackbar(message, {
        variant: "error"
      });
    }
  };

  render() {
    const personalDetailsSchema = Yup.object().shape({
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
      phoneNumber: Yup.string().required("Phone number is required."),
      company: Yup.string().required("Company is required.")
    });

    const changePasswordSchema = Yup.object().shape({
      currentPassword: Yup.string().required(
        "Please provide your current password."
      ),
      newPassword: Yup.string()
        .min(6, "Your password must be at least six characters long.")
        .required("Please provide your new password."),
      confirmNewPassword: Yup.string()
        .required("Please confirm your new password.")
        .when("newPassword", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Passwords do not match."
          )
        })
    });

    const { loading } = this.props;
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Formik
          validateOnBlur={false}
          initialValues={{
            firstName: this.props.user.profile.info.firstName,
            lastName: this.props.user.profile.info.lastName,
            jobTitle: this.props.user.profile.info.jobTitle,
            company: this.props.user.profile.info.company,
            phoneNumber: this.props.user.profile.info.phoneNumber
          }}
          validationSchema={personalDetailsSchema}
          onSubmit={this.handlePersonalDetailsSubmit}
          render={({ dirty, isSubmitting }) => (
            <Form>
              <Field
                name="firstName"
                type="text"
                label="First Name"
                component={TextField}
                autoFocus
                margin="normal"
                fullWidth
                disabled={isSubmitting}
              />
              <Field
                name="lastName"
                type="text"
                label="Last Name"
                component={TextField}
                margin="normal"
                fullWidth
                disabled={isSubmitting}
              />
              <Field
                name="jobTitle"
                label="Job Title"
                component={TextField}
                select
                margin="normal"
                fullWidth
                disabled={isSubmitting}
              >
                {this.state.jobTitles.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="company"
                type="text"
                label="Company"
                component={TextField}
                margin="normal"
                fullWidth
                disabled={isSubmitting}
              />
              <Field
                name="phoneNumber"
                type="text"
                label="Phone"
                component={TextField}
                margin="normal"
                fullWidth
                disabled={isSubmitting}
              />
              <br />
              {loading && <LinearProgress />}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="text-white"
                style={{ marginTop: "24px" }}
                disabled={!dirty || isSubmitting}
              >
                Update
              </Button>
            </Form>
          )}
        />
        <hr />
        <h2 className="heading">Change Password</h2>
        <Formik
          validateOnBlur={false}
          validationSchema={changePasswordSchema}
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          }}
          onSubmit={this.handleChangePasswordSubmit}
          render={({ dirty, isSubmitting, values }) => (
            <Form>
              <Field
                name="currentPassword"
                type={this.state.showCurrentPassword ? "text" : "password"}
                label="Current Password"
                component={TextField}
                margin="dense"
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowCurrentPassword}
                      >
                        {this.state.showCurrentPassword ? (
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
                name="newPassword"
                type={this.state.showNewPassword ? "text" : "password"}
                label="New Password"
                component={TextField}
                margin="dense"
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowNewPassword}
                      >
                        {this.state.showNewPassword ? (
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
                name="confirmNewPassword"
                type={this.state.showConfirmNewPassword ? "text" : "password"}
                label="Confirm New Password"
                component={TextField}
                margin="dense"
                fullWidth
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowConfirmNewPassword}
                      >
                        {this.state.showConfirmNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {loading && <LinearProgress />}
              <Button
                type="submit"
                color="primary"
                className="text-white"
                variant="contained"
                style={{ marginTop: "24px" }}
                disabled={!dirty || isSubmitting}
              >
                Change
              </Button>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        />
        <hr />
        {/* <h2 className="heading">
          <IntlMessages id="components.social Connection" />
        </h2>
        <div>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-facebook" />
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.facebook.com" />
          </InputGroup>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-twitter" />
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.twitter.com" />
          </InputGroup>
          <InputGroup className="mb-20">
            <InputGroupAddon addonType="prepend">
              <IconButton aria-label="facebook">
                <i className="zmdi zmdi-linkedin" />
              </IconButton>
            </InputGroupAddon>
            <Input defaultValue="https://www.linkedin.com" />
          </InputGroup>
        </div>
        <hr /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default withSnackbar(
  connect(
    mapStateToProps,
    {
      updateProfile
    }
  )(Profile)
);
