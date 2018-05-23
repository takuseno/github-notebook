import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  files: [],
  currentContent: '',
  currentFile: null,
  organization: null,
  organizations: [],
  repositories: [],
  repository: ''
}), action) => {
  switch (action.type) {
    case 'RECEIVE_CREATE_FILE':
      return state.set('files', state.get('files').push(action.file))

    case 'RECEIVE_DELETE_FILE':
      return state.set('files',
        state.get('files').filter(file => file.path !== action.file.path))

    case 'REQUEST_LOAD_FILES':
      return state.set('files', [])
        .set('repository', action.repository)

    case 'RECEIVE_LOAD_FILES':
      return state.set('files', action.files)

    case 'UPDATE_FILE':
    case 'RECEIVE_LOAD_CONTENT':
      return state.set('currentContent', action.content)

    case 'REQUEST_LOAD_CONTENT':
      return state.set('currentContent', '')
        .set('currentFile', action.file)

    case 'REQUEST_ORG_REPOSITORIES':
      return state.set('organization', action.organization)

    case 'REQUEST_USER_REPOSITORIES':
      return state.set('organization', action.userName)

    case 'RECEIVE_ORGANIZATIONS':
      return state.set('organizations', action.orgs)

    case 'RECEIVE_ORG_REPOSITORIES':
    case 'RECEIVE_USER_REPOSITORIES':
      return state.set('repositories', action.repos)
        .set('repository', action.repos[0])

    default:
      return state
  }
}
