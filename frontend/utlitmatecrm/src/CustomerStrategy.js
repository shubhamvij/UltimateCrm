import React, { Component } from 'react'
import { render } from 'react-dom'
import './material.css';

class CustomerStrategy extends Component {
  render() {
    const style = {
      margin: 20,
      padding: 20,
      color: 'white',
      backgroundColor: this.props.color,
    }

    return (
        <div className="strategy-containter mdc-elevation--z2">
      <div className="mdc-layout-grid ">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell">
                Classification
            </div>
            <div className="mdc-layout-grid__cell">
               Customer Projected Value in 5 Years
            </div>
            <div className="mdc-layout-grid__cell strategy-containter-date">
                Date
            </div>
          </div>
        
       </div >
       <div className="mdc-layout-grid ">    
            <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell">
                Strategy
                <p> Description </p>
                <p></p>
                <p> Sub-Description </p>
                <button className="mdc-button mdc-button--raised">
                  Edit
                </button>
        
                </div>
            </div>
        </div>
        </div>
    )
  }
}

export default CustomerStrategy;