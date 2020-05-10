// Dashboard page

import React, { useState, /* useMemo, */ useEffect, useRef } from 'react';

import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAction } from '../../store/actions';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import Fade from '@material-ui/core/Fade';

// Components
import DataView from '../../components/DataView';

// Hooks
import { useRedirectToLogin } from '../../hooks';

// Utiliuty
import { logObj, randomNum /* formatTime */ } from '../../helper';

import { fetchHelper } from '../../helper';

// Custom styles
import useStyles from './style';

// const fromatDate = date =>
// 	(date && date.seconds && new Date(date.seconds * 1000).toLocaleString()) || 'no date';

const addData = async dispatch => {
  // try {
  //   await firebase.addData('sensors', {
  //     arduino: 0,
  //     co2: randomNum(20),
  //     date: new Date(),
  //     humidity: randomNum(100),
  //     temperature: randomNum(50)
  //   });
  // } catch (err) {
  //   logObj(err);
  //   dispatch({ type: SET_ERROR, payload: err });
  // }
};

const size = 320;
const timeout = 1000;
const defaultLimits = {
  max: 0,
  min: 0
};

const Home = () => {
  console.log('Home -> page');

  // Redirect to loggin
  const login = useRedirectToLogin();

  if (!login) return null;

  return (
    <>
      {console.log('Home -> render')}
      <h2>Home page</h2>
    </>
  );

  // const classes = useStyles();
  // const dispatch = useDispatch();
  // const settings = useSelector(state => state.ui.settings);

  // // Chart data
  // const [data, setData] = useState({});

  // // Sensors limits
  // const [limits, setLimits] = useState({});

  // useEffect(() => {
  //   if (loggedIn) {
  //     const fetchData = async () => {
  //       try {
  //         const token = window.localStorage.getItem('token');
  //         const data = await fetchHelper({
  //           url: '/data/3',
  //           token
  //         });
  //         setData(data);
  //       } catch (error) {
  //         dispatch(setErrorAction(error));
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [loggedIn]);

  // // Do not display if not logged in
  // if (!loggedIn) return null;

  // return (
  //   <>
  //     {console.log('Home -> render')}

  //     {settings.devMenu && data && (
  //       <div className={classes.dev}>
  //         <div className={classes.overlay} />
  //         <Grid container>
  //           <Grid item>
  //             <Button
  //               variant='contained'
  //               className={classes.button}
  //               onClick={() => addData(dispatch)}
  //             >
  //               Add data
  //             </Button>
  //           </Grid>
  //           <Grid item>
  //             <ul>
  //               <li>arduino: arduino 0</li>
  //               <li>temperature: {data.temperature && data.temperature.y}</li>
  //               <li>humidity: {data.humidity && data.humidity.y}</li>
  //               <li>co2: {data.co2 && data.co2.y}</li>
  //               <li>
  //                 date:
  //                 {(data.date && new Date(data.date).toLocaleString()) ||
  //                   'no date'}
  //               </li>
  //             </ul>
  //           </Grid>
  //         </Grid>
  //       </div>
  //     )}

  //     {data.temperature && (
  //       <Grid container direction='column' spacing={3}>
  //         {/* Temperature */}
  //         <Fade
  //           in={true}
  //           timeout={timeout}
  //           style={{ transitionDelay: '500ms' }}
  //         >
  //           <Grid item>
  //             <DataView
  //               size={size}
  //               elevation={12}
  //               title={'Temperature'}
  //               symbol={176}
  //               data={data.temperature}
  //               priColor={orange[600]}
  //               maxItems={10}
  //               limits={limits.temperature || defaultLimits}
  //               chartBand={{
  //                 color: green[200],
  //                 from: 18,
  //                 to: 35
  //               }}
  //             />
  //           </Grid>
  //         </Fade>

  //         {/* Humidity */}
  //         <Fade
  //           in={true}
  //           timeout={timeout}
  //           style={{ transitionDelay: '750ms' }}
  //         >
  //           <Grid item>
  //             <DataView
  //               size={size}
  //               elevation={12}
  //               title={'Humidity'}
  //               //symbol={176}
  //               data={data.humidity}
  //               priColor={blue[700]}
  //               maxItems={10}
  //               limits={limits.humidity || defaultLimits}
  //               chartBand={{
  //                 color: green[200],
  //                 from: 40,
  //                 to: 80
  //               }}
  //             />
  //           </Grid>
  //         </Fade>

  //         {/* CO2 */}
  //         <Fade
  //           in={true}
  //           timeout={timeout}
  //           style={{ transitionDelay: '1000ms' }}
  //         >
  //           <Grid item>
  //             <DataView
  //               size={size}
  //               elevation={12}
  //               title={'CO2'}
  //               //symbol={11823}
  //               data={data.co2}
  //               priColor={cyan[600]}
  //               maxItems={10}
  //               limits={limits.co2 || defaultLimits}
  //               chartBand={{
  //                 color: green[200],
  //                 from: 8,
  //                 to: 16
  //               }}
  //             />
  //           </Grid>
  //         </Fade>
  //       </Grid>
  //     )}
  //   </>
  // );
};

export default Home;
