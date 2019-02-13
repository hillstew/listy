import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setError } from '../../actions';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.note
    }
  }

  handleChange = (e) => {
    const index = this.state.issues.findIndex((issue) => issue.id == e.target.id)
    console.log('that', index)
    const issues = this.state.issues.slice()
    issues[index].body = e.target.value
    this.setState({ issues })
  } 

  render() {
    const { title, issues } = this.state
    return (
      <div className='overlay-div'>
        <form className='note-pop-up'>
          <h3>{title}</h3>
          <ul>
            {
              issues.filter(issue => !issue.completed).map(issue => <li><span><i class="fas fa-square"></i> <input id={issue.id} onChange={this.handleChange} value={issue.body}></input></span> <i class="fas fa-times"></i></li>)
            }
          </ul>
          <i className="fas fa-plus-circle form-add-icon"></i>
          <h4>Completed</h4>
          <ul>
            {
              issues.filter(issue => issue.completed).map(issue => <li><span><i class="fas fa-check-square"></i> <span contentEditable={true}>{issue.body}</span></span> <i class="fas fa-times"></i></li>)
            }
          </ul>
          <i class="fas fa-save"></i>
          <i class="fas fa-trash-alt"></i>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error)),
});

export default connect(null, mapDispatchToProps)(NoteForm);