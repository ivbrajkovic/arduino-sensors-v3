import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
	// toolbar: {
	// 	justifyContent: 'space-between'
	// },
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: props => ({
		marginLeft: props.drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${props.drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		}
	}),
	menuButton: {
		[theme.breakpoints.up('sm')]: {
			marginRight: 36
		}
	},
	hide: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	container: {
		[theme.breakpoints.down('xs')]: {
			paddingRight: 0
		}
	},
	title: {
		flexGrow: 1
	},
	avatar: {
		margin: theme.spacing(0, 1),
		color: theme.palette.secondary.contrastText,
		background: theme.palette.secondary.main,
		'&:hover': {
			background: theme.palette.secondary.dark
		},
		fontSize: 'inherit',
		display: 'inline-flex',
		boxShadow: 'none',
		'&:active': {
			boxShadow: 'none'
		}
	}
}));

export default useStyle;
