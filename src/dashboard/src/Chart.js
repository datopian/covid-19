import React from 'react';
import Plot from 'react-plotly.js';


export default function (props) {
  return (
    <Plot
      className="w-full h-graph"
      data={props.data}
      layout={ {yaxis: {type: 'log'}, colorway: ['black', 'gray', 'orange']} }
      config={ {responsive: true, displayModeBar: false} }
    />
  );
}
