/**
 * Copyright
 */

// React
import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Box mt={8} mb={3}>
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link
          color='primary'
          href='https://github.com/ivbrajkovic'
          target='_blank'
        >
          Arduino Sensors
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    </Box>
  );
};

export default Copyright;
