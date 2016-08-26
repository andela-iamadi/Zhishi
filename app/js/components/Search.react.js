import React from 'react';
import QuestionsList from './Home/questionsList/QuestionsList.react';

import Sidebar from './layouts/Sidebar.react';
import AuthStore from '../stores/AuthStore.js';
import SearchStore from '../stores/SearchStore.js';
import SearchActions from '../actions/SearchActions.js';
import webAPI from '../utils/webAPI.js';

import {Link} from 'react-router';

function getSearchState(searchQuery, firstLoad) {
  if (searchQuery && firstLoad) {
    webAPI('/questions/search', 'GET', searchQuery, SearchActions.receiveSearchResults);
  }
  return {
    questions: SearchStore.getSearchResults(),
    currentUser: AuthStore.getCurrentUser()
  };
}

class Search extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = getSearchState(props.location.query, true);
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);

  }
  _onChange() {
    this.setState(getSearchState());
  }
  render() {
    const {questions} = this.state;
    let headerMsg = $.isEmptyObject(questions) ?
      <span>
        We found nothing. . .
        <Link to="/questions/new">Ask a question?</Link>
      </span> :
     'What we found. . .';
    return (
      <div>

        <main className="ui container main">
          <div className="ui grid">
            <div className="twelve wide stacked column">
              <h2>{headerMsg}</h2>
              {<QuestionsList questions={this.state.questions}/>}
            </div>

            <Sidebar />

          </div>
        </main>

      </div>
    );
  }
}

module.exports = Search;
