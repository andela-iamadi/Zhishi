import React from 'react'
import webAPI from '../../utils/webAPI.js'
import QuestionActions from '../../actions/QuestionActions.js'

class NewQuestionForm extends React.Component {
  constructor(props, context){
    super(props)
   }

   componentDidMount(){
     tinymce.init({
       selector: ".editor-instance",
       menubar: false,
       toolbar: "bold italic | bullist numlist | link image | codesample| undo redo",
       plugins: ["link image wordcount spellchecker insertdatetime codesample"],
       content_css: "assets/css/main.css"
     })
   }

   submitAnswer(event){
     event.stopPropagation();
     var answer = $("#answerForm textarea").val();
     var question_id = $("#answerForm textarea").data('question-id');
     debugger;
     webAPI.processRequest(`/questions/${question_id}`, 'POST', { text: answer }, QuestionActions.receiveQuestionAnswer)
   }
   render () {
     return (
       <div className="row new-answer">
         <div className="sixteen wide column">
           <h3>Give your own answer</h3>

           <form id="answerForm" className="ui form">
             <div className="field">
               <textarea className="editor-instance" data-question-id={this.props.question_id} cols="30" rows="10"></textarea>
             </div>
             <button className="ui button" onClick={this.submitAnswer}>
               Post Answer
             </button>
           </form>
         </div>
       </div>
     )
   }
 }
 module.exports = NewQuestionForm;
