import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';

class Sale extends Component {
    render() {
        return (
                <li className="mdc-list-item">
                  <span className="mdc-list-item__text">
                    ${this.props.total}
                    <span className="mdc-list-item__text__secondary">{this.props.date}</span>
                  </span>
                  <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info">
                    info
                  </a>
                </li>
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
              <h3 className="mdc-list-group__subheader">Past Sales</h3>
              <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
                {this.props.orders.map(item => <Sale date={item.date} total={item.total} sales_staff={item.first_name + " " + item.last_name} />)}
              </ul>
              <div className="mdc-list-divider mdc-list-divider--inset"> </div>
              <h3 className="mdc-list-group__subheader">Future Predictions</h3>
              <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
                <li className="mdc-list-item">
                  <span className="mdc-list-item__start-detail grey-bg" role="presentation">
                    <i className="material-icons" aria-hidden="true">insert_drive_file</i>
                  </span>
                  <span className="mdc-list-item__text">
                    Vacation Itinerary
                    <span className="mdc-list-item__text__secondary">Jan 10, 2014</span>
                  </span>
                  <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info">
                    info
                  </a>
                </li>
              </ul>
            </div>
    )
  }
}

export default SalesAndPredictions;