import React from 'react';
import PropTypes from "prop-types";

const Issue = (props) => {
  const { issue: { id, body }, toggleIssueCompletion, handleBodyChange, removeIssue, completed } = props;
  return (
    <li key={id} id={id} className="issue-li">
      <span>
        <button 
          onClick={toggleIssueCompletion}
          className={completed ? 'complete-item' : 'incomplete-item'}
        />
        <input
          onChange={handleBodyChange}
          placeholder='Add a list item...'
          value={body}
        />
      </span>
      <button onClick={removeIssue} className="list-delete-button"/>
    </li>
  )
}

export default Issue;

Issue.propTypes = {
  handleBodyChange: PropTypes.func.isRequired,
  removeIssue: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired,
  toggleIssueCompletion: PropTypes.func.isRequired,
}