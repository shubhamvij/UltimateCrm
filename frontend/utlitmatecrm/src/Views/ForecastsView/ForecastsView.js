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
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                        <RevenueBarChart/>
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                        ForecastsView
                    </div>
                  </div>
               </div>    
        
        
      </div>
    );
  }
}

export default ForecastsView;
