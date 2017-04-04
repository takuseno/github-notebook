export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CREATE_FILE':
      state.push(action.file)
      return state

    case 'RECEIVE_DELETE_FILE':
      return state.filter(file => file.path !== action.file.path)

    case 'RECEIVE_LOAD_FILES':
      return action.files

    case 'REQUEST_LOAD_FILES':
      return []

    default:
      return state
  }
}
