/**
 * Application component
 */

// Recat
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Hooks
import { useCheckToken } from '../../hooks';

// Material UI
import Container from '@material-ui/core/Container';

// Compponents
import Nav from '../Nav';
import Routes from '../../Routes';
import Snackbar from '../../components/Snackbar';

// Styles
import useStyles from './style';

const App = () => {
  // Custom style
  const classes = useStyles();

  // Check if token in local storage is valid
  // and dispatch login if true
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
