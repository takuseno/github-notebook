export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_ORG_REPOSITORIES':
    case 'RECEIVE_USER_REPOSITORIES':
      return action.repos
    default:
      return state
  }
}
