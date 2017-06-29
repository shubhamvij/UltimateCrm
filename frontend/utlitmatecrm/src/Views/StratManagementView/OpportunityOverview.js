/**
 * Created by jackzhang on 6/26/17.
 */

import React from 'react';
import {Link} from 'react-router';


export default class OpportunityOverview extends React.Component {
    render() {
        return (
                <div className="opportunity-preview">
                    <h2 className="name">Stage:{this.props.stage}</h2>
                    <span className="description">Type:{this.props.type}</span>
                    <span className="description">Notes:{this.props.notes}</span>

                </div>
        );
    }
}