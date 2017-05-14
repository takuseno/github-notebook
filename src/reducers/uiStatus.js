import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  isPreview: true,
  isCreateFileDialogShowed: false
}), action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return state.set('isPreview', !state.get('isPreview'))

    case 'RECEIVE_LOAD_CONTENT':
      return state.set('isPreview', true)

    case 'SHOW_CREATE_FILE_DIALOG':
      return state.set('isCreateFileDialogShowed', true)

    case 'HIDE_CREATE_FILE_DIALOG':
      return state.set('isCreateFileDialogShowed', false)

    default:
      return state
  }
}
