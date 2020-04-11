import React from 'react';
import { ResponsiveLine } from '@nivo/line';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const LineChart = ({ data }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        curve="cardinal"
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 10,
            tickRotation: -90,
            legend: 'Date',
            legendOffset: 85,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'Confirmed cases',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        colors={{ scheme: 'nivo' }}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)


export default LineChart;
