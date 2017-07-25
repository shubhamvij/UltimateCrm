import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import RevenueBarChart from './RevenueBarChart';


class ForecastsView extends Component {
  render() {
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                        <h1>  Sales by Customer Type (USD$) </h1>
                        <RevenueBarChart customer_id={6}> </RevenueBarChart>
                    </div>
                  </div>
               </div>
      </div>
    );
  }
}

export default ForecastsView;
