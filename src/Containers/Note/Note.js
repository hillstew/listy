import React from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions';
import PropTypes from "prop-types"

export const Note = ({note, updateNote}) => {
  return (
    <div className='note-card'>
      <h3>{note.title}</h3>
      <ul>
        {
          note.issues.filter(issue => !issue.completed).map(issue => <li><span><i className="fas fa-square"></i> {issue.body}</span> <i className="fas fa-times"></i></li>)
        }
      </ul>
      <ul className='completed-list'>
        {
          note.issues.filter(issue => issue.completed).map(issue => <li><span><i className="fas fa-check-square"></i> {issue.body}</span> <i className="fas fa-times"></i></li>)
        }
      </ul>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
}