export default (state = '', action) => {
  switch (action.type) {
    case 'REQUEST_LOAD_FILES':
      return action.repository
    case 'RECEIVE_USER_REPOSITORIES':
      return action.repos[0]
    case 'RECEIVE_ORG_REPOSITORIES':
      return action.repos[0]
    default:
      return state
  }
}
