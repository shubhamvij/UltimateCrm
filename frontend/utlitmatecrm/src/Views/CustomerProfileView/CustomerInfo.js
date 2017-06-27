import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';
import './customMaterial.css';



class CustomerInfo extends Component {
    
  render() {
   
     let style = {
      backgroundImage: `url(` + this.props.picture +`)`
    }    

    return (
      <div className="mdc-elevation--z2 mdc-card__horizontal-block demo-card demo-card--with-avatar">
        
        <section className="mdc-card__primary">
            <div className="demo-card__avatar" style={style}></div>
            <h1 className="mdc-card__title customTitle"> {this.props.first_name} </h1>
            <h1 className="mdc-card__title customTitle"> {this.props.last_name} </h1>
            <h2 className="mdc-card__subtitle customTitle"> {this.props.title} </h2>
          </section>
  
  <section className="mdc-card__supporting-text customSupportingText">
        <p>{this.props.email}</p>
        <p>{this.props.office_phone}</p>
        <p>{this.props.other_phone}</p>
        <p>{this.props.description}</p>
  </section>


</div>
    )
  }
}

export default CustomerInfo;