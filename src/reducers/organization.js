export default (state = null, action) => {
  switch (action.type) {
    case 'REQUEST_ORG_REPOSITORIES':
      return action.organization
    case 'REQUEST_USER_REPOSITORIES':
      return action.userName
    default:
      return state
  }
}
