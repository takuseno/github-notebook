import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  isPreview: true
}), action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return state.set('isPreview', !state.get('isPreview'))

    case 'RECEIVE_LOAD_CONTENT':
      return state.set('isPreview', true)

    default:
      return state
  }
}
