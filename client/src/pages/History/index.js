// History page

import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

// Firebase
import firebase from '../../firebase/firebase';

// Hooks
import { useRedirect } from '../../hooks';

// Custom styles
import useStyles from './style';

// Set chart subtitle
const getSubtitle = date => {
	console.log('TCL: getSubtitle()');
	return `from ${new Date(date.from).toLocaleDateString()} to ${new Date(
		date.to
	).toLocaleDateString()}`;
};

// Animation timeout
const timeout = 1000;

// Chart options
const options = makeOptions();

const History = () => {
	console.log('TCL: History -> History()');

	// Redirect to loggin
	const login = useRedirect();
	const classes = useStyles();
	const maxXS = useMediaQuery('(max-width:599.99px)');

	// Refs
	const chartRef = useRef();

	// States
	const [date, setDate] = useState({
		from: new Date().toISOString().substring(0, 10),
		to: new Date().toISOString().substring(0, 10)
	});

	// Handle date changes
	const handleChange = e => {
		console.log('TCL: History -> handleChange()');

		const name = e.target.name;
		const value = e.target.value;
		setDate({
			...date,
			[name]: value
		});
	};

	// Change chart labels color when app theme is changed
	const darkTheme = useSelector(state => state.ui.settings.darkTheme);
	useEffect(() => {
		if (login) {
			const titleColor = darkTheme ? '#ffffff' : '#666666';
			const color = darkTheme ? '#dedede' : '#333333';
			chartRef.current.chart.title.update({ style: { color: titleColor } }, false);
			chartRef.current.chart.subtitle.update({ style: { color: color } }, false);
			chartRef.current.chart.xAxis[0].update({ labels: { style: { color: color } } }, false);
			chartRef.current.chart.yAxis[0].update({ labels: { style: { color: color } } }, false);
			chartRef.current.chart.legend.update({ itemStyle: { color: titleColor } }, false);
			chartRef.current.chart.redraw();
		}
	}, [login, darkTheme]);

	// Get data from firestore
	useEffect(() => {
		if (login) {
			// getData(date, data => {
			firebase.getHistoryChart(date, data => {
				chartRef.current.chart.subtitle.update({ text: getSubtitle(date) }, false);
				chartRef.current.chart.series[0].setData(data[0], false);
				chartRef.current.chart.series[1].setData(data[1], false);
				chartRef.current.chart.series[2].setData(data[2], false);
				chartRef.current.chart.redraw();
			});
		}
	}, [login, date]);

	if (!login) return null;
	else
		return (
			<Fade in={true} timeout={timeout} style={{ transitionDelay: '250ms' }}>
				<Paper elevation={12} className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid
								container
								spacing={3}
								justify={maxXS ? 'center' : 'flex-start'}
								// direction={maxXS ? 'column' : 'row'}
								// alignItems='center'
							>
								<Grid item>
									<TextField
										name='from'
										label='From'
										type='date'
										value={date.from}
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item>
									<TextField
										name='to'
										label='To'
										type='date'
										value={date.to}
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										onChange={handleChange}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							{/* {options && <HighchartsReact highcharts={Highcharts} options={options} />} */}
							<HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		);
};

export default History;
