// MiniDrawer - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	drawer: props => ({
		width: props.drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		position: 'absolute',
		[theme.breakpoints.up('sm')]: {
			position: 'initial'
		}
	}),
	drawerOpen: props => ({
		width: props.drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		// [theme.breakpoints.up('sm')]: {
		// zIndex: 1202
		zIndex: theme.zIndex.drawer + 1
		// }
	}),
	drawerClose: props => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	}),
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar
	},
	switchBtn: {
		marginLeft: -16,
		marginRight: 16
	}
}));
