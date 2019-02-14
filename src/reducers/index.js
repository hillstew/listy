import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer/notesReducer';
import { errorReducer } from './errorReducer/errorReducer';
import { loadingReducer } from './loadingReducer/loadingReducer';
import { popupReducer } from './popupReducer/popupReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  error: errorReducer,
  loading: loadingReducer,
  popup: popupReducer,
});

export default rootReducer;