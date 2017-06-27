/**
 * Created by jackzhang on 6/26/17.
 */

import React from 'react';
import {Link} from 'react-router';


export default class OpportunityOverview extends React.Component {
    render() {
        return (
            <Link to={`/opporunity/${this.props.id}`}>
                <div className="opportunity-preview">
                    <h2 className="name">{this.props.name}</h2>
                    <span className="description">{this.props.description}</span>
                </div>
            </Link>
        );
    }
}