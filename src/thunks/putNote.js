import { setError, updateNote } from '../actions';
import API from '../utils/api';

export const putNote = (note) => {
  const { id, title, color, issues } = note;
  return async (dispatch) => {
    try {
      await API.fetchData(`notes/${id}`, 'PUT', { title, color, issues });
      dispatch(updateNote(note));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}