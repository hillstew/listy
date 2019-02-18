import { setError, updateNote } from '../actions';
import API from '../utils/api';

export const putNote = (note) => {
  const { id, title, issues } = note;
  return async (dispatch) => {
    try {
      await API.fetchData(`notes/${id}`, 'PUT', { title, issues });
      dispatch(updateNote(note));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}