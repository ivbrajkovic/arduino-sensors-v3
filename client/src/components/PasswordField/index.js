/**
 * Password form field
 */

// React
import React, { useState } from 'react';

// Material-UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Show / hide password icon
const adornment = (visible, clickHandler) => (
  <InputAdornment>
    <IconButton onClick={clickHandler}>
      {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  </InputAdornment>
);

const PasswordField = props => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(visible => !visible);

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: adornment(visible, toggleVisibility)
      }}
    ></TextField>
  );
};

export default PasswordField;
