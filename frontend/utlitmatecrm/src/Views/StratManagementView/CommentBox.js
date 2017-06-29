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
        this.state = {data: []};
    }
    render(){
        return (<div>
            <h2>Strategies:</h2>
            <CommentList data={this.props.data}/>
            <CommentForm/>
        </div>
        )
    }
}

export default CommentBox;