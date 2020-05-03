import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Custom styles
import useStyles from './style';

// const defaultLimits = {
// 	max: 0,
// 	min: 0
// };

const SensorMeter = ({ title, symbol, size, value, limits, priColor, secColor }) => {
	// console.log('TCL: SensorMeter');

	const classes = useStyles({ colors: [priColor, secColor] });

	const [min, setMin] = useState(value);
	const [max, setMax] = useState(value);

	const error = value < limits.min || value > limits.max;
	const charSymbol = String.fromCharCode(symbol);

	useEffect(() => {
		// console.log('TCL: SensorMeter -> useEffect');
		if (value < min) setMin(value);
		else if (value > max) setMax(value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<div className={classes.root}>
			<Typography variant='subtitle1' className={classes.title}>
				{title}
			</Typography>
			<Typography variant='caption' className={classes.subtitle}>
				{`upper: ${limits.max}${charSymbol}, lower: ${limits.min}${charSymbol}`}
			</Typography>

			<div className={classes.container}>
				<CircularProgress
					variant='static'
					thickness={2}
					style={{ top: size * 0.01, left: size * 0.01, height: size * 0.48, width: size * 0.48 }}
					value={100}
					className={classes.back}
				/>

				<CircularProgress
					variant='static'
					size={size * 0.5}
					value={value}
					className={clsx({
						[classes.primary]: !error,
						[classes.error]: error
					})}
				/>

				<Typography
					variant='h4'
					style={{ marginLeft: (symbol && 8) || 0 }}
					className={clsx(classes.center, {
						[classes.primary]: !error,
						[classes.error]: error
					})}
				>
					{value + charSymbol}
				</Typography>
			</div>

			<div className={classes.footer}>
				<div>
					<Typography variant='body1'>{max + charSymbol}</Typography>
					<Typography variant='body2'>Max</Typography>
				</div>

				<div>
					<Typography variant='body1'>{min + charSymbol}</Typography>
					<Typography variant='body2'>Min</Typography>
				</div>
			</div>
		</div>
	);
};

export default SensorMeter;
