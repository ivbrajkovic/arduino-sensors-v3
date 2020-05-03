import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Card from '../../components/Card';

// Card data
import { ivanCard, slavenCard, aleksandarCard } from './data';

const About = () => {
	const widthMaxXS = useMediaQuery('(max-width:599.99px)');

	return (
		<Box mt={widthMaxXS ? 3 : 6}>
			<Grid container spacing={4} justify='space-around'>
				<Grid item>
					<Card {...ivanCard} />
				</Grid>
				<Grid item>
					<Card {...slavenCard} />
				</Grid>
				<Grid item>
					<Card {...aleksandarCard} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default About;
