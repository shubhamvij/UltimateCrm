import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import StrategyView from './StrategyView';
import OpportunityOverview from './OpportunityOverview';
import opportunities from '../../data/opportunities';

class StratManagementView extends Component {
  render() {
      return (
          <div className="Strategy">
                  <div className="opportunity-selector">
                      {opportunities.map(opportunityData =>
                          <div className="cell mdc-list-group mdc-elevation--z2">
                            <OpportunityOverview key={opportunityData.id} {...opportunityData} />
                          </div>)
                      }
              </div>
          </div>
      );
  }
}

export default StratManagementView;
