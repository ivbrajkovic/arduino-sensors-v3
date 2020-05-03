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

// Firebase
import firebase from '../../firebase/firebase';

// Material UI
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

// Components
import DataView from '../../components/DataView';

// Hooks
import { useRedirect } from '../../hooks';

// Utility
import { logObj } from '../../lib';

// Custom styles
import useStyles from './style';

const defaultLimits = {
  max: 0,
  min: 0
};

const createUser = async () => {
  try {
    await firebase.signin('IB', 'ivan1.brajkovic@icloud.com', '123456789');
    getCurrenUserHandler();
  } catch (err) {
    console.log('logoutHandler -> err', err);
  }
};

const getCurrenUserHandler = () => {
  const user = firebase.getCurrentUser();
  console.log(
    'Currently logged user:',
    user ? (user.displayName ? user.displayName : user.email) : 'none'
  );
};

const addData = async dispatch => {
  try {
    await firebase.addData('sensors', null);
  } catch (err) {
    logObj(err);
    dispatch(setErrorAction(err));
  }
};

const Dev = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);
  // const [chart, setChart] = useState([{ y: 0, x: new Date().getTime() }]);
  const widthMaxXS = useMediaQuery('(max-width:599.99px)');

  // Redirect to loggin
  const loggedIn = useRedirect();

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

  // const addItem = item => {
  //   setChart([item]);
  // };

  // useEffect(() => {
  //   const labels = document.querySelectorAll(
  //     ".chart-container .axis, .chart-container .chart-label"
  //   );
  //   labels &&
  //     labels.forEach(label => {
  //       if (settings.darkTheme) label.classList.add("fill-white");
  //       else label.classList.remove("fill-white");
  //     });
  // }, [settings.darkTheme]);

  // Sensors limits
  const [limits, setLimits] = useState({});

  const themeHandler = () =>
    (settings.darkTheme && dispatch(setDarkThemeAction())) ||
    dispatch(clearDarkThemeAction());

  const devMenuHandler = () =>
    (settings.devMenu && dispatch(clearDevMenuAction())) ||
    dispatch(setDevMenuAction());

  // Loading effect
  useEffect(() => {
    loggedIn &&
      firebase
        .getDocumentData('settings', 'arduino0')
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            return;
          }
          const data = doc.data();
          setLimits({
            temperature: data.temperature,
            humidity: data.humidity,
            co2: data.co2
          });
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
  }, [loggedIn]);

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
            Logout
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={getCurrenUserHandler}
          >
            Get user
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={createUser}
          >
            New user
          </Button>
          <Button
            variant='contained'
            className={classes.button}
            onClick={() => addData(dispatch)}
          >
            Add data
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
