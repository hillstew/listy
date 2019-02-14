import { togglePopup } from '../../actions';
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
    const { notes, loading } = this.props
    return (
      <div>
        {loading && <h1>Loading notes...</h1>}
        {!loading && (
          <Fragment>
            <Header />
            <Switch>
              <Route exact path="/" component={NotesSection} />
              {/* <Route component={NotFound} /> */}
            </Switch>
            <Route path="/new-note" render={() => <NoteForm />} />
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
        )}
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
 togglePopup: (bool) => dispatch(togglePopup(bool)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
