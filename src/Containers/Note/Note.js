import React from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions';
import { Route, Link } from 'react-router-dom';
import { NoteForm } from '../NoteForm/NoteForm'; 

export const Note = ({note, updateNote}) => {


  // const toggleIssueCompletion = (e) => {
  //   const index = this.getIndex(e.target.id);
  //   const issues = this.createIssuesCopy();
  //   issues[index].completed = !issues[index].completed;
  //   this.setIssuesInState(issues);
  // } 

  const redirectToNoteForm = () => {
    console.log('here')
    return <Route
    path="/notes/:id"
    render={({ match }) => {
      const { id } = match.params
      const note = this.props.notes.find((note) => note.id === id)
      if (note) {
        return <NoteForm {...note} />
      }
    }}
  />
  }

  return (
    <Link to={`/notes/${note.id}`}>
    <div className='note-card'>
      <h3>{note.title}</h3>
      <ul>
        {
          note.issues.filter(issue => !issue.completed).map(issue => <li><span><i className="fas fa-square" ></i> {issue.body}</span> <i className="fas fa-times"></i></li>)
        }
      </ul>
      <ul className='completed-list'>
        {
          note.issues.filter(issue => issue.completed).map(issue => <li><span><i className="fas fa-check-square"></i> {issue.body}</span> <i className="fas fa-times"></i></li>)
        }
      </ul>
    </div>
    </Link>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);