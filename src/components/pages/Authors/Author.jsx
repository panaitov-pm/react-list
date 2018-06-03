import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const Author = ({ user, isSelected, onSelect }) => {
  return (
    <TableRow
      hover
      onClick={() => onSelect(user.id)}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
      tabIndex={-1}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell component="th" scope="row">{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.website}</TableCell>
      <TableCell>{user.company.name}</TableCell>
    </TableRow>
  );
};

Author.propTypes = {
  user: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Author;
