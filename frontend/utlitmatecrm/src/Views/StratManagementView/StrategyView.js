/**es
 * Created by jackzhang on 6/26/17.
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import '../../material.css';
import Comment from './Comment';
import CommentBox from "./CommentBox";

class StrategyView extends Component {

    render() {
        const style = {
            margin: 20,
            padding: 20,
            color: 'white',
            backgroundColor: this.props.color,
        }
        let strategies = this.props.strategy.strategies.map(strategy => {
            return (
                <Comment author={strategy.notes} key={strategy.id}>{strategy.next_steps}</Comment>
            )
        })

        return (
            <div className="mdc-elevation--z2 mdc-card__horizontal-block demo-card demo-card--with-avatar">
                <section className="mdc-card__primary">
                    <h1 className="mdc-card__title customTitle">{this.props.strategy.stage}</h1>
                    <h2 className="mdc-card__subtitle customTitle">{this.props.strategy.notes}</h2>
                </section>


                <section className="mdc-card__supporting-text customSupportingText">
                    <CommentBox data={this.props.strategy.strategies}/>
                </section>
            </div>
        )
    }
}

export default StrategyView;