import React from 'react';
import Note from '../Note/Note';
import { connect } from 'react-redux';
import PropTypes from "prop-types"


const NotesSection = ({ notes }) => {
  return (
    <div id='notes-wrapper'>
    {notes.map(note => <Note note={note} key={note.id}/>)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default connect(mapStateToProps)(NotesSection);

NotesSection.propTypes = {
  notes: PropTypes.array.isRequired,
}