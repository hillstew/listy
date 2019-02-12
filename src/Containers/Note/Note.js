import React from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions';

const Note = ({note, updateNote}) => {


  return (
    <div className='note-card'>
      <h3>{note.name}</h3>
      <ul>
        <li><div className='check-box'></div>List Item 1</li>
      </ul>
      <ul className='completed-list'>
        <li><div className='check-box completed'></div>List Item 2</li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);