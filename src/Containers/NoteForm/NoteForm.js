import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../actions';

const NoteForm = (props) => {

  const note = {
    id: 1,
    title: "Trapper Keeper",
    issues: [
        {
            body: "Finish project",
            completed: false
        },
        {
            body: "Start project",
            completed: true
        },
        {
            body: "Test project",
            completed: false
        },
        {
            body: "Deploy to Heroku",
            completed: true
        }
    ]
  }

  return (
    <div className='overlay-div'>
      <div className='note-pop-up'>
        <h3>{note.title}</h3>
        <ul>
          {
            note.issues.filter(issue => !issue.completed).map(issue => <li><span><i class="fas fa-square"></i> {issue.body}</span> <i class="fas fa-times"></i></li>)
          }
        </ul>
        <i className="fas fa-plus-circle form-add-icon"></i>
        <h4>Completed</h4>
        <ul>
          {
            note.issues.filter(issue => issue.completed).map(issue => <li><span><i class="fas fa-check-square"></i> {issue.body}</span> <i class="fas fa-times"></i></li>)
          }
        </ul>
        <i class="fas fa-save"></i>
        <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, mapDispatchToProps)(NoteForm);