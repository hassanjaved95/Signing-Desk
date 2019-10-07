/**
 * Profile Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import { updateProfile } from "Actions";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class General extends Component {
  state = {
    value: this.props.user.profile.general.landingPage.toString(),
    saving: false,
    dirty: false
  };

  onSave = async () => {
    this.setState({ saving: true });
    // let newUser = {
    //   ...this.props.user.profile.general,
    //   landingPage: +this.state.value
    // };

    const info = {
      ...this.props.user.profile.info,
    };
    
    var signature = {
      ...this.props.user.profile.signature
    }
    var general = {
      ...this.props.user.profile.general,
      landingPage: +this.state.value
    }

    const profile = {
      profile: {
        info,
        signature,
        general
      }
    }

    this.props.updateProfile(profile);
    this.setState({ saving: false, dirty: false });
  };

  handleChange = event => {
    this.setState({ value: event.target.value, dirty: true });
    // this.setState({
    //   user: {
    //     ...this.props.user,
    //     landingPage: +event.target.value
    //   }
    // });

    // const value = event.target.value;
    // this.setState(state => ({
    //   user: {
    //     ...state.user,
    //     landingPage: +value
    //   }
    // }));
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.props;
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">Miscellaneous</h2>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Landing Page</FormLabel>
          <RadioGroup
            aria-label="Landing Page"
            name="landingPage"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel value="0" control={<Radio />} label="Dashboard" />
            <FormControlLabel value="1" control={<Radio />} label="Documents" />
          </RadioGroup>
          {loading && <LinearProgress />}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="text-white"
          style={{ display: "block" }}
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

General.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      updateProfile
    }
  )(General)
);
