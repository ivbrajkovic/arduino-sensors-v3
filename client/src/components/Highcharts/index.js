/**
 * Data chart view
 */

// React / Redux
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

const Chart = ({
  title,
  initialData,
  data,
  maxItems,
  device,
  symbol,
  color,
  band
}) => {
  // console.log('Chart -> component', title);

  const chartRef = useRef();

  const [state, setState] = useState(
    makeOptions({
      title: title,
      device: device,
      symbol: symbol,
      color: color,
      band: band
    })
  );

  useEffect(() => {
    if (initialData) {
      chartRef.current.chart.series[0].setData(initialData, false);
      chartRef.current.chart.redraw();
    }
  }, [initialData]);

  useEffect(() => {
    const x = (data && data.x) || new Date().getTime();
    const y = (data && data.y) || 0;
    const serie =
      (chartRef.current && chartRef.current.chart.series[0]) || null;

    serie && serie.data.length >= maxItems
      ? serie.addPoint([x, y], true, true)
      : serie.addPoint([x, y]);
  }, [data, maxItems]);

  // Change chart labels color when app theme is changed
  const darkTheme = useSelector(state => state.ui.settings.darkTheme);
  useEffect(() => {
    const color = darkTheme ? '#ffffff' : '#666666';
    setState(state => {
      const options = { ...state };
      options.xAxis.labels.style = { color: color };
      options.yAxis.labels.style = { color: color };
      options.yAxis.plotBands[0].label.style = { color: color };
      return options;
    });
  }, [darkTheme]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={state}
      ref={chartRef}
      // callback={afterChartCreated}
    />
  );
};

export default Chart;
