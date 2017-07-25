import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';



class HomeView extends Component {
    
    constructor() {
  	 super();
  }
  componentDidMount(){
    
    this.clickCustomerCallback = this.clickCustomerCallback.bind(this);

  }
    
    clickCustomerCallback(id) {
      console.log("HELLO SIRS");
      console.log(id);
      this.props.navigateToCustomerPage(id);
  }
    
  render() {
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                        <h2>Clients Needing Attention:</h2>
                        <h3> Termination Required </h3>
                    <img href="#" onClick={() => this.clickCustomerCallback(22)} src={require("../../bill.png")} />
                      
                    </div>
                  </div>
               </div>    
        
        
      </div>
    );
  }
}

export default HomeView;
