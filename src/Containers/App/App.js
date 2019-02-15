import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import NotesSection from '../NotesSection/NotesSection'
import NoteForm from '../NoteForm/NoteForm'
import NotFound from '../../Components/NotFound/NotFound'
import { connect } from 'react-redux'
import { fetchNotes } from '../../thunks/fetchNotes'
import { Header } from '../../Components/Header/Header'

class App extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }

  render() {
    const { notes, loading, togglePopup } = this.props
    return (
      <div>
        <Fragment>
          {loading && <h1>Loading notes...</h1>}
          <Header togglePopup={togglePopup}/>
          <Switch>
            <Route exact path="/" component={NotesSection} />
            <Route exact path="/new-note" component={NotesSection} />
            <Route exact path="/notes/:id" component={NotesSection} />
            <Route path='*' component={NotFound} />
          </Switch>
          <Route path="/new-note" component={NoteForm} />
          <Route
            path="/notes/:id"
            render={({ match }) => {
              const { id } = match.params
              const note = notes.find((note) => note.id === parseInt(id))
              if (note) {
                return <NoteForm {...note} />
              } else {
                return <NotFound />
              }
            }}
          />
        </Fragment>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loading: state.loading,
})

const mapDispatchToProps = (dispatch) => ({
 fetchNotes: () => dispatch(fetchNotes()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
