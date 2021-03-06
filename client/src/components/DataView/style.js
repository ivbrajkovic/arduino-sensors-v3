// DataView - custom style

import { makeStyles } from '@material-ui/core/styles';
// import blueGrey from '@material-ui/core/colors/blueGrey';

// const color = blueGrey[100];

export default makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(2)
		}
	}
}));
