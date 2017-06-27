/**es
 * Created by jackzhang on 6/26/17.
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';

class StrategyView extends Component {

    render() {
        const style = {
            margin: 20,
            padding: 20,
            color: 'white',
            backgroundColor: this.props.color,
        }
        return (
            <div className="mdc-elevation--z2 mdc-card__horizontal-block demo-card demo-card--with-avatar">
                <section className="mdc-card__primary">
                    <h1 className="mdc-card__title customTitle">{this.props.customer.name}</h1>
                    <h2 className="mdc-card__subtitle customTitle">{this.props.customer.description}</h2>
                </section>

                <section className="mdc-card__supporting-text customSupportingText">
                    <p>est_lifetime_value:{this.props.customer.strategies[0].est_lifetime_value}</p>
                    <p>notes:{this.props.customer.strategies[0].notes}</p>
                    <p>next step:{this.props.customer.strategies[0].next_steps}</p>
                    <p>stage:{this.props.customer.strategies[0].stage}</p>
                </section>
            </div>
        )
    }
}

export default StrategyView;