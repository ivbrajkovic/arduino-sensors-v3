/**
 * Sidebar button
 */

// React / Router
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemButton = ({ selected, text, icon: Icon, to }) => (
  <ListItem button component={Link} to={to} selected={selected}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const NavButton = props => (
  <Switch>
    <Route exact path={props.to}>
      {ListItemButton({ ...props, selected: true })}
    </Route>
    <Route path='/'>{ListItemButton(props)}</Route>
  </Switch>
);

export default NavButton;
