export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_ORGANIZATIONS':
      return action.orgs
    default:
      return state
  }
}
