import React from 'react';
import { SET_SENSOR_SETTINGS } from './types';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

// Custom styles
import useStyles from './style';

// Utility
import { isNumber } from '../../lib';

// On key press event handler
const textKeyPress = e => {
	if (!isNumber(e.key)) e.preventDefault();
};

const SensorListItem = ({
	Icon,
	primary,
	value,
	upperLimit,
	lowerLimit,
	hasChildren,
	dispatch
}) => {
	// console.log('SensorListItem -> primary', primary);
	const classes = useStyles();

	const changeHandler = e => {
		const name = e.target.name;
		const value = e.target.value;
		const sensor = (hasChildren && primary.toLowerCase()) || null;

		dispatch({
			type: SET_SENSOR_SETTINGS,
			payload: {
				sensor: sensor,
				name: name,
				value: value
			}
		});
		// dispatch(primary.toLowerCase(), name, value);
	};

	const blurHandler = e => {
		const value = e.target.value;
		if (value === '') {
			e.target.value = 0;
			changeHandler(e);
		}
	};

	return (
		<>
			{/* Title */}
			<ListItem>
				<ListItemIcon>
					<Icon />
				</ListItemIcon>
				<ListItemText primary={primary} />
				{!hasChildren && (
					<>
						<ListItemSecondaryAction>
							<TextField
								type='Number'
								name='updateInterval'
								className={classes.textField}
								value={value}
								onChange={changeHandler}
								onBlur={blurHandler}
								onKeyPress={textKeyPress}
							/>
						</ListItemSecondaryAction>
					</>
				)}
			</ListItem>

			{hasChildren && (
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
								name='max'
								className={classes.textField}
								value={upperLimit}
								onChange={changeHandler}
								onBlur={blurHandler}
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
								name='min'
								className={classes.textField}
								value={lowerLimit}
								onChange={changeHandler}
								onBlur={blurHandler}
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
