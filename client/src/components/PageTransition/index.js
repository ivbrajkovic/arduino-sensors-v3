// Animated pages transitions

import React from 'react';
import { CSSTransition } from 'react-transition-group';

// Styles
import useStyles from './style';

const timeout = {
	appear: 0,
	enter: 1000,
	exit: 300
};

const PageTransition = ({ match, children }) => {
	const classes = useStyles({ timeout: timeout });

	return (
		<CSSTransition
			in={match != null}
			timeout={timeout}
			unmountOnExit
			classNames={{
				enter: classes.pageEnter,
				enterActive: classes.pageEnterActive,
				exit: classes.pageExit,
				exitActive: classes.pageExitActive
			}}
		>
			<div className={classes.page}>{children}</div>
		</CSSTransition>
	);
};

export default PageTransition;
