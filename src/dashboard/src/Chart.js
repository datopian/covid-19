import React from 'react';
import Plot from 'react-plotly.js';


export default function (props) {
  const data = props.data.map((trace, index) => {
    const item = JSON.parse(JSON.stringify(trace));
    const colors = ['black', 'gray', 'orange'];

    switch(index) {
      case 0:
        item.name = 'Cumilative confirmed cases';
        item.mode = 'lines+markers';
        item.marker = {color: colors[index]};
        break;
      case 1:
        item.name = 'New cases per day';
        item.marker = {color: colors[index]};
        break;
      case 2:
        item.name = 'Deaths per day';
        item.marker = {color: colors[index]};
        break;
    }
    return item;
  })
  return (
    <Plot
      className="w-full"
      data={data}
      layout={ {yaxis: {type: 'log'}} }
      config={ {responsive: true, displayModeBar: false} }
    />
  );
}
