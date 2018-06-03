import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import logo from '../../logo.svg';
import './navigation.css';


const Navigation = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="container">
          <Avatar
            alt="React Icon"
            src={logo}
            className="logo"
          />
          <Typography variant="title" color="inherit" className={classes.flex}>
            <NavLink to="/authors">Authors</NavLink>
          </Typography>
          <Typography variant="title" color="inherit">
            <NavLink to="/login">Login</NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

export default withStyles(styles)(Navigation);
