// Main application

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Hooks
// import { useAuthStateChanged } from '../../hooks';
import { useCheckToken } from '../../hooks';

// Material UI
// import clsx from 'clsx';
// import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// Compponents
import Nav from '../Nav';
import Routes from '../../Routes';
import Snackbar from '../../components/Snackbar';

// Styles
import useStyles from './style';

const App = () => {
  const classes = useStyles();

  // Listen fro firebase authorization change
  // useAuthStateChanged();
  useCheckToken();

  return (
    <div className={classes.root}>
      <Snackbar />
      <Router>
        <Nav />
        <Container component='main' className={classes.pageContainer}>
          <div className={classes.toolbarMargin} />
          <Switch>
            <Routes />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
