// Login - custom style

import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
// import { relative } from 'path';

const color = blueGrey[100];

export default makeStyles(theme => ({
	root: {
		height: '100%',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	title: {
		alignSelf: 'flex-start'
		// [theme.breakpoints.up('sm')]: {
		// 	marginBottom: theme.spacing(2)
		// }
	},

	subtitle: {
		alignSelf: 'flex-start',
		opacity: 0.75,
		[theme.breakpoints.up('sm')]: {
			marginBottom: theme.spacing(2)
		}
	},

	container: {
		position: 'relative',
		[theme.breakpoints.up('sm')]: {
			marginBottom: theme.spacing(2)
		}
	},

	back: {
		color: color,
		position: 'absolute'
	},

	primary: props => ({
		color: (props.colors && props.colors[0]) || theme.palette.primary.main
	}),

	error: props => ({
		color: (props.colors && props.colors[1]) || theme.palette.secondary.main
	}),

	center: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},

	footer: {
		width: '100%',
		textAlign: 'center',
		// marginBottom: theme.spacing(3),
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}));
