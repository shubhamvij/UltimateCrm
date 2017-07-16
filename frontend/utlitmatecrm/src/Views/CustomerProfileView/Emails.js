import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';
import '../../material-icon.css'


class CustomerInfo extends Component {
    render() {
        return (
            <li className="mdc-list-item customListItem">
                <span className="mdc-list-item__text">
                    {this.props.title}
                <span className="mdc-list-item__text__secondary">{this.props.description}</span>
                </span>
            </li>
        );
    }
}

class Emails extends Component {
  render() {
    const style = {
      margin: 20,
      padding: 20,
      color: 'white',
      backgroundColor: this.props.color,
    }
    
    return (
      
       <div className="mdc-elevation--z2">
            <h3 className="mdc-list-group__subheader center">Customer Contact Info/Efforts</h3>
            <ul className="mdc-list">
                {this.props.customer_informations.map(item => <CustomerInfo title={item.customer_information_type.name}
                    description={item.customer_information_type.description}/>)}
              
            </ul>
        </div>
    )
  }
}

export default Emails;