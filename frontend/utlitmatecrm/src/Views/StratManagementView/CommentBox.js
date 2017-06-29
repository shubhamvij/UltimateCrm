/**
 * Created by jackzhang on 6/27/17.
 */
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
//import comments from '../../data/comments';

class CommentBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: this.props.data};
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(comment) {
        this.props.handleCommentSubmit(comment);
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        console.log(newComments);
        this.setState({ data: newComments });
    }

    render(){
        return (<div>
            <h2>Strategies:</h2>
            <CommentList data={this.props.data}/>
            <CommentForm id={this.props.id} onCommentSubmit={ this.handleCommentSubmit }/>
        </div>
        )
    }
}

export default CommentBox;