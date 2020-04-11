import React, { Component } from 'react';
import { parse } from 'papaparse';
import Header from './Header';
import Indicators from './Indicators';
import LineChart from './LineChart';
import Choropleth from './Choropleth';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldwideData: [],
      countryData: [],
      referenceData: [],
      features: [],
      isLoading: false
    };
  }


  async componentDidMount() {
    this.setState({ isLoading: true });

    const worldwideDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
    const countryDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv'
    const referendeDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv'
    const featuresUrl = 'https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json'

    const newState = {isLoading: false}

    await Promise.all([worldwideDataUrl, countryDataUrl, referendeDataUrl, featuresUrl].map(async url => {
      let response = await fetch(url)
      if (url === worldwideDataUrl) {
        newState.worldwideData = (parse(await response.text(), {header: true})).data
      } else if (url === countryDataUrl) {
        newState.countryData = (parse(await response.text(), {header: true})).data
      } else if (url === referendeDataUrl) {
        newState.referenceData = (parse(await response.text(), {header: true})).data
      } else if (url === featuresUrl) {
        newState.features = (await response.json()).features
      }
    }))

    this.setState(newState)
  }


  render() {
    const { worldwideData, countryData, referenceData, features, isLoading } = this.state;
    let latestCountryData = [];
    let keyCountriesData = [];
    if (countryData.length > 0) {
      // Assumption is that data is sorted by date and country which is true at the moment
      // The last row is empty so using penultimate row
      const latestAvailableDate = countryData[countryData.length - 2].Date;
      countryData.forEach(row => {
        if (row.Date === latestAvailableDate) {
          latestCountryData.push(row);
        }
      })
      latestCountryData.sort((a, b) => {
        return parseInt(b.Confirmed) - parseInt(a.Confirmed);
      })
      latestCountryData.slice(0, 5)
        .map(row => row.Country)
        .forEach(country => {
          keyCountriesData.push(
            {
              id: country,
              data: []
            }
          )
        });
      countryData.forEach(row => {
        const keyCountry = keyCountriesData.find(item => item.id === row.Country);
        if (keyCountry) {
          keyCountry.data.push({x: row.Date, y: parseInt(row.Confirmed)});
        }
      });
    }
    if (latestCountryData.length > 0 && referenceData.length > 0) {
      latestCountryData.forEach(row => {
        row['id'] = (referenceData.find(item => item.Country_Region === row.Country)).iso3;
      })
    }
    let totalCases, totalDeaths, deathRate, newCases, newCaseRate;
    if (worldwideData.length > 0) {
      const latestData = worldwideData[worldwideData.length - 2];
      const previousData = worldwideData[worldwideData.length - 3];
      totalCases = latestData.Confirmed;
      totalDeaths = latestData.Deaths;
      deathRate = (totalDeaths / totalCases * 100).toFixed(2);
      newCases = totalCases - previousData.Confirmed;
      newCaseRate = parseFloat(latestData['Increase rate']).toFixed(2);
      // Format numbers
      totalCases = totalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      totalDeaths = totalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      newCases = newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="h-screen">
        <Header />
        <div className="px-16 h-full">
          <Indicators
            totalCases={totalCases}
            totalDeaths={totalDeaths}
            deathRate={deathRate}
            newCases={newCases}
            newCaseRate={newCaseRate}
          />
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 mt-4 mb-4 h-screen-0.5">
            <LineChart data={keyCountriesData} />
            <Choropleth data={latestCountryData} features={features} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
