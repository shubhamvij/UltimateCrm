import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import './issueView.css'


const testData = [
    {id: '1', title: 'Test 1'},
    {id: '2', title: 'Test 2' },
    {id: '3', title: 'Test 3'},
    {id: '4', title: 'Test 4'},
    {id: '5', title: 'Test 5'},
  ]
class IssueView extends Component {
  constructor(){
    super();
    this.state = {issues:[], filter:'all'};
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/issues')
        .then(result => result.json())
        .then(issues => this.setState({issues}));

    this.closeIssue = this.closeIssue.bind(this);
    this.filterItem = this.filterItem.bind(this);
  }

  closeIssue() {
     this.setState({newCustomer: false});
  }

  filterItem(item) {
    if (this.state.filter === 'all'){
      return true;
    } else if (this.state.filter === 'open_me'){
      return item.opened_by.id == this.props.activeCustomerId? this.props.activeCustomerId: item.opened_by.id; 
    } else if (this.state.filter === 'ass_me'){
      return item.assigned_to.id == this.props.activeCustomerId? this.props.activeCustomerId: item.assigned_to.id;
    }
  }

  render() {
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                        <nav className="mdc-permanent-drawer mdc-typography">
                          <nav id="icon-with-text-demo" className="mdc-list">
                            <a className="mdc-list-item mdc-permanent-drawer--selected" href="#" onClick={() => this.setState({filter: 'all'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>All
                            </a>
                            <a className="mdc-list-item" href="#" onClick={() => this.setState({filter: 'open_me'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Opened by me
                            </a>
                            <a className="mdc-list-item" href="#" onClick={() => this.setState({filter: 'ass_me'})}>
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Assigned to me
                            </a>
                          </nav>
                        </nav>
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
                      <div className="mdc-elevation--z2">
                          {this.state.issues.filter(this.filterItem).map((item) => <div className="mdc-card">
                            <section className="mdc-card__primary">
                              <h1 className="mdc-card__title mdc-card__title--large">{item.title}<br/></h1>
                              <h2 className="mdc-card__subtitle">Assigned to: {item.assigned_to.first_name} {item.assigned_to.last_name}
                                  <br/>Opened by: {item.opened_by.first_name} {item.opened_by.last_name}
                              </h2>
                            </section>
                            <section className="mdc-card__supporting-text">
                              <p><h3>Issue: {item.issue_type.name}</h3>{item.issue_type.description}</p>
                              <p><h3>Notes:</h3>{item.issue_notes}</p>
                            </section>
                            <section className="mdc-card__actions">
                              <button className="mdc-button mdc-button--compact mdc-card__action">Close</button>
                            </section>
                          </div>)}
                      </div>
                      <button className="mdc-fab material-icons add-button-right" aria-label="Add">
                            <span className="mdc-fab__icon">
                              add
                            </span>
                          </button>
                    </div>
                  </div>
            </div>  
      </div>
    );
  }
}

export default IssueView;
