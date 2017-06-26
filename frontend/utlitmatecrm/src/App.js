import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './material.css';
import Notes from './Notes';
import Emails from './Emails';
import SalesAndPredictions from './SalesAndPredictions';
import CustomerStrategy from './CustomerStrategy';
import CustomerInfo from './CustomerInfo';


class App extends Component {
  render() {
    return (
      
        
        <div className="app">
        
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="App-header-content">
                <button className="mdc-button mdc-button--accent">
                    Home
                </button>
                <button className="mdc-button mdc-button--accent">
                    Accounts
                </button>
            <button className="mdc-button mdc-button--accent">
                    Strategy Management
                </button>
            <button className="mdc-button mdc-button--accent">
                    Forecasts
                </button>
            <button className="mdc-button mdc-button--accent">
                    Issue Management
                </button>
            </div>

        </div>
        
    <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                <CustomerInfo></CustomerInfo>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <CustomerStrategy></CustomerStrategy>
            </div>
          </div>
       </div>    
        
      <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell">
                <Notes></Notes>
            </div>
            <div className="mdc-layout-grid__cell">
                <Emails></Emails>
            </div>
            <div className="mdc-layout-grid__cell">
                <SalesAndPredictions></SalesAndPredictions>
            </div>
          </div>
       </div>
        
        
      </div>
    );
  }
}

export default App;
