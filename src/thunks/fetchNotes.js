import { setLoading, setError, setNotes } from '../actions'

export const fetchNotes = () => {
  const url = 'http://localhost:3001/api/v1/notes';
  return async (dispatch) =>  {
    try {
      dispatch(setLoading(true))
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(setLoading(false))
      const notes = await response.json()
      dispatch(setNotes(notes))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}