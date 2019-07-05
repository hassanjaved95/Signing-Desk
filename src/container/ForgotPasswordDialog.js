import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withSnackbar } from "notistack";

import AppConfig from "Constants/AppConfig";
import axios from "axios";

class ForgotPasswordDialog extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    this.setState({ loading: true });

    try {
      await axios.post(AppConfig.apiBaseUrl + "/users/forgot-password", {
        email: values.email
      });
      this.setState({ loading: false });

      setSubmitting(false);
      this.props.enqueueSnackbar(
        `Password reset instructions has been emailed to ${values.email}`,
        {
          variant: "success"
        }
      );

      resetForm();
      this.props.onClose();
    } catch (error) {
      this.setState({ loading: false });
      setSubmitting(false);

      this.props.enqueueSnackbar(error.message, {
        variant: "error"
      });
    }
  };

  render() {
    const forgotPasswordSchema = Yup.object().shape({
      email: Yup.string()
        .email("Please provide a valid email address.")
        .required("Please provide an email address.")
    });

    const { loading } = this.state;
    return (
      <Formik
        validateOnBlur={false}
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={this.handleSubmit}
        render={({ submitForm, isSubmitting, resetForm }) => (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.props.open}
            onClose={this.props.onClose}
            aria-labelledby="form-dialog-title"
          >
            {loading && <LinearProgress />}
            <DialogTitle id="form-dialog-title">
              <div className="font-weight-bold">Forgot Password</div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Provide your email and we'll send you password reset
                instructions.
              </DialogContentText>
              <Form>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  component={TextField}
                  autoFocus
                  margin="dense"
                  fullWidth
                  disabled={isSubmitting}
                />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className="text-white"
              >
                Continue
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  resetForm();
                  this.props.onClose();
                }}
                color="secondary"
                disabled={isSubmitting}
                className="text-white"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
      />
    );
  }
}

ForgotPasswordDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.func,
  enqueueSnackbar: PropTypes.func
};

export default withSnackbar(ForgotPasswordDialog);
