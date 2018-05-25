import * as GitHubApi from '../api/GitHubApi'
import * as actions from '../actions'

const api = store => next => action => {
  next(action)
  switch (action.type) {
    case 'REQUEST_SAVE_FILE':
      GitHubApi.updateContents(
          action.repository,
          action.file,
          action.content,
          action.token
        ).then(data => {
          action.file.sha = data.content.sha
          next(actions.receiveSaveFile(
            action.repository,
            action.file,
            btoa(action.content)
          ))
        })

      case 'REQUEST_CREATE_FILE':
        GitHubApi.createContents(
            action.repository,
            action.path,
            action.token
          ).then((data) => {
            const file = {
              path: data.content.path,
              sha: data.content.sha
            }
            next(actions.receiveCreateFile(
              action.repository,
              file
            ))
          })

      case 'REQUEST_DELETE_FILE':
        GitHubApi.deleteContents(
            action.repository,
            action.file,
            action.token
          ).then(data => {
            next(actions.receiveDeleteFile(
              action.repository,
              action.file
            ))
          })

      case 'REQUEST_LOAD_CONTENT':
        GitHubApi.getContents(
            action.repository,
            action.file,
            action.token
          ).then(data => {
            next(actions.receiveLoadContent(
              action.repository,
              action.file,
              atob(data.content)
            ))
          })

      case 'REQUEST_LOAD_FILES':
        GitHubApi.getFiles(action.repository, action.token)
          .then(data => {
            const files = data.tree
              .filter((file) => file.type === 'blob')
            next(actions.receiveLoadFiles(
              action.repository,
              files
            ))
          })

      case 'REQUEST_ORGANIZATIONS':
        GitHubApi.getOrganizations(action.token)
          .then(data => {
            const names = data.map((org) => org.login)
            next(actions.receiveOrganizations(names))
          })

      case 'REQUEST_ORG_REPOSITORIES':
        GitHubApi.getOrgRepos(action.org, action.token)
          .then(data => {
            const names = data.map((repo) => repo.name)
            next(actions.receiveOrgRepositories(names))
          })

      case 'REQUEST_USER_REPOSITORIES':
        GitHubApi.getUserRepos(action.token)
          .then(data => {
            const names = data.map((repo) => repo.name)
            next(actions.receiveUserRepositories(
              names,
              action.userName
            ))
            next(actions.requestLoadFiles(
              `${action.userName}/${names[0]}`,
              action.token
            ))
          })

      case 'AUTHENTICATE':
        let tokenHolder = ''
        GitHubApi.getToken(action.code)
          .then(token => {
            tokenHolder = token
            return GitHubApi.getInfo(token)
          }).then(data => {
            next(actions.authenticated(tokenHolder, data.login))
            next(actions.requestOrganizations(tokenHolder))
            next(actions.requestUserRepositories(data.login, tokenHolder))
          })
  }
}

export default api
