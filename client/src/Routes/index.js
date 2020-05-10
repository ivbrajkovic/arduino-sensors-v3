/**
 * Router
 */

// React / Redux
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Application pages
import pages from '../pages';

// Components
import Copyright from '../components/Copyright';
import PageTransition from '../components/PageTransition';

const Routes = () => {
  // Check login status
  const login = useSelector(state => state.user.login);

  // create routes from array
  return pages.map(
    ({ path, Component, privateRoute }) =>
      // If private route and user is not loggedin
      // redirect to login page
      (privateRoute && !login && (
        <Route exact path={path}>
          <Redirect to='/login' />
        </Route>
      )) || (
        <Route exact path={path}>
          {({ match }) => (
            <PageTransition match={match}>
              <Component />
              <Copyright />
            </PageTransition>
          )}
        </Route>
      )
  );
};

export default Routes;
