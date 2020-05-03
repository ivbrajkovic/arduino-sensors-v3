import React, { useState } from 'react';

// Material-UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const PasswordField = props => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible(visible => !visible);

	const adornment = (
		<InputAdornment>
			<IconButton onClick={toggleVisibility}>
				{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
			</IconButton>
		</InputAdornment>
	);

	return (
		<TextField
			{...props}
			type={visible ? 'text' : 'password'}
			InputProps={{
				endAdornment: adornment
			}}
		></TextField>
	);
};

export default PasswordField;
