// Button with circular progress bar

// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Materual UI
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom styles
import useStyles from './style.js';

const ButtonProgress = ({ children }) => {
  const classes = useStyles();

  // Loading status
  const loading = useSelector(state => state.ui.loading);

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.button}
      disabled={loading}
    >
      {loading && (
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms'
          }}
          unmountOnExit
        >
          <div className={classes.progressWrapper}>
            <CircularProgress size={30} />
          </div>
        </Fade>
      )}
      {children}
    </Button>
  );
};

export default ButtonProgress;
