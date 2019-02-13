export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [...state, action.note]
    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.id)
    case 'UPDATE_NOTE':
      const index = state.findIndex(note => note.id === action.id);
      return state.slice().splice(index, 1, action.note)
    default:
      return state
  }
}