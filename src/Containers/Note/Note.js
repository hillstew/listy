import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { putNote }  from '../../thunks/putNote';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';

export class Note extends Component {
  constructor(props) {
    super(props)
  };

  toggleIssueCompletion = (e) => {
    const { id, title, color, issues } = this.props.note;
    const index = getIndex(e.target.id, issues);
    const newIssues = createIssuesCopy(issues);
    newIssues[index].completed = !newIssues[index].completed;
    this.props.putNote({ id, title, color, issues: newIssues });
  };
  
  renderIssues = (completed) => {
    const iconClass = completed ? 'fas fa-check-square': 'fas fa-square'; 
    return this.props.note.issues
      .filter(issue => issue.completed === completed)
      .map((issue) => (
        <li key={issue.id} id={issue.id}>
          <div className='issue-body'>
            <i
              className={iconClass}
              onClick={this.toggleIssueCompletion}
              id={issue.id}
            />
            {issue.body}
          </div>
        </li>
      )
    )
  };

  render() {
    return (
      <div className={`note-card ${this.props.note.color}`}>
        <h3>{this.props.note.title}</h3>
        <ul className='incomplete-list'>{this.renderIssues(false)}</ul>
        <ul className='completed-list'>{this.renderIssues(true)}</ul>
        <Link to={`/notes/${this.props.note.id}`}>
          <button className='edit-button-note' />
        </Link>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object,
  putNote: PropTypes.func
};