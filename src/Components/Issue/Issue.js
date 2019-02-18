import React from 'react';
import PropTypes from "prop-types";

const Issue = (props) => {
  const { issue: { id, body }, toggleIssueCompletion, handleBodyChange, removeIssue } = props;
  return (
    <li key={id} id={id} className="issue-li">
      <span>
        <i onClick={toggleIssueCompletion} className={props.issue.completed ? "fas fa-check-square" : "fas fa-square" }/>
        <input
          onChange={handleBodyChange}
          placeholder='Add a list item...'
          value={body}
        />
      </span>
      <button onClick={removeIssue} className="delete-button"/>
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