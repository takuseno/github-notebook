import React from 'react'
import { connect } from 'react-redux'
import { saveFile, updateFile, clickFile, loadFiles, changeMode } from '../actions'
import Editor from '../components/Editor'
import Filer from '../components/Filer'
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
        <Filer
          files={files}
          onClick={(file) => dispatch(clickFile(repository, file))}>
        </Filer>
        <Editor
          isPreview={uiStatus.get('isPreview')}
          content={currentContent}
          onUpdated={(content) => dispatch(updateFile(currentFile, content))}
          onSaved={(content) => dispatch(saveFile(repository, currentFile, content))}
          onChangeMode={() => dispatch(changeMode())}>
        </Editor>
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
