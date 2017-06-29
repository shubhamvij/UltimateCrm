/**
 * Created by jackzhang on 6/27/17.
 */
import React from 'react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        //e.preventDefault();
        console.log(`${this.state.author} said “${this.state.text}”`);
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit()}>
            <input type = 'text' placeholder="Strategy Type" value = {this.state.author} onChange={this.handleAuthorChange} />
            <input type = 'text' placeholder="Notess" value = {this.state.text} onChange={this.handleTextChange} />
            <input type="submit" value="Post" />
        </form>
        )

    }
}

export default CommentForm;