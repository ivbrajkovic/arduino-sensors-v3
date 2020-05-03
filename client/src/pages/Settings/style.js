// Settings - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	root: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.up('md')]: {
			maxWidth: 512
		}
	},
	buttonContainer: {
		justifyContent: 'center',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		}
	},
	textField: {
		maxWidth: 35
	},
	listItem: {
		paddingLeft: 50
	}
}));
