import * as GitHubApi from '../api/GitHubApi'

export function saveFile (repository, file, content) {
  return (dispatch) => {
    dispatch(() => ({
      type: 'REQUEST_SAVE_FILE',
      repository: repository,
      file: file,
      content: content
    }))
    return GitHubApi.updateContents(repository, file, content)
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

export function createFile (repository, path) {
  return (dispatch) => {
    dispatch(() => ({
      type: 'REQUEST_CREATE_FILE',
      repository: repository,
      path: path
    }))
    return GitHubApi.createContents(repository, path)
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

export function deleteFile (repository, file) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_DELETE_FILE',
      repository: repository,
      file: file
    })
    return GitHubApi.deleteContents(repository, file)
      .then(data => {
        dispatch({
          type: 'RECEIVE_DELETE_FILE',
          repository: repository,
          file: file
        })
      })
  }
}

export function clickFile (repository, file) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_LOAD_CONTENT',
      repository: repository,
      file: file
    })
    return GitHubApi.getContents(repository, file)
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

export function loadFiles (repository) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_LOAD_FILES',
      repository: repository
    })
    return GitHubApi.getFiles(repository)
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

export function loadOrgs () {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_ORGANIZATIONS'
    })
    return GitHubApi.getOrganizations()
      .then(data => {
        const names = data.map((org) => org.login)
        dispatch({
          type: 'RECEIVE_ORGANIZATIONS',
          orgs: names
        })
      })
  }
}

export function loadRepos (org, userName) {
  if (org == userName) {
    return loadUserRepos()
  }
  return loadOrgRepos(org)
}

export function loadOrgRepos (org) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_ORG_REPOSITORIES',
      organization: org
    })
    return GitHubApi.getOrgRepos(org)
      .then(data => {
        const names = data.map((repo) => repo.name)
        dispatch({
          type: 'RECEIVE_ORG_REPOSITORIES',
          repos: names
        })
      })
  }
}

export function loadUserRepos () {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_USER_REPOSITORIES'
    })
    return GitHubApi.getUserRepos()
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
