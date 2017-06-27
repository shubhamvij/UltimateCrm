/**
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
                    <div className="demo-card__avatar" style={style}></div>
                    <h1 className="mdc-card__title customTitle">Title</h1>
                    <h2 className="mdc-card__subtitle customTitle">Subhead</h2>
                </section>

                <section className="mdc-card__supporting-text customSupportingText">
                    <p>Item 1</p>
                    <p>Item  sdlfkls;dfl;sdl;f l;sdf;l sl;df1</p>
                    <p>Item 1</p>
                    <p>Item 1</p>
                </section>


            </div>
        )
    }
}

export default StrategyView;