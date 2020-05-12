// Veiw data from database

import React from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import SensorMeter from '../SensorMeter';
import Chart from '../Highcharts';

// Custom styles
import useStyles from './style';

const DataView = ({
  size = 320,
  elevation = 12,
  title,
  chartTitle,
  symbol,
  priColor,
  secColor,
  data,
  limits,
  initialData,
  maxItems = 10,
  chartBand
}) => {
  // console.log('DataView -> component', title);

  const classes = useStyles();

  return (
    <Paper elevation={elevation} className={classes.paper}>
      <Grid container>
        {/* Round progress metter */}
        <Grid item xs={12} sm={3}>
          <SensorMeter
            size={size}
            title={title}
            symbol={symbol}
            priColor={priColor}
            secColor={secColor}
            limits={limits}
            value={(data && data.y) || 0}
          />
        </Grid>

        {/* Chart */}
        <Grid item xs={12} sm={9} /* style={{ height: 200 }} */>
          <Chart
            title={(chartTitle && title) || null}
            // symbol={symbol}
            band={chartBand}
            color={priColor}
            maxItems={maxItems}
            data={data}
            initialData={initialData}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DataView;
