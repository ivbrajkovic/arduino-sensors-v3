// Navigation topbar

import React, { useReducer, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { darkThemeAction, devMenuAction } from '../../store/actions';

// Local reducer
import { initialState, settingsReducer } from './reducer';
import { SET_STATE, SET_CONTROL } from './types.js';

// Material UI
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

// Material UI icons
import ToysIcon from '@material-ui/icons/Toys';
import BuildIcon from '@material-ui/icons/Build';
import UpdateIcon from '@material-ui/icons/Update';
import OpacityIcon from '@material-ui/icons/Opacity';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

// Hooks
import { useRedirect } from '../../hooks';

// Custom component
import SensorListItem from './sensor';

// Custom styles
import useStyles from './style';

// Firebase
import firebase from '../../firebase/firebase';

// Control switch change
const controlSwitchChangeHandler = (e, dispatch) => {
  const name = e.target.name;
  const checked = e.target.checked;

  dispatch({
    type: SET_CONTROL,
    payload: { name: name, value: checked }
  });

  firebase
    .updateDocumentData('settings', 'arduino0', { [name]: checked })
    .then(console.log('Settings successfully updated!'))
    .catch(error => console.error('Error updating settings: ', error));
};

// Button click handler
const uploadSensorSetings = state => {
  firebase
    .addDocumentData('settings', 'arduino0', state)
    .then(console.log('Settings successfully written!'))
    .catch(error => console.error('Error writing settings: ', error));
};

// Settings component
const Settings = () => {
  // Redirect to loggin
  const loggedIn = useRedirect();

  // Styles
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);

  // Reducer
  const [state, dispatchSettings] = useReducer(settingsReducer, initialState);

  // Lading effect
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
          // console.log('Settings -> data', data);
          dispatchSettings({ type: SET_STATE, payload: data });
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
  }, [loggedIn]);

  // Do not render if not logged in
  if (!loggedIn) return null;

  return (
    <Paper elevation={12} className={classes.root}>
      {/* Settings */}
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        {/* Datk tehem switch */}
        <ListItem>
          <ListItemIcon>
            {(settings.darkTheme && <Brightness4Icon />) || <Brightness7Icon />}
          </ListItemIcon>
          <ListItemText primary='Dark theme' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              onChange={() => dispatch(darkThemeAction(!settings.darkTheme))}
              checked={settings.darkTheme}
            />
          </ListItemSecondaryAction>
        </ListItem>

        {/* Dev menu switch */}
        <ListItem>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary='Developer menu' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              onChange={() => dispatch(devMenuAction(!settings.devMenu))}
              checked={settings.devMenu}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider />

      {/* Control */}
      <List subheader={<ListSubheader>Control</ListSubheader>}>
        {/* Led switch */}
        <ListItem>
          <ListItemIcon>
            <WbIncandescentIcon />
          </ListItemIcon>
          <ListItemText primary='Led switch' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              name='led'
              checked={state.led}
              onChange={e => controlSwitchChangeHandler(e, dispatchSettings)}
            />
          </ListItemSecondaryAction>
        </ListItem>

        {/* Fan switch */}
        <ListItem>
          <ListItemIcon>
            <ToysIcon />
          </ListItemIcon>
          <ListItemText primary='Fan switch' />
          <ListItemSecondaryAction>
            <Switch
              edge='end'
              name='fan'
              checked={state.fan}
              onChange={e => controlSwitchChangeHandler(e, dispatchSettings)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider />

      {/* Sensors */}
      <List subheader={<ListSubheader>Sensors</ListSubheader>}>
        {/* Update interval */}

        <SensorListItem
          Icon={UpdateIcon}
          primary='updateInterval'
          value={state.updateInterval}
          dispatch={dispatchSettings}
        />

        {/* Temperature sensor settings */}
        <SensorListItem
          hasChildren
          Icon={WbSunnyIcon}
          primary='Temperature'
          upperLimit={state.temperature.max}
          lowerLimit={state.temperature.min}
          dispatch={dispatchSettings}
        />

        {/* Humidity sensor settings */}
        <SensorListItem
          hasChildren
          Icon={OpacityIcon}
          primary='Humidity'
          upperLimit={state.humidity.max}
          lowerLimit={state.humidity.min}
          dispatch={dispatchSettings}
        />

        {/* CO2 sensor settings */}
        <SensorListItem
          hasChildren
          Icon={ScatterPlotIcon}
          primary='CO2'
          upperLimit={state.co2.max}
          lowerLimit={state.co2.min}
          dispatch={dispatchSettings}
        />

        <ListItem className={classes.buttonContainer}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => uploadSensorSetings(state)}
          >
            Save
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Settings;
