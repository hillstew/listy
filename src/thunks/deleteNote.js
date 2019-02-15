import { setLoading, setError, removeNote } from '../actions';
import API from '../utils/api';

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await API.fetchData(`notes/${id}`, 'DELETE');
      dispatch(removeNote(id));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
}