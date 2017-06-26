import React, { Component } from 'react';
import { render } from 'react-dom'

import './material.css';
import Notes from './Notes';
import Emails from './Emails';
import SalesAndPredictions from './SalesAndPredictions';
import CustomerStrategy from './CustomerStrategy';
import CustomerInfo from './CustomerInfo';


class CustomerProfileView extends Component {
  render() {
    return (
        <div>
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

export default CustomerProfileView;
