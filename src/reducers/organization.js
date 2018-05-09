export default (state = null, action) => {
  switch (action.type) {
    case 'REQUEST_ORG_REPOSITORIES':
      return action.organization
    default:
      return state
  }
}
