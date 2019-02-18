import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions';
import { Route, Link } from 'react-router-dom';
import { NoteForm } from '../NoteForm/NoteForm'; 
import PropTypes from "prop-types";

export class Note extends Component {
  constructor({note}) {
    super();
    this.state = {
      issues: note.issues || [],
    }
  }

  getIndex = (id) => {
    return this.state.issues.findIndex((issue) => issue.id == id);
  }

  createIssuesCopy = () => {
    return this.state.issues.slice();
  }

  setIssuesInState = (issues) => {
    this.setState({ issues });
  }

  toggleIssueCompletion = (e) => {
    const index = this.getIndex(e.target.id);
    const issues = this.createIssuesCopy();
    issues[index].completed = !issues[index].completed;
    this.setIssuesInState(issues);
  } 

render() {
  return (
    <div>
      <Route
        path="/notes/:id"
        render={({ match }) => {
          const { id } = match.params
          const note = this.props.notes.find((note) => note.id === id)
          if (note) {
            return <NoteForm {...note} />
          }
        }}
      />
      <Link to={`/notes/${this.props.note.id}`}>
      <div className='note-card'>
        <h3>{this.props.note.title}</h3>
        <ul>
          {
            this.props.note.issues.filter(issue => !issue.completed).map(issue => <li key={issue.id} id={issue.id}><span><i className="fas fa-square" onClick={this.toggleIssueCompletion} id={issue.id}></i> {issue.body}</span></li>)
          }
        </ul>
        <ul className='completed-list'>
          {
            this.props.note.issues.filter(issue => issue.completed).map(issue => <li key={issue.id} id={issue.id}><span><i className="fas fa-check-square" onClick={this.toggleIssueCompletion} id={issue.id}></i> {issue.body}</span></li>)
          }
        </ul>
      </div>
      </Link>
    </div>
  )}
}

const mapStateToProps = (state) => ({
  notes: state.notes,
})

export const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
}