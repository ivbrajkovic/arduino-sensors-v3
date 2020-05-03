// Custom theme

import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
// import { create } from 'jss';
// import extend from 'jss-plugin-extend';
import {
	ThemeProvider,
	createMuiTheme /* StylesProvider, jssPreset */
} from '@material-ui/core/styles';

// const jss = create({
// 	plugins: [...jssPreset().plugins, extend()]
// });

// import cyan from '@material-ui/core/colors/cyan';
// import pink from '@material-ui/core/colors/pink';

// const defaultTheme = createMuiTheme();

// const primary = cyan[500];
// const secondary = pink[400];

const Theme = ({ children }) => {
	const darkTheme = useSelector(state => state.ui.settings.darkTheme);

	const theme = createMuiTheme({
		// palette: {
		// 	primary: {
		// 		light: '#33c9dc',
		// 		main: '#00bcd4',
		// 		dark: '#008394',
		// 		contrastText: '#fff'
		// 	},
		// 	secondary: {
		// 		light: '#ff6333',
		// 		main: '#ff3d00',
		// 		dark: '#b22a00',
		// 		contrastText: '#fff'
		// 	}
		// },
		palette: {
			// primary: cyan,
			// secondary: pink,
			type: `${darkTheme ? 'dark' : 'light'}`,
			primary: {
				// light: '#ff6333',
				main: '#2d5d7c'
				// dark: '#b22a00',
				// contrastText: '#fff'
			},
			secondary: {
				// light: '#ff6333',
				main: '#d45e5a'
				// dark: '#b22a00',
				// contrastText: '#fff'
			}
		},
		overrides: {
			MuiButton: {
				text: {
					color: 'inherit'
				}
			},
			MuiListItem: {
				gutters: {
					'@media (min-width: 600px)': {
						paddingLeft: '24px'
					}
				}
			}
		}
	});

	// theme.palette.type = `${false ? 'dark' : 'light'}`;
	return (
		// <StylesProvider jss={jss}>
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
		// </StylesProvider>
	);
};

export default Theme;
