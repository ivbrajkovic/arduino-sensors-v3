// Layout - mini drawer

import React from 'react';
import clsx from 'clsx';

// Material UI
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';

// Components
import NavButton from '../../../components/NavButton';

// Custom styles
import useStyles from './style';

// const routes = [
// 	{ path: '/', name: 'Dashboard', icon: DashboardIcon },
// 	{ path: '/dev', name: 'Developer', icon: DeveloperModeIcon },
// 	{ path: '/settings', name: 'Settings', icon: SettingsIcon }
// ];

// Sidebar
const Sidebar = ({ open, drawerWidth, handleDrawerClose }) => {
	const classes = useStyles({ drawerWidth: drawerWidth });

	return (
		<Drawer
			variant='permanent'
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx('test', {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
			open={open}
		>
			{/* Menu close button */}
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>

			<Divider />

			{/* Button links */}
			<List>
				<NavButton icon={DashboardIcon} primary='Dashboard' to='/' />
				<NavButton icon={DeveloperModeIcon} primary='Developer' to='/dev' />
				<NavButton icon={SettingsIcon} primary='Settings' to='/settings' />
				<NavButton icon={HistoryIcon} primary='History' to='/history' />
				<Divider />
				<NavButton icon={InfoIcon} primary='About' to='/about' />
			</List>
		</Drawer>
	);
};

export default Sidebar;
