// Login - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8)
		},
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	info: {
		textAlign: 'right',
		[theme.breakpoints.down('xs')]: {
			textAlign: 'center'
		}
	}
}));
