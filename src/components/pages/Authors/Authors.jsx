import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generate as id } from 'shortid';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Spinner from 'react-spinkit';
import ErrorBoundary from '../../../ErrorBoundary.jsx';

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
const columnHeaderData = [
  { id: id(), name: 'name', label: 'Name' },
  { id: id(), name: 'username', label: 'UserName' },
  { id: id(), name: '', label: 'Email' },
  { id: id(), name: '', label: 'Phone' },
  { id: id(), name: '', label: 'Website' },
  { id: id(), name: '', label: 'Company' },
];

class Authors extends Component {
  state = {
    visible: false,
    selected: [],
    order: 'asc',
    orderBy: 'name',
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

  handleCreateSort = (event, property) => {

      return (a, b) => {
        if (event === 'asc') {
          return a[property].toLowerCase().localeCompare(b[property].toLowerCase());
      } else {
          return b[property].toLowerCase().localeCompare(a[property].toLowerCase());
        }
      }
  };
  handleSort = (name) => this.setState(({ order }) => ({
    order: (order === 'asc') ? 'desc' : 'asc',
    orderBy: name,
  }));

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
    const { classes, getUsers, error, data, isLoading, isLoaded } = this.props;
    const { visible, selected, order, orderBy } = this.state;
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
                {
                  columnHeaderData.map((column) => (
                    <TableCell
                      key={column.id}
                      sortDirection={orderBy === column.name ? order : false}
                      onClick={() => this.handleSort(column.name)}
                    >
                      {
                        (column.name)
                          ? <Tooltip
                            title="Sort"
                            placement="top-start"
                            enterDelay={300}
                          >
                            <TableSortLabel
                              active={orderBy === column.name}
                              direction={order}
                            >
                              {column.label}
                            </TableSortLabel>
                          </Tooltip>
                          : column.label
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.sort(this.handleCreateSort(order, orderBy)).map((user) => {
                  const isSelected = this.isSelected(user.id);
                  return <Author key={user.id} user={user}
                                 isSelected={isSelected}
                                 onSelect={this.handleSelect}
                  />;
                })
              }
            </TableBody>
          </Table>
          {(error) && <ErrorBoundary title="Articles were not found" />}
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
}

Authors.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
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
    error: users.error,
  }),
  { getUsers },
)(withStyles(styles)(Authors));
