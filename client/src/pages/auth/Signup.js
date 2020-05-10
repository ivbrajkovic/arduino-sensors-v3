/**
 * Signup page
 */

// React / Redux
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupAction } from '../../store/actions';

// Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Components
import ButtonProgress from '../../components/ButtonProgress';
import PasswordField from '../../components/PasswordField';

// Custom styles
import useStyles from './style.js';

// Hooks
import { useRedirect, useClearErrorsOnExit } from '../../hooks';

// Error helpers
import { useErrorSelector, formatErrors } from './helper';

const Signup = () => {
  console.log('Signup -> Signup page');

  // If loggedin, redirect to home page
  useRedirect();

  // Custom styles
  const classes = useStyles();
  const widthMaxXS = useMediaQuery('(max-width:599.99px)');

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

    // Form input fields
    const form = e.target;

    // If all field are provided, procceed with signup
    dispatch(
      signupAction({
        name: form.name.value,
        lastname: form.lastname.value,
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value
      })
    );
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>

        {/* sign up form */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={widthMaxXS ? 0 : 2}>
            {/* first name */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='name'
                label='First Name'
                id='name'
                autoComplete='fname'
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            {/* last name */}
            <Grid item xs={12} sm={6}>
              <TextField
                margin='normal'
                variant='outlined'
                required
                fullWidth
                id='lastname'
                label='Last Name'
                name='lastname'
                autoComplete='lname'
                error={!!errors.lastname}
                helperText={errors.lastname}
              />
            </Grid>
          </Grid>

          {/* username */}
          <TextField
            margin='normal'
            variant='outlined'
            required
            fullWidth
            id='username'
            name='username'
            label='Username'
            autoComplete='username'
            error={!!errors.username}
            helperText={errors.username}
          />

          {/* email address */}
          <TextField
            margin='normal'
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* password */}
          <PasswordField
            margin='normal'
            variant='outlined'
            required
            fullWidth
            name='password'
            label='Password'
            // type='password'
            id='password'
            autoComplete='current-password'
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* confirm password */}
          <PasswordField
            margin='normal'
            variant='outlined'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            // type='password'
            id='confirmPassword'
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          {/* error message */}
          <Typography variant='h6' align='center' color='secondary'>
            {errors.other}
          </Typography>

          {/* Submit button with progress */}
          <ButtonProgress>Sign up</ButtonProgress>

          {/* Info text */}
          <div className={classes.info}>
            <Link component={RouterLink} to='/login' variant='body2'>
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
