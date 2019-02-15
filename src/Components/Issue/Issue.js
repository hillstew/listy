import React from 'react';

const Issue = (props) => {
  const { id, body } = props.issue;
  return (
    <li key={id} id={id} className="issue-li">
      <span>
        <i onClick={props.toggleIssueCompletion} className="fas fa-square" />
        <input
          onChange={props.handleBodyChange}
          placeholder='Add a list item...'
          value={body}
        />
      </span>
      <button onClick={props.removeIssue} className="delete-button"/>
    </li>
  )
}

export default Issue;