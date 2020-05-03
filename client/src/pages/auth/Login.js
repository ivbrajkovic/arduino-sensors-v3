// Login page

// React
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions';

// Hooks
import { useRedirect, useClearErrorsOnExit } from '../../hooks';

// Components
import ButtonProgress from '../../components/ButtonProgress';
import PasswordField from '../../components/PasswordField';

// Material UI
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Custom styles
import useStyles from './style.js';

// Error helpers
import { useErrorSelector, formatErrors } from './helper';

const Login = () => {
  console.log('Login -> Login page');

  // If loggedin, redirect to home page
  useRedirect();

  // Custom styles
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();

  // Custom error selector and memoized errors fnc
  const error = useErrorSelector();
  const errors = useMemo(() => formatErrors(error), [error]);

  // Clear error if any on exit
  useClearErrorsOnExit();

  // Submit form action
  const handleSubmit = e => {
    e.preventDefault();

    // Get form reference
    const { email, password } = e.target;

    // Dispatch login action
    dispatch(loginAction(email.value, password.value));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        {/* Title picture */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Title */}
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Password */}
          <PasswordField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            id='password'
            autoComplete='current-password'
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Fallback error message */}
          <Typography variant='h6' align='center' color='secondary'>
            {errors.other}
          </Typography>

          {/* Submit button with progress */}
          <ButtonProgress>Log In</ButtonProgress>

          {/* Info text */}
          <div className={classes.info}>
            <Link component={RouterLink} to='/signup' variant='body2'>
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
