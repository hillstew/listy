import React, { Component } from "react"
import { NavLink, Route, Switch, withRouter } from "react-router-dom"
import NotesSection from "../NotesSection/NotesSection"
import NoteForm from "../NoteForm/NoteForm"
import NotFound from "../../Components/NotFound/NotFound"
import { connect } from "react-redux"
import { togglePopup } from '../../actions';
import { fetchNotes } from '../../thunks/fetchNotes'

class App extends Component {

  componentDidMount() {
   this.props.fetchNotes()
  }

  render() {
    const { notes, loading } = this.props
    if(loading) {
      return (
        <h1>Loading notes...</h1>
      )
    } else {
      return (
        <div>
          <header>
            <NavLink id="title" to="/">
              <h1>Listy</h1>
            </NavLink>
            <NavLink onClick={() => this.props.togglePopup(true)} id='add-note-link' to='/new-note'>
              <i className="fas fa-plus-circle new-note-icon"></i>
            </NavLink>
          </header>
          <Switch>
            <Route exact path="/" component={NotesSection} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          <Route path="/new-note" render={() => 
            <NoteForm />}
          />
          <Route
            path="/notes/:id"
            render={({ match }) => {
              const { id } = match.params
              const note = notes.find((note) => note.id === parseInt(id))
              if (note) {
                return <NoteForm {...note}/>
              } else {
                return <NotFound />
              }
            }}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loading: state.loading,
})

const mapDispatchToProps = (dispatch) => ({
 fetchNotes: () => dispatch(fetchNotes()),
 togglePopup: (bool) => dispatch(togglePopup(bool)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
