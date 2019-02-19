import React from 'react';
import Note from '../Note/Note';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

export const NotesSection = ({ notes }) => {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry 
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'>
      {notes.map(note => <Note note={note} key={note.id}/>)}
    </Masonry>
  )
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default connect(mapStateToProps)(NotesSection);

NotesSection.propTypes = {
  notes: PropTypes.array.isRequired,
}