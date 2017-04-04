export default (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILE':
    case 'RECEIVE_LOAD_CONTENT':
      return action.content

    case 'REQUEST_LOAD_CONTENT':
      return ''

    default:
      return state
  }
}
