// Custom ListItem button

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemButton = (/* color,*/ selected, text, Icon, to) => (
	<ListItem button component={Link} to={to} selected={selected}>
		<ListItemIcon>
			<Icon /* color={color || 'primary'} */ />
		</ListItemIcon>
		<ListItemText primary={text} />
	</ListItem>
);

const NavButton = ({ /* color, */ primary, icon: Icon, ...props }) => (
	<Switch>
		<Route exact path={props.to}>
			{ListItemButton(/*color, */ true, primary, Icon, props.to)}
		</Route>
		<Route path='/'>{ListItemButton(/* 'action', */ false, primary, Icon, props.to)}</Route>
	</Switch>
);

export default NavButton;
