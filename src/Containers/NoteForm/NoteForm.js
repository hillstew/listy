import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { deleteNote } from '../../thunks/deleteNote';
import { postNote } from '../../thunks/postNote';
import { putNote } from '../../thunks/putNote';
import Issue from '../../Components/Issue/Issue';

export class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: true,
      id: this.props.id || '',
      title: this.props.title || '',
      issues: this.props.issues || [],
    }
  }

  getIndex = (id) => {
    return this.state.issues.findIndex((issue) => issue.id == id);
  }

  createIssuesCopy = () => {
    return this.state.issues.slice();
  }

  handleTitleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  } 

  setIssuesInState = (issues) => {
    this.setState({ issues });
  }

  handleBodyChange = (e) => {
    const index = this.getIndex(e.target.parentElement.parentElement.id);
    const issues = this.createIssuesCopy();
    issues[index].body = e.target.value;
    this.setIssuesInState(issues);
  } 

  toggleIssueCompletion = (e) => {
    const index = this.getIndex(e.target.parentElement.parentElement.id);
    const issues = this.createIssuesCopy();
    issues[index].completed = !issues[index].completed;
    this.setIssuesInState(issues);
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const { putNote, postNote, error } = this.props;
    const { id, title, issues } = this.state;
    id === '' ? postNote({ title, issues }) : putNote({ id, title, issues });
    error === '' && this.setState({showPopup: false});
  }

  removeNote = (e) => {
    e.preventDefault();
    const { error } = this.props;
    if (this.props.id !== '') {
      this.props.deleteNote(this.state.id);
    }
    error === '' && this.setState({ showPopup: false });
  }

  addIssue = (e) => {
    e.preventDefault();
    const issues = this.createIssuesCopy();
    issues.push({ id: shortid.generate(), body: '', completed: false });
    this.setIssuesInState(issues);
  }

  removeIssue = (e) => {
    e.preventDefault();
    const index = this.getIndex(e.target.parentElement.id);
    const issues = this.createIssuesCopy();
    issues.splice(index, 1);
    this.setIssuesInState(issues);
  }

  showIssues = (completed) => {
    const { issues } = this.state;
    return issues.filter(issue => issue.completed === completed).map(issue =>
      <Issue 
        issue={issue} 
        toggleIssueCompletion={this.toggleIssueCompletion}
        handleBodyChange={this.handleBodyChange}
        removeIssue={this.removeIssue} 
      />
    )
  }

  render() {
    const { title } = this.state;
    const incompleteIssues = this.showIssues(false);
    const completeIssues = this.showIssues(true);

    if (!this.state.showPopup) {
      return <Redirect to={'/'} />
    } else {
      return (
        <div className='overlay-div'>
          <form className='note-pop-up' onSubmit={this.handleSubmit}>
            <input onChange={this.handleTitleChange} value={title}></input>
            <ul>{incompleteIssues}</ul>
            <button onClick={this.addIssue}><i className="fas fa-plus-circle form-add-icon"></i></button>
            <h4>Completed</h4>
            <ul>{completeIssues}</ul>
            <input className='submit-button' type="submit" value='Save'></input>
            <button onClick={this.removeNote}>Delete</button>
          </form>
        </div>
      )
    }
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