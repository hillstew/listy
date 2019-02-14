import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import API from '../../utils/api';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const response = id === -1 ?
        await API.fetchData('notes', 'POST', { title, issues }) :
        await API.fetchData(`notes/${id}`, 'PUT', { title, issues });
      this.formRef.reset();
      console.log(response)
    } catch (error) {
      setError(error)
    }
  }

  showIssues = (completed) => {
    const { issues } = this.state;
    return issues.filter(issue => issue.completed === completed).map(issue =>
      <li key={issue.id} id={issue.id}>
        <span>
          <i onClick={this.toggleIssueCompletion} className="fas fa-square"></i>
          <input onChange={this.handleBodyChange} value={issue.body}></input>
        </span>
        <i className="fas fa-times"></i>
      </li>
    )
  }

  render() {
    const { title } = this.state;
    const incompleteIssues = this.showIssues(false);
    const completeIssues = this.showIssues(true);

    return (
      <div className='overlay-div'>
        <form className='note-pop-up' onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}>
          <input onChange={this.handleTitleChange} value={title}></input>
          <ul>{incompleteIssues}</ul>
          <i className="fas fa-plus-circle form-add-icon"></i>
          <h4>Completed</h4>
          <ul>{completeIssues}</ul>
          <input className='submit-button' type="submit" value='Save'></input>
          <i className="fas fa-trash-alt"></i>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, mapDispatchToProps)(NoteForm);