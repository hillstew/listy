import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import NotesSection from '../NotesSection/NotesSection';

class App extends Component {
  render() {
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
      </div>
    );
  }
}

export default App;
