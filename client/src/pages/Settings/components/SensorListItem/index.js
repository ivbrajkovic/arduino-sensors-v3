/**
 * Sensor list item
 */

// React
import React from 'react';

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Custom styles
import useStyles from './style';

// Utility
import { isNumber } from '../../../../helper';

// On key press event handler
const textKeyPress = e => {
  if (!isNumber(e.key)) e.preventDefault();
};

const SensorListItem = ({
  Icon,
  name,
  primary,
  value,
  selected,
  upperLimit,
  lowerLimit,
  nested,
  dispatch
}) => {
  const classes = useStyles();

  const changeHandler = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_VALUE',
      payload: { selected, name, value }
    });
  };

  return (
    <>
      {/* Title */}
      <ListItem>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={primary} />
        {!nested && (
          <>
            <ListItemSecondaryAction>
              <TextField
                type='Number'
                name={name}
                value={value}
                className={classes.textField}
                onChange={changeHandler}
                onKeyPress={textKeyPress}
              />
            </ListItemSecondaryAction>
          </>
        )}
      </ListItem>

      {nested && (
        <>
          {/* Upper limit */}
          <ListItem dense className={classes.listItem}>
            <ListItemIcon>
              <VerticalAlignTopIcon />
            </ListItemIcon>
            <ListItemText primary='Upper limit' />
            <ListItemSecondaryAction>
              <TextField
                type='Number'
                name={`${name}-max`}
                value={upperLimit}
                className={classes.textField}
                onChange={changeHandler}
                onKeyPress={textKeyPress}
              />
            </ListItemSecondaryAction>
          </ListItem>

          {/* Lower limit */}
          <ListItem dense className={classes.listItem}>
            <ListItemIcon>
              <VerticalAlignBottomIcon />
            </ListItemIcon>
            <ListItemText primary='Lower limit' />
            <ListItemSecondaryAction>
              <TextField
                type='Number'
                name={`${name}-min`}
                value={lowerLimit}
                className={classes.textField}
                onChange={changeHandler}
                onKeyPress={textKeyPress}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </>
      )}
    </>
  );
};

export default SensorListItem;
