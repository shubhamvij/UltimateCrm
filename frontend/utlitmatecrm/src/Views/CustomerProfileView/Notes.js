import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';


class Note extends Component {
    render() {
        return (
        <li className="mdc-list-item">
            <span className="mdc-list-item__text">
                {this.props.subject}
                <span className="mdc-list-item__text__secondary">
                    {this.props.description}
                </span>
            </span>
        </li>
            );
    }
}

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
                    {this.props.customer_contact_records.map(item => <Note subject={item.subject} description={item.description} />)}
              </ul>
            </div>

        
            <div className="new-note">
                <button className="mdc-fab mdc-fab--plain material-icons new-note-btn" aria-label="favorite">
                        add
                </button>
            </div>
        </div>
    )
  }
}

export default Notes;