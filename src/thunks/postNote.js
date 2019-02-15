import { setLoading, setError, addNote, togglePopup } from '../actions';
import API from '../utils/api';

export const postNote = (note) => {
  const { title, issues } = note;
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await API.fetchData('notes', 'POST', { title, issues });
      dispatch(setLoading(false));
      dispatch(addNote(result));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}