import React, { Component } from 'react';
import { render } from 'react-dom'

import '../../material.css';
import Notes from './Notes';
import Emails from './Emails';
import SalesAndPredictions from './SalesAndPredictions';
import CustomerStrategy from './CustomerStrategy';
import CustomerInfo from './CustomerInfo';


class CustomerProfileView extends Component {
    
  constructor() {
  	 super();
     this.state={customerData:data};
  }
    

 componentDidMount(){
    fetch(`http://localhost:3000/api/customer/` + this.props.activeCustomerId)
        .then(result=>result.json())
        .then(customerData=>this.setState({customerData}))
  }
    

  render() {
      console.log(this.state.customerData);
    return (
        <div>
    <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
                <CustomerInfo   id={this.state.customerData.id}
                                first_name={this.state.customerData.first_name}
                                last_name={this.state.customerData.last_name}
                                office_phone={this.state.customerData.office_phone}
                                other_phone={this.state.customerData.other_phone}
                                title={this.state.customerData.title}
                                email={this.state.customerData.email}
                                description={this.state.customerData.description}
                                picture={this.state.customerData.profile_pic}>
                </CustomerInfo>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
                <CustomerStrategy   stage={this.state.customerData.stage}
                                    est_lifetime_value={this.state.customerData.est_lifetime_value}
                                    notes={this.state.customerData.notes}
                                    next_steps={this.state.customerData.next_steps}
                                    dnn_notes={this.state.dnn_notes}
                                    ></CustomerStrategy>
            </div>
          </div>
       </div>    
        
      <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell">
                <Notes  customer_contact_records={this.state.customerData.customer_contact_records}></Notes>
            </div>
            <div className="mdc-layout-grid__cell">
                <Emails customer_informations={this.state.customerData.customer_informations}></Emails>
            </div>
            <div className="mdc-layout-grid__cell">
                <SalesAndPredictions orders={this.state.customerData.orders}></SalesAndPredictions>
            </div>
          </div>
       </div>
        
        
      </div>
    );
  }
}

