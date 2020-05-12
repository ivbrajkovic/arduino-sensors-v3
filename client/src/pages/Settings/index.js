// Navigation topbar

import React, { useState, useReducer, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setDarkThemeAction,
  setDevMenuAction,
  setShowAllErrors,
  setErrorAction
} from '../../store/actions';

// Reducer
import { initialState, settingsReducer } from './reducer';

// Material UI
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Material UI icons
import ToysIcon from '@material-ui/icons/Toys';
import ErrorIcon from '@material-ui/icons/Error';
import BuildIcon from '@material-ui/icons/Build';
import RouterIcon from '@material-ui/icons/Router';
import UpdateIcon from '@material-ui/icons/Update';
import OpacityIcon from '@material-ui/icons/Opacity';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

// Custom component
import SensorListItem from './components/SensorListItem';
import SwitchListItem from './components/SwitchListItem';

// Custom styles
import useStyles from './style';

// Helper fnc
import { fetchHelper } from '../../helper';

// Update arduino settings into database
const updateArduino = async (data, dispatch) => {
  try {
    // Fetch update arduio API
    await fetchHelper({
      url: '/settings',
      method: 'PUT',
      token: window.localStorage.getItem('token'),
      data
    });
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

// Settings component
const Settings = () => {
  // console.log('Settings -> page');

  // Styles
  const classes = useStyles();

  /************************************************************
   * Redux - global state
   ************************************************************/
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);

  const themeHandler = e => dispatch(setDarkThemeAction(e.target.checked));

  const devMenuHandler = e => dispatch(setDevMenuAction(e.target.checked));

  const showAllErrorsHandler = e =>
    dispatch(setShowAllErrors(e.target.checked));

  /************************************************************
   * Sate, reducer - local state
   ************************************************************/

  // Selected arduino
  const [selected, setSelected] = useState(0);
  const selectChange = event => setSelected(event.target.value);

  // Arduionos reducer
  const [state, dispatchReducer] = useReducer(settingsReducer, initialState);

  // Control switch change
  const switchChangeHandler = e => {
    const { name, checked } = e.target;
    dispatchReducer({
      type: 'SET_CONTROL',
      payload: { selected, name, value: checked ? 1 : 0 }
    });
    updateArduino(state.arduinos[selected], dispatchReducer);
  };

  // Handle save button click
  const handleButtonClick = () => {
    dispatchReducer({ type: 'DISABLE_BUTTON' });
    updateArduino(state.arduinos[selected]);
  };

  // Get arduions from database
  useEffect(() => {
    const getArduinos = async () => {
      try {
        // Fetch arduinos from API
        const { data } = await fetchHelper({
          url: '/settings',
          token: window.localStorage.getItem('token')
        });

        // Format response from API
        for (let i = 0; i < data.length; i++) {
          data[i].co2 = JSON.parse(data[i].co2);
          data[i].humidity = JSON.parse(data[i].humidity);
          data[i].temperature = JSON.parse(data[i].temperature);
        }

        // Set data state
        dispatchReducer({ type: 'SET_STATE', payload: data });
      } catch (error) {
        dispatch(setErrorAction(error));
      }
    };
    getArduinos();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper elevation={12} className={classes.root}>
      {/* Settings list*/}
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        {/* Dark theme switch */}
        <SwitchListItem
          Icon={(settings.darkTheme && Brightness4Icon) || Brightness7Icon}
          primary='Dark theme'
          onChange={themeHandler}
          checked={settings.darkTheme}
        />

        {/* Dev menu switch */}
        <SwitchListItem
          Icon={BuildIcon}
          primary='Developer menu'
          onChange={devMenuHandler}
          checked={settings.devMenu}
        />

        {/* Show all errors switch */}
        <SwitchListItem
          Icon={ErrorIcon}
          primary='Show all errors'
          onChange={showAllErrorsHandler}
          checked={settings.showAllErrors}
        />
      </List>

      <Divider />

      {/* Device list */}
      <List subheader={<ListSubheader>Device</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <RouterIcon />
          </ListItemIcon>
          <ListItemText primary='Select device' />
          <ListItemSecondaryAction>
            <Select value={selected} onChange={selectChange}>
              {state.arduinos.map((el, i) => (
                <MenuItem key={i} value={i}>
                  Arduino {el.arduino}
                </MenuItem>
              ))}
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider />

      {/* Control list*/}
      <List subheader={<ListSubheader>Control</ListSubheader>}>
        {/* Led switch */}
        <SwitchListItem
          Icon={WbIncandescentIcon}
          name='led'
          primary='Led switch'
          checked={!!state.arduinos[selected]?.led}
          onChange={e => switchChangeHandler(e, dispatchReducer)}
        />

        {/* Fan switch */}
        <SwitchListItem
          Icon={ToysIcon}
          name='fan'
          primary='Fan switch'
          checked={!!state.arduinos[selected]?.fan}
          onChange={e => switchChangeHandler(e, dispatchReducer)}
        />
      </List>

      <Divider />

      {/* Sensors list*/}
      <List subheader={<ListSubheader>Sensors</ListSubheader>}>
        {/* Update interval */}
        <SensorListItem
          Icon={UpdateIcon}
          name='updateInterval'
          primary='Update interval'
          selected={selected}
          value={state.arduinos[selected]?.updateInterval}
          dispatch={dispatchReducer}
        />

        {/* Temperature sensor settings */}
        <SensorListItem
          nested
          Icon={WbSunnyIcon}
          name='temperature'
          primary='Temperature'
          selected={selected}
          upperLimit={state.arduinos[selected]?.temperature.max}
          lowerLimit={state.arduinos[selected]?.temperature.min}
          dispatch={dispatchReducer}
        />

        {/* Humidity sensor settings */}
        <SensorListItem
          nested
          Icon={OpacityIcon}
          name='humidity'
          primary='Humidity'
          selected={selected}
          upperLimit={state.arduinos[selected]?.humidity.max}
          lowerLimit={state.arduinos[selected]?.humidity.min}
          dispatch={dispatchReducer}
        />

        {/* CO2 sensor settings */}
        <SensorListItem
          nested
          Icon={ScatterPlotIcon}
          name='co2'
          primary='CO2'
          selected={selected}
          upperLimit={state.arduinos[selected]?.co2.max}
          lowerLimit={state.arduinos[selected]?.co2.min}
          dispatch={dispatchReducer}
        />

        {/* Save button */}
        <ListItem className={classes.buttonContainer}>
          <Button
            disabled={state.buttonDisabled}
            variant='contained'
            color='primary'
            onClick={handleButtonClick}
          >
            Save
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Settings;
