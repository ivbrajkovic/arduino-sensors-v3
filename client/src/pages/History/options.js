// Make chart options

// Material UI
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';

const makeOptions = props => {
	console.log('TCL: makeOptions()');

	return {
		chart: {
			type: 'spline',
			backgroundColor: 'transparent',
			style: {
				fontFamily: 'Roboto'
			}
		},

		time: {
			timezoneOffset: -60
		},

		title: {
			text: 'History chart',
			margin: 50
		},

		subtitle: {
			text: null
		},

		colors: [orange[600], blue[700], cyan[600]],

		legend: {
			// enabled: false
			margin: 24,
			itemStyle: {
				fontWeight: 'normal'
			}
		},

		// rangeSelector: {
		// 	enabled: true,
		// 	selected: 1
		// },

		xAxis: {
			type: 'datetime',
			tickWidth: 0,
			labels: {
				format: '{value: %e.%b %H:%M}',
				align: 'right',
				rotation: -45
			},
			minPadding: 0.03,
			maxPadding: 0.03
		},

		yAxis: {
			title: {
				text: null
			}
		},

		tooltip: {
			crosshairs: true,
			shared: true
		},

		series: [
			{
				name: 'Temperature',
				// data: props.series[0]
				data: []
			},
			{
				name: 'Humidity',
				// data: props.series[1]
				data: []
			},
			{
				name: 'CO2',
				// data: props.series[2]
				data: []
			}
		]
	};
};

export default makeOptions;
