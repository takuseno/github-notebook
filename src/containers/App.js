import React from 'react'
import { connect } from 'react-redux'
import { saveFile, updateFile, clickFile, loadFiles, changeMode } from '../actions'
import Editor from '../components/Editor'
import Filer from '../components/Filer'
import Header from '../components/Header'
import '../styles/app.css'

class App extends React.Component {
  componentDidMount () {
    const { repository, dispatch } = this.props
    dispatch(loadFiles(repository))
  }

  render () {
    const { files, repository, currentFile, currentContent, uiStatus, dispatch } = this.props
    return (
      <div className='app'>
        <Header
          isPreview={uiStatus.get('isPreview')}
          onSaved={() => dispatch(saveFile(repository, currentFile, currentContent))}
          onChangeMode={() => dispatch(changeMode())}>
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
    uiStatus: state.uiStatus
  }
}

export default connect(mapStateToProps)(App)
