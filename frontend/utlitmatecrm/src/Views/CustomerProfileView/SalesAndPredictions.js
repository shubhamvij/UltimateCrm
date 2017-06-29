import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';
import './customMaterial.css';

class Sale extends Component {
     constructor() {
  	     super();
        this.state={detailViewActive:false};
    }
    componentDidMount(){
        this.closeSaleDetail = this.closeSaleDetail.bind(this);
    } 
    
    closeSaleDetail() {
        this.setState({detailViewActive: false});
    }
    

    render() {
        return (
                <li className="mdc-list-item">
                  <span className="mdc-list-item__text">
                    ${this.props.total}
                    <span className="mdc-list-item__text__secondary">{this.props.date}</span>
                  </span>
                  <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info"
                        onClick={() => this.setState({detailViewActive: true})}>
                    info
                  </a>
                    {this.state.detailViewActive && (
                        <SaleDetail closeSaleDetail={this.closeSaleDetail} order_line_items={this.props.order_line_items}> </SaleDetail>
                    )}      
                </li>
            );
    }
}

class SaleDetail extends Component {
    render() {
        return (
            <div className="mdc-elevation--z2 modal">
            <div class="mdc-typography">
                {this.props.order_line_items.map(item => <div>
                    <div>SKU: {item.product.sku}</div>
                    <div>quantity:{item.quantity} </div>
                    <div>trim: {item.product.trim}</div>
                    <div>color: {item.product.color}</div>
                    <div>price: {item.price}</div>
                    <div className="mdc-list-divider"></div>
                </div>)}
            </div>
                <button className="mdc-button mdc-button--raised"  href="#" onClick={this.props.closeSaleDetail}>
                  Cancel
                </button>
            </div>
        );
    }
}

class SalesAndPredictions extends Component {
  render() {
    const style = {
      margin: 20,
      padding: 20,
      color: 'white',
      backgroundColor: this.props.color,
    }

    
    return (
            <div className="mdc-list-group mdc-elevation--z2">
              <h3 className="mdc-list-group__subheader center">Past Sales</h3>
              <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
                {this.props.orders.map(item => <Sale date={item.date} total={item.total} order_line_items={item.order_line_items} sales_staff={item.first_name + " " + item.last_name} />)}
              </ul>
            </div>
    )
  }
}

export default SalesAndPredictions;