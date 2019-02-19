import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { putNote }  from '../../thunks/putNote';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';

export const Note = ({note, putNote}) => {
  const { id, title, issues } = note;

  const toggleIssueCompletion = (e) => {
    const index = getIndex(e.target.id, issues);
    const newIssues = createIssuesCopy(issues);
    newIssues[index].completed = !newIssues[index].completed;
    putNote({ id, title, issues: newIssues });
  };

  const renderIssues = (completed) => {
    const iconClass = completed ? 'fas fa-check-square': 'fas fa-square'; 
    return issues.filter((issue) => issue.completed === completed)
      .map((issue) => (
        <li key={issue.id} id={issue.id}>
          <div className='issue-body'>
            <i
              className={iconClass}
              onClick={toggleIssueCompletion}
              id={issue.id}
            />
            {issue.body}
          </div>
        </li>
      )
    )
  };

  return (
    <div className='note-card'>
      <h3>{title}</h3>
      <ul className='incomplete-list'>{renderIssues(false)}</ul>
      <ul className='completed-list'>{renderIssues(true)}</ul>
      <Link to={`/notes/${note.id}`}>
        <button className='edit-button-note' />
      </Link>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object,
  updateNote: PropTypes.func
};
