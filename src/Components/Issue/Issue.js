import React from 'react';

const Issue = (props) => {
    const { id, body } = props.issue;
    return (
        <li key={id} id={id}>
            <span>
                <i onClick={props.toggleIssueCompletion} className="fas fa-square"></i>
                <input onChange={props.handleBodyChange} value={body}></input>
            </span>
            <button onClick={props.removeIssue}>Delete</button>
        </li>
    )
}

export default Issue;