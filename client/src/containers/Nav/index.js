// Navigation with topbar and sidebar

import React, { useState } from 'react';

// Custom components
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Nav = () => {
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Topbar open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} />
			<Sidebar open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} />
		</>
	);
};

export default Nav;
