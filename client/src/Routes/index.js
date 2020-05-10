// Routes with transition effect

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Pages
import pages from '../pages';

// Components
import Copyright from '../components/Copyright';
import PageTransition from '../components/PageTransition';

const Routes = () => {
  const login = useSelector(state => state.user.login);

  // create routes from array
  return pages.map(
    ({ path, Component, privateRoute }) =>
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
