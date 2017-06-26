import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';

class Notes extends Component {
  render() {
    const style = {
      margin: 20,
      padding: 20,
      color: 'white',
      backgroundColor: this.props.color,
    }

    return (
        <div className= "note-container">
            <div className="mdc-list-group mdc-elevation--z2">
              <h3 className="mdc-list-group__subheader">Notes</h3>
              <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
                <li className="mdc-list-item">
                  <span className="mdc-list-item__text">
                    Photos
                    <span className="mdc-list-item__text__secondary">Jan 9, 2014</span>
                  </span>
                  <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info">
                    info
                  </a>
                </li>
        <li className="mdc-list-item">
                  <span className="mdc-list-item__text">
                    Photos
                    <span className="mdc-list-item__text__secondary">Jan 9, 2014</span>
                  </span>
                  <a href="#" className="mdc-list-item__end-detail material-icons" aria-label="View more information" title="More info">
                    info
                  </a>
                </li>
                
              </ul>
            </div>
            <div className="new-note">
                <button className="mdc-fab mdc-fab--plain material-icons new-note-btn" aria-label="favorite">
                    <span className="mdc-fab__icon">
                        favorite
                    </span>
                </button>
            </div>
        </div>
    )
  }
}

export default Notes;