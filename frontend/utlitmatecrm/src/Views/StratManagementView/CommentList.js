/**
 * Created by jackzhang on 6/27/17.
 */
import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component{
    render() {
        console.log(this.props.data);
        let commentNotes = this.props.data.map(comment => {
            return (
            <Comment next_steps={comment.next_steps} key={comment.id}>{comment.notes}</Comment>
            )
        })
        return (
            <div>
                {commentNotes}
            </div>
        )
    }
}

export default CommentList;