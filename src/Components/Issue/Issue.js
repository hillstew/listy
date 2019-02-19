import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Issue = (props) => {
  const {
    issue: { id, body }, location: { pathname }, 
    toggleIssueCompletion, handleBodyChange, removeIssue, completed, noteId } = props;
  return (
    <li key={id} id={id} className="issue-li">
      <div>
        <button
          onClick={toggleIssueCompletion}
          className={completed ? 'complete-item' : 'incomplete-item'}
        />
        {(pathname === `/notes/${noteId}` || pathname === '/new-note') && (
          <input
            onChange={handleBodyChange}
            placeholder="Add a list item..."
            value={body}
            maxLength="45"
          /> 
        )}
        {pathname === '/' && <Fragment>{body}</Fragment>}
      </div>
      {(pathname === `/notes/${noteId}` || pathname === '/new-note') && (
        <button onClick={removeIssue} className="list-delete-button" /> 
      )}
    </li>
  );
};

export default Issue;

Issue.propTypes = {
  handleBodyChange: PropTypes.func,
  removeIssue: PropTypes.func,
  issue: PropTypes.object,
  toggleIssueCompletion: PropTypes.func
};
