import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { putNote }  from '../../thunks/putNote';

export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: this.props.note.issues
    };
  }

  getIndex = (id) => {
    return this.state.issues.findIndex((issue) => issue.id == id);
  };

  createIssuesCopy = () => {
    return this.state.issues.slice();
  };

  setIssuesInState = (issues) => {
    this.setState({ issues });
  };

  toggleIssueCompletion = (e) => {
    const { id, title } = this.props.note;
    const index = this.getIndex(e.target.id);
    const newIssues = this.createIssuesCopy();
    newIssues[index].completed = !newIssues[index].completed;
    this.props.putNote({ id, title, issues: newIssues });
  };

  renderIncompleteIssues = (issues) => {
    return issues.filter((issue) => !issue.completed)
      .map((issue) => (
        <li key={issue.id} id={issue.id}>
          <div className='issue-body'>
            <i
              className="fas fa-square"
              onClick={this.toggleIssueCompletion}
              id={issue.id}
            />
            {issue.body}
          </div>
        </li>
      ));
  };


  renderCompleteIssues = (issues) => {
    return issues.filter((issue) => issue.completed)
      .map((issue) => (
        <li key={issue.id} id={issue.id}>
          <div className='issue-body'>
            <i
              className="fas fa-check-square"
              onClick={this.toggleIssueCompletion}
              id={issue.id}
            />
            {issue.body}
          </div>
        </li>
      ));
  };

  render() {
    const { note, note: { issues, title }} = this.props;
    return (
        <div className="note-card">
          <h3>{title}</h3>
          <ul className='incomplete-list'>{this.renderIncompleteIssues(issues)}</ul>
          <ul className='completed-list'>{this.renderCompleteIssues(issues)}</ul>
          <Link to={`/notes/${note.id}`}>
            <button className="edit-button-note" />
          </Link>
        </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note)),
});

export default connect(null, mapDispatchToProps)(Note);

Note.propTypes = {
  note: PropTypes.object,
  updateNote: PropTypes.func
};
