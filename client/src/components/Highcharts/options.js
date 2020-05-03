// Make chart options

import Highcharts from 'highcharts';

const makeOptions = props => {
	const color = props.color || Highcharts.getOptions().colors[0];
	return {
		chart: {
			height: 280,
			margin: [30, 20, 60, 50],
			backgroundColor: 'transparent',
			style: {
				fontFamily: 'Roboto'
			}
		},

		time: {
			timezoneOffset: -60
		},

		title: {
			text: props.title
		},

		legend: {
			enabled: false
		},

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
			},
			labels: {
				formatter: function() {
					return this.value + (String.fromCharCode(props.symbol) || '');
				}
			},
			plotBands: [
				(props.band && {
					color: Highcharts.Color(props.band && props.band.color)
						.setOpacity(0.2)
						.get('rgba'),
					from: (props.band && props.band.from) || 0,
					to: (props.band && props.band.to) || 0,
					label: {
						text: (props.band && props.band.text) || 'limits region',
						align: 'right',
						verticalAlign: 'top',
						y: -10,
						x: -10
					}
				}) ||
					{}
			]
		},

		tooltip: {
			crosshairs: true,
			shared: true
		},

		plotOptions: {
			areaspline: {
				pointStart: new Date().getTime(),
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[
							0,
							Highcharts.Color(color)
								.setOpacity(0.6)
								.get('rgba')
						],
						[
							1,
							Highcharts.Color(color)
								.setOpacity(0)
								.get('rgba')
						]
					]
				},
				marker: {
					radius: 3,
					lineWidth: 2,
					lineColor: '#fff',
					fillColor: color
				},
				lineWidth: 2,
				// lineColor: Highcharts.getOptions().colors[5],
				lineColor: {
					linearGradient: { x1: 1, x2: 0, y1: 1, y2: 1 },
					stops: [
						[0, color],
						[
							1,
							Highcharts.Color(color)
								.setOpacity(0)
								.get('rgba')
						]
					]
				},
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},

		series: [
			{
				type: 'areaspline',
				name: props.device,
				data: []
			}
		]
	};
};

export default makeOptions;
