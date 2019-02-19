import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { deleteNote } from '../../thunks/deleteNote';
import { postNote } from '../../thunks/postNote';
import { putNote } from '../../thunks/putNote';
import Issue from '../../Components/Issue/Issue';
import PropTypes from 'prop-types';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';

export class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || '',
      title: this.props.title || '',
      color: this.props.color || 'white',
      issues: this.props.issues || [{
        body: '',
        completed: false,
        id: shortid(),
      }],
      displayError: '',
    }
  }

  handleTitleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  handleBodyChange = (e) => {
    const index = getIndex(e.target.parentElement.parentElement.id, this.state.issues);
    const issues = createIssuesCopy(this.state.issues);
    issues[index].body = e.target.value;
    this.setIssuesInState(issues);
  }

  toggleIssueCompletion = (e) => {
    const index = getIndex(e.target.parentElement.parentElement.id, this.state.issues);
    const issues = createIssuesCopy(this.state.issues);
    issues[index].completed = !issues[index].completed;
    this.setIssuesInState(issues);
  }

  setIssuesInState = (issues) => {
    this.setState({ issues });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { putNote, postNote, error, history } = this.props;
    const { id, title, color, issues } = this.state;
    if (title === '' || !issues.length) {
      this.setState({ displayError: 'Please add a title and at least one list item'});
    } else {
      id === '' ? postNote({ title, color, issues }) : putNote({ id, title, color, issues });
      error === '' ? history.replace('/') : this.setState({ displayError: 'Note could not be created/updated. Please try again.' });
    }
  }

  removeNote = (e) => {
    e.preventDefault();
    const { error, deleteNote, history } = this.props;
    if (this.state.id !== '') {
      deleteNote(this.state.id);
    }
    error === '' ? history.replace('/') : this.setState({ displayError: 'Note could not be deleted. Please try again.' });
  }

  addIssue = (e) => {
    e.preventDefault();
    const issues = createIssuesCopy(this.state.issues);
    issues.push({ id: shortid.generate(), body: '', completed: false });
    this.setIssuesInState(issues);
  }

  removeIssue = (e) => {
    e.preventDefault();
    const index = getIndex(e.target.parentElement.id, this.state.issues);
    const issues = createIssuesCopy(this.state.issues);
    issues.splice(index, 1);
    this.setIssuesInState(issues);
  }

  showIssues = (completed) => {
    const { issues } = this.state;
    return issues.filter(issue => issue.completed === completed).map(issue =>
      <Issue 
        key={issue.id}
        completed={completed}
        issue={issue} 
        toggleIssueCompletion={this.toggleIssueCompletion}
        handleBodyChange={this.handleBodyChange}
        removeIssue={this.removeIssue} 
      />
    )
  }

  changeNoteColor = (e) => {
    e.preventDefault();
    this.setState({ color: e.target.value })
  }

  render() {
    const { title, color, displayError } = this.state;
    const incompleteIssues = this.showIssues(false);
    const completeIssues = this.showIssues(true);

    return (
      <div className='overlay-div'>
        <form className={`note-pop-up ${color}`} onSubmit={this.handleSubmit}>
          <input
            className='title-input'
            onChange={this.handleTitleChange}
            placeholder='Title'
            value={title}
            maxLength='30'
          />
          <ul className='incomplete-items'>{incompleteIssues}</ul>
          <button onClick={this.addIssue} className="add-issue-button">
            <i className="fas fa-plus-circle form-add-icon" />
          </button>
          {completeIssues.length !== 0 && <h4>Completed</h4>}
          <ul className='completed-items'>{completeIssues}</ul>
          <p className='error-message'>{displayError}</p>
          <div className='card-footer'>
            <select id='drop-down' onChange={this.changeNoteColor}>
              <option value='default'>Change Note Color</option>
              <option value='white'>White</option>
              <option value='blue'>Blue</option>
              <option value='purple'>Purple</option>
              <option value='green'>Green</option>
              <option value='red'>Red</option>
            </select>
            <button className='submit-button' />
            <button className='delete-button' onClick={this.removeNote} />
          </div>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  error: state.error,
});

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note)),
  postNote: (note) => dispatch(postNote(note)),
  deleteNote: (id) => dispatch(deleteNote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  putNote: PropTypes.func,
  postNote: PropTypes.func,
  deleteNote: PropTypes.func,
  error: PropTypes.string
}