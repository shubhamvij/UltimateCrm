/**
 * Created by jackzhang on 6/27/17.
 */
import React from 'react';
import '../../material.css';

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
        e.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ id: Date.now(), parent_id: this.props.id, next_steps: author, notes: text });
        this.setState({ author: '', text: '' });
        console.log(`${this.state.author} said “${this.state.text}”`);
    }
    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input type = 'text' placeholder="Strategy Type" value = {this.state.author} onChange={this.handleAuthorChange} />
            <input type = 'text' placeholder="Notes" value = {this.state.text} onChange={this.handleTextChange} />
            <button className="mdc-button" type="submit">
                Add
            </button>
        </form>
        )

    }
}

export default CommentForm;