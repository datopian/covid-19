import React from 'react';
import Plot from 'react-plotly.js';


export default function (props) {
  return (
    <Plot
      className="w-full h-screen"
      data={props.data}
      layout={ {
        title: 'Cumulative confirmed cases',
        geo:{
          showframe: false,
          showcoastlines: false,
          showland: true,
          landcolor: 'rgb(217, 217, 217)',
          projection:{
            type: 'mercator'
          }
      }} }
      config={ {responsive: true, displayModeBar: false} }
    />
  );
}
