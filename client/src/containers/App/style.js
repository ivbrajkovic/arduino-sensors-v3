// App - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	pageContainer: {
		flexGrow: 1,
		position: 'relative',
		padding: theme.spacing(3),
		marginLeft: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 'auto'
		}
	},
	toolbarMargin: theme.mixins.toolbar
}));
