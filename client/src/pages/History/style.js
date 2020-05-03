// History - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(4)
		}
	}
}));
