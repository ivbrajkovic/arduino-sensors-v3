// Login - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	button: {
		position: 'relative',
		margin: theme.spacing(3, 0, 2)
	},
	progressWrapper: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -40%)'
	}
}));
