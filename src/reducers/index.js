import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer/notesReducer';
import { errorReducer } from './errorReducer/errorReducer';
import { loadingReducer } from './loadingReducer/loadingReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  error: errorReducer,
  loading: loadingReducer,
});

export default rootReducer;