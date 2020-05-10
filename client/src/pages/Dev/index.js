/**
 * Developer page (debug only)
 */

import React, { useState, useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  loginAction,
  logoutAction,
  setErrorAction,
  clearErrorsAction,
  setDarkThemeAction,
  setDevMenuAction,
  setShowAllErrors
} from '../../store/actions';

// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import orange from '@material-ui/core/colors/orange';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import DataView from '../../components/DataView';

// Utility
import { isNumber, trimLeadingZeros } from '../../helper';

// Custom styles
import useStyles from './style';

const Dev = () => {
  const classes = useStyles();
  const widthMaxXS = useMediaQuery('(max-width:599.99px)');

  /************************************************************
   * Redux, global state
   ************************************************************/

  const dispatch = useDispatch();
  const showAllErrors = useSelector(store => store.ui.settings.showAllErrors);
  const themeHandler = e => dispatch(setDarkThemeAction(e.target.checked));
  const devMenuHandler = e => dispatch(setDevMenuAction(e.target.checked));

  /************************************************************
   * Debug add dummy data on interval
   ************************************************************/

  const intervalRef = useRef();
  const [started, setStarted] = useState(false);
  const [data, setData] = useState({ x: new Date().getTime(), y: 0 });

  // Update chart data on interval
  const startInterval = () => {
    if (started) {
      clearInterval(intervalRef.current);
      setStarted(false);
    } else {
      intervalRef.current = setInterval(() => {
        const x = new Date().getTime();
        const y = Math.floor(Math.random() * 50) + 1;
        setData({ x: x, y: y });
      }, 2000);
      setStarted(true);
    }
  };

  /************************************************************
   * Errors
   ************************************************************/

  const [error, setError] = useState();

  /************************************************************
   * Sensors limits
   ************************************************************/

  const [limits, setLimits] = useState({ max: 0, min: 0 });

  // On key press event handler
  const textKeyPress = e => {
    if (!isNumber(e.key)) e.preventDefault();
  };

  // Limits text change handler
  const changeTextHandler = e => {
    let { name, value } = e.target;
    (value === '' && (value = '0')) || (value = trimLeadingZeros(value));
    setLimits({ ...limits, [name]: value });
  };

  const tempBand = {
    color: green[200],
    from: 10,
    to: 35
  };

  return (
    <div>
      <Box mb={[1, 2]}>
        <Button
          variant='contained'
          className={classes.button}
          onClick={() => dispatch(setShowAllErrors(!showAllErrors))}
        >
          {(showAllErrors && 'Filter errors') || 'All errors'}
        </Button>

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
      </Box>

      <Box mb={[1, 2]}>
        <TextField
          label='error'
          value={error}
          className={classes.errorTextField}
          onChange={e => setError(e.target.value)}
        />

        <Button
          variant='contained'
          className={classes.button}
          onClick={() =>
            dispatch(
              setErrorAction({
                code: 'dev_message',
                message: error,
                details: []
              })
            )
          }
        >
          Set error
        </Button>

        <Button
          variant='contained'
          className={classes.button}
          onClick={() => dispatch(clearErrorsAction())}
        >
          Clear error
        </Button>
      </Box>

      <Box mb={[2, 4]} display='flex' alignItems='center'>
        <TextField
          label='lower'
          name='min'
          value={limits.min}
          className={classes.textField}
          onChange={changeTextHandler}
          onKeyPress={textKeyPress}
        />

        <TextField
          label='upper'
          name='max'
          value={limits.max}
          className={classes.textField}
          onChange={changeTextHandler}
          onKeyPress={textKeyPress}
        />

        <Button
          variant='contained'
          className={classes.button}
          onClick={startInterval}
        >
          {started ? 'Stop' : 'Start'}
        </Button>
      </Box>

      {/* <div style={{ maxWidth: '80%', margin: '0 auto' }}> */}
      <div>
        <DataView
          size={widthMaxXS ? 250 : 300}
          elevation={12}
          //title={composeTitle('Temperature')}
          title={'Temperature'}
          symbol={176}
          data={data}
          maxItems={10}
          limits={limits}
          priColor={orange[400]}
          secColor={null}
          chartBand={tempBand}
          showChartTitle={false}
        />
      </div>
    </div>
  );
};

export default Dev;
