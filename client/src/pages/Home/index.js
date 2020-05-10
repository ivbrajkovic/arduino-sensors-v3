// Dashboard page

// React, redux
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// Custom styles
import useStyles from './style';

// Fetch helper
import { fetchHelper } from '../../helper';

// Defaults
const size = 320;
const timeout = 1000;
const defaultLimits = {
  max: 0,
  min: 0
};

const Home = () => {
  console.log('Home -> page');

  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.ui.settings);

  // Debug add dummy data on interval
  const intervalRef = useRef();
  const [started, setStarted] = useState(false);
  // const [state, setState] = useState({ x: new Date().getTime(), y: 0 });
  const [state, setState] = useState({});

  const startInterval = _ => {
    if (started) {
      clearInterval(intervalRef.current);
      setStarted(false);
    } else {
      intervalRef.current = setInterval(() => {
        const x = new Date().getTime();
        const y = Math.floor(Math.random() * 50) + 1;
        setState({ x: x, y: y });
      }, 2000);
      setStarted(true);
    }
  };

  // Chart data
  const [data, setData] = useState();

  // Sensors limits
  const [limits, setLimits] = useState({
    temperature: { max: 40, min: 20 },
    humidity: { max: 40, min: 20 },
    co2: { max: 40, min: 20 }
  });

  useEffect(() => {
    const fetchData = async () => {
      // console.log('Home -> useEffect');

      try {
        const token = window.localStorage.getItem('token');
        const data = await fetchHelper({
          url: '/data/10',
          token
        });

        data.data.forEach(el => {
          const date = new Date(el.date).getTime();

          // const x = new Date().getTime();
          // const y = Math.floor(Math.random() * 50) + 1;

          setData({
            date: date,
            arduino: el.arduino,
            temperature: { x: date, y: +el.temperature },
            humidity: { x: date, y: el.humidity },
            co2: { x: date, y: el.co2 }
          });
        });
      } catch (error) {
        console.log('fetchData -> error', error);
      }
    };

    fetchData();

    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <>
      {console.log('Home -> render')}
      <h2>Home page</h2>
      {/* {console.log('Home -> data', data)} */}

      <Button
        variant='contained'
        className={classes.button}
        onClick={startInterval}
      >
        {started ? 'Stop' : 'Start'}
      </Button>

      {/* {data.temperature && ( */}
      {data && (
        <Grid container direction='column' spacing={3}>
          {/* Temperature */}
          <Fade
            in={true}
            timeout={timeout}
            style={{ transitionDelay: '500ms' }}
          >
            <Grid item>
              <DataView
                size={size}
                elevation={12}
                title={'Temperature'}
                symbol={176}
                // data={data.temperature}
                data={data.temperature}
                priColor={orange[600]}
                maxItems={10}
                limits={limits.temperature || defaultLimits}
                chartBand={{
                  color: green[200],
                  from: 18,
                  to: 35
                }}
              />
            </Grid>
          </Fade>
        </Grid>
      )}
    </>
  );
};

export default Home;
