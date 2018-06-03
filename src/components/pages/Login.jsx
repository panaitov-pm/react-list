import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import classNames from 'classnames';

import './Login.css';
import { saveUserInfo } from '../../actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  componentDidMount() {
    const {name, email} = this.props;
    this.setState({
      name,
      email,
      disabled: ( !(name.length > 0 && email.length > 0) ) });
  }

  handleChange = ({target}) => this.setState(() => ({
      [target.name]: target.value
    }),() => {
      const {name, email} = this.state;
      (name.length > 0 && email.length > 0)
        ? this.setState({ disabled: false })
        : this.setState({ disabled: true });
    });
  handleSaveUserInfo = (e) => {
    e.preventDefault();
    const {saveUserInfo} = this.props;
    const {name, email} = this.state;
    saveUserInfo({name, email});
    this.setState({
      name: '',
      email: '',
      disabled: true,
    });
  };
  render() {
    const { classes } = this.props;
    const {name, email, disabled} = this.state;
    return (
      <div className="container">
        <form className={classes.container} noValidate
              autoComplete="off" onSubmit={this.handleSaveUserInfo}>
          <TextField
            id="name"
            label="Name"
            name="name"
            className={classes.textField}
            value={name}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            value={email}
            type="email"
            className={classes.textField}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button type="submit" className={classes.button} variant="raised"
                  size="small" color="primary" disabled={disabled}>
            <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
            Save
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  saveUserInfo: PropTypes.func.isRequired
};

Login.defaultProps = {
  name: '',
  email: '',

};


const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
  }
});

export default connect(
  ({userInfo}) => ({
    name: userInfo.name,
    email: userInfo.email,
  }),
  {saveUserInfo}
)(withStyles(styles)(Login));
