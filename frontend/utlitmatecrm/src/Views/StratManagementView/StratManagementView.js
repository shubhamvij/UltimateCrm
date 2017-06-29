import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import StrategyView from './StrategyView';
import OpportunityOverview from './OpportunityOverview';
import strategies from '../../data/strategies';
import CommentBox from './CommentBox';

class StratManagementView extends Component {

    constructor(props) {
        super(props);
        this.state = {strategy: strategies[0]};
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(comment){
        console.log(strategies);
        for (var i = 0; i < strategies.length; i++) {
            if (strategies[i]['id'] == comment.parent_id) {
                strategies[i]['strategies'].push(comment);
            }
        }
    }

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
          <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__inner">
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                          <div className="opportunity-selector">
                              <div className="mdc-layout-grid">
                              {strategies.map(strategy =>
                                              <div className="cell mdc-list-group mdc-elevation--z2" onClick={this.handleClick.bind(this, strategy)}>
                                                  <OpportunityOverview key={strategy.id} {...strategy} />
                                              </div>
                              )}
                            </div>
                          </div>
                  </div>
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                      <div className="right">
                          <StrategyView strategy={this.state.strategy} handleCommentSubmit={this.handleCommentSubmit}/>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default StratManagementView;
