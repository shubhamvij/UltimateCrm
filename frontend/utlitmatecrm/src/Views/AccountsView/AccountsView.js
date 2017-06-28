import React, { Component } from 'react';
import { render } from 'react-dom'


import '../../material.css';
import './accountsView.css'

class NewCustomer extends Component {
    constructor() {
  	 super();
     this.state={first_name:"", last_name:"", title:"", office_phone:"", other_phone:"", email:"", customer_type_id: "1", company_name: ""};
    
    this.handleCustomerTypeChange = this.handleCustomerTypeChange.bind(this);

    }
    
    handleCustomerTypeChange(event) {
        this.setState({customer_type_id: event.target.value});
    }
    render() {
        return (
            <div className="mdc-elevation--z2 modal">
           
                <h3>New Customer</h3>
            
                <select className="mdc-select" value={this.state.customer_type_id} onChange={this.handleCustomerTypeChange}>
                  <option value="2">Distributor</option>
                  <option value="1">Individual</option>
                </select>
                {this.state.customer_type_id === "1" &&
                        <div>
                        <div className="mdc-textfield mdc-textfield--fullwidth">
                          <input className="mdc-textfield__input"
                                 type="text"
                                 placeholder="First Name"
                                 aria-label="Full-Width Textfield"
                                 value={this.state.first_name} />
                        </div>
                        <div className="mdc-textfield mdc-textfield--fullwidth">
                          <input className="mdc-textfield__input"
                                 type="text"
                                 placeholder="Last Name"
                                 aria-label="Full-Width Textfield"
                                 value={this.state.last_name}/>
                        </div>
                        </div>
                }
                {this.state.customer_type_id === "2" &&
                        <div>
                        <div className="mdc-textfield mdc-textfield--fullwidth">
                          <input className="mdc-textfield__input"
                                 type="text"
                                 placeholder="Company Name"
                                 aria-label="Full-Width Textfield"
                                 value={this.state.company_name} />
                        </div>
                        </div>
                }
                
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Title"
                         aria-label="Full-Width Textfield" 
                         value={this.state.title}/>
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Office Phone"
                         aria-label="Full-Width Textfield" 
                         value={this.state.office_phone}/>
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Other Phone"
                         aria-label="Full-Width Textfield" 
                         value={this.state.other_phone} />
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Email"
                         aria-label="Full-Width Textfield" 
                         value={this.state.email}/>
                </div>
                <button className="mdc-button mdc-button--raised">
                  Submit
                </button>
                <button className="mdc-button mdc-button--raised"  href="#" onClick={this.props.modalActive}>
                  Cancel
                </button>
            </div>
        );
    }
}

class Customer extends Component {
    render() {
            console.log(this.props);

        return (
                <li className="mdc-list-item">
                  <span className="mdc-list-item__text">
                    {this.props.name}
                    <span className="mdc-list-item__text__secondary">{this.props.date}</span>
                  </span>
                  <a href="#" onClick={() => this.props.clickCallback(this.props.customerId)} className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info">
                    info
                  </a>
                </li>
            );
    }
}

class AccountsView extends Component {
  constructor() {
  	 super();
     this.state={customers:[], newCustomer:false};
  }
  componentDidMount(){
    fetch(`http://localhost:3000/api/customers`)
        .then(result=>result.json())
        .then(customers=>this.setState({customers}))
    
    this.closeNewCustomerWindow = this.closeNewCustomerWindow.bind(this);
    this.clickCustomerCallback = this.clickCustomerCallback.bind(this);

  }
  closeNewCustomerWindow() {
     this.setState({newCustomer: false});
  }
    
  clickCustomerCallback(id) {
      console.log("HELLO SIRS");
      console.log(id);
      this.props.navigateToCustomerPage(id);
  }

  render() {
    console.log(this.state.customers);
    return (
        <div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        Individuals
                        {this.state.customers.filter(function(customer){
                          return customer.customer_type_id === 1;
                        }).map(item => <Customer clickCallback={this.clickCustomerCallback} customerId={item.id} name={item.first_name + " " + item.last_name} />)}
                        
                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        Distributors
                        {this.state.customers.filter(function(customer){
                          return customer.customer_type_id === 2;
                        }).map(item => <Customer clickCallback={this.clickCustomerCallback}  customerId={item.id} name={item.company.name} />)}
                    </div>
                </div>
                <button className="mdc-fab mdc-fab--plain material-icons new-note-btn" aria-label="favorite"
                        href="#" onClick={() => this.setState({newCustomer: true})}>
                        add
                </button>
                 
            </div>    
                {this.state.newCustomer && (
                    <NewCustomer modalActive={this.closeNewCustomerWindow}> </NewCustomer>
                )}        
        
      </div>
    );
  }
}

export default AccountsView;
