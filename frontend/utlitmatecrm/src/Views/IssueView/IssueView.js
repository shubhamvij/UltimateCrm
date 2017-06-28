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
const listItems = testData.map((item) => <li key={item.id} className="mdc-list-item"><i className="material-icons mdc-list-item__start-detail">
                                bluetooth
                              </i>{item.title}</li>);
class IssueView extends Component {
  render() {
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                        <nav className="mdc-permanent-drawer mdc-typography">
                          <nav id="icon-with-text-demo" className="mdc-list">
                            <a className="mdc-list-item mdc-permanent-drawer--selected" href="#">
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>All
                            </a>
                            <a className="mdc-list-item" href="#">
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Favourites
                            </a>
                            <a className="mdc-list-item" href="#">
                              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Assigned to me
                            </a>
                          </nav>
                        </nav>
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
                      <div className="mdc-elevation--z2">
                          <ul className="mdc-list">
                            {listItems}
                          </ul>
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
