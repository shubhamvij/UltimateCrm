import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './material.css';

import CustomerProfileView from './Views/CustomerProfileView/CustomerProfileView';
import AccountsView from './Views/AccountsView/AccountsView';
import ForecastsView from './Views/ForecastsView/ForecastsView';
import HomeView from './Views/HomeView/HomeView';
import IssueView from './Views/IssueView/IssueView';
import StratManagementView from './Views/StratManagementView/StratManagementView';

class ActiveView extends Component {
    
    render() {
        const viewName = this.props.activeViewName;
        if (viewName === 'Accounts') {
            return <AccountsView navigateToCustomerPage={this.props.navigateToCustomerPage}/>;
          } else if (viewName === 'Strategy') {
            return <StratManagementView />;
          } else if (viewName === 'Forecasts') {
            return <ForecastsView />;
          } else if (viewName === 'Issue') {
            return <IssueView activeCustomerId={this.props.activeCustomerId}/>;
          } else if (viewName === 'Customer') {
            return <CustomerProfileView activeCustomerId={this.props.activeCustomerId}/>;
          } else  
          return <HomeView />;
  }
}   
  

class App extends Component {

  state = {currentView: 'Home'}
  componentDidMount() {
     this.setState({currentView: 'Home', activeCustomerId: "-1"}); 
     this.navigateToCustomerPage = this.navigateToCustomerPage.bind(this);

  }

  handleLoginClick(btn) {
    this.setState({currentView: btn});
    console.log(this.state.currentView);
  }

    
    navigateToCustomerPage(id) {
     this.setState({activeCustomerId: id, currentView: 'Customer'});
    }

 
        
  render() {

    return (
      
        <div className="app">
        
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="App-header-content">
                <button className="mdc-button mdc-button--accent" onClick={() => this.handleLoginClick('Home')}>
                    Home
                </button>
                <button className="mdc-button mdc-button--accent" onClick={() => this.handleLoginClick('Accounts')}>
                    Accounts
                </button>
            <button className="mdc-button mdc-button--accent" onClick={() => this.handleLoginClick('Strategy')}>
                    Strategy Management
                </button>
            <button className="mdc-button mdc-button--accent" onClick={() => this.handleLoginClick('Forecasts')}>
                    Forecasts
                </button>
            <button className="mdc-button mdc-button--accent" onClick={() => this.handleLoginClick('Issue')}>
                    Issue Management
                </button>
            </div>

        </div>
        
        <ActiveView activeViewName={this.state.currentView} activeCustomerId={this.state.activeCustomerId} 
                    navigateToCustomerPage={this.navigateToCustomerPage} active/>
        
      </div>
    );
  }
}

export default App;
