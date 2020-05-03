// Dashboard - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	dev: {
		padding: theme.spacing(2),
		display: 'inline-block',
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 999,
		color: '#FFF'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		background: '#000',
		opacity: 0.6,
		zIndex: -1
	},
	button: {
		margin: theme.spacing(1)
	}
}));
