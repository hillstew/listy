import '../../main.scss';
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NotesSection from '../NotesSection/NotesSection';
import NoteForm from '../NoteForm/NoteForm';
import AlternateScreen from '../../Components/AlternateScreen/AlternateScreen';
import { connect } from 'react-redux';
import { fetchNotes } from '../../thunks/fetchNotes';
import { Header } from '../../Components/Header/Header';
import PropTypes from 'prop-types';

export class App extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes, loading, history, location } = this.props;
    return (
      <div>
        <Fragment>
          <Header/>
          {!loading && 
            <div>
              <Switch>
                {/* This order is required for Router to work correctly */}
                <Route path='/not-found' render={() => <AlternateScreen text='404: Page Not Found' />} />
                <Route path='/' component={NotesSection} />
                <Route path='*' render={() => <AlternateScreen text='404: Page Not Found' />} />
              </Switch>
              <Route path='/new-note' component={NoteForm} />
              <Route
                path='/notes/:id'
                render={({ match }) => {
                  const note = notes.find((note) => note.id === match.params.id);
                  if (note) {
                    return <NoteForm history={history} {...note} location={location}/>
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

export const mapStateToProps = (state) => ({
  notes: state.notes,
  loading: state.loading,
})

export const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  notes: PropTypes.array,
  loading: PropTypes.bool,
}
