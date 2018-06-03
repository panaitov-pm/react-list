import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Spinner from 'react-spinkit';

import Author from './Author';
import ToolbarTitleSelectedCount from './ToolbarTitleSelectedCount';
import getUsers from '../../../actions/getUsers';

import './Articles.css';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
});

class Authors extends Component {
  state = {
    visible: false,
    selected: [],
  };

  componentDidMount() {
    this.setState({
      visible: true,
    });
  };

  componentWillUnmount() {
    this.setState({
      visible: false,
      selected: [],
    });
  };

  handleSelectAll = (event, checked) => {
    const { data } = this.props;
    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleSelect = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, getUsers, data, isLoading, isLoaded } = this.props;
    const { visible, selected } = this.state;
    const numSelected = selected.length;
    const rowCount = data.length;

    return (
      <div className="container">
        <Paper className={classes.root}>
          <ToolbarTitleSelectedCount title="Users" numSelected={numSelected} />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={this.handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map((user) => {
                    const isSelected = this.isSelected(user.id);
                    return <Author key={user.id} user={user}
                                   isSelected={isSelected}
                                   onSelect={this.handleSelect}
                    />;
                  },
                )
              }
            </TableBody>
          </Table>
        </Paper>
        <div className="articles__action">
          {
            (!isLoaded)
            &&
            <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
              <Button
                className={classes.button}
                variant="raised"
                color="primary"
                onClick={getUsers}
                disabled={isLoading}
              >
                Download
                <FileDownload className={classes.rightIcon} />
              </Button>
            </Slide>
          }
        </div>
        <Fade in={isLoading}>
          <div className={!isLoading ? 'loader' : 'loader is-active'}>
            <Spinner name="folding-cube" color="#3f51b5" />
          </div>
        </Fade>
      </div>
    );
  }
};

Authors.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
};

Authors.defaultProps = {
  data: [],
  isLoading: false,
  isLoaded: false,
};


export default connect(
  ({ users }) => ({
    data: users.data,
    isLoading: users.isLoading,
    isLoaded: users.isLoaded,
  }),
  { getUsers },
)(withStyles(styles)(Authors));
