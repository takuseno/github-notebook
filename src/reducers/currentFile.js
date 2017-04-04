export default (state = null, action) => {
  switch (action.type) {
    case 'REQUEST_LOAD_CONTENT':
      return action.file

    default:
      return state
  }
}
