import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Editor from '../components/Editor'
import Filer from '../components/Filer'
import Header from '../components/Header'
import CreateFileDialog from '../components/dialogs/CreateFileDialog'
import '../styles/app.css'
import config from '../../config.json'

class App extends React.Component {
  componentDidMount () {
    const { repository, userInfo, dispatch } = this.props
    const url = new URL(window.location.href)
    if (url.searchParams.has('code') === true) {
      dispatch(actions.authenticate(url.searchParams.get('code')))
    } else if (userInfo.get('token') === null) {
      let url = 'https://github.com/login/oauth/authorize'
      url += '?client_id=' + config.client_id
      url += '&redirect_uri=' + config.redirect_uri
      url += '&scope=' + config.scope
      window.location.href = url
    } else {
      dispatch(actions.boot(userInfo.get('token'), userInfo.get('userName')))
    }
  }

  render () {
    const {
      orgs,
      repos,
      files,
      repository,
      organization,
      currentFile,
      currentContent,
      uiStatus,
      dialogs,
      userInfo,
      dispatch
    } = this.props
    const base = organization === null ? userInfo.get('userName') : organization
    const token = userInfo.get('token')
    const userName = userInfo.get('userName')
    return (
      <div className='app'>
        <Header
          orgs={[userName].concat(orgs)}
          repos={repos}
          isPreview={uiStatus.get('isPreview')}
          onSaved={() => dispatch(
            actions.requestSaveFile(
              repository,currentFile,
              currentContent,
              token
            ))}
          onChangeMode={() => dispatch(actions.changeMode())}
          onDelete={() => dispatch(
            actions.requestDeleteFile(
              repository,
              currentFile,
              token
            ))}
          onCreate={() => dispatch(actions.showCreateFileDialog())}
          onChangeOrg={(org) => dispatch(
            actions.loadRepos(org, userName, token))}
          onChangeRepo={(repo) => dispatch(
            actions.requestLoadFiles(`${base}/${repo}`, token))}
          onClickLogoff={() => dispatch(actions.logoff())}>
        </Header>
        <div className='content'>
          <Filer
            files={files}
            currentFile={currentFile}
            onClick={(file) => dispatch(
              actions.requestLoadContent(repository, file, token))}>
          </Filer>
          <Editor
            isPreview={uiStatus.get('isPreview')}
            content={currentContent}
            changeMode={() => dispatch(actions.changeMode())}
            onUpdated={(content) => dispatch(
              actions.updateFile(currentFile, content))}>
          </Editor>
        </div>
        <div className='dialogs'>
          <CreateFileDialog
            isShowed={uiStatus.get('isCreateFileDialogShowed')}
            onSave={(name) => dispatch(
              actions.requestCreateFile(repository, name, token))}
            onCancel={() => dispatch(actions.hideCreateFileDialog())}>
          </CreateFileDialog>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.contents.get('files'),
    repository: state.contents.get('repository'),
    currentContent: state.contents.get('currentContent'),
    currentFile: state.contents.get('currentFile'),
    uiStatus: state.uiStatus,
    orgs: state.contents.get('organizations'),
    dialogs: state.dialogs,
    repos: state.contents.get('repositories'),
    userInfo: state.userInfo,
    organization: state.contents.get('organization')
  }
}

export default connect(mapStateToProps)(App)
