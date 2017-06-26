import React, { Component } from 'react'
import { render } from 'react-dom'
import './material.css';
import './material-icon.css'


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
        <ul className="mdc-list">
              <li className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">
                    mail
                </i>
                <span className="mdc-list-item__text">
                    Photos
                <span className="mdc-list-item__text__secondary">Subtext</span>
                </span>
                <span className="mdc-list-item__end-detail"> 8:00pm</span>

              </li>
              <li className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail">
                  bluetooth
                </i>
                Bluetooth
              </li>
              <li className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail">
                  data_usage
                </i>
                Data Usage
              </li>
            </ul>
        </div>
    )
  }
}

export default Emails;