import React from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions';

const Note = ({note, updateNote}) => {


  return (
    <div className='note-card'>
      <h3>{note.title}</h3>
      <ul>
        {
          note.issues.filter(issue => !issue.completed).map(issue => <li><span><i class="fas fa-square"></i> {issue.body}</span> <i class="fas fa-times"></i></li>)
        }
      </ul>
      <ul className='completed-list'>
        {
          note.issues.filter(issue => issue.completed).map(issue => <li><span><i class="fas fa-check-square"></i> {issue.body}</span> <i class="fas fa-times"></i></li>)
        }
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);