const data = 
{
   "id":8,
   "first_name":"Shubham",
   "last_name": "Vij",
    "picture":  "https://lh4.googleusercontent.com/-FLI32VyHh-Y/AAAAAAAAAAI/AAAAAAAAAAA/r1H413eiTfI/s80-c-k/photo.jpg",
    "customerIssues": [
      {
          "id": 5,
          "title" : "title",
          "desc" : "desc",
          "date": "date",
      }
    ],
   "office_phone":"123-456-6677",
   "other_phone":"226-998-8876",
   "other_phone_type":"test_other_phone_type",
   "title":"test_title",
   "department":"test_department",
   "company_id":5,
   "account_manager_id":10,
   "fax":"test_fax",
   "email":"test_vemail",
   "office_address":"test_office_address",
   "description":"test_desc",
   "generated_through_id":1,
   "est_lifetime_value":0,
   "amt_purchased":1,
   "notes":"Customer value will soon be 0 or negative.",
   "next_steps":"Cease sales and marketing efforts on the customer.",
   "stage":"Termination",
   "customer_type_id":1,
   "company":{
      "id":5,
      "name":"new_name",
      "description":"new_description",
      "phone":"new_phone",
      "website":"new_website",
      "country":"new_country",
      "account_manager_id":10
   },
   "customer_type":{
      "id":1,
      "name":"norm",
      "description":"fake"
   },
   "employee":{
      "id":10,
      "username":"test_username_3",
      "first_name":"test_first_name",
      "last_name":"test_last_name",
      "office_phone":"test_office_phone",
      "cell_phone":"test_cell_phone",
      "title":"test_title",
      "department_id":1,
      "fax":"test_fax",
      "office_address":"test_office_address",
      "email":"test_email"
   },
   "generation_type":{
      "id":1,
      "name":"test_name",
      "description":"test_description"
   },
   "customer_contact_records":[
      {
         "id":1,
         "customer_id":8,
         "employee_id":10,
         "contact_type_id":3,
         "subject":"test_subject",
         "start_date_time":"2017-06-25T20:54:28.000Z",
         "end_date_time":"2017-06-26T00:54:28.000Z",
         "description":"test_desc",
         "notes":"test_notes",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "contact_type":{
            "id":3,
            "name":"test_name",
            "description":"test_description"
         }
      },
      {
         "id":3,
         "customer_id":8,
         "employee_id":10,
         "contact_type_id":3,
         "subject":"new_subject",
         "start_date_time":"2017-06-26T20:54:28.000Z",
         "end_date_time":"2017-06-27T00:54:28.000Z",
         "description":"new_desc",
         "notes":"new_notes",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "contact_type":{
            "id":3,
            "name":"test_name",
            "description":"test_description"
         }
      }
   ],
   "customer_informations":[
      {
         "id":5,
         "customer_id":8,
         "customer_information_type_id":1,
         "value":"fake_info_3",
         "customer_information_type":{
            "id":1,
            "name":"new_name",
            "description":"new_description"
         }
      },
      {
         "id":6,
         "customer_id":8,
         "customer_information_type_id":1,
         "value":"fake_info_3",
         "customer_information_type":{
            "id":1,
            "name":"new_name",
            "description":"new_description"
         }
      },
      {
         "id":7,
         "customer_id":8,
         "customer_information_type_id":1,
         "value":"fake_info_3",
         "customer_information_type":{
            "id":1,
            "name":"new_name",
            "description":"new_description"
         }
      }
   ],
   "customer_reviews":[
      {
         "id":8,
         "source":"test_source",
         "subject":"test_subject",
         "body":"test_body",
         "customer_id":8,
         "product_id":1,
         "product":{
            "id":1,
            "sku":21,
            "trim":"high",
            "color":"red",
            "inventory":1
         }
      },
      {
         "id":9,
         "source":"test_source",
         "subject":"test_subject",
         "body":"test_body",
         "customer_id":8,
         "product_id":1,
         "product":{
            "id":1,
            "sku":21,
            "trim":"high",
            "color":"red",
            "inventory":1
         }
      },
      {
         "id":10,
         "source":"test_source",
         "subject":"test_subject",
         "body":"test_body",
         "customer_id":8,
         "product_id":1,
         "product":{
            "id":1,
            "sku":21,
            "trim":"high",
            "color":"red",
            "inventory":1
         }
      }
   ],
   "orders":[
      {
         "id":3,
         "customer_id":8,
         "account_manager_id":10,
         "total":"900.00",
         "date":"2017-06-25T20:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[
            {
               "id":2,
               "product_id":1,
               "quantity":34,
               "price":"50.00",
               "order_id":3,
               "product":{
                  "id":1,
                  "sku":21,
                  "trim":"high",
                  "color":"red",
                  "inventory":1
               }
            },
            {
               "id":4,
               "product_id":1,
               "quantity":5,
               "price":"100.00",
               "order_id":3,
               "product":{
                  "id":1,
                  "sku":21,
                  "trim":"high",
                  "color":"red",
                  "inventory":1
               }
            },
            {
               "id":5,
               "product_id":1,
               "quantity":5,
               "price":"100.00",
               "order_id":3,
               "product":{
                  "id":1,
                  "sku":21,
                  "trim":"high",
                  "color":"red",
                  "inventory":1
               }
            },
            {
               "id":6,
               "product_id":1,
               "quantity":5,
               "price":"100.00",
               "order_id":3,
               "product":{
                  "id":1,
                  "sku":21,
                  "trim":"high",
                  "color":"red",
                  "inventory":1
               }
            }
         ]
      },
      {
         "id":9,
         "customer_id":8,
         "account_manager_id":10,
         "total":"1000.00",
         "date":"2017-06-25T22:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":12,
         "customer_id":8,
         "account_manager_id":10,
         "total":"200.00",
         "date":"2017-06-25T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":13,
         "customer_id":8,
         "account_manager_id":10,
         "total":"600.00",
         "date":"2017-06-25T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":14,
         "customer_id":8,
         "account_manager_id":10,
         "total":"100.00",
         "date":"2017-06-27T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":15,
         "customer_id":8,
         "account_manager_id":10,
         "total":"800.00",
         "date":"2017-06-28T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":16,
         "customer_id":8,
         "account_manager_id":10,
         "total":"300.00",
         "date":"2017-06-30T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":17,
         "customer_id":8,
         "account_manager_id":10,
         "total":"700.00",
         "date":"2017-08-15T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":18,
         "customer_id":8,
         "account_manager_id":10,
         "total":"400.00",
         "date":"2017-08-17T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":19,
         "customer_id":8,
         "account_manager_id":10,
         "total":"1000.00",
         "date":"2017-08-19T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      },
      {
         "id":20,
         "customer_id":8,
         "account_manager_id":10,
         "total":"450.00",
         "date":"2017-08-22T23:54:28.000Z",
         "employee":{
            "id":10,
            "username":"test_username_3",
            "first_name":"test_first_name",
            "last_name":"test_last_name",
            "office_phone":"test_office_phone",
            "cell_phone":"test_cell_phone",
            "title":"test_title",
            "department_id":1,
            "fax":"test_fax",
            "office_address":"test_office_address",
            "email":"test_email"
         },
         "order_line_items":[

         ]
      }
   ]
};

export default CustomerProfileView;
