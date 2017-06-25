import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  fileName: '',
  isShowed: false
}), action) => {
  switch (action.type) {
    case 'SHOW_CREATE_FILE_DIALOG':
      return state.set('isShowed', true)

    case 'HIDE_CREATE_FILE_DIALOG':
      return state.set('isShowed', false)

    case 'CREATE_FILE_DIALOG:CHANGE_FILE_NAME':
      return state.set('fileName', action.fileName)

    default:
      return state
  }
}
