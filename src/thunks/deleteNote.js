import { setLoading, setError, removeNote } from '../actions';
import API from '../utils/api';

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await API.fetchData(`notes/${id}`, 'DELETE');
      dispatch(setLoading(false));
      dispatch(removeNote(result));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}