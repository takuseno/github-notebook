import * as GitHubApi from '../api/GitHubApi'
import config from '../../config.json'

export function saveFile (repository, file, content, token) {
  return (dispatch) => {
    dispatch(() => ({
      type: 'REQUEST_SAVE_FILE',
      repository: repository,
      file: file,
      content: content
    }))
    return GitHubApi.updateContents(repository, file, content, token)
      .then(data => {
        file.sha = data.content.sha
        dispatch(() => ({
          type: 'RECEIVE_SAVE_FILE',
          repository: repository,
          file: file,
          content: btoa(content)
        }))
      })
  }
}

export function updateFile (file, content) {
  return {
    type: 'UPDATE_FILE',
    content: content,
    file: file
  }
}

export function createFile (repository, path, token) {
  return (dispatch) => {
    dispatch(() => ({
      type: 'REQUEST_CREATE_FILE',
      repository: repository,
      path: path
    }))
    return GitHubApi.createContents(repository, path, token)
      .then((data) => {
        const file = {
          path: data.content.path,
          sha: data.content.sha
        }
        dispatch({
          type: 'RECEIVE_CREATE_FILE',
          repository: repository,
          file: file
        })
      })
  }
}

export function deleteFile (repository, file, token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_DELETE_FILE',
      repository: repository,
      file: file
    })
    return GitHubApi.deleteContents(repository, file, token)
      .then(data => {
        dispatch({
          type: 'RECEIVE_DELETE_FILE',
          repository: repository,
          file: file
        })
      })
  }
}

export function clickFile (repository, file, token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_LOAD_CONTENT',
      repository: repository,
      file: file
    })
    return GitHubApi.getContents(repository, file, token)
      .then(data => {
        dispatch({
          type: 'RECEIVE_LOAD_CONTENT',
          repository: repository,
          file: file,
          content: atob(data.content)
        })
      })
  }
}

export function loadFiles (repository, token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_LOAD_FILES',
      repository: repository
    })
    return GitHubApi.getFiles(repository, token)
      .then(data => {
        const files = data.tree
          .filter((file) => file.type === 'blob')
        dispatch({
          type: 'RECEIVE_LOAD_FILES',
          repository: repository,
          files: files
        })
      })
  }
}

export function loadOrgs (token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_ORGANIZATIONS'
    })
    return GitHubApi.getOrganizations(token)
      .then(data => {
        const names = data.map((org) => org.login)
        dispatch({
          type: 'RECEIVE_ORGANIZATIONS',
          orgs: names
        })
      })
  }
}

export function loadRepos (org, userName, token) {
  if (org == userName) {
    return loadUserRepos(token)
  }
  return loadOrgRepos(org, token)
}

export function loadOrgRepos (org, token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_ORG_REPOSITORIES',
      organization: org
    })
    return GitHubApi.getOrgRepos(org, token)
      .then(data => {
        const names = data.map((repo) => repo.name)
        dispatch({
          type: 'RECEIVE_ORG_REPOSITORIES',
          repos: names
        })
      })
  }
}

export function loadUserRepos (token) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_USER_REPOSITORIES'
    })
    return GitHubApi.getUserRepos(token)
      .then(data => {
        const names = data.map((repo) => repo.name)
        dispatch({
          type: 'RECEIVE_USER_REPOSITORIES',
          repos: names
        })
      })
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
  return (dispatch) => {
    dispatch({
      type: 'AUTHENTICATE'
    })
    let tokenHolder = ''
    return GitHubApi.getToken(code)
      .then(token => {
        tokenHolder = token
        return GitHubApi.getInfo(token)
      }).then(data => {
        dispatch({
          type: 'AUTHENTICATED',
          token: tokenHolder,
          userName: data.login
        })
        boot(tokenHolder, data.login)(dispatch)
      })
  }
}

export function boot (token, name) {
  return (dispatch) => {
    //dispatch(loadFiles(`${name}/${repository}`, token))
    dispatch(loadOrgs(token))
    dispatch(loadUserRepos(token))
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
