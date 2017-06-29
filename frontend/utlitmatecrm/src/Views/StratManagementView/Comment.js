/**
 * Created by jackzhang on 6/27/17.
 */
import React from 'react';
//import marked from 'marked';

class Comment extends React.Component {
    /*rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup};
    }*/

    render() {
        console.log("comment" + this.props.next_steps);
        return (
            <div>
                <h3>{this.props.next_steps}</h3>
                <span> {this.props.children.toString()} </span>
            </div>
        )
    }
}

export default Comment;