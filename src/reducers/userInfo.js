import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  userName: 'takuseno'
}), action) => {
  switch (action.type) {
    default:
      return state
  }
}
