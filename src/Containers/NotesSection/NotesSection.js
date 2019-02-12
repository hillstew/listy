import React from 'react';
import Note from '../Note/Note';
import { connect } from 'react-redux';

const NotesSection = (props) => {

  return (
    <div id='notes-wrapper'>
    {
      props.notes.map(note => {
        return <Note note={note} key={note.id}/>
      })
    }
    </div>
  )

}

const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default connect(mapStateToProps)(NotesSection);