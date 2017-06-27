import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import StrategyView from './StrategyView';
import OpportunityOverview from './OpportunityOverview';
import opportunities from '../../data/opportunities';


class StratManagementView extends Component {

    state = {customer: opportunities[0]};

    componentDidMount() {
        this.setState({customer: opportunities[0]});
    }

    getInitialState() {
        return {
            customer: opportunities[0]
        }
    }

    handleClick(customer) {
        this.setState({customer: customer});
        console.log(customer);
    }

    render() {
      return (
          <div className="Strategy left">
                  <div className="opportunity-selector">
                      <div className="mdc-layout-grid">
                      {opportunities.map(opportunityData =>
                              <div className="mdc-layout-grid__inner">
                                  <div className="mdc-layout-grid__cell">
                                      <div className="cell mdc-list-group mdc-elevation--z2" onClick={this.handleClick.bind(this, opportunityData)}>
                                          <OpportunityOverview key={opportunityData.id} {...opportunityData} />
                                      </div>
                                  </div>
                              </div>
                      )}
                    </div>
                  </div>
              <div className="right">
                  <StrategyView customer={this.state.customer}/>
              </div>
          </div>
      );
  }
}

export default StratManagementView;
