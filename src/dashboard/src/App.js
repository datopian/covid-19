import React, { Component } from 'react';
import Select from 'react-select';
import { parse } from 'papaparse';
import numeral from 'numeral';
import Header from './Header';
import Indicators from './Indicators';
import Chart from './Chart';
import Choropleth from './Choropleth';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'world',
      worldwideData: [],
      countryData: [],
      referenceData: [],
      isLoading: false
    };
  }


  async componentDidMount() {
    const urlObject = new URL(window.location.href);
    const country = urlObject.searchParams.get('country') || 'world';

    this.setState({ isLoading: true, country });

    const worldwideDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv';
    const countryDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv';
    const referenceDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/reference.csv';

    const newState = {isLoading: false}

    await Promise.all([worldwideDataUrl, countryDataUrl, referenceDataUrl].map(async url => {
      let response = await fetch(url)
      if (url === worldwideDataUrl) {
        newState.worldwideData = (parse(await response.text(), {header: true})).data;
        if (!newState.worldwideData[newState.worldwideData.length - 1].Date) {
          newState.worldwideData.pop();
        }
      } else if (url === countryDataUrl) {
        newState.countryData = (parse(await response.text(), {header: true})).data;
        if (!newState.countryData[newState.countryData.length - 1].Date) {
          newState.countryData.pop();
        }
      } else if (url === referenceDataUrl) {
        newState.referenceData = (parse(await response.text(), {header: true})).data;
        if (!newState.referenceData[newState.referenceData.length - 1].Date) {
          newState.referenceData.pop();
        }
      }
    }))

    this.setState(newState)
  }


  getCountriesDataForDate(date) {
    const { countryData } = this.state;
    if (countryData.length > 0) {
      const response = [];

      if (date === 'latest') {
        date = countryData[countryData.length - 1].Date;
      } else if (date === 'previous') {
        const latest = countryData[countryData.length - 1].Date;
        const latestDateObj = new Date(latest);
        const prevDateObj = new Date(latestDateObj.setDate(latestDateObj.getDate()-1));
        date = prevDateObj.toISOString().slice(0,10);
      }

      countryData.forEach(row => {
        if (row.Date === date) {
          response.push(row);
        }
      })
      return response;
    }
  }


  getTotalCasesAndDeaths() {
    const { worldwideData, country } = this.state;
    let totalCases, totalDeaths;
    if (country === 'world' && worldwideData.length > 0) {
      totalCases = worldwideData[worldwideData.length - 1].Confirmed;
      totalDeaths = worldwideData[worldwideData.length - 1].Deaths;
    } else {
      const countriesData = this.getCountriesDataForDate('latest');
      if (countriesData) {
        const selectedCountryData = countriesData
          .find(item => item.Country.toLowerCase() === country.toLowerCase());
        totalCases = selectedCountryData.Confirmed;
        totalDeaths = selectedCountryData.Deaths;
      }
    }

    return { totalCases, totalDeaths };
  }


  getNewCasesAndRate() {
    const { worldwideData, countryData, country } = this.state;
    let newCases, newCasesRate;
    if (country === 'world' && worldwideData.length > 0) {
      newCases = worldwideData[worldwideData.length - 1].Confirmed - worldwideData[worldwideData.length - 2].Confirmed;
      newCasesRate = (newCases / worldwideData[worldwideData.length - 2].Confirmed * 100).toFixed(2);
    } else if (countryData.length > 0) {
      const latestCountryData = this.getCountriesDataForDate('latest')
        .find(item => item.Country.toLowerCase() === country.toLowerCase());
      const prevCountryData = this.getCountriesDataForDate('previous')
        .find(item => item.Country.toLowerCase() === country.toLowerCase());
      newCases = latestCountryData.Confirmed - prevCountryData.Confirmed;
      newCasesRate = (newCases / prevCountryData.Confirmed * 100).toFixed(2);
    }
    return { newCases, newCasesRate };
  }


  getCasesPer100k() {
    const { worldwideData, referenceData, country } = this.state;
    let casesPer100k;
    const countriesData = this.getCountriesDataForDate('latest');
    if (country.toLowerCase() === 'world') {
      if (worldwideData.length > 0) {
        const worldPopulation = 7594270356;
        casesPer100k = (worldwideData[worldwideData.length - 1].Confirmed / worldPopulation * 100000).toFixed(2);
      }
    } else if (countriesData && referenceData.length > 0) {
      const selectedCountryData = countriesData
        .find(item => item.Country.toLowerCase() === country.toLowerCase());
      const countryPopulation = referenceData
        .find(item => item['Country_Region'].toLowerCase() === country.toLowerCase())
        .Population;
      casesPer100k = (selectedCountryData.Confirmed / countryPopulation * 100000).toFixed(2);
    }

    return casesPer100k;
  }


  getChartData() {
    const { country, worldwideData, countryData } = this.state;
    const trace1 = {x: [], y: [], type: 'scatter', name: 'Cumilative confirmed cases', mode: 'lines+markers'};
    const trace2 = {x: [], y: [], type: 'bar', name: 'New cases per day'};
    const trace3 = {x: [], y: [], type: 'bar', name: 'Deaths per day'};
    let previousRow = {Confirmed: 0, Deaths: 0};
    if (country === 'world') {
      worldwideData.forEach(row => {
        trace1.x.push(row.Date);
        trace1.y.push(parseInt(row.Confirmed));
        trace2.x.push(row.Date);
        trace2.y.push(row.Confirmed - previousRow.Confirmed);
        trace3.x.push(row.Date);
        trace3.y.push(row.Deaths - previousRow.Deaths)
        previousRow = JSON.parse(JSON.stringify(row));
      })
    } else {
      countryData.forEach(row => {
        if (row.Country.toLowerCase() === country.toLowerCase()) {
          trace1.x.push(row.Date);
          trace1.y.push(parseInt(row.Confirmed));
          trace2.x.push(row.Date);
          trace2.y.push(row.Confirmed - previousRow.Confirmed);
          trace3.x.push(row.Date);
          trace3.y.push(row.Deaths - previousRow.Deaths)
          previousRow = JSON.parse(JSON.stringify(row));
        }
      })
    }
    return [trace1, trace2, trace3];
  }


  getChartDataForComparison() {
    const { referenceData } = this.state;
    const trace = {x: [], y: [], type: 'bar', orientation: 'h'};
    const countriesData = this.getCountriesDataForDate('latest');
    if (countriesData && referenceData.length > 0) {
      countriesData.forEach(row => {
        trace.y.push(row.Country);
        const countryPopulation = referenceData
          .find(item => item['Country_Region'].toLowerCase() === row.Country.toLowerCase())
          .Population;
        const casesPer100k = (row.Confirmed / countryPopulation * 100000).toFixed(2);
        trace.x.push(casesPer100k);
      })
    }
    return [trace];
  }


  getMapData() {
    const { referenceData } = this.state;
    const countriesData = this.getCountriesDataForDate('latest');

    const data = [{
      type: 'choropleth',
      locations: [], // ISO3 codes
      z: [], // Values
      text: [], // Country names
      autocolorscale: false,
      zmin: 100,
      zmax: 1000000,
      colorscale: [
        [0, 'rgb(255,246,229)'], [0.2, 'rgb(255,165,1)'],
        [0.4, 'rgb(229,148,0)'], [0.6, 'rgb(178,115,0)'],
        [0.8, 'rgb(127,82,0)'], [1, 'rgb(51,33,0)']
      ],
      colorbar: {
        thickness: 5
      },
      marker: {
        line:{
          color: 'rgb(255,255,255)',
          width: 1
        }
      }
    }];

    if (countriesData && referenceData.length > 0) {
      countriesData.forEach(row => {
        data[0].z.push(row.Confirmed);
        data[0].text.push(row.Country);
        const referenceItem = referenceData
          .find(item => item['Country_Region'].toLowerCase() === row.Country.toLowerCase());
        data[0].locations.push(referenceItem.iso3);
      })
    }

    return data;
  }


  getCountryOptions() {
    const options = [{value: 'world', label: 'World'}];
    const latestData = this.getCountriesDataForDate('latest');
    if (latestData) {
      latestData.forEach(item => options.push({value: item.Country, label: item.Country}));
    }
    return options;
  }


  onSelectChanged(data) {
    const urlObject = new URL(window.location.href);
    urlObject.searchParams.set('country', data.value);
    window.history.pushState({path:urlObject.href}, '', urlObject.href);
    this.setState({country: data.value});
  }


  onCompareSelectChanged(data) {
    const { countriesToCompare } = this.state;
    const newList = JSON.parse(JSON.stringify(countriesToCompare));
    newList.push(data.value);
    this.setState({countriesToCompare: newList})
  }


  render() {
    const { country, isLoading } = this.state;

    const { totalCases, totalDeaths } = this.getTotalCasesAndDeaths();
    const deathRate = (totalDeaths / totalCases * 100).toFixed(2);
    const { newCases, newCasesRate } = this.getNewCasesAndRate();
    const casesPer100k = this.getCasesPer100k();

    const chartData = this.getChartData();

    const mapData = this.getMapData();

    const options = this.getCountryOptions();

    if (isLoading) {
      return (
        <div className="flex h-screen">
          <p className="m-auto">Loading ...</p>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="px-6 md:px-16">
          <Select
            className="mt-6 w-full md:w-1/3 capitalize"
            options={options}
            defaultValue={{value: country, label: country}}
            isLoading={isLoading}
            onChange={this.onSelectChanged.bind(this)}
          />
          <Indicators
            totalCases={numeral(totalCases).format('0,0')}
            totalDeaths={numeral(totalDeaths).format('0,0')}
            deathRate={deathRate}
            newCases={numeral(newCases).format('0,0')}
            newCaseRate={newCasesRate}
            casesPer100k={casesPer100k}
          />
          <div className="mt-4 mb-4 w-full">
            <Chart data={chartData} />
          </div>
          <div className="mt-4 mb-4 w-full">
            <Choropleth data={mapData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
