/**
 * History page
 */

import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAction } from '../../store/actions';

// Material UI
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

// Custom styles
import useStyles from './style';

// Helper fnc
import { fetchHelper } from '../../helper';

// Set chart subtitle
const getSubtitle = date => {
  console.log('TCL: getSubtitle()');
  return `from ${new Date(date.from).toLocaleDateString()} to ${new Date(
    date.to
  ).toLocaleDateString()}`;
};

// Animation timeout
const timeout = 1000;

// Chart options
const options = makeOptions();

// Default dates
const getDefaultDates = () => {
  let from = new Date();
  from.setMonth(from.getMonth() - 1);
  from = from.toISOString().substring(0, 10);

  let to = new Date().toISOString().substring(0, 10);
  return { from, to };
};

const History = () => {
  console.log('History -> page');

  const classes = useStyles();
  const maxXS = useMediaQuery('(max-width:599.99px)');

  // Refs
  const chartRef = useRef();

  /************************************************************
   * Redux - global state
   ************************************************************/

  const dispatch = useDispatch();
  const darkTheme = useSelector(state => state.ui.settings.darkTheme);

  // Change chart labels color when app theme is changed
  useEffect(() => {
    const titleColor = darkTheme ? '#ffffff' : '#666666';
    const color = darkTheme ? '#dedede' : '#333333';
    chartRef.current.chart.title.update(
      { style: { color: titleColor } },
      false
    );
    chartRef.current.chart.subtitle.update({ style: { color: color } }, false);
    chartRef.current.chart.xAxis[0].update(
      { labels: { style: { color: color } } },
      false
    );
    chartRef.current.chart.yAxis[0].update(
      { labels: { style: { color: color } } },
      false
    );
    chartRef.current.chart.legend.update(
      { itemStyle: { color: titleColor } },
      false
    );
    chartRef.current.chart.redraw();
  }, [darkTheme]);

  // States
  const [dates, setDates] = useState(getDefaultDates());

  // Handle date changes
  const handleChange = e => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  // Get data from firestore
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHelper({
          url: '/data/fromto',
          method: 'POST',
          token: window.localStorage.getItem('token'),
          data: dates
        });

        const co2 = [],
          humidity = [],
          temperature = [];

        data.data.forEach(el => {
          co2.push([el.date, +el.co2]);
          humidity.push([el.date, +el.humidity]);
          temperature.push([el.date, +el.temperature]);
        });

        // Set chart title
        chartRef.current.chart.subtitle.update(
          {
            text: getSubtitle(dates)
          },
          false
        );

        // Set chart data
        chartRef.current.chart.series[0].setData(temperature, false);
        chartRef.current.chart.series[1].setData(humidity, false);
        chartRef.current.chart.series[2].setData(co2, false);
        chartRef.current.chart.redraw();
      } catch (error) {
        dispatch(setErrorAction(error));
      }
    })();
    // eslint-disable-next-line
  }, [dates]);

  return (
    <Fade in={true} timeout={timeout} style={{ transitionDelay: '250ms' }}>
      <Paper elevation={12} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              justify={maxXS ? 'center' : 'flex-start'}
              // direction={maxXS ? 'column' : 'row'}
              // alignItems='center'
            >
              <Grid item>
                <TextField
                  name='from'
                  label='From'
                  type='date'
                  value={dates.from}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name='to'
                  label='To'
                  type='date'
                  value={dates.to}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <HighchartsReact
              ref={chartRef}
              highcharts={Highcharts}
              options={options}
            />
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default History;
