// Developer page (debug only)

import React, { useState, useRef, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  loginAction,
  logoutAction,
  setErrorAction,
  setDarkThemeAction,
  clearDarkThemeAction,
  setDevMenuAction,
  clearDevMenuAction
} from '../../store/actions';

// Material UI
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

// Components
import DataView from '../../components/DataView';

// Hooks
import { useRedirectToLogin } from '../../hooks';

// Utility
import { logObj } from '../../helper';

// Custom styles
import useStyles from './style';

const defaultLimits = {
  max: 0,
  min: 0
};

const Dev = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);
  // const [chart, setChart] = useState([{ y: 0, x: new Date().getTime() }]);
  const widthMaxXS = useMediaQuery('(max-width:599.99px)');

  // Redirect to loggin
  const loggedIn = useRedirectToLogin();

  // Debug add dummy data on interval
  const intervalRef = useRef();
  const [started, setStarted] = useState(false);
  const [state, setState] = useState({ x: new Date().getTime(), y: 0 });

  const startInterval = _ => {
    if (started) {
      clearInterval(intervalRef.current);
      setStarted(false);
    } else {
      intervalRef.current = setInterval(() => {
        const x = new Date().getTime();
        const y = Math.floor(Math.random() * 50) + 1;
        setState({ x: x, y: y });
      }, 2000);
      setStarted(true);
    }
  };

  // Sensors limits
  const [limits, setLimits] = useState({});

  const themeHandler = () =>
    (settings.darkTheme && dispatch(setDarkThemeAction())) ||
    dispatch(clearDarkThemeAction());

  const devMenuHandler = () =>
    (settings.devMenu && dispatch(clearDevMenuAction())) ||
    dispatch(setDevMenuAction());

  // Compose title
  const composeTitle = title => {
    console.log('Dev -> limits', limits);
    const sensor = title.toLowerCase();
    if (limits[sensor])
      return `${title} (upper: ${limits[sensor].max}, lower: ${limits[sensor].min})`;
    else return title;
  };

  const tempBand = {
    color: green[200],
    from: 10,
    to: 35
  };

  return (
    <>
      {loggedIn && (
        <div>
          <Button
            variant='contained'
            className={classes.button}
            onClick={() =>
              dispatch(loginAction('ivan.brajkovic@icloud.com', '123456789'))
            }
          >
            Login
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={() => dispatch(logoutAction())}
          >
            Logout{' '}
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={themeHandler}
          >
            Dark teme
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={devMenuHandler}
          >
            Dev menu
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={startInterval}
          >
            {started ? 'Stop' : 'Start'}
          </Button>

          <br />
          <br />

          {/* <div style={{ maxWidth: '80%', margin: '0 auto' }}> */}
          <div>
            <DataView
              size={widthMaxXS ? 250 : 300}
              elevation={12}
              //title={composeTitle('Temperature')}
              title={'Temperature'}
              symbol={176}
              data={state}
              maxItems={10}
              limits={limits.temperature || defaultLimits}
              priColor={orange[400]}
              secColor={null}
              chartBand={tempBand}
              showChartTitle={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dev;
