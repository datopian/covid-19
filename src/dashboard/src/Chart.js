import React from 'react';
import Plot from 'react-plotly.js';


export default function (props) {
  const spec = {
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: 'black'}
  }
  const data = props.data.map(item => {
    return Object.assign(spec, item)
  })
  return (
    <Plot
      data={data}
      layout={ {title: 'Cumilative confirmed cases'} }
      config={ {responsive: true, displayModeBar: false} }
    />
  );
}
