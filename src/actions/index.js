import config from '../../config.json'

export function requestSaveFile (repository, file, content, token) {
  return {
    type: 'REQUEST_SAVE_FILE',
    repository: repository,
    file: file,
    content: content,
    token: token
  }
}

export function receiveSaveFile (repository, file, content) {
  return {
    type: 'RECEIVE_SAVE_FILE',
    repository: repository,
    file: file,
    content: content
  }
}

export function updateFile (file, content) {
  return {
    type: 'UPDATE_FILE',
    content: content,
    file: file
  }
}

export function requestCreateFile (repository, path, token) {
  return {
    type: 'REQUEST_CREATE_FILE',
    repository: repository,
    path: path,
    token: token
  }
}

export function receiveCreateFile (repository, file) {
  return {
    type: 'RECEIVE_CREATE_FILE',
    repository: repository,
    file: file
  }
}

export function requestDeleteFile (repository, file, token) {
  return {
    type: 'REQUEST_DELETE_FILE',
    repository: repository,
    file: file,
    token: token
  }
}

export function receiveDeleteFile (repository, file) {
  return {
    type: 'RECEIVE_DELETE_FILE',
    repository: repository,
    file: file
  }
}

export function requestLoadContent (repository, file, token) {
  return {
    type: 'REQUEST_LOAD_CONTENT',
    repository: repository,
    file: file,
    token: token
  }
}

export function receiveLoadContent (repository, file, content) {
  return {
    type: 'RECEIVE_LOAD_CONTENT',
    repository: repository,
    file: file,
    content: content
  }
}

export function requestLoadFiles (repository, token) {
  return {
    type: 'REQUEST_LOAD_FILES',
    repository: repository,
    token: token
  }
}

export function receiveLoadFiles (repository, files) {
  return {
    type: 'RECEIVE_LOAD_FILES',
    repository: repository,
    files: files
  }
}

export function requestOrganizations (token) {
  return {
    type: 'REQUEST_ORGANIZATIONS',
    token: token
  }
}

export function receiveOrganizations (names) {
  return {
    type: 'RECEIVE_ORGANIZATIONS',
    orgs: names
  }
}

export function loadRepos (org, userName, token) {
  if (org == userName) {
    return requestUserRepositories(userName, token)
  }
  return requestOrgRepositories(org, token)
}

export function requestOrgRepositories (org, token) {
  return {
    type: 'REQUEST_ORG_REPOSITORIES',
    org: org,
    token: token
  }
}

export function receiveOrgRepositories (names) {
  return {
    type: 'RECEIVE_ORG_REPOSITORIES',
    repos: names
  }
}

export function requestUserRepositories (userName, token) {
  return {
    type: 'REQUEST_USER_REPOSITORIES',
    userName: userName,
    token: token
  }
}

export function receiveUserRepositories (names, userName) {
  return {
    type: 'RECEIVE_USER_REPOSITORIES',
    repos: names,
    userName: userName
  }
}

export function showCreateFileDialog () {
  return {
    type: 'SHOW_CREATE_FILE_DIALOG'
  }
}

export function hideCreateFileDialog () {
  return {
    type: 'HIDE_CREATE_FILE_DIALOG'
  }
}

export function changeMode () {
  return {
    type: 'CHANGE_MODE'
  }
}

export function authenticate (code) {
  return {
    type: 'AUTHENTICATE',
    code: code
  }
}

export function authenticated (token, userName) {
  return {
    type: 'AUTHENTICATED',
    token: token,
    userName: userName
  }
}

export function boot (token, name) {
  return (dispatch) => {
    dispatch(requestOrganizations(token))
    dispatch(requestUserRepositories(name, token))
  }
}

// this function has sideeffects!!
export function logoff () {
  return (dispatch) => {
    dispatch({
      type: 'LOGOFF'
    })
    localStorage.clear()
    window.location.href = config.base_url
  }
}
