import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * Check if value is a digit
 * @param {*} key
 */
const isNumber = key => {
	return /[0-9]/.test(key);
};

const InputNumber = ({ defaultValue }) => {
	const [state, setstate] = useState(defaultValue || 0);

	/**
	 * On value cahnge even handler
	 * @param {*} event argument
	 */
	const rangeChanged = e => {
		setState(e.target.value);
		this.props.onValueChange(e);
	};

	const handleChange = e => {};

	return <TextField value={state} onChange={handleChange} />;
};

export default InputNumber;
