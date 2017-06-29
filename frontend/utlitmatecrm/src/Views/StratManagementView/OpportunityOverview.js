/**
 * Created by jackzhang on 6/26/17.
 */

import React from 'react';
import {Link} from 'react-router';
import '../../material.css';

export default class OpportunityOverview extends React.Component {
    render() {
        return (
                <div className="opportunity-preview">
                    <h3 className="name">Stage:{this.props.stage}</h3>
                    <ul className="mdc-list">
                        <li className="mdc-list-item">
                            <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">label</i>
                            {this.props.type}
                        </li>
                        <li className="mdc-list-item">
                            <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">description</i>
                            {this.props.notes}
                        </li>
                    </ul>

                </div>
        );
    }
}