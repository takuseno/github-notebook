import * as GitHubApi from '../api/GitHubApi'
import * as actions from '../actions'

const api = store => next => action => {
  console.log(action)
  next(action)
  switch (action.type) {
    case 'REQUEST_SAVE_FILE':
      return GitHubApi.updateContents(
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
        return GitHubApi.createContents(
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
        return GitHubApi.deleteContents(
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
        return GitHubApi.getContents(
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
        return GitHubApi.getFiles(action.repository, action.token)
          .then(data => {
            const files = data.tree
              .filter((file) => file.type === 'blob')
            next(actions.receiveLoadFiles(
              action.repository,
              files
            ))
            if (files.length > 0) {
              store.dispatch(actions.requestLoadContent(
                action.repository,
                files[0],
                action.token
              ))
            }
          })

      case 'REQUEST_ORGANIZATIONS':
        return GitHubApi.getOrganizations(action.token)
          .then(data => {
            const names = data.map((org) => org.login)
            next(actions.receiveOrganizations(names))
          })

      case 'REQUEST_ORG_REPOSITORIES':
        return GitHubApi.getOrgRepos(action.org, action.token)
          .then(data => {
            const names = data.map((repo) => repo.name)
            next(actions.receiveOrgRepositories(names))
            if (names.length > 0) {
              store.dispatch(actions.requestLoadFiles(
                `${action.org}/${names[0]}`,
                action.token
              ))
            }
          })

      case 'REQUEST_USER_REPOSITORIES':
        return GitHubApi.getUserRepos(action.token)
          .then(data => {
            const names = data.map((repo) => repo.name)
            next(actions.receiveUserRepositories(
              names,
              action.userName
            ))
            if (names.length > 0) {
              store.dispatch(actions.requestLoadFiles(
                `${action.userName}/${names[0]}`,
                action.token
              ))
            }
          })

      case 'AUTHENTICATE':
        let tokenHolder = ''
        return GitHubApi.getToken(action.code)
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
