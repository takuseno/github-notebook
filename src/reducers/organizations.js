export default (state = ['takuseno'], action) => {
  switch (action.type) {
    case 'RECEIVE_ORGANIZATIONS':
      return ['takuseno'].concat(action.orgs)
    default:
      return state
  }
}
