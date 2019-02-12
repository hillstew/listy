import React from 'react';

const Note = () => {


  return (
    <div className='note-card'>
      <h3>Title</h3>
      <ul>
        <li><div className='check-box'></div>List Item 1</li>
      </ul>
      <ul className='completed-list'>
        <li><div className='check-box completed'></div>List Item 2</li>
      </ul>
    </div>
  )
}

export default Note;