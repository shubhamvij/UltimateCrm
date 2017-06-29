import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import StrategyView from './StrategyView';
import OpportunityOverview from './OpportunityOverview';
import strategies from '../../data/strategies';
import CommentBox from './CommentBox';

class StratManagementView extends Component {

    state = {strategy: strategies[0]};

    componentDidMount() {
        this.setState({strategy: strategies[0]});
    }

    getInitialState() {
        return {
            strategy: strategies[0]
        }
    }

    handleClick(strategy) {
        this.setState({strategy: strategy});
    }

    render() {
      return (
          <div className="Strategy left">
                  <div className="opportunity-selector">
                      <div className="mdc-layout-grid">
                      {strategies.map(strategy =>
                              <div className="mdc-layout-grid__inner">
                                  <div className="mdc-layout-grid__cell">
                                      <div className="cell mdc-list-group mdc-elevation--z2" onClick={this.handleClick.bind(this, strategy)}>
                                          <OpportunityOverview key={strategy.id} {...strategy} />
                                      </div>
                                  </div>
                              </div>
                      )}
                    </div>
                  </div>
              <div className="right">
                  <StrategyView strategy={this.state.strategy}/>
              </div>
          </div>
      );
  }
}

export default StratManagementView;
