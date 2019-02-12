import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import NotesSection from '../NotesSection/NotesSection';
import NoteForm from '../NoteForm/NoteForm';
import NotFound from '../../Components/NotFound/NotFound';
import { connect } from 'react-redux';
import { setNotes, setLoading } from '../../actions';

class App extends Component {

  componentDidMount() {
    const { setNotes, setLoading } = this.props;
    const notes = [];
    setNotes(notes);
    setLoading(false);
  }

  render() {
    const { notes } = this.props;
    return (
      <div>
        <header>
          <NavLink id='title' to='/'>
            <h1>Listy</h1>
          </NavLink>
          <NavLink id='add-note-link' to='/new-note'>
            <i className="fas fa-plus-circle"></i>
          </NavLink>
        </header>
        <Route exact path='/' component={NotesSection} />
        <Route exact path='/new-note' component={NoteForm} />
        <Route exact path='/notes/:id' render={({ match }) => {
          const id = match.params;
          const note = notes.find(note => note.id == id)
          if (note) {
            return <NoteForm />
          } else {
            return <NotFound />
          }
        }} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes)),
  setLoading: (loading) => dispatch(setLoading(loading)),
})

export default connect(null, mapDispatchToProps)(App);
