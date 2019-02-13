import React, { Component } from "react"
import { NavLink, Route, Switch, withRouter } from "react-router-dom"
import NotesSection from "../NotesSection/NotesSection"
import NoteForm from "../NoteForm/NoteForm"
import NotFound from "../../Components/NotFound/NotFound"
import { connect } from "react-redux"
import { setNotes, setLoading, setError } from "../../actions"
import API from '../../utils/api';

class App extends Component {
  async componentDidMount() {
    const { setNotes, setLoading } = this.props
    try {
      const notes = await API.fetchData('notes', 'GET');
      setNotes(notes)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  render() {
    const { notes } = this.props
    return (
      <div>
        <header>
          <NavLink id="title" to="/">
            <h1>Listy</h1>
          </NavLink>
          <NavLink id='add-note-link' to='/new-note'>
            <i className="fas fa-plus-circle new-note-icon"></i>
          </NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={NotesSection} />
          {/* <Route component={NotFound} /> */}
        </Switch>
        <Route path="/new-note" component={NoteForm} />
        <Route
          path="/notes/:id"
          render={({ match }) => {
            const id = match.params
            const note = notes.find((note) => note.id == id)
            if (note) {
              return <NoteForm />
            } else {
              return <NotFound />
            }
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes)),
  setLoading: (loading) => dispatch(setLoading(loading)),
  setError: (error) => dispatch(setError(error))
})

export default withRouter(connect(null, mapDispatchToProps)(App));
