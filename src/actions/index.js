export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes,
});

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note,
});

export const removeNote = (id) => ({
  type: 'REMOVE_NOTE',
  id
});

export const updateNote = (note) => ({
  type: 'UPDATE_NOTE',
  note,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  loading,
});

export const togglePopup = (popup) => ({
  type: 'TOGGLE_POPUP',
  popup,
});