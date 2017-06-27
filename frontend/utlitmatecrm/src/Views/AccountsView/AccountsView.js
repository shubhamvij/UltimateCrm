import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';



class AccountsView extends Component {
  constructor() {
  	 super();
     this.state={customers:[]};
  }
  componentDidMount(){
    fetch(`http://localhost:3000/api/customers`)
        .then(result=>result.json())
        .then(customers=>this.setState({customers}))
  }
  render() {
    console.log(this.state.customers);
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        Individuals
                        
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        Distributors
                    </div>
                  </div>
               </div>    
        
        
      </div>
    );
  }
}

export default AccountsView;
