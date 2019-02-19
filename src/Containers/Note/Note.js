import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { putNote } from '../../thunks/putNote';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';
import Issue from '../../Components/Issue/Issue';

export const Note = ({note, putNote, location }) => {
  const { id, title, color, issues } = note;

  const toggleIssueCompletion = (e) => {
    const index = getIndex(e.target.parentElement.parentElement.id, issues);
    const newIssues = createIssuesCopy(issues);
    newIssues[index].completed = !newIssues[index].completed;
    putNote({ id, title, color, issues: newIssues });
  };

  const renderIssues = (completed) => {
    return issues
      .filter((issue) => issue.completed === completed)
      .map((issue) => (
        <Issue
          noteId={note.id}
          location={location}
          key={issue.id}
          completed={completed}
          issue={issue}
          toggleIssueCompletion={toggleIssueCompletion}
        />
      ));
  };

  return (
    <div className={`note-card ${color}`}>
      <h3>{title}</h3>
      <ul className="incomplete-list">{renderIssues(false)}</ul>
      <ul className="completed-list">{renderIssues(true)}</ul>
      <Link to={`/notes/${note.id}`}>
        <button className="edit-button-note" />
      </Link>
    </div>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note))
});

export default connect(null, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object,
  updateNote: PropTypes.func
};
