import React from 'react'
import { connect } from 'react-redux'
import { saveFile, updateFile, clickFile, loadFiles, changeMode, deleteFile, createFile, loadOrgs, loadRepos, loadUserRepos, loadOrgRepos, showCreateFileDialog, hideCreateFileDialog } from '../actions'
import Editor from '../components/Editor'
import Filer from '../components/Filer'
import Header from '../components/Header'
import CreateFileDialog from '../components/dialogs/CreateFileDialog'
import '../styles/app.css'

class App extends React.Component {
  componentDidMount () {
    const { repository, dispatch } = this.props
    dispatch(loadFiles(`takuseno/${repository}`))
    dispatch(loadOrgs())
    dispatch(loadUserRepos())
  }

  render () {
    const { orgs, repos, files, repository, organization, currentFile, currentContent, uiStatus, dialogs, userInfo, dispatch } = this.props
    const base = organization === null ? userInfo.get('userName') : organization
    return (
      <div className='app'>
        <Header
          orgs={orgs}
          repos={repos}
          isPreview={uiStatus.get('isPreview')}
          onSaved={() => dispatch(saveFile(repository, currentFile, currentContent))}
          onChangeMode={() => dispatch(changeMode())}
          onDelete={() => dispatch(deleteFile(repository, currentFile))}
          onCreate={() => dispatch(showCreateFileDialog())}
          onChangeOrg={(org) => dispatch(loadRepos(org, userInfo.get('userName')))}
          onChangeRepo={(repo) => dispatch(loadFiles(`${base}/${repo}`))}>
        </Header>
        <div className='content'>
          <Filer
            files={files}
            onClick={(file) => dispatch(clickFile(repository, file))}>
          </Filer>
          <Editor
            isPreview={uiStatus.get('isPreview')}
            content={currentContent}
            onUpdated={(content) => dispatch(updateFile(currentFile, content))}>
          </Editor>
        </div>
        <div className='dialogs'>
          <CreateFileDialog
            isShowed={uiStatus.get('isCreateFileDialogShowed')}
            onSave={() => dispatch(createFile('test'))}
            onCancel={() => dispatch(hideCreateFileDialog())}>
          </CreateFileDialog>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    repository: state.repository,
    currentContent: state.currentContent,
    currentFile: state.currentFile,
    uiStatus: state.uiStatus,
    orgs: state.orgs,
    dialogs: state.dialogs,
    repos: state.repos,
    userInfo: state.userInfo,
    organization: state.organization
  }
}

export default connect(mapStateToProps)(App)
