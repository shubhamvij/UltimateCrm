import React, { Component } from 'react';
import { render } from 'react-dom'


import '../../material.css';
import './accountsView.css'

class NewCustomer extends Component {
    constructor() {
  	 super();
     this.state={first_name:"", last_name:"", title:"", office_phone:"", other_phone:"", email:"", customer_type_id: "1", company_name: "", description: "",
                 picture: ""};
    
    this.handleCustomerTypeChange = this.handleCustomerTypeChange.bind(this);
    this.createNewCustomer = this.createNewCustomer.bind(this);    
    this.handleInputChange = this.handleInputChange.bind(this);
    }
    createNewCustomer() {
        fetch('http://localhost:3000/api/customer', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "first_name": this.state.first_name,
           "last_name": this.state.last_name,
            "picture":  this.state.picture,
            "office_phone": this.state.office_phone,
           "other_phone": this.state.other_phone,
           "other_phone_type":"",
           "title": this.state.title,
           "department":"",
           "company_id":5,
           "account_manager_id":10,
           "fax":"",
           "email":this.state.email,
           "office_address":"",
           "description":"",
          "customer_type_id": this.state.customer_type_id,
           "company":{
              "id":5,
              "name":this.state.company_name,
              "description":this.state.description,
              "phone":"",
              "website":"",
              "country":"",
              "account_manager_id":10
            },   
          })
        }).then(() => this.props.modalActive())
        
    }
    
    handleCustomerTypeChange(event) {
        this.setState({customer_type_id: event.target.value});
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
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
                                 name="first_name"
                                 value={this.state.first_name}
                                onChange={this.handleInputChange}/>
                        </div>
                        <div className="mdc-textfield mdc-textfield--fullwidth">
                          <input className="mdc-textfield__input"
                                 type="text"
                                 placeholder="Last Name"
                                 aria-label="Full-Width Textfield"
                                name="last_name"
                                 value={this.state.last_name}
                                onChange={this.handleInputChange}/>
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
                                name="company_name"
                                 value={this.state.company_name}
                                onChange={this.handleInputChange}/>
                        </div>
                        <div className="mdc-textfield mdc-textfield--fullwidth">
                          <input className="mdc-textfield__input"
                                 type="text"
                                 placeholder="Company Description"
                                 aria-label="Full-Width Textfield"
                                name="description"
                                 value={this.state.description}
                                onChange={this.handleInputChange}/>
                        </div>
                        </div>
                }
                
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Profile Picture Url"
                         aria-label="Full-Width Textfield"
                        name="picture"
                         value={this.state.picture}
                        onChange={this.handleInputChange}/>
                </div>
            
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Title"
                         aria-label="Full-Width Textfield" 
                        name="title"
                         value={this.state.title}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Office Phone"
                         aria-label="Full-Width Textfield" 
                        name="office_phone"
                         value={this.state.office_phone}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Other Phone"
                         aria-label="Full-Width Textfield" 
                        name="other_phone"
                         value={this.state.other_phone} 
                        onChange={this.handleInputChange}/>
                </div>
                <div className="mdc-textfield mdc-textfield--fullwidth">
                  <input className="mdc-textfield__input"
                         type="text"
                         placeholder="Email"
                         aria-label="Full-Width Textfield" 
                        name="email"
                         value={this.state.email}
                        onChange={this.handleInputChange}/>
                </div>
                <button className="mdc-button mdc-button--raised" href="#" onClick={this.createNewCustomer}>
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
                <button className="mdc-fab mdc-fab--plain material-icons new-note-btn newAccount" aria-label="favorite"
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
