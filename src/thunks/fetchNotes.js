import { setLoading, setError, setNotes } from '../actions';
import API from '../utils/api';

export const fetchNotes = () => {
  return async (dispatch) =>  {
    try {
      dispatch(setLoading(true));
      const results = await API.fetchData('notes', 'GET');
      dispatch(setNotes(results));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  }
}