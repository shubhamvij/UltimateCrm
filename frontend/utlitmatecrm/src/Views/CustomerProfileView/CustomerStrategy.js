import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';
import './customMaterial.css';

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
                <div className="mdc-typography--body1"><b>Classification</b></div>
                <p className="mdc-typography--body1"> {this.props.stage} </p>
            </div>
            <div className="mdc-layout-grid__cell">
               <div className="mdc-typography--body1"><b>Projected Value in 5 Years</b></div>
                <p className="mdc-typography--body1"> ${this.props.est_lifetime_value} </p>
             
            </div>
            <div className="mdc-layout-grid__cell strategy-containter-date">
               <div className="mdc-typography--caption"> {new Date().toLocaleTimeString()} </div> 
            </div>
          </div>
        
       </div >
       <div className="mdc-layout-grid ">    
            <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell--span-10">
                    <div className="mdc-typography--body1"><b>Strategy</b></div>
                    <p className="mdc-typography--body2"> {this.props.notes} </p>
                    <p></p>
                    <p className="mdc-typography--body2"> {this.props.next_steps} </p>
                    <button className="mdc-button mdc-button--raised">
                      Edit
                    </button>
                </div>
                <div className="mdc-layout-grid__cell--span-2">
                        <div className="custom-switch-container">
                        <div className="mdc-switch custom-switch">
                            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked/>
                            <div className="mdc-switch__background">
                                <div className="mdc-switch__knob"></div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
  }
}

export default CustomerStrategy;