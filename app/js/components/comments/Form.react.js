import React from 'react'
import webAPI from '../../utils/webAPI.js'
import CommentActions from '../../actions/CommentActions.js'

class NewCommentForm extends React.Component {
  constructor(props, context){
    super(props);
   }

   submitComment(event){
     event.preventDefault();
     var comment_box = $(event.target.parentElement).find('textarea');
     var meta = this.props.meta;
     var resource_id = meta.resource_id;
     var path, action
     if (this.props.comment) {
        path = `/${meta.resource_name}/${meta.resource_id}/comments/${this.props.comment.id}`;
        action = 'PATCH'
     } else {
       path = `/${meta.resource_name}/${meta.resource_id}/comments`;
       action = "POST"
     }
     webAPI.processRequest(path, action, { content: $(comment_box).val() }, (data) => {
       CommentActions.receiveComment({meta: meta, comment: data})
     })
   }


   render () {
     var comment = this.props.comment || {};
     return (
       <form className="ui comment form">
         <div className="field">
           <textarea style={{height:'auto'}} defaultValue={comment.content}></textarea>
         </div>
         <button className="ui button" onClick={this.submitComment.bind(this)}>
           Post Comment
         </button>
       </form>
     )
   }
 }

 export default NewCommentForm
