Dashboard for COVID-19 data created in React.

## Data

The raw data is located at https://datahub.io/core/covid-19 and on github - https://github.com/datasets/covid-19.

## Pattern

Note `index.html` file in the root directory of this project - it is what gets served when you access the site via https://datopian.github.io/covid-19/. You can see that it imports the JS and CSS modules from `src/dashboard/build/static/...` which are builds of our React app.

When creating a dashboard we need to think about 3 main points:

* Visualization components - think of what graphs do you need to have for the best presentation of the data. For example, we have key indicators and line/bar chart in this dashboard.
* Data fetching - normally we have more than 1 source (data files) to fetch. The best is to fetch them in parallel to decrease waiting time.
* Data transformation - once we have fetched data and stored in the state, we need to prepare it for doing visualization. It mostly depends on the viz library you depend on. For example, in this dashboard we use Plotly js and we need to transform our data to fit its spec. This step also includes operations such as joining data tables, filtering etc.

The dashboard here contains of 5 components:

* `App.js` - this is the main component where we do data fetching and transformation operations. This is also where we manage the state of the app.
  * `Header.js` - basic navigation bar component.
  * `Indicators.js` - the main indicators component that displays key figures.
  * `Choropleth.js` - this is a choropleth map component created using plotly js library.
  * `Chart.js` - this is a chart component created using plotly js library.

## Development

To run the dashboard locally:

```bash
cd src/dashboard
yarn # or `npm i`
yarn start # or `npm start`
```

We use Tailwind as primary CSS framework.

## Deployment

We use GitHub pages - https://datopian.github.io/covid-19/.
