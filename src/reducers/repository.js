export default (state = 'test-note', action) => {
  switch (action.type) {
    case 'REQUEST_LOAD_FILES':
      return action.repository
    default:
      return state
  }
}
