import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import NotesSection from '../NotesSection/NotesSection'
import NoteForm from '../NoteForm/NoteForm'
import AlternateScreen from '../../Components/AlternateScreen/AlternateScreen'
import { connect } from 'react-redux'
import { fetchNotes } from '../../thunks/fetchNotes'
import { Header } from '../../Components/Header/Header'

class App extends Component {

  componentDidMount() {
    this.props.fetchNotes()
  }

  render() {
    const { notes, loading, history } = this.props
    return (
      <div>
        <Fragment>
          <Header/>
          {loading && <AlternateScreen text='Loading notes...' />}
          {!loading && 
            <div>
              <Switch>
                <Route exact path="/" component={NotesSection} />
                <Route exact path="/new-note" component={NotesSection} />
                <Route exact path="/notes/:id" component={NotesSection} />
                <Route path='*' render={() => <AlternateScreen text='404 Page Not Found' />} />
                <Route path='/not-found' render={() => <AlternateScreen text='404 Page Not Found' />} />
              </Switch>
              <Route path="/new-note" render={() => <NoteForm history={history} />} />
              <Route
                path="/notes/:id"
                render={({ match }) => {
                  const { id } = match.params
                  const note = notes.find((note) => note.id === id)
                  if (note) {
                    return <NoteForm history={history} {...note} />
                  } else {
                    return <Redirect to={'/not-found'} />
                  }
                }}
              />
            </div>
          }
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
