/**
 * Switch list item
 */

import React from 'react';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const index = ({ Icon, name, primary, onChange, checked }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={primary} />
      <ListItemSecondaryAction>
        <Switch name={name} edge='end' onChange={onChange} checked={checked} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default index;
