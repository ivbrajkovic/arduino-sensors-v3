// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

import React, { cloneElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getRedirect = (login, location, match, children) => {
	console.log('TCL: getRedirect -> login', login);

	if (login) return cloneElement(children, { match: match });
	else
		return (
			<Redirect
				to={{
					pathname: '/login',
					state: { from: location }
				}}
			/>
		);
};

const PrivateRoute = ({ children, ...rest }) => {
	const login = useSelector(state => state.user.login);

	return (
		<>
			{(login && (
				<Route {...rest}>{({ match }) => cloneElement(children, { match: match })}</Route>
			)) || (
				<Route {...rest}>
					{({ location }) => {
						console.log('TCL: PrivateRoute -> location', location);

						return <Redirect to={{ pathname: '/login' }} />;
					}}
				</Route>
			)}
		</>
	);
};

export default PrivateRoute;

// return (
// 	<Route
// 		{...rest}
// 		render={({ location }) =>
// 			//isPrivate && login ? (
// 			login ? (
// 				children
// 			) : (
// 				<Redirect
// 					to={{
// 						pathname: '/login',
// 						state: { from: location }
// 					}}
// 				/>
// 			)
// 		}
// 	/>
// );
