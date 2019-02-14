import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import API from '../../utils/api';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      id: this.props.id,
      title: this.props.title,
      issues: this.props.issues
    }
  }

  handleBodyChange = (e) => {
    const index = this.state.issues.findIndex((issue) => issue.id == e.target.parentElement.parentElement.id);
    const issues = this.state.issues.slice();
    issues[index].body = e.target.value;
    this.setState({ issues });
  } 

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  } 

  toggleIssueCompletion = (e) => {
    const index = this.state.issues.findIndex((issue) => issue.id == e.target.parentElement.parentElement.id);
    const issues = this.state.issues.slice();
    issues[index].completed = !issues[index].completed;
    this.setState({ issues });
  } 

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setError } = this.props;
    const { id, title, issues } = this.state;
    try {
      id === -1 ?
        await API.fetchData('notes', 'POST', { title, issues }) :
        await API.fetchData(`notes/${id}`, 'PUT', { title, issues });
      this.formRef.reset();
      await this.setState({ saved: true });
      this.props.getNotes();
    } catch (error) {
      setError(error)
    }
  }

  addIssue = (e) => {
    e.preventDefault();
    const issues = this.state.issues.slice();
    issues.push({ id: Date.now(), body: '', completed: false });
    this.setState({ issues });
  }

  removeIssue = (e) => {
    e.preventDefault();
    const index = this.state.issues.findIndex((issue) => issue.id == e.target.parentElement.id);
    const issues = this.state.issues.slice();
    issues.splice(index, 1);
    this.setState({ issues });
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
    const { title, saved } = this.state;
    const incompleteIssues = this.showIssues(false);
    const completeIssues = this.showIssues(true);

    if (saved) {
      return <Redirect to={'/'} />
    } else {
      return (
        <div className='overlay-div'>
          <form className='note-pop-up' onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
            <input onChange={this.handleTitleChange} value={title}></input>
            <ul>{incompleteIssues}</ul>
            <button onClick={this.addIssue}><i className="fas fa-plus-circle form-add-icon"></i></button>
            <h4>Completed</h4>
            <ul>{completeIssues}</ul>
            <input className='submit-button' type="submit" value='Save'></input>
            <i className="fas fa-trash-alt"></i>
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