import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  fileName: ''
}), action) => {
  switch (action.type) {
    case 'CREATE_FILE_DIALOG:CHANGE_FILE_NAME':
      return state.set('fileName', action.fileName)

    default:
      return state
  }
}
