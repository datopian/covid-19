Dashboard for COVID-19 data created in React and using following visualization libraries:

* `@nivo/geo` - for choropleth map.
* `@nivo/line` - for line chart.

## Data

The raw data is located at https://datahub.io/core/covid-19 and on github - https://github.com/datasets/covid-19.

## Development

Note `index.html` file in the root directory of this project - it is what gets served when you access the site via https://datopian.github.io/covid-19/. You can see that it imports the JS and CSS modules from `src/dashboard/build/static/...` which are builds of our React app.

The dashboard contains of 5 components:

* `App.js` - this is the main component where we do data fetching operations.
  * `Header.js` - basic navigation bar component.
  * `Indicators.js` - the main indicators component that displays key figures.
  * `Choropleth.js` - this is mainly a copy paste from the example here https://nivo.rocks/choropleth/.
  * `LineChart.js` - also taken from https://nivo.rocks/line/ with some changes in configs.

To run the dashboard locally:

```bash
cd src/dashboard
yarn # or `npm i`
yarn start # or `npm start`
```

We use Tailwind as primary CSS framework.

## Deployment

TODO.
