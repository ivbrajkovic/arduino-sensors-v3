// Routes with transition effect

import React from 'react';
import { Route } from 'react-router-dom';

// Components
import Copyright from '../components/Copyright';
import PageTransition from '../components/PageTransition';
// import PrivateRoute from '../components/PrivateRoute';

// Pages
import { Login, Signup, Dashboard, Settings, Dev, History, About } from '../pages';

// Routes => Compoonents
const routes = [
	{ name: 'Login', path: '/login', Component: Login },
	{ name: 'Signup', path: '/signup', Component: Signup },
	{ name: 'Dashboard', path: '/', Component: Dashboard },
	{ name: 'Settings', path: '/settings', Component: Settings },
	{ name: 'Dev', path: '/dev', Component: Dev },
	{ name: 'History', path: '/history', Component: History },
	{ name: 'About', path: '/about', Component: About },
];

const Routes = () => {
	// create routes from array
	return routes.map(({ path, name, Component, privateRoute }) => (
		// if (privateRoute)
		// 	return (
		// 		<PrivateRoute key={path} exact path={path}>
		// 			<PageTransition>
		// 				<Component />
		// 				<Copyright />
		// 			</PageTransition>
		// 		</PrivateRoute>
		// 	);
		// else

		<Route key={path} exact path={path}>
			{({ match }) => (
				<PageTransition match={match}>
					<Component />
					<Copyright />
				</PageTransition>
			)}
		</Route>
	));
};

export default Routes;

/* <Route key={path} exact path={path}>
	{({ match }) => (
		<CSSTransition
			in={match != null}
			timeout={300}
			unmountOnExit
			classNames={{
				enter: classes.pageEnter,
				enterActive: classes.pageEnterActive,
				exit: classes.pageExit,
				exitActive: classes.pageExitActive
			}}
		>
			<div className={classes.page}>
				<Component />
				<Copyright />
			</div>
		</CSSTransition>
	)}
</Route>; */
