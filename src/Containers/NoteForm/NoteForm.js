import React from 'react';
import { connect } from 'react-redux';
import { addNote, removeNote, updateNote, setError } from '../../actions';

const NoteForm = (props) => {


  return (
    <div className='overlay-div'>
      <div className='note-pop-up'>
        <h3>Note Title</h3>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note)),
  removeNote: (id) => dispatch(removeNote(id)),
  updateNote: (note) => dispatch(updateNote(note)),
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, mapDispatchToProps)(NoteForm);