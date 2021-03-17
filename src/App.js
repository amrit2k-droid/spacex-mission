import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
      yrOfLaunch: ["2006", "2007", "2008", "2009", "2010", "2011", "2012",
              "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
      launchSuccess: ["true", "false"],
      landingSuccess: ["true", "false"],
      selectedYrOfLaunch: '',
      selectedLaunchSuccess: '',
      selectedLandingSuccess: '',
      index1: '',
      index2: '',
      index3: ''
    }
    this.selectYear = [];
    this.launch = [];
    this.landing = [];
  } 

  componentDidMount() {
    axios.get('https://api.spacexdata.com/v3/launches?limit=100')
      .then(res => {
    //    console.log(res.data);
        const flightData = res.data;
        this.setState({
          flights: flightData
        })
      })
  }

  selectLaunchYrHandler = (index) => {
    if(this.state.selectedLaunchSuccess != '' && this.state.selectedLandingSuccess != '') {
      axios("https://api.spacexdata.com/v3/launches?limit=100&launch_success=" + this.state.selectedLaunchSuccess +
            "&land_success=" + this.state.selectedLandingSuccess + "&launch_year=" + this.selectYear[index].innerHTML)
            .then(res => {
              const flightData = res.data;
              this.setState({
                flights: flightData,
                selectedYrOfLaunch: this.selectYear[index].innerHTML,
                index1: index
              })
            })
    }
    else {
      axios("https://api.spacexdata.com/v3/launches?limit=100&launch_year=" + this.selectYear[index].innerHTML)
        .then(res => {
          console.log(res.data);
          const flightData = res.data;
          this.setState({
            flights: flightData,
            selectedYrOfLaunch: this.selectYear[index].innerHTML,
            index1: index
          })
        })
    }
  }

  selectLaunchSuccess = index => {
 //   console.log(this.launch[index].innerHTML);
    axios("https://api.spacexdata.com/v3/launches?limit=100&launch_success=" + this.launch[index].innerHTML)
      .then(res => {
        console.log(res.data);
        const flightData = res.data;
        this.setState({
          flights: flightData,
          selectedLaunchSuccess: this.launch[index].innerHTML,
          index2: index
        })
      })
  }

  selectLandingSuccess = index => {
    axios("https://api.spacexdata.com/v3/launches?limit=100&launch_success=" + this.state.selectedLaunchSuccess + "&land_success=" + 
          + this.landing[index].innerHTML)
          .then(res => {
            const flightData = res.data;
            this.setState({
              flights: flightData,
              selectedLandingSuccess: this.landing[index].innerHTML,
              index3: index
            })
          })
  }

  render() {
    let style1 = {
      backgroundColor: 'lightblue'
    };
    if(this.state.selectedYrOfLaunch != '') {
      style1 = {
        backgroundColor: 'grey'
      }
    }
    return (
      <div className="App">
          <h4 className="mainHeader">SpaceX Launch Programs</h4>
          <div className="filter">
            <h6 className="filterHeader"><b>Filters</b></h6>
            <div className="launchYr">
              <h6>Launch Year</h6>
              {this.state.yrOfLaunch.map((yr, index) => (
                <a className="waves-effect waves-light btn-small" ref={(element) => this.selectYear[index] = element} 
                    onClick={() => this.selectLaunchYrHandler(index)}
                    id="yrLaunch"
                    style={this.state.index1===index ? {backgroundColor: 'green'} : {backgroundColor: 'lightgreen'}}>{yr}</a>
              ))}
            </div>
            <div className="scsLnch">
                <h6>Successful launch</h6>
                {this.state.launchSuccess.map((launch, index) => (
                  <a className="waves-effect waves-light btn-small" ref={(element) => this.launch[index] = element}
                      id="launchSuccess"
                      onClick={() => this.selectLaunchSuccess(index)}
                      style={this.state.index2===index ? {backgroundColor: 'green'} : {backgroundColor: 'lightgreen'}}>{launch}</a>
                ))}
            </div>
            <div className="lnScs">
                <h6>Landing success</h6>
                {this.state.landingSuccess.map((landing, index) => (
                  <a className="waves-effect waves-light btn-small" ref={(element) => this.landing[index] = element}
                      id="landingSuccess"
                      onClick={() => this.selectLandingSuccess(index)}
                      style={this.state.index3===index ? {backgroundColor: 'green'} : {backgroundColor: 'lightgreen'}}>{landing}</a>
                ))}
            </div>
          </div>
          <div className="dash">
          {this.state.flights.map(flight => (
            <div className="row">
            <div className="col s12 m7">
              <div className="card">
                <div className="card-image">
                  <img src={flight.links.mission_patch} />
                </div>
                <div className="card-content">
                 <p style={{color: 'lightblue'}}><b>{flight.mission_name} # {flight.flight_number}</b></p>
                 <div>
                   <span><b>Mission Ids:</b></span>
                   <ul>
                     {flight.mission_id.map(id => (
                       <li>id</li>
                     ))}
                   </ul>
                   <p>Launch year: <span style={{color: 'lightblue'}}>{flight.launch_year}</span></p>
                   <p>Successful launch: <span style={{color: 'lightblue'}}>{flight.lanch_success ? "true" : "false"}</span></p>
                   <p>Successful landing: <span style={{color: 'lightblue'}}>landingText</span></p>
                 </div>
                </div>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>  
    )
  }
}

export default App