import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import RevenueBarChart from './RevenueBarChart';
const customerTypeId = "1";
const companyTypeId = "2";

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

class ForecastsView extends Component {
    constructor() {
        super();
        this.state={customers:[], current_customer: 7, est_value: []};
    }

    componentDidMount(){
        fetch(`http://rectum.herokuapp.com/api/customers/`)
            .then(result=>result.json())
            .then(customers=>{
                this.setState({customers: customers});
                this.setState({current_customer: customers[0].id});
                this.setState({est_value: customers[0].customer_est_lifetime_values});
            });
        console.log(this.state.customers);
        //this.state.current_customer = this.state.customers[0].id;
        this.clickCustomerCallback = this.clickCustomerCallback.bind(this);
    }

    clickCustomerCallback(id) {
        console.log("clicked" + id);
        this.setState({current_customer: id});
        for (var i = 0; i < this.state.customers.length; i++) {
            if (this.state.customers[i].id == id){
                this.setState({est_value: this.state.customers[i].customer_est_lifetime_values});
                break;
            }
        }
        console.log(this.state.est_value);
    }

  render() {
        console.log(this.state.current_customer);
    return (
        <div>
            <div className="mdc-layout-grid">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        <h3> Individuals </h3>
                        {this.state.customers.filter(function(customer){
                            return customer.customer_type_id === parseInt(customerTypeId);
                        }).map(item => <Customer clickCallback={this.clickCustomerCallback} customerId={item.id} name={item.first_name + " " + item.last_name} />)}

                    </div>
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        <h3> Distributors </h3>
                        {this.state.customers.filter(function(customer){
                            return customer.customer_type_id === parseInt(companyTypeId);
                        }).map(item => <Customer clickCallback={this.clickCustomerCallback}  customerId={item.id} name={item.company.name} />)}
                    </div>
                </div>
            </div>
            <div className="mdc-layout-grid">
                  <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                        <h1>  Value Estimates by Customer (USD$) </h1>
                        <RevenueBarChart est_value={this.state.est_value}> </RevenueBarChart>
                    </div>
                  </div>
               </div>
        </div>
    );
  }
}

export default ForecastsView;
