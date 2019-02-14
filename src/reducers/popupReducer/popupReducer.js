export const popupReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_POPUP':
      return action.popup
    default:
      return state
  }
}