/**
 * Dashboard page
 */

// React / Redux
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAction } from '../../store/actions';

// Material UI
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

// Components
import DataView from '../../components/DataView';

// Custom styles
import useStyles from './style';

// Helper fncs
import { randomNum, fetchHelper } from '../../helper';

// Websocket
// import io from 'socket.io-client';
import { createSocket } from '../../socket';

const addData = async dispatch => {
  try {
    fetchHelper({
      url: '/data',
      method: 'POST',
      data: {
        arduino: 1,
        co2: randomNum(20),
        date: new Date(),
        humidity: randomNum(100),
        temperature: randomNum(50)
      }
    });
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

// Default constants
const size = 320;
const timeout = 1000;

const Home = () => {
  console.log('Home -> page');

  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);

  const socketRef = useRef();

  // Chart data
  const [data, setData] = useState({});
  const [initialData, setInitialData] = useState({});

  // Sensors limits
  const [limits, setLimits] = useState({
    temperature: { max: 0, min: 0 },
    humidity: { max: 0, min: 0 },
    co2: { max: 0, min: 0 }
  });

  useEffect(() => {
    (async () => {
      try {
        const token = window.localStorage.getItem('token');

        /************************************************************
         * Fetch sensors limits from settings API
         ************************************************************/

        let data = await fetchHelper({
          url: '/settings/1',
          token
        });

        setLimits({
          co2: JSON.parse(data.data.co2),
          humidity: JSON.parse(data.data.humidity),
          temperature: JSON.parse(data.data.temperature)
        });

        /************************************************************
         * Fetch last 10 sensor data rows from data API
         ************************************************************/

        data = await fetchHelper({
          url: '/data/10',
          token
        });

        const co2 = [],
          humidity = [],
          temperature = [];

        data.data.forEach(el => {
          co2.push([el.date, +el.co2]);
          humidity.push([el.date, +el.humidity]);
          temperature.push([el.date, +el.temperature]);
        });

        setInitialData({ temperature, humidity, co2 });

        /************************************************************
         * Socket - real time data update
         ************************************************************/

        socketRef.current = createSocket({
          url: 'http://localhost:3000',
          onConnect: () => console.log('Socket connected'),
          onDisconnect: () => console.log('Socket disconnected'),
          onData: ({ date, arduino, temperature, humidity, co2 }) => {
            setData({
              date: date,
              arduino: arduino,
              temperature: { x: date, y: temperature },
              humidity: { x: date, y: humidity },
              co2: { x: date, y: co2 }
            });
          }
        });
      } catch (error) {
        dispatch(setErrorAction(error));
      }
    })();

    return () => {
      socketRef.current && socketRef.current.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction='column' spacing={3}>
      {/* {console.log('Home -> render')} */}

      {settings.devMenu && (
        <div className={classes.dev}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item>
              <Button
                variant='contained'
                className={classes.button}
                onClick={() => addData(dispatch)}
              >
                Add data
              </Button>
            </Grid>
            <Grid item>
              <ul>
                <li>arduino: arduino 0</li>
                <li>temperature: {data.temperature && data.temperature.y}</li>
                <li>humidity: {data.humidity && data.humidity.y}</li>
                <li>co2: {data.co2 && data.co2.y}</li>
                <li>
                  date:
                  {(data.date && new Date(data.date).toLocaleString()) ||
                    'no date'}
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
      )}

      {/* Temperature */}
      <Fade in={true} timeout={timeout} style={{ transitionDelay: '500ms' }}>
        <Grid item>
          <DataView
            chartTitle
            size={size}
            elevation={12}
            title={'Temperature'}
            symbol={176}
            initialData={initialData.temperature}
            data={data.temperature}
            priColor={orange[600]}
            maxItems={10}
            limits={limits.temperature}
            chartBand={{
              color: green[200],
              from: 18,
              to: 35
            }}
          />
        </Grid>
      </Fade>

      {/* Humidity */}
      <Fade in={true} timeout={timeout} style={{ transitionDelay: '750ms' }}>
        <Grid item>
          <DataView
            chartTitle
            size={size}
            elevation={12}
            title={'Humidity'}
            //symbol={176}
            initialData={initialData.humidity}
            data={data.humidity}
            priColor={blue[700]}
            maxItems={10}
            limits={limits.humidity}
            chartBand={{
              color: green[200],
              from: 40,
              to: 80
            }}
          />
        </Grid>
      </Fade>

      {/* CO2 */}
      <Fade in={true} timeout={timeout} style={{ transitionDelay: '1000ms' }}>
        <Grid item>
          <DataView
            chartTitle
            size={size}
            elevation={12}
            title={'CO2'}
            //symbol={11823}
            initialData={initialData.co2}
            data={data.co2}
            priColor={cyan[600]}
            maxItems={10}
            limits={limits.co2}
            chartBand={{
              color: green[200],
              from: 8,
              to: 16
            }}
          />
        </Grid>
      </Fade>
    </Grid>
  );
};

export default Home;
