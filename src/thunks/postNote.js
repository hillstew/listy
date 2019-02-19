import { setError, addNote } from '../actions';
import API from '../utils/api';

export const postNote = ({ title, color, issues }) => {
  return async (dispatch) => {
    try {
      const result = await API.fetchData('notes', 'POST', { title, color, issues });
      dispatch(addNote(result));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}