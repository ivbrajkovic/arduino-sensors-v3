/**
 * Snackbar for notify messages
 */

// React / redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrorsAction } from '../../store/actions';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Transition
const TransitionRight = props => <Slide {...props} direction='right' />;

const Snack = ({ timeout = 4000 }) => {
  console.log('Snack -> component');

  // Action dispatcher
  const dispatch = useDispatch();

  // Custome redux store selector
  const showAllErrors = useSelector(store => store.ui.settings.showAllErrors);

  // Custome redux store selector
  const error = useSelector(
    store => store.ui.error
    // left => (!showAllErrors && /^data_|^user_/.test(left.code)) || false
  );

  // Close snack handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    // Clear store error
    dispatch(clearErrorsAction());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={
        (showAllErrors && !!error.message) ||
        /^data_|^user_/.test(error.message)
      }
      autoHideDuration={timeout}
      onClose={handleClose}
      TransitionComponent={TransitionRight}
      message={error.message}
      action={
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={handleClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    />
  );
};

export default Snack;
