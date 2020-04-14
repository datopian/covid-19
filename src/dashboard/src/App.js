import React, { Component } from 'react';
import Select from 'react-select';
import { parse } from 'papaparse';
import numeral from 'numeral';
import Header from './Header';
import Indicators from './Indicators';
import Chart from './Chart';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'world',
      countriesToCompare: [],
      worldwideData: [],
      countryData: [],
      isLoading: false
    };
  }


  async componentDidMount() {
    const urlObject = new URL(window.location.href);
    const country = urlObject.searchParams.get('country') || 'world';

    this.setState({ isLoading: true, country });

    const worldwideDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
    const countryDataUrl = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv'

    const newState = {isLoading: false}

    await Promise.all([worldwideDataUrl, countryDataUrl].map(async url => {
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


  getChartData() {
    const { country, worldwideData, countryData } = this.state;
    const chartData = [];
    const trace = {x: [], y: []};
    if (country === 'world') {
      worldwideData.forEach(row => {
        trace.x.push(row.Date);
        trace.y.push(row.Confirmed);
      })
    } else {
      countryData.forEach(row => {
        if (row.Country.toLowerCase() === country.toLowerCase()) {
          trace.x.push(row.Date);
          trace.y.push(row.Confirmed);
        }
      })
    }
    chartData.push(trace);
    return chartData;
  }


  getChartDataForComparison() {
    const { countriesToCompare, countryData } = this.state;
    const traces = [];
    countriesToCompare.forEach(country => {
      const trace = {x: [], y: []};
      countryData.forEach(row => {
        if (row.Country.toLowerCase() === country.toLowerCase()) {
          trace.x.push(row.Date);
          trace.y.push(row.Confirmed);
        }
      })
      traces.push(trace);
    })
    return traces;
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

    const chartData = this.getChartData();

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
          />
          <div className="mt-4 mb-4 w-full">
            <Chart data={chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
