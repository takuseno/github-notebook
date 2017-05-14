import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  fileName: ''
}), action) => {
  switch (action.type) {
    case 'SHOW_CREATE_FILE_DIALOG':
      return initState

    case 'CREATE_FILE_DIALOG:CHANGE_FILE_NAME':
      return state.set('fileName', action.fileName)

    default:
      return state
  }
}
