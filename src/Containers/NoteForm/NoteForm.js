import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import API from '../../utils/api';
import shortid from 'shortid';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: true,
      id: this.props.id || -1,
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
    this.setState({ title: e.target.value });
  } 

  setIssuesInState = (issues) => {
    this.setState({ issues });
  }

  closePopUp = () => {
    this.setState({ showPopUp: false });
    this.props.fetchNotes();
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setError } = this.props;
    const { id, title, issues } = this.state;
    try {
      id === -1 ?
        await API.fetchData('notes', 'POST', { title, issues }) :
        await API.fetchData(`notes/${id}`, 'PUT', { title, issues });
      this.closePopUp();
    } catch (error) {
      setError(error)
    }
  }

  removeNote = () => {
    if (this.props.id !== -1) {
      this.deleteNote();
    }
    this.closePopUp();
  }

  deleteNote = async () => {
    try {
      await API.fetchData(`notes/${this.state.id}`, 'DELETE');
    } catch (error) {
      setError(error)
    }
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
      <li key={issue.id} id={issue.id}>
        <span>
          <i onClick={this.toggleIssueCompletion} className="fas fa-square"></i>
          <input onChange={this.handleBodyChange} value={issue.body}></input>
        </span>
        <button onClick={this.removeIssue}>Delete</button>
      </li>
    )
  }

  render() {
    const { title, showPopUp } = this.state;
    const incompleteIssues = this.showIssues(false);
    const completeIssues = this.showIssues(true);

    if (!showPopUp) {
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
            <button onClick={this.removeNote}><i className="fas fa-trash-alt"></i></button>
          </form>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, mapDispatchToProps)(NoteForm);